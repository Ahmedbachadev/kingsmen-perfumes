import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import type { CreatedOrderResult } from '../../services/checkoutService';

export default function CheckoutSuccessPage() {
  const location = useLocation();
  const [order, setOrder] = useState<CreatedOrderResult | null>(null);

  useEffect(() => {
    // Check location state first, fallback to sessionStorage
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      const stored = sessionStorage.getItem('kingsmen_last_order');
      if (stored) {
        try {
          setOrder(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse order from sessionStorage', e);
        }
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-3xl mx-auto text-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8 relative overflow-hidden"
      >
        {/* Decorative Golden Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-[80px] pointer-events-none" />

        {/* Animated Success Badge */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] text-white">
            Thank You
          </h1>
          <p className="text-[#D4AF37] text-sm font-medium uppercase tracking-[0.15em]">
            Your Cash on Delivery Order Has Been Placed
          </p>
        </div>

        {/* Order Info Card */}
        {order ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider block">Order Number</span>
                <span className="text-[#D4AF37] text-xl font-mono font-bold">{order.orderNumber}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-white/40 text-xs uppercase tracking-wider block">Total Amount</span>
                <span className="text-white text-xl font-light">Rs {order.totalAmount.toFixed(0)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70 pt-2">
              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Customer</span>
                <p className="text-white font-medium">{order.customerName}</p>
                <p className="text-xs text-white/50">{order.customerPhone}</p>
              </div>

              <div>
                <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">Shipping Destination</span>
                <p className="text-white font-medium">
                  {order.shippingAddress?.city}, {order.shippingAddress?.province}
                </p>
                <p className="text-xs text-white/50 truncate">
                  {order.shippingAddress?.line1}, {order.shippingAddress?.area}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-white/5 rounded-xl text-white/60 text-sm">
            Order confirmed. Your order code has been recorded.
          </div>
        )}

        {/* Delivery Timeline Notice */}
        <div className="p-5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-medium text-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Estimated Delivery: 3 to 5 Business Days</span>
          </div>
          <p className="text-white/60 text-xs leading-relaxed max-w-lg mx-auto">
            Our courier agent will contact you at <strong className="text-white">{order?.customerPhone || 'your phone number'}</strong> before delivery. Please keep cash ready upon arrival.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            to="/products"
            className="inline-block px-10 py-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-white/20"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
