import React from 'react';
import type { PaymentStatus } from '../types/order';

const STATUS_CONFIG: Record<PaymentStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
  paid: { bg: 'bg-green-100', text: 'text-green-800', label: 'Paid' },
  refunded: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Refunded' },
  partially_refunded: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Partially Refunded' },
  failed: { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' },
};

export const PaymentBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const config = STATUS_CONFIG[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};
