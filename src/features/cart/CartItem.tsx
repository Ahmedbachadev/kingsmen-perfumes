import { motion } from 'framer-motion';
import { useCartContext } from '../../contexts/CartContext';
import type { CartItemType } from '../../contexts/CartContext';
import { QuantitySelector } from './QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCartContext();

  const price = item.priceRange?.minVariantPrice.amount || '0.00';
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
      className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:bg-white/[0.04] transition-colors relative"
    >
      {/* Bottle Image */}
      <div className="w-20 h-24 flex-shrink-0 bg-white/5 rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E8D3A2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img 
          src={item.featuredImage?.url || ''} 
          alt={item.title} 
          className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] scale-110 group-hover:scale-[1.2] transition-transform duration-700"
        />
      </div>

      {/* Info & Controls */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-white text-sm font-light tracking-widest uppercase mb-1">
              {item.title}
            </h4>
            <p className="text-white/40 text-xs font-light">100 ML</p>
          </div>
          
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-white/20 hover:text-red-400/80 transition-colors p-1 -mr-1 -mt-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <QuantitySelector 
            quantity={item.quantity} 
            onUpdate={(qty) => updateQuantity(item.id, qty)} 
          />
          <div className="text-right">
            <span className="text-[#E8D3A2] text-sm tracking-wider tabular-nums">
              ${(parseFloat(price) * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
