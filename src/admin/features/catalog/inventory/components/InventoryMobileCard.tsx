import React, { memo } from 'react';
import {
  Plus,
  Minus,
  Hash,
  Image as ImageIcon,
  Star,
} from 'lucide-react';
import { StockBadge } from './StockBadge';
import { getAvailableStock } from '../services/inventoryService';
import type { InventoryProduct } from '../services/inventoryService';

interface InventoryMobileCardProps {
  product: InventoryProduct;
  onAdjust: (
    product: InventoryProduct,
    mode: 'increase' | 'decrease' | 'set'
  ) => void;
}

export const InventoryMobileCard = memo(function InventoryMobileCard({
  product,
  onAdjust,
}: InventoryMobileCardProps) {
  const sku = product.variants?.[0]?.sku || '—';
  const reserved = product.reserved_stock || 0;
  const available = getAvailableStock(product.inventory, reserved);
  const threshold = product.low_stock_threshold || 10;

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60 flex-shrink-0 relative">
          {product.images?.[0] ? (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-400" />
          )}
          {product.is_featured && (
            <div className="absolute top-0 right-0 p-0.5 bg-amber-500 rounded-bl-xl">
              <Star className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {product.name}
          </p>
          <p className="text-[11px] font-mono text-slate-400 mt-0.5">
            SKU: {sku}
          </p>
        </div>
        <StockBadge
          inventory={product.inventory}
          threshold={threshold}
          size="sm"
        />
      </div>

      {/* Stock Info Grid */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="bg-slate-50 rounded-xl px-3 py-2 text-center">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
            Current
          </p>
          <p className="text-lg font-bold text-slate-900 tabular-nums">
            {product.inventory}
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl px-3 py-2 text-center">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
            Reserved
          </p>
          <p className="text-lg font-bold text-slate-500 tabular-nums">
            {reserved}
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl px-3 py-2 text-center">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
            Available
          </p>
          <p className={`text-lg font-bold tabular-nums ${available <= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {available}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onAdjust(product, 'increase')}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all duration-200"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
        <button
          onClick={() => onAdjust(product, 'decrease')}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all duration-200"
        >
          <Minus className="w-3.5 h-3.5" />
          Remove
        </button>
        <button
          onClick={() => onAdjust(product, 'set')}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-200"
        >
          <Hash className="w-3.5 h-3.5" />
          Set
        </button>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Updated{' '}
          {new Date(product.updated_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })}
        </span>
        {(product.collection as any)?.name && (
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            {(product.collection as any).name}
          </span>
        )}
      </div>
    </div>
  );
});
