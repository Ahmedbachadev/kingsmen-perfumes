import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import { MobileLadiesContent } from './MobileLadiesContent';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 110;
const FRAME_DIGITS = 6;
const FRAME_PREFIX = 'frame_';
const FRAME_EXTENSION = '.png';
const BASE_PATH = '/sequences/ladies/mobile/';

const getFramePath = (index: number) => {
  const paddedNumber = index.toString().padStart(FRAME_DIGITS, '0');
  return `${BASE_PATH}${FRAME_PREFIX}${paddedNumber}${FRAME_EXTENSION}`;
};

export const MobileLadiesSection: React.FC = () => {
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
      const offsetY = (ch - nh) / 2; 
      
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, nw, nh);
    };

    const handleResize = () => { 
      if (!canvas) return;
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight; 
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

  return (
    <div id="ladies-mobile" ref={containerRef} className="relative w-full h-[100dvh] bg-[#0a0a0a] lg:hidden overflow-hidden flex flex-col">
      {/* FULL SCREEN ANIMATION */}
      <div className="absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full block object-cover object-left" />
        
        {/* Subtle gradient on the right side to ensure text legibility */}
        <div className="absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* LOADING INDICATOR */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black">
          <div className="w-8 h-8 border-2 border-[#E8D3A2]/20 border-t-[#E8D3A2] rounded-full animate-spin mb-4" />
          <p className="text-[#E8D3A2]/50 text-[10px] tracking-[0.3em] uppercase">Loading</p>
        </div>
      )}

      {/* CONTENT OVERLAY */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {animationComplete && <MobileLadiesContent />}
        </AnimatePresence>
      </div>
    </div>
  );
};
