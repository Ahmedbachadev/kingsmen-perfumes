import React, { memo } from 'react';
import { cn } from '../../../../utils/cn';
import { getStockStatus, type StockStatus } from '../services/inventoryService';

interface StockBadgeProps {
  inventory: number;
  threshold: number;
  size?: 'sm' | 'md';
}

const statusConfig: Record<
  StockStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  in_stock: {
    label: 'In Stock',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
  },
  low_stock: {
    label: 'Low Stock',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
  },
  out_of_stock: {
    label: 'Out of Stock',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]',
  },
};

export const StockBadge = memo(function StockBadge({
  inventory,
  threshold,
  size = 'md',
}: StockBadgeProps) {
  const status = getStockStatus(inventory, threshold);
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg font-semibold tracking-wide uppercase',
        config.bg,
        config.text,
        size === 'sm'
          ? 'px-2 py-0.5 text-[10px]'
          : 'px-2.5 py-1 text-[11px]'
      )}
    >
      <span className={cn('rounded-full', config.dot, size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5')} />
      {config.label}
    </span>
  );
});
