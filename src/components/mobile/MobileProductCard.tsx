import React from 'react';
import { motion } from 'framer-motion';
import type { ShopifyProduct } from '../../services/shopify/types';
import { useTransition } from '../../features/transitions';

interface MobileProductCardProps {
  product: ShopifyProduct;
  index: number;
}

export const MobileProductCard: React.FC<MobileProductCardProps> = ({ product, index }) => {
  const navigate = useTransition();

  const handleNavigate = () => {
    navigate(`/products/${product.handle}`, 'morph');
  };

  const image = (product as any).images?.edges[0]?.node?.url || '';
  const collectionName = (product as any).collections?.edges[0]?.node?.title || 'Signature';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut" as any as any,
        delay: (index % 4) * 0.1 // Stagger row by row roughly
      }}
      className="group relative flex flex-col items-center bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-[rgba(235,213,179,0.15)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden"
    >
      {/* Light sweep hover effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Area */}
      <div 
        className="w-full aspect-[4/5] relative p-4 flex items-center justify-center cursor-pointer"
        onClick={handleNavigate}
      >
        <motion.div layoutId={`product-image-${product.id}`} className="w-full h-full relative">
          {image ? (
            <img 
              src={image} 
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#A3A3A3] text-xs">No Image</div>
          )}
        </motion.div>
      </div>

      {/* Details Area */}
      <div className="w-full flex flex-col items-center p-4 pt-2 pb-5 border-t border-[rgba(235,213,179,0.05)] bg-[rgba(10,10,12,0.4)]">
        <span className="text-[#E8D3A2] text-[9px] tracking-[0.25em] uppercase mb-2 font-medium">
          {collectionName}
        </span>
        
        <h3 className="font-serif text-[#FDFBF7] text-sm text-center mb-1 line-clamp-1 tracking-wide">
          {product.title}
        </h3>
        
        <p className="text-[#A3A3A3] text-xs font-light tracking-widest mb-4">
          ${parseFloat(product.priceRange?.minVariantPrice.amount || '0').toFixed(0)}
        </p>

        <button 
          onClick={handleNavigate}
          className="w-full py-2.5 rounded-full border border-[rgba(235,213,179,0.3)] bg-white/5 text-[#FDFBF7] text-[10px] tracking-widest uppercase font-medium active:bg-[#E8D3A2] active:text-black transition-colors"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};
