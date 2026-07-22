import React from 'react';
import { cn } from '../../../../utils/cn';

interface FulfillmentBadgeProps {
  status: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled';
  className?: string;
}

export function FulfillmentBadge({ status, className }: FulfillmentBadgeProps) {
  const styles = {
    unfulfilled: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    partially_fulfilled: 'bg-blue-100 text-blue-800 border-blue-200',
    fulfilled: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  };

  const labels = {
    unfulfilled: 'Unfulfilled',
    partially_fulfilled: 'Partially Fulfilled',
    fulfilled: 'Fulfilled'
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', styles[status], className)}>
      {labels[status]}
    </span>
  );
}
