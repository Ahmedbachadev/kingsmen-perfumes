import { motion } from 'framer-motion';
import { useCartContext } from '../../contexts/CartContext';

export function CartSummary() {
  const { items, closeCart } = useCartContext();
  
  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.priceRange?.minVariantPrice.amount || '0');
    return total + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    // Placeholder for real checkout logic.
    // Close the cart right away.
    closeCart();
  };

  return (
    <div className="pt-6 border-t border-white/10 mt-auto bg-black/20 pb-8 px-6 backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <span className="text-white/60 uppercase tracking-widest text-xs">Subtotal</span>
        <span className="text-white text-xl tracking-wider tabular-nums font-light">
          ${subtotal.toFixed(2)}
        </span>
      </div>
      
      <p className="text-white/30 text-[10px] uppercase tracking-widest text-center mb-6">
        Shipping & taxes calculated at checkout
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCheckout}
        className="relative w-full overflow-hidden border border-[#E8D3A2]/50 text-[#0a0a0a] bg-[#E8D3A2] py-4 rounded-lg tracking-[0.2em] uppercase text-xs font-semibold group transition-colors duration-500 hover:bg-white"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        <span className="relative z-10">Proceed to Checkout</span>
      </motion.button>
    </div>
  );
}
