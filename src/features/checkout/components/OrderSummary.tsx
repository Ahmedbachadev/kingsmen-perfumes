import React from 'react';
import type { CartItemType } from '../../../contexts/CartContext';

interface Props {
  items: CartItemType[];
  subtotal: number;
  shipping: number;
  grandTotal: number;
}

export const OrderSummary: React.FC<Props> = ({ items, subtotal, shipping, grandTotal }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-neutral-50 rounded-2xl p-6 lg:p-8 space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Order Summary</h2>

      <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 bg-white rounded-lg border border-neutral-200 overflow-hidden shrink-0">
              {item.featuredImage?.url ? (
                <img
                  src={item.featuredImage.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400 text-xs">
                  No image
                </div>
              )}
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-neutral-900 text-white text-xs flex items-center justify-center rounded-full">
                {item.quantity}
              </span>
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="text-sm font-medium text-neutral-900 truncate">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                {formatCurrency(parseFloat(item.priceRange?.minVariantPrice.amount || '0'))}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-neutral-200 space-y-3 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-200 flex justify-between items-end">
        <div>
          <span className="text-base font-medium text-neutral-900">Total</span>
          <p className="text-xs text-neutral-500 mt-0.5">Including all taxes</p>
        </div>
        <span className="text-2xl font-semibold text-neutral-900">
          {formatCurrency(grandTotal)}
        </span>
      </div>
    </div>
  );
};
