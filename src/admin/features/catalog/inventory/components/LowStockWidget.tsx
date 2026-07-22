import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Plus,
  Minus,
  Hash,
  Image as ImageIcon,
  ArrowDown,
} from 'lucide-react';
import { StockBadge } from './StockBadge';
import { cn } from '../../../../utils/cn';
import { InventoryService, type InventoryProduct, getAvailableStock } from '../services/inventoryService';

interface LowStockWidgetProps {
  onAdjust: (
    product: InventoryProduct,
    mode: 'increase' | 'decrease' | 'set'
  ) => void;
  refreshKey?: number;
}

export function LowStockWidget({ onAdjust, refreshKey }: LowStockWidgetProps) {
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLowStock();
  }, [refreshKey]);

  const loadLowStock = async () => {
    setIsLoading(true);
    try {
      const result = await InventoryService.getLowStockProducts({ limit: 50 });
      setProducts(result.products);
    } catch (err) {
      console.error('Failed to load low stock products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-100 rounded-md w-1/3"></div>
              <div className="h-3 bg-slate-100 rounded-md w-1/5"></div>
            </div>
            <div className="h-6 bg-slate-100 rounded-lg w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          All stocked up!
        </h3>
        <p className="text-sm text-slate-500 max-w-sm">
          All products are above their low stock thresholds. No action needed.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Alert Banner */}
      <div className="mx-4 mt-4 mb-2 flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/60 rounded-xl">
        <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0" />
        <p className="text-sm text-amber-800">
          <span className="font-semibold">{products.length} product{products.length !== 1 ? 's' : ''}</span>{' '}
          {products.length !== 1 ? 'are' : 'is'} below {products.length !== 1 ? 'their' : 'its'} low stock threshold.
        </p>
      </div>

      {/* Products List */}
      <div className="divide-y divide-slate-100">
        {products.map((product) => {
          const sku = product.variants?.[0]?.sku || '—';
          const threshold = product.low_stock_threshold || 10;
          const reserved = product.reserved_stock || 0;
          const available = getAvailableStock(product.inventory, reserved);

          return (
            <div
              key={product.id}
              className="group px-4 py-3 hover:bg-slate-50/50 transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                {/* Image */}
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60 flex-shrink-0">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-mono text-slate-400">
                      {sku}
                    </span>
                    <span className="text-[11px] text-slate-300">·</span>
                    <span className="text-[11px] text-slate-400">
                      Threshold: {threshold}
                    </span>
                  </div>
                </div>

                {/* Stock & Badge */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p
                      className={cn(
                        'text-lg font-bold tabular-nums',
                        product.inventory <= 0
                          ? 'text-rose-600'
                          : 'text-amber-600'
                      )}
                    >
                      {product.inventory}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase">
                      units
                    </p>
                  </div>
                  <StockBadge
                    inventory={product.inventory}
                    threshold={threshold}
                    size="sm"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 mt-2 ml-[52px]">
                <button
                  onClick={() => onAdjust(product, 'increase')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all duration-200"
                >
                  <Plus className="w-3 h-3" />
                  Restock
                </button>
                <button
                  onClick={() => onAdjust(product, 'set')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all duration-200"
                >
                  <Hash className="w-3 h-3" />
                  Set Stock
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
