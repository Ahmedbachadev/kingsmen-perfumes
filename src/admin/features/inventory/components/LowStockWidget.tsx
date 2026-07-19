import React from 'react';
import type { Product } from '../../products/types/product';
import { AlertTriangle, Package, TrendingDown } from 'lucide-react';

interface Props {
  products: Partial<Product>[];
  loading: boolean;
  onEditStock: (productId: string) => void;
  threshold: number;
}

export const LowStockWidget: React.FC<Props> = ({ products, loading, onEditStock, threshold }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 animate-pulse">
        <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4"></div>
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-neutral-100 rounded-lg flex-1"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null; // Don't show if no low stock items
  }

  return (
    <div className="bg-orange-50/50 rounded-xl border border-orange-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-orange-600" />
        <h2 className="text-lg font-semibold text-orange-900">Low Stock Alerts</h2>
        <span className="text-sm text-orange-600 ml-2">({products.length} items below {threshold} units)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm flex flex-col">
            <div className="flex items-start gap-3 mb-3 flex-1">
              {product.thumbnail ? (
                <img src={product.thumbnail} alt={product.name} className="w-12 h-12 rounded object-cover border border-neutral-100" />
              ) : (
                <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center border border-neutral-200">
                  <Package className="w-6 h-6 text-neutral-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-900 truncate" title={product.name}>{product.name}</h3>
                <p className="text-xs text-neutral-500 truncate" title={product.sku || ''}>{product.sku || 'No SKU'}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-50">
              <div className="flex items-center gap-1.5">
                <TrendingDown className={`w-4 h-4 ${product.stock! <= 0 ? 'text-red-500' : 'text-orange-500'}`} />
                <span className={`text-sm font-bold ${product.stock! <= 0 ? 'text-red-600' : 'text-orange-600'}`}>
                  {product.stock} left
                </span>
              </div>
              <button 
                onClick={() => onEditStock(product.id!)}
                className="text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
