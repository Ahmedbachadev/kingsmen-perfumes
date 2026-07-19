import type { ShopifyProduct } from '../../services/shopify/types';
import { SearchItem } from './SearchItem';
import { motion } from 'framer-motion';

interface SearchResultsProps {
  results: ShopifyProduct[];
  selectedIndex: number;
  onSelect: (handle: string) => void;
}

export const SearchResults = ({ results, selectedIndex, onSelect }: SearchResultsProps) => {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={{
        visible: { transition: { staggerChildren: 0.05 } }
      }}
      className="p-4 flex flex-col gap-2"
    >
      <span className="text-white/30 text-[10px] uppercase tracking-widest px-2 mb-2 block">Products</span>
      {results.map((product, idx) => (
        <SearchItem
          key={product.id}
          product={product}
          isSelected={idx === selectedIndex}
          onClick={() => onSelect(product.handle)}
        />
      ))}
    </motion.div>
  );
};
