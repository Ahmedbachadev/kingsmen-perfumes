import React from 'react';
import { Banknote } from 'lucide-react';

export const PaymentMethod = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-neutral-900">Payment Method</h2>
      
      <div className="relative border-2 border-neutral-900 rounded-xl p-4 bg-neutral-50/50 flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-5 h-5 rounded-full border-4 border-neutral-900 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-neutral-900" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Banknote className="w-5 h-5 text-neutral-900" />
            <span className="font-semibold text-neutral-900">Cash on Delivery</span>
          </div>
          <p className="text-sm text-neutral-500">
            Pay with cash when your order is delivered.
          </p>
        </div>
      </div>
      
      <p className="text-xs text-neutral-400">
        Note: More payment options will be available soon.
      </p>
    </div>
  );
};
