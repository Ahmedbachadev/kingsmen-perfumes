import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { CustomerTable } from '../../features/customers/components/CustomerTable';
import { CustomerStats } from '../../features/customers/components/CustomerStats';
import { useCustomers } from '../../features/customers/hooks/useCustomers';
import { Search, Filter } from 'lucide-react';

const Customers: React.FC = () => {
  const { customers, stats, loading, search, setSearch, filter, setFilter } = useCustomers();

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <PageHeader 
        title="Customers" 
        description="Manage customer details, purchase history, and segments."
        breadcrumbs={[{ label: 'Customers' }]}
      />

      <CustomerStats stats={stats} loading={loading} />

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-neutral-400 w-5 h-5" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-neutral-300 rounded-lg text-sm focus:ring-neutral-900 focus:border-neutral-900"
            >
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>

        <CustomerTable customers={customers} loading={loading} />
      </div>
    </div>
  );
};

export default Customers;
