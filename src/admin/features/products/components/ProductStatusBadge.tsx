import React from 'react';
import type { ProductStatus } from '../types/product';

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

export const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
          Active
        </span>
      );
    case 'draft':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200">
          <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mr-1.5"></span>
          Draft
        </span>
      );
    case 'archived':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5"></span>
          Archived
        </span>
      );
    default:
      return null;
  }
};
