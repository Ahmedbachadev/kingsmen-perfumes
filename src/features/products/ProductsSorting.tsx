import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'alpha-asc';

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'alpha-asc', label: 'Alphabetical' },
];

interface ProductsSortingProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function ProductsSorting({ currentSort, onSortChange }: ProductsSortingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeLabel = OPTIONS.find(o => o.value === currentSort)?.label || 'Sort By';

  return (
    <div className="relative z-30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md text-white/80 hover:text-white transition-colors duration-300 text-xs tracking-[0.1em] uppercase font-light"
      >
        <span>Sort: {activeLabel}</span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 w-48 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-lg overflow-hidden"
          >
            {OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-xs tracking-[0.1em] uppercase font-light transition-colors duration-300 hover:bg-white/5 ${
                  currentSort === option.value ? 'text-[#E8D3A2]' : 'text-white/60 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
