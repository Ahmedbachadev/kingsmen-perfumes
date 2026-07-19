import { useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { useCMSContext } from '../contexts/CMSContext';
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
  const { config } = useCMSContext();
  const location = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    document.title = config.seo.homepageTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', config.seo.metaDescription);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', config.seo.keywords);

  }, [config.seo]);

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
