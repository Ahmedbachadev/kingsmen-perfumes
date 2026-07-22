import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Menu, ShoppingCart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext';
import { useTransition } from '../../features/transitions';
import { MobileMenuOverlay } from './MobileMenuOverlay';

export const MobileNavbar: React.FC = () => {
  const navigate = useTransition();
  const routeLocation = useLocation();
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openCart } = useCartContext();

  useEffect(() => {
    setTimeout(() => setIsInitialLoad(false), 1200);
  }, []);

  // Reuse existing scroll detection logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMenuOpen) return; // Don't hide navbar if menu is open, though menu covers screen
    const previous = scrollY.getPrevious() ?? 0;
    if (latest < 100) {
      setIsHidden(false);
    } else if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else if (latest < previous) {
      setIsHidden(false);
    }
  });

  const handleNavigate = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'products') {
      navigate('/products', 'slide');
      return;
    }

    if (routeLocation.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
      return;
    }

    // Since mobile uses different IDs for sections sometimes (e.g. gentlemen-mobile)
    // we need to handle that mapping. The original nav just uses the lowercase id.
    const element = document.getElementById(`${id}-mobile`) || document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cinematic scroll reactivity
  const bgOpacity = useTransform(scrollY, [0, 80], [0.15, 0.45]);
  const blur = useTransform(scrollY, [0, 80], [12, 24]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0.1, 0.4]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: isHidden ? 0 : 1, y: isHidden ? -100 : 0 }}
        transition={{ duration: isInitialLoad ? 1.2 : 0.4, ease: "easeOut" as any as any }}
        className="fixed top-4 left-4 right-4 h-[70px] z-[90] flex items-center justify-between px-6 rounded-full lg:hidden"
      >
        {/* Premium Liquid Glass Background */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[rgba(235,213,179,0.2)] overflow-hidden pointer-events-none"
          style={{
            backgroundColor: useTransform(bgOpacity, (v) => `rgba(10, 10, 12, ${v})`),
            backdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(150%)`),
            WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(150%)`),
            boxShadow: useTransform(shadowOpacity, (v) => `0 20px 40px rgba(0,0,0,${v}), inset 0 1px 0 rgba(255,255,255,0.05)`),
            willChange: 'transform, backdrop-filter'
          }}
        >
          {/* Soft internal reflection sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.03)] to-transparent pointer-events-none" />
        </motion.div>

        <div className="relative z-10 w-full flex items-center justify-between">
          
          {/* LEFT: Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-start text-[#A3A3A3] active:text-[#FDFBF7] transition-colors"
          >
            <Menu strokeWidth={1.5} className="w-6 h-6" />
          </button>

          {/* CENTER: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('hero');
              }}
              className="font-serif text-[#FDFBF7] text-xl tracking-[0.25em] uppercase active:text-[#EBD5B3] transition-colors duration-500 cursor-pointer"
            >
              Kingsmen
            </a>
          </div>

          {/* RIGHT: Cart Icon */}
          <button 
            onClick={openCart}
            className="w-10 h-10 flex items-center justify-end text-[#A3A3A3] active:text-[#FDFBF7] transition-colors"
          >
            <ShoppingCart strokeWidth={1.5} className="w-5 h-5" />
          </button>
          
        </div>
      </motion.nav>

      {/* Full Screen Menu Overlay */}
      <MobileMenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={handleNavigate}
      />
    </>
  );
};
