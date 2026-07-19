import React from 'react';
import type { Product } from '../types/product';
import { ProductRow } from './ProductRow';
import { ProductEmptyState } from './ProductEmptyState';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onAddProduct: () => void;
  isFilterActive: boolean;
  clearFilters: () => void;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  onDelete,
  onEdit,
  onView,
  onAddProduct,
  isFilterActive,
  clearFilters,
  page,
  totalPages,
  setPage
}) => {
  if (loading && products.length === 0) {
    // Skeleton loading
    return (
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50/50">
              <tr>
                {['Product', 'Collection/Category', 'Price', 'Stock', 'Status', 'Updated', ''].map((h, i) => (
                  <th key={i} className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-10 bg-neutral-100 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-neutral-100 rounded w-24 mb-2"></div><div className="h-3 bg-neutral-100 rounded w-16"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-neutral-100 rounded w-16"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-neutral-100 rounded w-8"></div></td>
                  <td className="px-6 py-4"><div className="h-6 bg-neutral-100 rounded w-16"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-neutral-100 rounded w-20"></div></td>
                  <td className="px-6 py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <ProductEmptyState 
        onAddProduct={onAddProduct} 
        isFilter={isFilterActive} 
        clearFilters={clearFilters} 
      />
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Collection & Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Updated
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {products.map((product) => (
              <ProductRow 
                key={product.id} 
                product={product} 
                onDelete={onDelete}
                onEdit={onEdit}
                onView={onView}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 border-t border-neutral-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-700">
                Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
