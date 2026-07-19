import { motion } from 'framer-motion';
import { useCartContext } from '../../contexts/CartContext';

export function EmptyCart() {
  const { closeCart } = useCartContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center h-full text-center px-8"
    >
      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      </div>
      
      <h3 className="text-2xl font-light text-white tracking-widest uppercase mb-4">
        Your Cart is Empty
      </h3>
      
      <p className="text-white/40 font-light text-sm leading-relaxed max-w-[280px] mb-10">
        You haven't added any items yet. Discover our signature fragrances and elevate your presence.
      </p>

      <button
        onClick={() => {
          closeCart();
          document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="relative group overflow-hidden border border-[#E8D3A2]/30 text-[#E8D3A2] px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#E8D3A2]/10 transition-colors duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8D3A2]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        Explore Signature Collection
      </button>
    </motion.div>
  );
}
