import React, { useState, useMemo } from 'react';
import type { ShopifyProduct } from '../../services/shopify/types';
import { MobileProductsHero } from './MobileProductsHero';
import { MobileSearchToolbar } from './MobileSearchToolbar';
import { MobileFilterSheet, type MobileFilterState } from './MobileFilterSheet';
import { MobileSortSheet, type MobileSortOption } from './MobileSortSheet';
import { MobileProductGrid } from './MobileProductGrid';

interface MobileProductsViewProps {
  products: ShopifyProduct[];
}

export const MobileProductsView: React.FC<MobileProductsViewProps> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [currentSort, setCurrentSort] = useState<MobileSortOption>('featured');
  const [filters, setFilters] = useState<MobileFilterState>({
    collection: [],
    priceRange: [],
    availability: [],
    fragranceType: []
  });

  const activeFilterCount = Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);

  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // 2. Filter: Collection
    if (filters.collection.length > 0) {
      result = result.filter(p => {
        const collections = p.collections?.edges.map(e => e.node.title) || [];
        return filters.collection.some(c => collections.includes(c));
      });
    }

    // 3. Filter: Price Range (Mock logic based on string labels)
    if (filters.priceRange.length > 0) {
      result = result.filter(p => {
        const price = parseFloat(p.priceRange?.minVariantPrice.amount || '0');
        return filters.priceRange.some(range => {
          if (range === 'Under $100') return price < 100;
          if (range === '$100 - $200') return price >= 100 && price <= 200;
          if (range === '$200 - $300') return price > 200 && price <= 300;
          if (range === 'Over $300') return price > 300;
          return false;
        });
      });
    }

    // 4. Filter: Availability
    if (filters.availability.length > 0) {
      result = result.filter(p => {
        const available = p.availableForSale;
        if (filters.availability.includes('In Stock') && available) return true;
        if (filters.availability.includes('Out of Stock') && !available) return true;
        return false;
      });
    }

    // 5. Filter: Fragrance Type (Mock logic via description)
    if (filters.fragranceType.length > 0) {
      result = result.filter(p => {
        const text = p.description.toLowerCase();
        return filters.fragranceType.some(type => text.includes(type.toLowerCase()));
      });
    }

    // 6. Sort
    result.sort((a, b) => {
      const priceA = parseFloat(a.priceRange?.minVariantPrice.amount || '0');
      const priceB = parseFloat(b.priceRange?.minVariantPrice.amount || '0');
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      switch (currentSort) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'alpha-asc': return titleA.localeCompare(titleB);
        case 'newest': return -1; 
        case 'featured':
        default:
          return 0;
      }
    });

    return result;
  }, [products, searchQuery, filters, currentSort]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white">
      <MobileProductsHero />
      
      <MobileSearchToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenFilter={() => setIsFilterOpen(true)}
        onOpenSort={() => setIsSortOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      <MobileProductGrid products={processedProducts} />

      <MobileFilterSheet 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <MobileSortSheet
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        currentSort={currentSort}
        setSort={setCurrentSort}
      />
    </div>
  );
};
