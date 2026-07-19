import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Lenis from 'lenis';
import { motion } from 'framer-motion';

import { useProduct } from '../hooks/useProduct';
import {
  ProductHero,
  ProductStory,
  FragranceNotes,
  OccasionSection,
  ProductGallery,
  ProductRecommendations
} from '../features/product';

import { useTransitionStore } from '../features/transitions';

export default function ProductPage() {
  const { handle } = useParams();
  const { product, loading, error } = useProduct(handle);
  const { setPageReady, getScrollPosition } = useTransitionStore();

  useEffect(() => {
    if (!loading) {
      setPageReady();
      const savedY = getScrollPosition(window.location.pathname);
      if (savedY > 0) {
        window.scrollTo(0, savedY);
      } else {
        window.scrollTo(0, 0);
      }
    }
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleCartToggle = (e: any) => {
      if (e.detail?.isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    window.addEventListener('cart-toggled', handleCartToggle);

    return () => {
      window.removeEventListener('cart-toggled', handleCartToggle);
      lenis.destroy();
    };
  }, [handle]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center">
        <span className="text-[#E8D3A2] tracking-widest uppercase text-sm animate-pulse">Loading...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0a0a0a] min-h-screen"
    >
      <ProductHero product={product} />
      <ProductStory product={product} />
      <FragranceNotes />
      <OccasionSection />
      <ProductGallery />
      <ProductRecommendations />
    </motion.div>
  );
}
