import React from 'react';
import { PackagePlus } from 'lucide-react';

interface ProductEmptyStateProps {
  onAddProduct: () => void;
  isFilter?: boolean;
  clearFilters?: () => void;
}

export const ProductEmptyState: React.FC<ProductEmptyStateProps> = ({ 
  onAddProduct, 
  isFilter,
  clearFilters
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-neutral-300 rounded-lg bg-neutral-50/50">
      <div className="w-12 h-12 bg-white border border-neutral-200 shadow-sm rounded-lg flex items-center justify-center mb-4 text-neutral-900">
        <PackagePlus className="w-6 h-6 text-neutral-500" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-1">
        {isFilter ? 'No matching products' : 'No Products Yet'}
      </h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-6">
        {isFilter 
          ? 'No products match your current filters. Try adjusting them or clear filters.'
          : 'Start by adding your first fragrance to the catalogue. It will immediately be available in your store.'}
      </p>
      
      {isFilter && clearFilters ? (
        <button
          onClick={clearFilters}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
        >
          Clear filters
        </button>
      ) : (
        <button
          onClick={onAddProduct}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
        >
          Add Product
        </button>
      )}
    </div>
  );
};
