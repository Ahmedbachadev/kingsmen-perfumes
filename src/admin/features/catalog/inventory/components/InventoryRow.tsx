import React, { memo, useState } from 'react';
import {
  MoreHorizontal,
  Plus,
  Minus,
  Hash,
  Image as ImageIcon,
  Star,
  History,
} from 'lucide-react';
import { StockBadge } from './StockBadge';
import { cn } from '../../../../utils/cn';
import { getAvailableStock } from '../services/inventoryService';
import type { InventoryProduct } from '../services/inventoryService';

interface InventoryRowProps {
  product: InventoryProduct;
  onAdjust: (
    product: InventoryProduct,
    mode: 'increase' | 'decrease' | 'set'
  ) => void;
  onViewHistory: (productId: string) => void;
}

export const InventoryRow = memo(function InventoryRow({
  product,
  onAdjust,
  onViewHistory,
}: InventoryRowProps) {
  const [showMenu, setShowMenu] = useState(false);

  const sku = product.variants?.[0]?.sku || '—';
  const reserved = product.reserved_stock || 0;
  const available = getAvailableStock(product.inventory, reserved);
  const threshold = product.low_stock_threshold || 10;

  return (
    <tr className="group hover:bg-slate-50/50 transition-colors duration-200">
      {/* Product */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60 flex-shrink-0 relative group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300">
            {product.images?.[0] ? (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            ) : (
              <ImageIcon className="w-4 h-4 text-slate-400" />
            )}
            {product.is_featured && (
              <div className="absolute top-0 right-0 p-0.5 bg-amber-500 rounded-bl-xl backdrop-blur-md">
                <Star className="w-2 h-2 text-white fill-white" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p
              className="text-sm font-semibold text-slate-900 truncate max-w-[200px]"
              title={product.name}
            >
              {product.name}
            </p>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
              {(product.collection as any)?.name || 'No collection'}
            </p>
          </div>
        </div>
      </td>

      {/* SKU */}
      <td className="px-4 py-3 hidden lg:table-cell">
        <span className="text-sm font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
          {sku}
        </span>
      </td>

      {/* Current Stock */}
      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-slate-900 tabular-nums">
          {product.inventory}
        </span>
      </td>

      {/* Reserved */}
      <td className="px-4 py-3 hidden xl:table-cell">
        <span className="text-sm font-medium text-slate-500 tabular-nums">
          {reserved}
        </span>
      </td>

      {/* Available */}
      <td className="px-4 py-3 hidden xl:table-cell">
        <span
          className={cn(
            'text-sm font-semibold tabular-nums',
            available <= 0 ? 'text-rose-600' : 'text-slate-900'
          )}
        >
          {available}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <StockBadge inventory={product.inventory} threshold={threshold} />
      </td>

      {/* Last Updated */}
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
          {new Date(product.updated_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          {/* Quick actions — visible on hover */}
          <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onAdjust(product, 'increase')}
              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
              title="Increase Stock"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAdjust(product, 'decrease')}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
              title="Decrease Stock"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAdjust(product, 'set')}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
              title="Set Exact Stock"
            >
              <Hash className="w-4 h-4" />
            </button>
          </div>

          {/* Menu */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setShowMenu(!showMenu)}
              onBlur={() => setTimeout(() => setShowMenu(false), 200)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-all duration-200 ease-out opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-sm border border-transparent hover:border-slate-200/60"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-30 py-1.5 overflow-hidden">
                <button
                  onClick={() => {
                    onAdjust(product, 'increase');
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-emerald-500" />
                  Increase Stock
                </button>
                <button
                  onClick={() => {
                    onAdjust(product, 'decrease');
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Minus className="w-4 h-4 text-rose-500" />
                  Decrease Stock
                </button>
                <button
                  onClick={() => {
                    onAdjust(product, 'set');
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Hash className="w-4 h-4 text-indigo-500" />
                  Set Exact Stock
                </button>
                <div className="h-px bg-slate-100 my-1.5"></div>
                <button
                  onClick={() => {
                    onViewHistory(product.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <History className="w-4 h-4 text-slate-400" />
                  View History
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
});
