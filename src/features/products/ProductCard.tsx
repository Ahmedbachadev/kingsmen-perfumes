import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ShopifyProduct } from '../../services/shopify/types';
import { useCartContext } from '../../contexts/CartContext';
import { useTransition } from '../transitions';

interface ProductCardProps {
  product: ShopifyProduct;
  onQuickView: (product: ShopifyProduct) => void;
  editorial?: boolean;
}

export function ProductCard({ product, onQuickView, editorial = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCartContext();
  const navigate = useTransition();

  const price = product.priceRange?.minVariantPrice.amount || '0.00';

  const handleNavigate = () => navigate(`/products/${product.handle}`, 'morph');

  if (editorial) {
    return (
      <div 
        className="w-full h-full flex flex-col group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNavigate}
      >
        <div className="relative w-full aspect-[3/4] bg-white/[0.02] overflow-hidden mb-6 flex items-center justify-center p-12" onClick={(e) => { e.stopPropagation(); onQuickView(product); }}>
          {/* Subtle Glow */}
          <div className={`absolute inset-0 bg-gradient-to-tr from-[#E8D3A2]/10 to-transparent transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          <motion.img 
            layoutId={`bottle-${product.handle}`}
            src={product.featuredImage?.url || undefined} 
            alt={product.title} 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            animate={{ y: isHovered ? -15 : 0, scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-[#E8D3A2] tracking-[0.2em] uppercase text-[10px] border-b border-[#E8D3A2]/30 pb-1">Quick View</span>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white text-xl lg:text-3xl font-light uppercase tracking-widest mb-2">
              {product.title}
            </h3>
            <p className="text-white/40 font-light text-sm max-w-xs leading-relaxed">
              {product.description.substring(0, 80)}...
            </p>
          </div>
          <span className="text-[#E8D3A2] text-lg tabular-nums tracking-wider">${price}</span>
        </div>
      </div>
    );
  }

  // Standard Grid View
  return (
    <div 
      className="relative w-full rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md p-6 lg:p-8 overflow-hidden group cursor-pointer transition-colors duration-700 hover:bg-white/[0.04]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigate}
    >
      {/* Background Hover Glow */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(232,211,162,0.05),transparent_70%)] transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Bottle Area */}
      <div className="relative w-full aspect-[4/5] flex items-center justify-center mb-6" onClick={(e) => { e.stopPropagation(); onQuickView(product); }}>
        <motion.img 
          layoutId={`bottle-${product.handle}`}
          src={product.featuredImage?.url || ''} 
          alt={product.title} 
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Quick View Button overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-500 z-20 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <span className="border border-white/20 text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors">
            Quick Preview
          </span>
        </div>
      </div>

      {/* Info Area */}
      <div className="text-center relative z-10 flex flex-col items-center">
        <span className="text-[#E8D3A2] text-[9px] uppercase tracking-[0.3em] mb-2 block">
          100 ML
        </span>
        <h3 className="text-white text-lg font-light tracking-widest uppercase mb-2 group-hover:text-[#E8D3A2] transition-colors duration-500">
          {product.title}
        </h3>
        <p className="text-white/40 text-xs font-light mb-6 px-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="w-full flex items-center justify-between mt-auto">
          <span className="text-white/80 tabular-nums tracking-wider text-sm">${price}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="text-[10px] text-black bg-white px-4 py-2 uppercase tracking-[0.2em] font-semibold hover:bg-[#E8D3A2] transition-colors duration-300 rounded-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
