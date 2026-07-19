import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Signature', 'Gentlemen', 'Ladies', 'Unisex', 'New Arrivals'];

interface ProductsFilterBarProps {
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function ProductsFilterBar({ activeCategory, onSelect }: ProductsFilterBarProps) {
  return (
    <div className="sticky top-[72px] z-40 w-full bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-4 px-4 overflow-x-auto no-scrollbar">
      <div className="max-w-[1600px] mx-auto flex items-center justify-center min-w-max gap-8 px-4">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`relative px-4 py-2 text-xs tracking-[0.2em] uppercase font-light transition-colors duration-500 ${
                isActive ? 'text-[#E8D3A2]' : 'text-white/40 hover:text-white/80'
              }`}
            >
              {category}
              {isActive && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute left-0 bottom-0 w-full h-[1px] bg-[#E8D3A2] shadow-[0_0_10px_rgba(232,211,162,0.5)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
