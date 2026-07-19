import { useLocation, useOutlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { MobileNavbar } from '../components/mobile/MobileNavbar';
import { FooterSection } from '../sections/Footer/FooterSection';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchProvider } from '../contexts/SearchContext';
import { CartProvider } from '../contexts/CartContext';
import { SearchOverlay } from '../features/search';
import { CartDrawer } from '../features/cart';
import { TransitionProvider, TransitionOverlay } from '../features/transitions';

export function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <TransitionProvider>
      <CartProvider>
        <SearchProvider>
          <div className="w-full bg-black min-h-screen relative">
            <TransitionOverlay />
            <Navbar />
            <MobileNavbar />
            <SearchOverlay />
            <CartDrawer />
            <AnimatePresence mode="wait">
              <motion.main key={location.pathname} className="w-full">
                {outlet}
              </motion.main>
            </AnimatePresence>
            <FooterSection />
          </div>
        </SearchProvider>
      </CartProvider>
    </TransitionProvider>
  );
}
