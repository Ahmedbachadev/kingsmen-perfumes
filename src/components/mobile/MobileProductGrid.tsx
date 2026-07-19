import React, { useState } from 'react';
import type { ShopifyProduct } from '../../services/shopify/types';
import { MobileProductCard } from './MobileProductCard';
import { GlassButton } from '../shared/GlassButton';

interface MobileProductGridProps {
  products: ShopifyProduct[];
}

export const MobileProductGrid: React.FC<MobileProductGridProps> = ({ products }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  if (products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-[#A3A3A3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-[#FDFBF7] font-serif text-2xl mb-3">No Fragrances Found</h3>
        <p className="text-[#A3A3A3] text-sm font-light leading-relaxed mb-8 max-w-[260px]">
          Try adjusting your filters or search terms to discover our premium collection.
        </p>
      </div>
    );
  }

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <div className="w-full px-4 pt-10 pb-24">
      <div className="flex items-center justify-between mb-6 px-2">
        <span className="text-[#A3A3A3] text-xs tracking-widest uppercase">
          {products.length} Results
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-12">
        {visibleProducts.map((product, index) => (
          <MobileProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {hasMore && (
        <div className="w-full flex justify-center">
          <GlassButton onClick={handleLoadMore} className="px-10 py-3">
            Explore More
          </GlassButton>
        </div>
      )}
    </div>
  );
};
