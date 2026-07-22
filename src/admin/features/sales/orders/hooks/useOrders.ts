import { useState, useCallback, useEffect } from 'react';
import { OrderService, type OrderFilters, type OrderStats } from '../services/orderService';

export function useOrders(initialLimit = 20) {
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0,
    todayRevenue: 0
  });
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);

  // Filter state
  const [filters, setFilters] = useState<OrderFilters>({
    search: '',
    order_status: 'all',
    payment_status: 'all',
    fulfillment_status: 'all'
  });

  const loadOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [ordersRes, statsRes] = await Promise.all([
        OrderService.getOrders(filters, page, limit),
        OrderService.getOrderStats()
      ]);
      
      setData(ordersRes.data);
      setCount(ordersRes.count);
      setStats(statsRes);
    } catch (err) {
      console.error('Failed to load orders:', err);
      setError(err instanceof Error ? err : new Error('Failed to load orders'));
    } finally {
      setIsLoading(false);
    }
  }, [filters, page, limit]);

  useEffect(() => {
    // Debounce load if search is present
    const timeoutId = setTimeout(() => {
      loadOrders();
    }, filters.search ? 300 : 0);
    
    return () => clearTimeout(timeoutId);
  }, [loadOrders, filters.search]);

  const updateFilters = (newFilters: Partial<OrderFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page on filter change
  };

  return {
    data,
    stats,
    count,
    isLoading,
    error,
    page,
    limit,
    filters,
    setPage,
    updateFilters,
    reload: loadOrders
  };
}
