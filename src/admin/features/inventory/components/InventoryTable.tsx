import React from 'react';
import type { Product } from '../../products/types/product';
import { StockBadge } from './StockBadge';
import { Package, MoreVertical, Edit2, History } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  products: Partial<Product>[];
  loading: boolean;
  onAdjustStock: (product: Partial<Product>) => void;
  onViewHistory: (product: Partial<Product>) => void;
  threshold: number;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const InventoryTable: React.FC<Props> = ({
  products,
  loading,
  onAdjustStock,
  onViewHistory,
  threshold,
  page,
  totalPages,
  setPage
}) => {
  if (loading && products.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
        <div className="h-12 bg-neutral-50 border-b border-neutral-200"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 border-b border-neutral-100 px-6 py-4 flex items-center">
            <div className="h-8 w-8 bg-neutral-200 rounded mr-4"></div>
            <div className="h-4 w-48 bg-neutral-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-xl py-12 flex flex-col items-center justify-center shadow-sm">
        <Package className="w-12 h-12 text-neutral-300 mb-4" />
        <h3 className="text-lg font-medium text-neutral-900">No products found</h3>
        <p className="text-neutral-500 mt-1">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">SKU</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Current Stock</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Last Updated</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-neutral-50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-neutral-100 rounded-md border border-neutral-200 overflow-hidden flex items-center justify-center">
                      {product.thumbnail ? (
                        <img className="h-full w-full object-cover" src={product.thumbnail} alt="" />
                      ) : (
                        <Package className="h-5 w-5 text-neutral-400" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-neutral-900">{product.name}</div>
                      {product.collection && <div className="text-xs text-neutral-500">{product.collection.name}</div>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {product.sku || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-neutral-900">{product.stock}</div>
                  <div className="text-xs text-neutral-500 mt-0.5">0 reserved</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StockBadge stock={product.stock!} threshold={threshold} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {product.updated_at ? new Date(product.updated_at).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onViewHistory(product)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors"
                      title="View History"
                    >
                      <History className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onAdjustStock(product)}
                      className="px-3 py-1.5 bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-lg text-xs font-medium transition-colors shadow-sm"
                    >
                      Adjust
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 border-t border-neutral-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-700">
                Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
