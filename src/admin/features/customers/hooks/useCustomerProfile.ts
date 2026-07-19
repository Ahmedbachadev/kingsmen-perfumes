import { useState, useEffect, useCallback } from 'react';
import type { Customer } from '../types/customer';
import { customerService } from '../services/customerService';

export function useCustomerProfile(id: string) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchCustomer = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await customerService.getCustomerDetails(id);
      setCustomer(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch customer details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, [id, fetchCustomer]);

  const updateNotes = async (notes: string) => {
    try {
      setSavingNotes(true);
      await customerService.updateCustomer(id, { notes });
      setCustomer(prev => prev ? { ...prev, notes } : null);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to save notes');
    } finally {
      setSavingNotes(false);
    }
  };

  const updateStatus = async (status: Customer['status']) => {
    try {
      await customerService.updateCustomer(id, { status });
      setCustomer(prev => prev ? { ...prev, status } : null);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update status');
    }
  };

  return {
    customer,
    loading,
    error,
    savingNotes,
    updateNotes,
    updateStatus,
    refresh: fetchCustomer
  };
}
