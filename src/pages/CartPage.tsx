import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartContext } from '../contexts/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity } = useCartContext();

  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.priceRange?.minVariantPrice?.amount || '0');
    return total + price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center text-white">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-light uppercase tracking-[0.2em] mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-white/60 text-sm max-w-md mb-8">
          Explore our signature scents and elevate your fragrance wardrobe.
        </p>
        <Link
          to="/products"
          className="px-8 py-4 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-colors duration-300 shadow-xl"
        >
          Browse Fragrance Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 lg:px-12 max-w-[1200px] mx-auto text-white">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] text-white">
          Your Shopping Cart
        </h1>
        <p className="text-white/50 text-sm mt-2">
          {items.reduce((acc, i) => acc + i.quantity, 0)} item(s) selected
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const price = parseFloat(item.priceRange?.minVariantPrice?.amount || '0');
            const imageUrl = item.featuredImage?.url || '/placeholder-perfume.jpg';

            return (
              <div
                key={item.id}
                className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 flex items-center gap-4 md:gap-6 shadow-xl"
              >
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover bg-white/5 border border-white/10 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-base font-medium truncate mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[#D4AF37] text-sm font-light tabular-nums">
                    ${price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-white/20 rounded-lg bg-white/5 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs text-white tabular-nums font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/40 hover:text-red-400 text-xs transition-colors underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-white font-medium text-base md:text-lg tabular-nums">
                    ${(price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 lg:sticky lg:top-28">
          <h2 className="text-white text-lg font-light tracking-[0.15em] uppercase border-b border-white/10 pb-4">
            Cart Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-white/60">Subtotal</span>
              <span className="text-white font-medium tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-white/40">
              <span>Shipping & Taxes</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <span className="text-white font-semibold uppercase tracking-wider">Estimated Total</span>
            <span className="text-[#D4AF37] text-2xl font-light tabular-nums">${subtotal.toFixed(2)}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/checkout')}
            className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>
    </div>
  );
}
