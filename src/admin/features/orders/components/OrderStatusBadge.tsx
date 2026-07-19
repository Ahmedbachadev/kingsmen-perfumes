import React from 'react';
import type { OrderStatus } from '../types/order';

const STATUS_CONFIG: Record<OrderStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmed' },
  processing: { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Processing' },
  packed: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Packed' },
  shipped: { bg: 'bg-green-100', text: 'text-green-800', label: 'Shipped' },
  delivered: { bg: 'bg-teal-100', text: 'text-teal-800', label: 'Delivered' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
  archived: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Archived' },
};

export const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const config = STATUS_CONFIG[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};
