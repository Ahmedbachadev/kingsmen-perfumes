import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useProducts } from '../../hooks/useProducts';
import { useCMSContext } from '../../contexts/CMSContext';

import { useCartContext } from '../../contexts/CartContext';

// Generates simple floating particles
const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#E8D3A2]/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: ['0%', '-50%', '-100%'],
            x: ['0%', '10%', '-10%', '0%'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export const SignatureCollection = () => {
  const { config } = useCMSContext();
  const { products: allProducts } = useProducts();
  const { addToCart } = useCartContext();
  const products = allProducts.filter((p: any) => p.isFeatured);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products.length > 0 ? products[activeIndex] : null;

  return (
    <section id="collections" className="relative w-full h-[100vh] bg-[#0a0a0a] flex items-center overflow-hidden z-20 font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Ambient Lighting */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#E8D3A2]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-[#E8D3A2]/5 rounded-full blur-[150px]" />

        {/* Subtle Smoke Effect (CSS gradient moving) */}
        <motion.div
          className="absolute inset-0 opacity-20 mix-blend-screen"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
            willChange: 'transform',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: ['0%', '2%', '-2%', '0%'],
            y: ['0%', '-2%', '2%', '0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Particles />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 lg:px-24 h-full flex flex-col lg:flex-row items-center justify-between">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center pr-0 lg:pr-16 pt-24 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-16"
          >
            <span className="text-[#E8D3A2] tracking-[0.3em] text-[10px] uppercase font-semibold block mb-4">
              Premium Lineup
            </span>
            <h2 className="text-white text-4xl lg:text-5xl font-light tracking-widest uppercase mb-6 whitespace-pre-line">
              {config.collections.signature.title}
            </h2>
            <p className="text-white/50 text-[15px] font-light leading-relaxed max-w-md whitespace-pre-line">
              {config.collections.signature.description}
            </p>
          </motion.div>

          {/* Liquid Glass Selectors */}
          <div className="flex flex-col gap-6 w-full max-w-md">
            {products.map((product, idx) => {
              const isActive = activeIndex === idx;
              return (
                <motion.button
                  key={product.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-full text-left rounded-xl p-6 transition-all duration-700 ease-out overflow-hidden group
                    ${isActive ? 'bg-white/[0.04]' : 'bg-white/[0.01] hover:bg-white/[0.02]'}
                  `}
                  style={{
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    willChange: 'transform',
                    border: isActive ? '1px solid rgba(232, 211, 162, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: isActive ? '0 10px 40px -10px rgba(232, 211, 162, 0.1)' : '0 4px 20px -10px rgba(0,0,0,0.5)',
                  }}
                  whileHover={{ y: -2 }}
                  layout
                >
                  {/* Subtle internal reflection */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${isActive ? 'translate-x-full opacity-0' : ''}`} />

                  {/* Golden glow for active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-r from-[#E8D3A2]/10 to-transparent opacity-50"
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-light tracking-widest uppercase transition-colors duration-500 ${isActive ? 'text-[#E8D3A2]' : 'text-white/70 group-hover:text-white/90'}`}>
                        {product.title}
                      </h3>
                      <p className={`text-sm font-light mt-1 transition-colors duration-500 ${isActive ? 'text-white/80' : 'text-white/40'}`}>
                        The essence of elegance.
                      </p>
                    </div>
                    {/* Minimal indicator */}
                    <div className="w-8 flex items-center justify-end">
                      <div className={`h-[1px] transition-all duration-500 ${isActive ? 'w-full bg-[#E8D3A2]' : 'w-0 bg-transparent'}`} />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {activeProduct && (
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Product Bottle */}
                <Link to={`/products/${activeProduct.handle}`} className="relative w-[55%] aspect-[9/16] max-w-[550px] flex items-center justify-center cursor-pointer group">
                  <motion.img
                    layoutId={`bottle-${activeProduct.handle}`}
                    src={activeProduct.featuredImage?.url || undefined}
                    alt={activeProduct.title}
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] scale-110 group-hover:scale-[1.15] transition-transform duration-700"
                  />

                  {/* Backlight behind bottle */}
                  <div className="absolute inset-0 bg-[#E8D3A2]/10 blur-[80px] rounded-full -z-10 transform scale-75 group-hover:scale-90 transition-transform duration-700" />
                </Link>

                {/* Product Info Beside/Beneath Bottle */}
                <div className="absolute bottom-24 lg:bottom-auto lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[45%] text-center lg:text-left px-8 lg:px-0">
                  <h3 className="text-4xl lg:text-6xl font-light text-white tracking-widest uppercase mb-4">
                    {activeProduct.title}
                  </h3>
                  <p className="text-[#E8D3A2] text-base lg:text-lg tracking-[0.2em] uppercase mb-6">
                    The essence of elegance.
                  </p>
                  <p className="text-white/60 text-base lg:text-lg font-light leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                    {activeProduct.shortDescription || activeProduct.description}
                  </p>

                  <div className="flex items-center justify-center lg:justify-start gap-10 border-t border-white/10 pt-8 mb-8">
                    <div>
                      <span className="block text-white/40 text-xs uppercase tracking-widest mb-2">Volume</span>
                      <span className="text-white/90 text-base font-light">100 ML</span>
                    </div>
                    <div>
                      <span className="block text-white/40 text-xs uppercase tracking-widest mb-2">Key Notes</span>
                      <span className="text-white/90 text-base font-light">Premium Notes</span>
                    </div>
                  </div>

                  <div className="flex justify-center lg:justify-start gap-4">
                    <button
                      onClick={() => addToCart(activeProduct)}
                      className="inline-flex items-center justify-center bg-[#E8D3A2] text-black px-8 py-3 tracking-[0.2em] uppercase text-xs font-medium hover:bg-white transition-colors duration-500"
                    >
                      Add to Bag
                    </button>
                    <Link
                      to={`/products/${activeProduct.handle}`}
                      className="inline-flex items-center justify-center border border-[#E8D3A2]/30 text-[#E8D3A2] px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#E8D3A2]/10 transition-colors duration-500"
                    >
                      Explore Full Story
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
