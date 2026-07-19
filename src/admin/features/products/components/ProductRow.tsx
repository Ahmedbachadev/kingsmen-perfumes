import React, { useState } from 'react';
import { MoreHorizontal, Eye, Edit, Trash2, Star } from 'lucide-react';
import type { Product } from '../types/product';
import { ProductStatusBadge } from './ProductStatusBadge';

interface ProductRowProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ 
  product, 
  onDelete,
  onEdit,
  onView 
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsDeleting(true);
      onDelete(product.id);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const date = new Date(product.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <tr className={`hover:bg-neutral-50 transition-colors ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-neutral-100 rounded-md border border-neutral-200 overflow-hidden flex items-center justify-center">
            {product.thumbnail ? (
              <img className="h-10 w-10 object-cover" src={product.thumbnail} alt="" />
            ) : (
              <span className="text-neutral-400 text-xs">No img</span>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-neutral-900 flex items-center gap-2">
              {product.name}
              {product.featured && (
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" title="Featured" />
              )}
            </div>
            <div className="text-sm text-neutral-500">{product.sku || 'No SKU'}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-neutral-900">{product.collection?.name || '—'}</div>
        <div className="text-sm text-neutral-500">{product.category || '—'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
        {formattedPrice}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className={`text-sm font-medium ${product.stock > 0 ? 'text-neutral-900' : 'text-red-600'}`}>
            {product.stock}
          </span>
          {product.stock <= 0 && (
            <span className="ml-2 text-xs text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">Out</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ProductStatusBadge status={product.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          onBlur={() => setTimeout(() => setShowMenu(false), 200)}
          className="text-neutral-400 hover:text-neutral-600 p-1 rounded-md hover:bg-neutral-100 transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {showMenu && (
          <div className="absolute right-6 top-10 mt-1 w-36 bg-white rounded-md shadow-lg border border-neutral-200 z-10 py-1">
            <button 
              onClick={() => onView(product.id)}
              className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-neutral-400" /> View
            </button>
            <button 
              onClick={() => onEdit(product.id)}
              className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 flex items-center gap-2"
            >
              <Edit className="w-4 h-4 text-neutral-400" /> Edit
            </button>
            <div className="border-t border-neutral-100 my-1"></div>
            <button 
              onClick={handleDelete}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4 text-red-400" /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
