import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useProducts } from '../../hooks/useProducts';
import { useCMSContext } from '../../contexts/CMSContext';

gsap.registerPlugin(ScrollTrigger);

export const SignatureCollectionMobile = () => {
  const { config } = useCMSContext();
  const { products, loading } = useProducts();
  const [showAll, setShowAll] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const displayedProducts = showAll ? products : products.slice(0, 8);

  useEffect(() => {
    if (!headerRef.current) return;

    // Header entrance animation
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.trigger === headerRef.current && st.kill());
    };
  }, []);

  if (loading && products.length === 0) {
    return (
      <section className="w-full min-h-[50vh] bg-[#0a0a0a] flex items-center justify-center lg:hidden">
        <div className="w-8 h-8 border-2 border-[#E8D3A2]/20 border-t-[#E8D3A2] rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative w-full bg-[#0a0a0a] z-20 font-sans pb-24 lg:hidden">
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-[#E8D3A2]/5 rounded-full blur-[100px]" />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="relative z-10 text-center px-6 pt-32 pb-16">
        <p className="text-[#E8D3A2] tracking-[0.3em] text-[10px] uppercase font-semibold mb-5 opacity-90">
          Signature Collection
        </p>
        <h2 className="text-white text-3xl font-light tracking-tight mb-5 leading-snug whitespace-pre-line">
          {config.collections.signature.title}
        </h2>
        <p className="text-white/60 text-[14px] font-light leading-relaxed max-w-[280px] mx-auto whitespace-pre-line">
          {config.collections.signature.description}
        </p>
      </div>

      {/* Product Grid */}
      <div className="relative z-10 px-4">
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence>
            {displayedProducts.map((product, index) => {
              // Calculate a staggered delay based on the index within its batch
              // If it's in the initial 8, index % 8. If in the next batch, index % remaining.
              // A simple index % 4 gives a nice rolling stagger across rows.
              const delay = (index % 4) * 0.1;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/products/${product.handle}`} className="block h-full">
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="relative flex flex-col h-full rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-[#E8D3A2]/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden group"
                    >
                      {/* Subtle reflection & hover state */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      {/* Bottle Image Container */}
                      <div className="relative w-full pt-[110%] bg-gradient-to-b from-white/[0.02] to-transparent flex items-center justify-center p-4">
                        {product.featuredImage?.url && (
                          <img
                            src={product.featuredImage.url}
                            alt={product.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-contain p-5 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transform transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>

                      {/* Content Container */}
                      <div className="p-4 pt-5 flex flex-col flex-grow text-center items-center">
                        <h3 className="text-white/95 text-[15px] font-medium tracking-wide mb-1 leading-snug line-clamp-1 w-full">
                          {product.title}
                        </h3>
                        
                        <span className="text-[#E8D3A2] text-[9px] uppercase tracking-[0.2em] mb-4 line-clamp-1 w-full">
                          {product.vendor || 'Kingsmen'}
                        </span>
                        
                        <span className="text-white/80 text-[14px] font-light mb-5 tracking-widest">
                          ${Number(product.priceRange?.minVariantPrice?.amount || 0).toFixed(0)}
                        </span>
                        
                        <div className="mt-auto w-full">
                          <button className="w-full py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white/90 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-white/10 hover:border-[#E8D3A2]/50 transition-all duration-300">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Explore More Button */}
        {!showAll && products.length > 8 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-14 flex justify-center"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="px-12 py-4 rounded-full bg-white/[0.03] backdrop-blur-lg border border-[#E8D3A2]/30 text-[#E8D3A2] text-xs uppercase tracking-[0.2em] font-medium shadow-[0_0_20px_rgba(232,211,162,0.05)] hover:bg-[#E8D3A2]/10 transition-colors duration-300"
            >
              Explore More
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
