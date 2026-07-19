import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductStats, ProductStatus } from '../types/product';
import * as productService from '../services/productService';

interface UseProductsOptions {
  limit?: number;
}

export const useProducts = ({ limit = 10 }: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination state
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ProductStatus | 'all'>('all');
  const [collectionId, setCollectionId] = useState<string | 'all'>('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await productService.getProducts(
        page,
        limit,
        search,
        status,
        collectionId,
        sortBy,
        sortOrder
      );
      setProducts(result.products);
      setTotalCount(result.count);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status, collectionId, sortBy, sortOrder]);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const statsData = await productService.getProductStats();
      setStats(statsData);
    } catch (err: any) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const removeProduct = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      // Optimistic update
      setProducts(prev => prev.filter(p => p.id !== id));
      setTotalCount(prev => prev - 1);
      // Refresh stats
      fetchStats();
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete product');
    }
  };

  const refresh = () => {
    fetchProducts();
    fetchStats();
  };

  const totalPages = Math.ceil(totalCount / limit);

  return {
    products,
    stats,
    totalCount,
    loading,
    statsLoading,
    error,
    
    // Filter states
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    status,
    setStatus,
    collectionId,
    setCollectionId,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    // Actions
    removeProduct,
    refresh
  };
};
