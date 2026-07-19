import React from 'react';
import { GlassBottomSheet } from '../shared/GlassBottomSheet';

export interface MobileFilterState {
  collection: string[];
  priceRange: string[];
  availability: string[];
  fragranceType: string[];
}

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MobileFilterState;
  setFilters: React.Dispatch<React.SetStateAction<MobileFilterState>>;
}

const FILTER_OPTIONS = {
  collection: ['Gentlemen', 'Ladies', 'Unisex', 'Private Blend'],
  priceRange: ['Under $100', '$100 - $200', '$200 - $300', 'Over $300'],
  availability: ['In Stock', 'Out of Stock', 'Pre-order'],
  fragranceType: ['Woody', 'Floral', 'Fresh', 'Spicy', 'Citrus', 'Amber']
};

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters
}) => {
  
  const toggleFilter = (category: keyof MobileFilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      collection: [],
      priceRange: [],
      availability: [],
      fragranceType: []
    });
  };

  const renderSection = (title: string, category: keyof MobileFilterState, options: string[]) => (
    <div className="mb-8 last:mb-0">
      <h4 className="text-[#FDFBF7] text-sm tracking-widest uppercase mb-4 font-medium">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = filters[category].includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleFilter(category, option)}
              className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 ${
                isSelected 
                  ? 'bg-[#E8D3A2] text-black shadow-[0_0_15px_rgba(232,211,162,0.3)] font-medium' 
                  : 'bg-white/5 border border-white/10 text-[#A3A3A3] hover:text-[#FDFBF7] hover:border-white/30'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <GlassBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Filters"
      onReset={resetFilters}
      onApply={onClose}
      applyText="Show Results"
    >
      <div className="pt-2">
        {renderSection('Collection', 'collection', FILTER_OPTIONS.collection)}
        {renderSection('Price Range', 'priceRange', FILTER_OPTIONS.priceRange)}
        {renderSection('Fragrance Type', 'fragranceType', FILTER_OPTIONS.fragranceType)}
        {renderSection('Availability', 'availability', FILTER_OPTIONS.availability)}
      </div>
    </GlassBottomSheet>
  );
};
