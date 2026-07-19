import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

import { MobileCollectionHeader } from './MobileCollectionHeader';
import { MobileProductCarousel } from './MobileProductCarousel';
import { GoldButton } from '../shared/GoldButton';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 129;
const FRAME_DIGITS = 6;
const FRAME_PREFIX = 'frame_';
const FRAME_EXTENSION = '.png';
const BASE_PATH = '/sequences/gentlemen/desktop/';

const getFramePath = (index: number) => {
  const paddedNumber = index.toString().padStart(FRAME_DIGITS, '0');
  return `${BASE_PATH}${FRAME_PREFIX}${paddedNumber}${FRAME_EXTENSION}`;
};

export const MobileGentlemenSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const hasPlayedRef = useRef(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => { loaded++; if (loaded === TOTAL_FRAMES) setIsLoaded(true); };
      img.onerror = () => { loaded++; if (loaded === TOTAL_FRAMES) setIsLoaded(true); };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const images = imagesRef.current;

    const render = (frameIndex: number) => {
      const img = images[Math.min(Math.round(frameIndex), TOTAL_FRAMES - 1)];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      
      const cw = canvas.width; 
      const ch = canvas.height;
      const iw = img.naturalWidth; 
      const ih = img.naturalHeight;
      
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale; 
      const nh = ih * scale;
      const offsetX = (cw - nw) / 2; 
      const offsetY = 0; 
      
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, nw, nh);
    };

    const handleResize = () => { 
      if (!canvas) return;
      canvas.width = canvas.offsetWidth; 
      canvas.height = canvas.offsetHeight; 
      render(hasPlayedRef.current ? TOTAL_FRAMES - 1 : 0); 
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const lockScroll = () => {
      window.dispatchEvent(new CustomEvent('lenis-lock'));
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    };

    const unlockScroll = () => {
      window.dispatchEvent(new CustomEvent('lenis-unlock'));
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };

    const snapToTop = () => {
      if (containerRef.current) {
        const top = containerRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'instant' });
      }
    };

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      onEnter: () => {
        if (!hasPlayedRef.current) {
          hasPlayedRef.current = true;
          
          lockScroll();
          snapToTop();

          const frameObj = { frame: 0 };
          gsap.to(frameObj, {
            frame: TOTAL_FRAMES - 1,
            duration: 2.8,
            ease: 'power2.inOut',
            onUpdate: () => render(frameObj.frame),
            onComplete: () => {
              unlockScroll();
              setAnimationComplete(true);
            }
          });
        }
      },
      onEnterBack: () => {
        if (hasPlayedRef.current) {
          lockScroll();
          snapToTop();
          
          setAnimationComplete(false); // hide UI immediately

          const frameObj = { frame: TOTAL_FRAMES - 1 };
          gsap.to(frameObj, {
            frame: 0,
            duration: 2.8,
            ease: 'power2.inOut',
            onUpdate: () => render(frameObj.frame),
            onComplete: () => {
              hasPlayedRef.current = false; // Reset so it can play forward again when scrolling down
              unlockScroll();
            }
          });
        }
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      st.kill();
      unlockScroll();
    };
  }, [isLoaded]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div id="gentlemen-mobile" ref={containerRef} className="relative w-full h-[100dvh] bg-[#0a0a0a] lg:hidden overflow-hidden flex flex-col">
      {/* TOP 65% - ANIMATION */}
      <div className="absolute top-0 left-0 w-full h-[65dvh]">
        <canvas ref={canvasRef} className="w-full h-full block object-cover" />
        
        {/* Subtle gradient to blend the animation into the black background below */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* LOADING INDICATOR */}
      {!isLoaded && (
        <div className="absolute top-[30dvh] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-30">
          <div className="w-8 h-8 border-2 border-[#E8D3A2]/20 border-t-[#E8D3A2] rounded-full animate-spin mb-4" />
          <p className="text-[#E8D3A2]/50 text-[10px] tracking-[0.3em] uppercase">Loading</p>
        </div>
      )}

      {/* BOTTOM FLOATING UI */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end pb-8">
        <AnimatePresence>
          {animationComplete && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full flex flex-col items-center"
            >
              <motion.div variants={itemVariants} className="w-full relative z-30 -mb-6 md:-mb-8">
                <MobileCollectionHeader />
              </motion.div>
              
              <motion.div variants={itemVariants} className="w-full relative z-20">
                <MobileProductCarousel />
              </motion.div>

              <motion.div variants={itemVariants} className="mt-2 md:mt-4">
                <GoldButton>Explore Gentlemen Collection</GoldButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
