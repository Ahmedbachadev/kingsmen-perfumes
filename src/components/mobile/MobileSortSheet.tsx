import React from 'react';
import { GlassBottomSheet } from '../shared/GlassBottomSheet';

export type MobileSortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'alpha-asc';

interface MobileSortSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: MobileSortOption;
  setSort: (sort: MobileSortOption) => void;
}

const SORT_OPTIONS: { value: MobileSortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'alpha-asc', label: 'Alphabetical: A-Z' }
];

export const MobileSortSheet: React.FC<MobileSortSheetProps> = ({
  isOpen,
  onClose,
  currentSort,
  setSort
}) => {
  return (
    <GlassBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Sort By"
    >
      <div className="pt-2 flex flex-col gap-2">
        {SORT_OPTIONS.map((option) => {
          const isSelected = currentSort === option.value;
          return (
            <button
              key={option.value}
              onClick={() => {
                setSort(option.value);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                isSelected 
                  ? 'bg-white/10 border border-[#E8D3A2]/30 text-[#FDFBF7]' 
                  : 'bg-transparent border border-transparent text-[#A3A3A3] hover:bg-white/5 hover:text-[#FDFBF7]'
              }`}
            >
              <span className="text-sm tracking-widest uppercase font-medium">{option.label}</span>
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-[#E8D3A2] shadow-[0_0_8px_rgba(232,211,162,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </GlassBottomSheet>
  );
};
