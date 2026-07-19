import { motion } from 'framer-motion';
import { GlassCard } from '../shared/GlassCard';

export const MobileCollectionCard = ({ product }: { product: any }) => {
  return (
    <GlassCard 
      className="w-[240px] md:w-[280px] h-full flex-shrink-0 p-4 md:p-5 flex flex-col group cursor-pointer"
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="w-full h-[180px] md:h-[220px] relative mb-4 bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl flex items-center justify-center overflow-hidden">
         {product.featuredImage?.url && (
           <img 
             src={product.featuredImage.url} 
             alt={product.title} 
             loading="lazy"
             className="w-full h-full object-contain p-4 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700" 
           />
         )}
      </div>
      <div className="flex flex-col flex-grow text-left">
        <h3 className="text-white/95 text-[16px] md:text-[18px] font-medium tracking-wide mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-[#E8D3A2] text-[10px] uppercase tracking-[0.2em] mb-3 line-clamp-1 opacity-90">The essence of elegance</p>
        
        <div className="mt-auto flex items-center justify-between pt-2">
           <span className="text-white/80 text-[14px] md:text-[15px] font-light tracking-widest">
             ${Number(product.priceRange?.minVariantPrice?.amount || 0).toFixed(0)}
           </span>
           <button className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-white/90 text-[10px] uppercase tracking-[0.2em] font-medium group-hover:bg-[#E8D3A2]/10 transition-colors">
             View
           </button>
        </div>
      </div>
    </GlassCard>
  );
};
