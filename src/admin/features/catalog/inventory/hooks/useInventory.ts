import { useState, useEffect, useCallback, useRef } from 'react';
import {
  InventoryService,
  type InventoryProduct,
  type InventoryStats,
  type InventoryHistoryRecord,
  type StockStatus,
  type AdjustmentMode,
  type AdjustmentReason,
} from '../services/inventoryService';

// ─── useInventory ──────────────────────────────────────────────────────────

export function useInventory() {
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [stats, setStats] = useState<InventoryStats>({
    total: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [collections, setCollections] = useState<
    { id: string; name: string }[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [stockStatus, setStockStatus] = useState<StockStatus | null>(null);
  const [isFeatured, setIsFeatured] = useState<boolean | null>(null);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 20;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Load collections once
  useEffect(() => {
    InventoryService.getCollections()
      .then(setCollections)
      .catch(console.error);
  }, []);

  // Load stats
  const loadStats = useCallback(async () => {
    setIsStatsLoading(true);
    try {
      const data = await InventoryService.getInventoryStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load inventory stats:', err);
    } finally {
      setIsStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Load products
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await InventoryService.getInventoryProducts({
        search: debouncedSearch || undefined,
        stockStatus,
        isFeatured,
        collectionId: collectionId || undefined,
        page,
        limit,
      });
      setProducts(result.products);
      setTotalCount(result.count);
    } catch (err) {
      console.error('Failed to load inventory products:', err);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, stockStatus, isFeatured, collectionId, page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const clearFilters = useCallback(() => {
    setSearch('');
    setStockStatus(null);
    setIsFeatured(null);
    setCollectionId(null);
    setPage(1);
  }, []);

  const hasFilters = Boolean(
    debouncedSearch || stockStatus || isFeatured !== null || collectionId
  );

  const totalPages = Math.ceil(totalCount / limit);

  const refresh = useCallback(() => {
    loadProducts();
    loadStats();
  }, [loadProducts, loadStats]);

  return {
    products,
    setProducts,
    stats,
    collections,
    totalCount,
    isLoading,
    isStatsLoading,
    search,
    setSearch,
    stockStatus,
    setStockStatus,
    isFeatured,
    setIsFeatured,
    collectionId,
    setCollectionId,
    page,
    setPage,
    limit,
    totalPages,
    hasFilters,
    clearFilters,
    refresh,
    loadProducts,
    loadStats,
  };
}

// ─── useStockAdjust ────────────────────────────────────────────────────────

export function useStockAdjust(
  onSuccess: () => void,
  setProducts: React.Dispatch<React.SetStateAction<InventoryProduct[]>>
) {
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const adjustStock = useCallback(
    async (params: {
      productId: string;
      currentStock: number;
      mode: AdjustmentMode;
      amount: number;
      reason: AdjustmentReason;
      notes?: string;
    }) => {
      setIsAdjusting(true);
      setError(null);

      // Calculate expected new quantity for optimistic update
      let expectedNew: number;
      switch (params.mode) {
        case 'increase':
          expectedNew = params.currentStock + params.amount;
          break;
        case 'decrease':
          expectedNew = Math.max(0, params.currentStock - params.amount);
          break;
        case 'set':
          expectedNew = Math.max(0, params.amount);
          break;
        default:
          expectedNew = params.currentStock;
      }

      // Optimistic update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === params.productId
            ? {
                ...p,
                inventory: expectedNew,
                updated_at: new Date().toISOString(),
              }
            : p
        )
      );

      try {
        await InventoryService.adjustStock(params);
        onSuccess();
      } catch (err: any) {
        // Rollback optimistic update
        setProducts((prev) =>
          prev.map((p) =>
            p.id === params.productId
              ? { ...p, inventory: params.currentStock }
              : p
          )
        );
        setError(err.message || 'Failed to adjust stock');
        throw err;
      } finally {
        setIsAdjusting(false);
      }
    },
    [onSuccess, setProducts]
  );

  return { adjustStock, isAdjusting, error };
}

// ─── useInventoryHistory ───────────────────────────────────────────────────

export function useInventoryHistory(productId?: string) {
  const [records, setRecords] = useState<InventoryHistoryRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 15;
  const abortRef = useRef(false);

  const loadHistory = useCallback(
    async (pageNum?: number) => {
      const targetPage = pageNum || page;
      setIsLoading(true);
      abortRef.current = false;

      try {
        const result = await InventoryService.getStockHistory({
          productId,
          page: targetPage,
          limit,
        });

        if (!abortRef.current) {
          setRecords(result.records);
          setTotalCount(result.count);
        }
      } catch (err) {
        console.error('Failed to load stock history:', err);
      } finally {
        if (!abortRef.current) {
          setIsLoading(false);
        }
      }
    },
    [productId, page]
  );

  useEffect(() => {
    loadHistory();
    return () => {
      abortRef.current = true;
    };
  }, [loadHistory]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    records,
    totalCount,
    page,
    setPage,
    totalPages,
    isLoading,
    reload: loadHistory,
  };
}
