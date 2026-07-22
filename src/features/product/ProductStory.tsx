import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import type { ShopifyProduct } from '../../services/shopify/types';

interface ProductStoryProps {
  product: ShopifyProduct;
}

export const ProductStory: React.FC<ProductStoryProps> = ({ product }) => {
  return (
    <section className="relative w-full py-16 md:py-28 bg-[#070707] border-y border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Quote className="w-6 h-6 text-[#D4AF37]" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h2 className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] font-semibold">
            The Story Behind The Scent
          </h2>

          <blockquote className="text-white text-xl sm:text-2xl md:text-4xl font-serif font-light leading-relaxed md:leading-relaxed tracking-wide italic max-w-4xl mx-auto">
            &ldquo;{product.description || 'A deep, resonant fragrance capturing the stillness of dusk. Dark woods layered with subtle spice create an unforgettable trail.'}&rdquo;
          </blockquote>

          <div className="pt-4 flex items-center justify-center gap-2">
            <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Crafted by Kingsmen Master Perfumers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
