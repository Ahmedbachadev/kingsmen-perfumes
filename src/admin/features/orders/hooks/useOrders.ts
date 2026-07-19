import { useState, useEffect, useCallback } from 'react';
import * as orderService from '../services/orderService';
import type { Order, OrderStats, OrderStatus, PaymentStatus, FulfillmentStatus } from '../types/order';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<OrderStatus | 'all'>('all');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | 'all'>('all');
  const [fulfillmentStatus, setFulfillmentStatus] = useState<FulfillmentStatus | 'all'>('all');
  const [totalCount, setTotalCount] = useState(0);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const [ordersData, statsData] = await Promise.all([
        orderService.getOrders(page, limit, search, status, paymentStatus, fulfillmentStatus),
        orderService.getOrderStats()
      ]);

      setOrders(ordersData.orders as Order[]);
      setTotalCount(ordersData.count);
      setStats(statsData);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status, paymentStatus, fulfillmentStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const archiveOrder = async (id: string) => {
    try {
      await orderService.archiveOrder(id);
      await fetchOrders();
      return true;
    } catch (err) {
      console.error('Error archiving order:', err);
      return false;
    }
  };

  return {
    orders,
    stats,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch,
    status,
    setStatus,
    paymentStatus,
    setPaymentStatus,
    fulfillmentStatus,
    setFulfillmentStatus,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    refresh: fetchOrders,
    archiveOrder
  };
};
