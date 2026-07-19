import React from 'react';
import { motion } from 'framer-motion';

export const MobileProductsHero: React.FC = () => {
  return (
    <div className="w-full pt-32 pb-12 px-6 flex flex-col items-center text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <span className="text-[#E8D3A2] text-[10px] tracking-[0.3em] uppercase mb-6 font-medium">
          Our Collection
        </span>
        
        <h1 className="font-serif text-4xl leading-tight text-[#FDFBF7] mb-6 tracking-wide">
          Discover Every<br />Fragrance
        </h1>
        
        <p className="text-[#A3A3A3] text-sm leading-relaxed max-w-[280px] font-light">
          Explore handcrafted fragrances inspired by confidence, elegance and timeless sophistication.
        </p>
      </motion.div>
    </div>
  );
};
