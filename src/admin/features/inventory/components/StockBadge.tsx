import React from 'react';

interface Props {
  stock: number;
  threshold?: number;
}

export const StockBadge: React.FC<Props> = ({ stock, threshold = 10 }) => {
  if (stock <= 0) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        Out of Stock
      </span>
    );
  }
  
  if (stock <= threshold) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
        Low Stock
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
      In Stock
    </span>
  );
};
