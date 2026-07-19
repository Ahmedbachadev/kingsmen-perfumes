import { motion } from 'framer-motion';

interface QuantitySelectorProps {
  quantity: number;
  onUpdate: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onUpdate }: QuantitySelectorProps) {
  return (
    <div className="flex items-center bg-white/5 rounded-full border border-white/10 p-1 backdrop-blur-md">
      <motion.button
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onUpdate(quantity - 1)}
        className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </motion.button>
      
      <span className="w-8 text-center text-sm text-white/90 font-light select-none tabular-nums">
        {quantity}
      </span>
      
      <motion.button
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onUpdate(quantity + 1)}
        className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </motion.button>
    </div>
  );
}
