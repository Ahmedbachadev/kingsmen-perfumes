import React from 'react';
import { Search, Filter, RefreshCcw, Plus } from 'lucide-react';
import type { ProductStatus } from '../types/product';

interface ProductToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  status: ProductStatus | 'all';
  setStatus: (value: ProductStatus | 'all') => void;
  refresh: () => void;
  loading: boolean;
  onAddProduct: () => void;
}

export const ProductToolbar: React.FC<ProductToolbarProps> = ({
  search,
  setSearch,
  status,
  setStatus,
  refresh,
  loading,
  onAddProduct,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sticky top-0 bg-neutral-50 z-10 py-2 border-b border-transparent">
      {/* Search and Filters */}
      <div className="flex flex-1 w-full items-center gap-3">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-colors"
          />
        </div>
        
        <div className="relative hidden sm:block">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProductStatus | 'all')}
            className="appearance-none pl-3 pr-8 py-2 text-sm font-medium bg-white border border-neutral-300 rounded-lg shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-colors cursor-pointer text-neutral-700"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={refresh}
          disabled={loading}
          className="p-2 text-neutral-500 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm disabled:opacity-50"
          title="Refresh data"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={onAddProduct}
          className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>
    </div>
  );
};
