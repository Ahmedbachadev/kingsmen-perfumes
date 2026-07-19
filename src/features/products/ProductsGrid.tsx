import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ShopifyProduct } from '../../services/shopify/types';
import { ProductCard } from './ProductCard';

interface ProductsGridProps {
  products: ShopifyProduct[];
  onQuickView: (product: ShopifyProduct) => void;
}

const ITEMS_PER_PAGE = 8;

export function ProductsGrid({ products, onQuickView }: ProductsGridProps) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const displayedProducts = products.slice(0, displayCount);
  const hasMore = displayCount < products.length;

  const handleExploreMore = () => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, products.length));
  };

  if (products.length === 0) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center text-center px-4">
        <h3 className="text-white text-2xl font-light tracking-widest uppercase mb-4">
          No fragrances matched your preferences
        </h3>
        <p className="text-white/50 font-light mb-8 max-w-md leading-relaxed">
          Try adjusting your filters or discover our signature collection instead.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="relative group overflow-hidden border border-[#E8D3A2]/50 text-[#E8D3A2] px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#E8D3A2]/10 transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8D3A2]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div 
        layout
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: (index % ITEMS_PER_PAGE) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </motion.div>
          ))}
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
            className="relative group overflow-hidden border border-white/20 text-white px-12 py-4 tracking-[0.2em] uppercase text-xs hover:bg-white/5 transition-colors duration-500 rounded-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10">Explore More</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
