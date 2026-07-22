import React from 'react';
import { Package } from 'lucide-react';
import { InventoryRow } from './InventoryRow';
import { InventoryMobileCard } from './InventoryMobileCard';
import type { InventoryProduct } from '../services/inventoryService';

interface InventoryTableProps {
  products: InventoryProduct[];
  isLoading: boolean;
  onAdjust: (
    product: InventoryProduct,
    mode: 'increase' | 'decrease' | 'set'
  ) => void;
  onViewHistory: (productId: string) => void;
  hasFilters: boolean;
  onClearFilters: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  limit: number;
}

export function InventoryTable({
  products,
  isLoading,
  onAdjust,
  onViewHistory,
  hasFilters,
  onClearFilters,
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  limit,
}: InventoryTableProps) {
  // Loading skeleton
  if (isLoading && products.length === 0) {
    return (
      <>
        {/* Desktop skeleton */}
        <div className="hidden sm:block p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded-md w-1/4"></div>
                <div className="h-3 bg-slate-100 rounded-md w-1/6"></div>
              </div>
              <div className="h-4 bg-slate-100 rounded-md w-16"></div>
              <div className="h-6 bg-slate-100 rounded-lg w-20"></div>
            </div>
          ))}
        </div>
        {/* Mobile skeleton */}
        <div className="sm:hidden p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/60 rounded-2xl p-4 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-100 rounded-md w-3/4"></div>
                  <div className="h-3 bg-slate-100 rounded-md w-1/3"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-16 bg-slate-50 rounded-xl"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {hasFilters ? 'No matching products' : 'No inventory data'}
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mb-4">
          {hasFilters
            ? 'Try adjusting your filters or search terms to find what you\'re looking for.'
            : 'Add products to your catalog to start managing inventory.'}
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all duration-200"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Desktop/Tablet Table */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto relative min-h-[300px]">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center transition-all duration-300">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 border-b border-slate-200/60">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 hidden lg:table-cell">
                  SKU
                </th>
                <th scope="col" className="px-4 py-3">
                  Stock
                </th>
                <th scope="col" className="px-4 py-3 hidden xl:table-cell">
                  Reserved
                </th>
                <th scope="col" className="px-4 py-3 hidden xl:table-cell">
                  Available
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 hidden md:table-cell">
                  Updated
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <InventoryRow
                  key={product.id}
                  product={product}
                  onAdjust={onAdjust}
                  onViewHistory={onViewHistory}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="sm:hidden p-4 space-y-3">
        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {products.map((product) => (
          <InventoryMobileCard
            key={product.id}
            product={product}
            onAdjust={onAdjust}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalCount > 0 && (
        <div className="px-6 py-4 border-t border-slate-200/60 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-500">
            Showing{' '}
            <span className="font-medium text-slate-900">
              {(currentPage - 1) * limit + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium text-slate-900">
              {Math.min(currentPage * limit, totalCount)}
            </span>{' '}
            of{' '}
            <span className="font-medium text-slate-900">{totalCount}</span>{' '}
            results
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-4 py-2 border border-slate-200/60 rounded-xl text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out shadow-sm hover:scale-[1.02] disabled:hover:scale-100"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || isLoading}
              className="px-4 py-2 border border-slate-200/60 rounded-xl text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out shadow-sm hover:scale-[1.02] disabled:hover:scale-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
