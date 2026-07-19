import React from 'react';
import type { FulfillmentStatus } from '../types/order';

const STATUS_CONFIG: Record<FulfillmentStatus, { bg: string; text: string; label: string }> = {
  unfulfilled: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Unfulfilled' },
  partially_fulfilled: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Partially Fulfilled' },
  fulfilled: { bg: 'bg-green-100', text: 'text-green-800', label: 'Fulfilled' },
};

export const FulfillmentBadge: React.FC<{ status: FulfillmentStatus }> = ({ status }) => {
  const config = STATUS_CONFIG[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};
