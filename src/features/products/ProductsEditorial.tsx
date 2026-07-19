import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ShopifyProduct } from '../../services/shopify/types';
import { ProductCard } from './ProductCard';
import { useTransition } from '../transitions';

interface ProductsEditorialProps {
  products: ShopifyProduct[];
  onQuickView: (product: ShopifyProduct) => void;
}

const ITEMS_PER_PAGE = 6;

export function ProductsEditorial({ products, onQuickView }: ProductsEditorialProps) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const navigate = useTransition();

  const displayedProducts = products.slice(0, displayCount);
  const hasMore = displayCount < products.length;

  const handleExploreMore = () => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, products.length));
  };

  if (products.length === 0) {
    return null; // Grid handles empty state
  }

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div 
        layout
        className="w-full flex flex-col gap-24 lg:gap-32 py-12"
      >
        <AnimatePresence>
          {displayedProducts.map((product, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 w-full`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <ProductCard product={product} onQuickView={onQuickView} editorial />
                </div>
                
                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 lg:px-12">
                  <span className="text-[#E8D3A2] tracking-[0.3em] uppercase text-xs font-semibold mb-6 block">
                    Featured Scent
                  </span>
                  <h2 className="text-white text-4xl lg:text-6xl font-light tracking-widest uppercase mb-8 leading-tight">
                    {product.title}
                  </h2>
                  <p className="text-white/60 font-light text-lg leading-relaxed mb-10 max-w-lg">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => onQuickView(product)}
                      className="border border-white/20 text-white px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-white hover:text-black transition-colors duration-500 rounded-sm"
                    >
                      Quick Preview
                    </button>
                    <button 
                      onClick={() => navigate(`/products/${product.handle}`, 'morph')}
                      className="text-[#E8D3A2] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      Read Story
                      <motion.svg 
                        className="group-hover:translate-x-2 transition-transform" 
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </motion.svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16"
        >
          <button 
            onClick={handleExploreMore}
            className="relative group overflow-hidden border border-[#E8D3A2]/30 text-[#E8D3A2] px-16 py-5 tracking-[0.2em] uppercase text-xs hover:bg-[#E8D3A2]/10 transition-colors duration-500 rounded-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8D3A2]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10">Discover More</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
