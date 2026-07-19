import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface MobileSearchToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenFilter: () => void;
  onOpenSort: () => void;
  activeFilterCount: number;
}

export const MobileSearchToolbar: React.FC<MobileSearchToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenFilter,
  onOpenSort,
  activeFilterCount
}) => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.15, 0.6]);
  const blur = useTransform(scrollY, [0, 100], [8, 24]);
  const shadowOpacity = useTransform(scrollY, [0, 100], [0.1, 0.5]);

  return (
    <div className="sticky top-[86px] z-40 px-4 w-full">
      <motion.div 
        className="w-full flex items-center h-14 rounded-full border border-[rgba(235,213,179,0.2)] px-2 overflow-hidden relative"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(10, 10, 12, ${v})`),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(150%)`),
          WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(150%)`),
          boxShadow: useTransform(shadowOpacity, (v) => `0 10px 30px rgba(0,0,0,${v})`),
          willChange: 'transform, backdrop-filter'
        }}
      >
        {/* Soft internal reflection sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.03)] to-transparent pointer-events-none" />

        <div className="flex-1 flex items-center pl-3 relative z-10">
          <Search className="w-4 h-4 text-[#A3A3A3] mr-2" strokeWidth={1.5} />
          <input 
            type="text"
            placeholder="Search fragrances..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[#FDFBF7] text-sm placeholder-[#A3A3A3]/60 font-light"
          />
        </div>

        <div className="flex items-center gap-1 relative z-10 pr-1">
          {/* Sort Button */}
          <button 
            onClick={onOpenSort}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#A3A3A3] active:bg-white/5 active:text-[#FDFBF7] transition-all"
          >
            <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
          </button>
          
          <div className="w-[1px] h-5 bg-[rgba(235,213,179,0.15)] mx-1" />

          {/* Filter Button */}
          <button 
            onClick={onOpenFilter}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#A3A3A3] active:bg-white/5 active:text-[#FDFBF7] transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
            {activeFilterCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E8D3A2] shadow-[0_0_8px_rgba(232,211,162,0.8)]" />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
