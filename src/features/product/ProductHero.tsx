import { motion } from 'framer-motion';
import type { ShopifyProduct } from '../../services/shopify/types';
import { useCartContext } from '../../contexts/CartContext';
import { useTransition } from '../transitions';

interface ProductHeroProps {
  product: ShopifyProduct;
}

export const ProductHero = ({ product }: ProductHeroProps) => {
  const { addToCart } = useCartContext();
  const navigate = useTransition();

  return (
    <section className="relative w-full h-[100vh] min-h-[800px] flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-24">
      {/* Ambient Backlight */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[60vw] h-[60vw] bg-[#E8D3A2]/5 rounded-full blur-[150px]" />
      </div>

      {/* Back Button */}
      <button 
        onClick={() => navigate('/products', 'morph')}
        className="absolute top-24 left-8 lg:left-24 z-50 flex items-center gap-2 text-white/50 hover:text-white transition-colors group tracking-[0.2em] uppercase text-[10px]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="group-hover:-translate-x-1 transition-transform">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Collection
      </button>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 lg:px-24 flex flex-col items-center justify-center h-full">
        {/* Title & Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="text-center mb-8"
        >
          <span className="text-[#E8D3A2] tracking-[0.4em] text-xs uppercase font-semibold block mb-4">
            Signature Collection
          </span>
          <h1 className="text-white text-5xl lg:text-7xl font-light tracking-widest uppercase mb-4">
            {product.title}
          </h1>
          <p className="text-white/60 text-lg tracking-[0.2em] uppercase">
            The essence of elegance.
          </p>
        </motion.div>

        {/* Centered Bottle */}
        <div className="relative w-full max-w-[400px] aspect-[9/16] flex items-center justify-center my-8">
          <motion.img
            layoutId={`bottle-${product.handle}`}
            src={product.featuredImage?.url || ''}
            alt={product.title}
            className="w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-20 scale-110"
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          />
        </div>

        {/* Price & Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
          className="flex flex-col items-center mt-8 z-30"
        >
          <p className="text-white text-2xl font-light tracking-wider mb-6">
            ${product.priceRange?.minVariantPrice?.amount || '250.00'}
          </p>
          <button 
            onClick={() => addToCart(product)}
            className="relative overflow-hidden group bg-white text-black px-12 py-4 rounded-sm tracking-[0.2em] uppercase text-xs font-semibold hover:text-white transition-colors duration-500"
          >
            <span className="relative z-10">Add to Cart</span>
            <div className="absolute inset-0 bg-[#E8D3A2] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[0.25,1,0.5,1] z-0" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};
