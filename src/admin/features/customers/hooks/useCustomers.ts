import { useState, useEffect, useCallback } from 'react';
import type { Customer, CustomerStats } from '../types/customer';
import { customerService } from '../services/customerService';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    totalCustomers: 0,
    returningCustomers: 0,
    newCustomers: 0,
    newsletterSubscribers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [totalCount, setTotalCount] = useState(0);
  
  const limit = 10;

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [customersRes, statsRes] = await Promise.all([
        customerService.getCustomers(page, limit, search, filter),
        customerService.getCustomerStats()
      ]);
      
      setCustomers(customersRes.customers);
      setTotalCount(customersRes.count);
      setStats(statsRes);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  }, [page, search, filter, limit]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const updateCustomerStatus = async (id: string, status: Customer['status']) => {
    try {
      // Optimistic update
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      await customerService.updateCustomer(id, { status });
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
      fetchCustomers(); // Revert
    }
  };

  return {
    customers,
    stats,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch,
    filter,
    setFilter,
    totalCount,
    limit,
    updateCustomerStatus,
    refresh: fetchCustomers
  };
}
