import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useMediaQuery } from '../hooks/useMediaQuery';
import type { ShopifyProduct } from '../services/shopify/types';
import { useTransitionStore } from '../features/transitions';
import { MobileProductsView } from '../components/mobile/MobileProductsView';
import {
  ProductsHero,
  ProductsFilterBar,
  ProductsSidebar,
  ProductsSorting,
  ProductsGrid,
  ProductsEditorial,
  ProductQuickView,
  type SortOption,
  type FilterState
} from '../features/products';

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const { setPageReady, getScrollPosition } = useTransitionStore();
  
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [activeCategory, setActiveCategory] = useState('All');
  const [currentSort, setCurrentSort] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');
  
  const [filters, setFilters] = useState<FilterState>({
    gender: [],
    occasion: [],
    season: [],
  });

  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);

  // Restore scroll or scroll to top on mount when data is ready
  useEffect(() => {
    if (!loading) {
      setPageReady();
      const savedY = getScrollPosition(window.location.pathname);
      if (savedY > 0) {
        window.scrollTo(0, savedY);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [loading, setPageReady, getScrollPosition]);

  // Filter & Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by Main Category (Nav Bar)
    if (activeCategory !== 'All') {
      if (activeCategory === 'New Arrivals') {
        result = result.slice(0, 5);
      } else {
        result = result.filter(p => {
          const collections = p.collections?.edges.map(e => e.node.title) || [];
          return collections.includes(activeCategory);
        });
      }
    }

    // 2. Filter by Sidebar
    if (filters.gender.length > 0) {
      result = result.filter(p => {
        const text = p.description.toLowerCase();
        return filters.gender.some(g => text.includes(g.toLowerCase()));
      });
    }

    if (filters.occasion.length > 0) {
      result = result.filter(p => {
        const text = p.description.toLowerCase();
        return filters.occasion.some(o => text.includes(o.split(' ')[0].toLowerCase()));
      });
    }

    if (filters.season.length > 0) {
      result = result.filter(p => {
        const text = p.description.toLowerCase();
        return filters.season.some(s => text.includes(s.toLowerCase()));
      });
    }

    // 3. Sort
    result.sort((a, b) => {
      const priceA = parseFloat(a.priceRange?.minVariantPrice.amount || '0');
      const priceB = parseFloat(b.priceRange?.minVariantPrice.amount || '0');
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      switch (currentSort) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'alpha-asc': return titleA.localeCompare(titleB);
        case 'newest': 
          // Products are already sorted by newest from the database hook
          return 0;
        case 'featured':
        default:
          return 0;
      }
    });

    return result;
  }, [products, activeCategory, filters, currentSort]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-24">
        <span className="text-[#E8D3A2] tracking-widest uppercase text-sm animate-pulse">Loading Collection...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-24">
        <p className="text-white text-lg">Failed to load collection.</p>
      </div>
    );
  }

  // Branch off for mobile view, completely separate
  if (!isDesktop) {
    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <MobileProductsView products={products} />
      </motion.div>
    );
  }

  // DESKTOP VIEW
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#0a0a0a] min-h-screen text-white relative z-10"
    >
      <ProductsHero />
      <ProductsFilterBar activeCategory={activeCategory} onSelect={setActiveCategory} />

      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        <ProductsSidebar filters={filters} setFilters={setFilters} />

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <span className="text-white/60 text-xs tracking-widest uppercase tabular-nums">
              {processedProducts.length} Results
            </span>

            <div className="flex items-center gap-6">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/80'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('editorial')}
                  className={`p-1.5 rounded-full transition-colors ${viewMode === 'editorial' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/80'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                  </svg>
                </button>
              </div>

              <ProductsSorting currentSort={currentSort} onSortChange={setCurrentSort} />
            </div>
          </div>

          <div className="w-full">
            {viewMode === 'grid' ? (
              <ProductsGrid products={processedProducts} onQuickView={setQuickViewProduct} />
            ) : (
              <ProductsEditorial products={processedProducts} onQuickView={setQuickViewProduct} />
            )}
          </div>
        </div>
      </div>

      {/* Cinematic End CTA */}
      <section className="w-full py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,211,162,0.03),transparent_60%)]" />
        <h2 className="text-white text-3xl lg:text-5xl font-light tracking-widest uppercase mb-8 relative z-10">
          Still searching for your signature scent?
        </h2>
        <button className="relative group overflow-hidden border border-[#E8D3A2] text-black bg-[#E8D3A2] px-12 py-4 tracking-[0.2em] uppercase text-xs font-semibold hover:bg-white hover:text-black transition-colors duration-500 rounded-sm z-10">
          <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
          <span className="relative z-10">Discover Your Fragrance</span>
        </button>
      </section>

      <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </motion.div>
  );
}
