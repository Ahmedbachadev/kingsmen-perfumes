import { useState, useEffect, useCallback } from 'react';
import * as inventoryService from '../services/inventoryService';
import type { Product } from '../../products/types/product';
import type { InventoryAdjustment } from '../types/inventory';

export const useInventory = (limit = 20) => {
  const [products, setProducts] = useState<Partial<Product>[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Partial<Product>[]>([]);
  
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lowStockLoading, setLowStockLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [threshold, setThreshold] = useState(10);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const { products: data, count } = await inventoryService.getInventoryProducts(
        page,
        limit,
        search,
        statusFilter,
        threshold
      );
      setProducts(data);
      setTotalCount(count);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter, threshold]);

  const fetchLowStock = useCallback(async () => {
    try {
      setLowStockLoading(true);
      const data = await inventoryService.getLowStockProducts(threshold);
      setLowStockProducts(data);
    } catch (err: any) {
      console.error('Error fetching low stock:', err);
    } finally {
      setLowStockLoading(false);
    }
  }, [threshold]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  useEffect(() => {
    fetchLowStock();
  }, [fetchLowStock]);

  const adjustStock = async (adjustment: InventoryAdjustment) => {
    try {
      // Optimistic update
      setProducts(prev => 
        prev.map(p => 
          p.id === adjustment.productId ? { ...p, stock: adjustment.newQuantity } : p
        )
      );
      setLowStockProducts(prev => {
        // Simple optimistic approach: remove if no longer low stock, but hard to re-sort easily. 
        // We will just let the refresh handle the full accuracy, or remove if it goes above threshold.
        if (adjustment.newQuantity > threshold) {
          return prev.filter(p => p.id !== adjustment.productId);
        }
        return prev.map(p => 
          p.id === adjustment.productId ? { ...p, stock: adjustment.newQuantity } : p
        );
      });

      await inventoryService.adjustInventory(adjustment);
      
      // Re-fetch to ensure sync
      fetchInventory();
      fetchLowStock();
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to adjust stock');
      // Revert optimistic on error
      fetchInventory();
      fetchLowStock();
      return false;
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  return {
    products,
    lowStockProducts,
    totalCount,
    loading,
    lowStockLoading,
    error,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    threshold,
    setThreshold,
    adjustStock,
    refresh: () => {
      fetchInventory();
      fetchLowStock();
    }
  };
};
