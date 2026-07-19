import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '../../contexts/CartContext';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';

export function CartDrawer() {
  const { isOpen, closeCart, items } = useCartContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-black/40"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            layoutId="cart-drawer-bg"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] z-[120] bg-[#0a0a0a]/80 backdrop-blur-3xl border-l border-white/5 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-white text-lg tracking-[0.2em] uppercase font-light">
                Shopping Cart
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
              {items.length === 0 ? (
                <EmptyCart />
              ) : (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                    }
                  }}
                  className="p-6 flex flex-col gap-4"
                >
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && <CartSummary />}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
