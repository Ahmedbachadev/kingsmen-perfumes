import { motion } from 'framer-motion';
import type { ShopifyProduct } from '../../services/shopify/types';

interface SearchItemProps {
  product: ShopifyProduct;
  isSelected: boolean;
  onClick: () => void;
}

export const SearchItem = ({ product, isSelected, onClick }: SearchItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
      }}
      onClick={onClick}
      className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors duration-300 ${
        isSelected ? 'bg-white/10' : 'hover:bg-white/[0.05]'
      }`}
    >
      <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mr-4 p-1">
        <img 
          src={product.featuredImage?.url || ''} 
          alt={product.title} 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-white text-sm font-medium tracking-wide">{product.title}</span>
        <span className="text-white/40 text-xs font-light tracking-wide line-clamp-1">{product.description}</span>
      </div>
    </motion.div>
  );
};
