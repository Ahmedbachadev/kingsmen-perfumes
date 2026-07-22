import React from 'react';
import type { CartItemType } from '../../../contexts/CartContext';

interface OrderSummaryProps {
  items: CartItemType[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shippingFee,
  totalAmount
}) => {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
      <h2 className="text-white text-lg font-light tracking-[0.15em] uppercase border-b border-white/10 pb-4">
        Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)})
      </h2>

      {/* Items List */}
      <div className="divide-y divide-white/5 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
        {items.map((item) => {
          const itemPrice = parseFloat(item.priceRange?.minVariantPrice?.amount || '0');
          const imageUrl = item.featuredImage?.url || '/placeholder-perfume.jpg';

          return (
            <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-4">
              {/* Product Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                <img
                  src={imageUrl}
                  alt={item.featuredImage?.altText || item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 right-1 bg-[#D4AF37] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>

              {/* Title & Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white text-sm font-medium truncate">
                  {item.title}
                </h4>
                <p className="text-white/40 text-xs mt-0.5">
                  Qty: {item.quantity} × ${itemPrice.toFixed(2)}
                </p>
              </div>

              {/* Total Price for item */}
              <div className="text-right">
                <span className="text-white font-medium text-sm tabular-nums">
                  ${(itemPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Financial Breakdown */}
      <div className="border-t border-white/10 pt-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/60">Subtotal</span>
          <span className="text-white font-medium tabular-nums">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-white/60">Shipping</span>
          <span className="text-[#D4AF37] font-medium tabular-nums">
            {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t border-white/10 pt-4 flex justify-between items-center">
          <div>
            <span className="text-white font-semibold text-base uppercase tracking-wider block">
              Total
            </span>
            <span className="text-white/40 text-[11px]">Includes all taxes</span>
          </div>
          <span className="text-[#D4AF37] text-2xl font-light tracking-wide tabular-nums">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
