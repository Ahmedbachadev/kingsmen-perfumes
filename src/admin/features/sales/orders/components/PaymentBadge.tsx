import React from 'react';
import { cn } from '../../../../utils/cn';

interface PaymentBadgeProps {
  status: 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed';
  className?: string;
}

export function PaymentBadge({ status, className }: PaymentBadgeProps) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    paid: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    refunded: 'bg-slate-100 text-slate-800 border-slate-200',
    partially_refunded: 'bg-blue-100 text-blue-800 border-blue-200',
    failed: 'bg-red-100 text-red-800 border-red-200'
  };

  const labels = {
    pending: 'Pending',
    paid: 'Paid',
    refunded: 'Refunded',
    partially_refunded: 'Partially Refunded',
    failed: 'Failed'
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', styles[status], className)}>
      {labels[status]}
    </span>
  );
}
