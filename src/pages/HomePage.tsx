import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroSection } from '../features/hero/HeroSection';
import { AboutSequence } from '../sections/About/AboutSequence';
import { SignatureCollection } from '../sections/SignatureCollection/SignatureCollection';
import { SignatureCollectionMobile } from '../sections/SignatureCollection/SignatureCollectionMobile';
import { KingsmenDifference } from '../sections/KingsmenDifference/KingsmenDifference';
import { GentlemenSequence } from '../sections/Collections/GentlemenSequence';
import { MobileGentlemenSection } from '../components/mobile/MobileGentlemenSection';
import { LadiesSequence } from '../sections/Collections/LadiesSequence';
import { MobileLadiesSection } from '../components/mobile/MobileLadiesSection';
import { UnisexSequence } from '../sections/Collections/UnisexSequence';
import { MobileUnisexSection } from '../components/mobile/MobileUnisexSection';
import { FAQSection } from '../sections/FAQ/FAQSection';
import { NewsletterSection } from '../sections/Newsletter/NewsletterSection';
import { useTransitionStore } from '../features/transitions';
import { GlobalLoader } from '../components/GlobalLoader/GlobalLoader';
import { AboutMobile } from '../features/about/AboutMobile';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useCMSContext } from '../contexts/CMSContext';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { setPageReady } = useTransitionStore();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { config } = useCMSContext();

  useEffect(() => {
    setPageReady();
    // Initialize Lenis with custom settings
    const lenis = new Lenis({
      autoRaf: false, // Handle raf via GSAP ticker for perfect sync
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once GlobalLoader unlocks page after 4s
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 4200);

    // Custom power3 easing curve for a flat, uniform speed distribution
    const slowCubicEase = (t: number) => 1 - Math.pow(1 - t, 3);

    // --- DYNAMIC SNAP LOGIC ---
    let isAutoScrolling = false;

    const handleScroll = (e: any) => {
      if (isAutoScrolling) return;

      const currentScroll = e.scroll;
      const threshold = 35; // Reliable pixel buffer window

      if (window.innerWidth < 1024) {
        // Disable GSAP dynamic snapping on mobile, let the individual components 
        // (MobileGentlemenSection, etc.) handle their own ScrollTriggers for natural flow
        return;
      }

      // --- DESKTOP DYNAMIC SNAP ---
      const productDetailsTarget = window.innerHeight * 5; // 500vh (Frames stop, details overlay visible)

      // Target elements for dynamic height calculation
      const aboutContainer = document.getElementById('about');
      const gentlemenContainer = document.getElementById('gentlemen');
      const ladiesContainer = document.getElementById('ladies');
      const unisexContainer = document.getElementById('unisex');

      if (!aboutContainer || !gentlemenContainer || !ladiesContainer || !unisexContainer) return;

      // Calculate dynamic targets
      const aboutSectionEndTarget = aboutContainer.offsetTop + aboutContainer.offsetHeight - window.innerHeight;
      const gentlemenStartTarget = gentlemenContainer.offsetTop;
      const gentlemenSectionEndTarget = gentlemenContainer.offsetTop + gentlemenContainer.offsetHeight - window.innerHeight;
      const ladiesStartTarget = ladiesContainer.offsetTop;
      const ladiesSectionEndTarget = ladiesContainer.offsetTop + ladiesContainer.offsetHeight - window.innerHeight;
      const unisexStartTarget = unisexContainer.offsetTop;
      const unisexSectionEndTarget = unisexContainer.offsetTop + unisexContainer.offsetHeight - window.innerHeight;

      // ==========================================
      // 1. SCROLLING DOWN (Direction: 1)
      // ==========================================

      // A. From Hero Top (0) -> Snap to Product Details (500vh)
      if (currentScroll < threshold && e.direction === 1) {
        isAutoScrolling = true;

        lenis.scrollTo(productDetailsTarget, {
          duration: 6.0, // Majestic, slow introduction
          easing: slowCubicEase,
          lock: true, // Lock manual scroll input during transition
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      // B. From Product Details (500vh) -> Snap to the last frame of the About Section
      else if (Math.abs(currentScroll - productDetailsTarget) < threshold && e.direction === 1) {
        isAutoScrolling = true;

        lenis.scrollTo(aboutSectionEndTarget, {
          duration: 6.0, // Generous 12-second slow crawl to scrub the about frames beautifully
          easing: slowCubicEase,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      // C. Entering Gentlemen Sequence -> Automatically lock and scrub down to the last frame
      else if (Math.abs(currentScroll - gentlemenStartTarget) < threshold && e.direction === 1) {
        isAutoScrolling = true;

        lenis.scrollTo(gentlemenSectionEndTarget, {
          duration: 6.0, // Slow, elegant cinematic crawl
          easing: slowCubicEase,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      // D. Entering Ladies Sequence -> Automatically lock and scrub down to the last frame
      else if (Math.abs(currentScroll - ladiesStartTarget) < threshold && e.direction === 1) {
        isAutoScrolling = true;

        lenis.scrollTo(ladiesSectionEndTarget, {
          duration: 6.0,
          easing: slowCubicEase,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      // E. Entering Unisex Sequence -> Automatically lock and scrub down to the last frame
      else if (Math.abs(currentScroll - unisexStartTarget) < threshold && e.direction === 1) {
        isAutoScrolling = true;

        lenis.scrollTo(unisexSectionEndTarget, {
          duration: 6.0,
          easing: slowCubicEase,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      // ==========================================
      // 2. SCROLLING UP (Direction: -1)
      // ==========================================

      // A. Leaving Unisex Sequence upwards -> Snap back to the top frame of Unisex Sequence
      else if (Math.abs(currentScroll - unisexSectionEndTarget) < threshold && e.direction === -1) {
        isAutoScrolling = true;

        lenis.scrollTo(unisexStartTarget, {
          duration: 6.0,
          easing: slowCubicEase,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      // B. Leaving Ladies Sequence upwards -> Snap back to the top frame of Ladies Sequence
      else if (Math.abs(currentScroll - ladiesSectionEndTarget) < threshold && e.direction === -1) {
        isAutoScrolling = true;

        lenis.scrollTo(ladiesStartTarget, {
          duration: 6.0,
          easing: slowCubicEase,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      // B. Leaving Gentlemen Sequence upwards -> Snap back to the top frame of Gentlemen Sequence
      else if (Math.abs(currentScroll - gentlemenSectionEndTarget) < threshold && e.direction === -1) {
        isAutoScrolling = true;

        lenis.scrollTo(gentlemenStartTarget, {
          duration: 6.0,
          easing: slowCubicEase,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      // B. From the End of the About Section -> Snap back up to Product Details (500vh)
      else if (Math.abs(currentScroll - aboutSectionEndTarget) < threshold && e.direction === -1) {
        isAutoScrolling = true;

        lenis.scrollTo(productDetailsTarget, {
          duration: 6.0, // Matches the slower scroll pace when heading back up
          easing: slowCubicEase,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      // C. From Product Details (500vh) -> Snap back up to Hero Top (0)
      else if (Math.abs(currentScroll - productDetailsTarget) < threshold && e.direction === -1) {
        isAutoScrolling = true;

        lenis.scrollTo(0, {
          duration: 6.0, // Matches the slower entrance timing when returning to Hero
          easing: slowCubicEase,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }
    };

    lenis.on('scroll', handleScroll);

    const handleCartToggle = (e: any) => {
      if (e.detail?.isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    window.addEventListener('cart-toggled', handleCartToggle);

    const handleLenisLock = () => {
      lenis.stop();
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    };
    const handleLenisUnlock = () => {
      lenis.start();
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
    const handleLenisScrollTo = (e: any) => {
      if (e.detail?.target !== undefined) {
        lenis.scrollTo(e.detail.target, { immediate: true });
      }
    };
    window.addEventListener('lenis-lock', handleLenisLock);
    window.addEventListener('lenis-unlock', handleLenisUnlock);
    window.addEventListener('lenis-scroll-to', handleLenisScrollTo);

    return () => {
      window.removeEventListener('cart-toggled', handleCartToggle);
      window.removeEventListener('lenis-lock', handleLenisLock);
      window.removeEventListener('lenis-unlock', handleLenisUnlock);
      window.removeEventListener('lenis-scroll-to', handleLenisScrollTo);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <>
      <div id="mobile-transition-overlay" className="fixed inset-0 bg-black z-[9999] pointer-events-none opacity-0 lg:hidden" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-100%', filter: 'blur(10px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {config.hero.isVisible && <HeroSection />}
        {isDesktop ? <AboutSequence /> : <AboutMobile />}
        {config.collections.signature.isVisible && (isDesktop ? <SignatureCollection /> : <SignatureCollectionMobile />)}
        <KingsmenDifference />
        {config.collections.gentlemen.isVisible && (isDesktop ? <GentlemenSequence /> : <MobileGentlemenSection />)}
        {config.collections.ladies.isVisible && (isDesktop ? <LadiesSequence /> : <MobileLadiesSection />)}
        {config.collections.unisex.isVisible && (isDesktop ? <UnisexSequence /> : <MobileUnisexSection />)}
        <FAQSection />
        <NewsletterSection />
      </motion.div>
      <GlobalLoader />
    </>
  );
}
