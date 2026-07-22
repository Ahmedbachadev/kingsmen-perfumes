import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import type { ShopifyProduct } from '../../services/shopify/types';
import { useCartContext } from '../../contexts/CartContext';
import { useTransition } from '../transitions';

interface ProductHeroProps {
  product: ShopifyProduct;
}

export const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
  const { addToCart } = useCartContext();
  const navigate = useTransition();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || '250');
  const formattedPrice = `$${price.toFixed(2)}`;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      {/* Ambient Gold Backlight Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products', 'morph')}
          className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors mb-8 text-xs uppercase tracking-[0.2em] font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#D4AF37]" />
          <span>Back to Collection</span>
        </button>

        {/* Responsive Grid: 1 Column on Mobile, 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Product Image Display */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[450px] aspect-[3/4] rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl p-8 flex items-center justify-center shadow-2xl overflow-hidden group"
            >
              {/* Internal subtle glow ring */}
              <div className="absolute inset-0 bg-radial from-[#D4AF37]/10 via-transparent to-transparent opacity-60" />

              <motion.img
                layoutId={`bottle-${product.handle}`}
                src={product.featuredImage?.url || '/placeholder-perfume.jpg'}
                alt={product.featuredImage?.altText || product.title}
                className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
              />

              {/* Exclusive Badge */}
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full backdrop-blur-md">
                Eau de Parfum
              </span>
            </motion.div>
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] tracking-[0.3em] text-xs uppercase font-semibold">
                  Kingsmen Private Blend
                </span>
              </div>

              <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-light tracking-[0.1em] uppercase leading-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-[#D4AF37] text-3xl lg:text-4xl font-light tracking-wide tabular-nums">
                  {formattedPrice}
                </span>
                <span className="text-emerald-400 text-xs uppercase tracking-wider font-medium px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                  In Stock & Ready to Ship
                </span>
              </div>
            </motion.div>

            {/* Description Snippet */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-xl"
            >
              {product.description ||
                'An exquisite olfactory masterpiece crafted with rare botanicals, precious woods, and warm amber accents designed to leave an indelible impression.'}
            </motion.p>

            {/* Quantity & Add to Cart Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 pt-4 border-t border-white/10"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center justify-between border border-white/20 rounded-xl bg-white/5 px-4 py-3 sm:w-36 shrink-0">
                  <span className="text-xs uppercase text-white/50 tracking-wider">Qty</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-white/60 hover:text-white text-base font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-white font-semibold text-sm tabular-nums w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-white/60 hover:text-white text-base font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 relative overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#D4AF37] text-black py-4 px-8 rounded-xl font-bold uppercase tracking-[0.2em] text-xs shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-black" />
                      <span>Add to Bag • ${(price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Reassurance Features Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-white/60 text-xs"
            >
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Cash on Delivery Available</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>100% Authentic Guaranteed</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <RefreshCw className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Fast 3-5 Day Shipping</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
