import { motion, AnimatePresence } from 'framer-motion';
import type { ShopifyProduct } from '../../services/shopify/types';
import { useCartContext } from '../../contexts/CartContext';
import { useTransition } from '../transitions';

interface ProductQuickViewProps {
  product: ShopifyProduct | null;
  onClose: () => void;
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addToCart } = useCartContext();
  const navigate = useTransition();

  if (!product) return null;

  const price = product.priceRange?.minVariantPrice.amount || '0.00';

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" onClick={onClose} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1000px] h-[80vh] min-h-[600px] bg-[#0a0a0a]/90 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-hidden rounded-xl"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Left: Image */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white/[0.02] flex items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8D3A2]/10 to-transparent opacity-50" />
            <motion.img 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              src={product.featuredImage?.url || undefined} 
              alt={product.title}
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full p-10 lg:p-16 flex flex-col overflow-y-auto custom-scrollbar relative">
            <span className="text-[#E8D3A2] text-[10px] tracking-[0.3em] uppercase mb-4 block">
              Signature Collection
            </span>
            <h2 className="text-white text-3xl lg:text-4xl tracking-widest font-light uppercase mb-6">
              {product.title}
            </h2>
            <p className="text-white text-xl tabular-nums tracking-wider font-light mb-8 block">
              ${price}
            </p>

            <div className="text-white/60 font-light text-sm leading-relaxed mb-10 space-y-4">
              <p>{product.description}</p>
            </div>

            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
              <button 
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#E8D3A2] transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => {
                  onClose();
                  navigate(`/products/${product.handle}`, 'morph');
                }}
                className="w-full bg-transparent border border-white/20 text-white py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-white/5 transition-colors duration-300"
              >
                Explore Full Story
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
