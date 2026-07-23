import React from 'react';
import type { Order } from '../types/order';

interface Props {
  order: Order;
}

export const OrderSummary: React.FC<Props> = ({ order }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h2 className="text-base font-semibold text-neutral-900 mb-6">Payment Summary</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-medium text-neutral-900">{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">Shipping</span>
          <span className="font-medium text-neutral-900">{formatCurrency(order.shipping)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">Tax</span>
          <span className="font-medium text-neutral-900">{formatCurrency(order.tax || 0)}</span>
        </div>
        {Number(order.discount) > 0 && (
          <div className="flex items-center justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-medium">-{formatCurrency(order.discount)}</span>
          </div>
        )}
        <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
          <span className="text-base font-semibold text-neutral-900">Total</span>
          <span className="text-lg font-bold text-neutral-900">{formatCurrency(order.total)}</span>
        </div>
      </div>
    </div>
  );
};
