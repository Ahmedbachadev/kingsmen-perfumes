import { useState, useEffect, useCallback } from 'react';
import * as orderService from '../services/orderService';
import type { Order, OrderStatus, PaymentStatus, FulfillmentStatus } from '../types/order';

export const useOrderDetails = (id: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOrder = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await orderService.getOrderDetails(id);
      setOrder(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching order details:', err);
      setError(err.message || 'Failed to load order.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const updateStatus = async (status: OrderStatus, title: string, description?: string) => {
    if (!id) return false;
    setActionLoading(true);
    try {
      await orderService.updateOrderStatus(id, status, title, description);
      await fetchOrder(); // refresh
      return true;
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status.');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const updatePayment = async (status: PaymentStatus) => {
    if (!id) return false;
    setActionLoading(true);
    try {
      await orderService.updatePaymentStatus(id, status);
      await fetchOrder();
      return true;
    } catch (err) {
      console.error('Error updating payment status:', err);
      alert('Failed to update payment status.');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const updateFulfillment = async (status: FulfillmentStatus) => {
    if (!id) return false;
    setActionLoading(true);
    try {
      await orderService.updateFulfillmentStatus(id, status);
      await fetchOrder();
      return true;
    } catch (err) {
      console.error('Error updating fulfillment status:', err);
      alert('Failed to update fulfillment status.');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const saveNotes = async (notes: string) => {
    if (!id) return false;
    setActionLoading(true);
    try {
      await orderService.updateOrderNotes(id, notes);
      await fetchOrder();
      return true;
    } catch (err) {
      console.error('Error saving notes:', err);
      alert('Failed to save notes.');
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    order,
    loading,
    error,
    actionLoading,
    refresh: fetchOrder,
    updateStatus,
    updatePayment,
    updateFulfillment,
    saveNotes
  };
};
