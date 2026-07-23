import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import { MobileLadiesContent } from './MobileLadiesContent';

gsap.registerPlugin(ScrollTrigger);

export const MobileLadiesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 50%',
      onEnter: () => {
        setAnimationComplete(true);
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div id="ladies-mobile" ref={containerRef} className="relative w-full h-[100dvh] bg-[#0a0a0a] lg:hidden overflow-hidden flex flex-col">
      {/* FULL SCREEN IMAGE */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/sequences/ladies/mobile/ChatGPT Image Jul 23, 2026, 01_20_56 AM.png"
          alt="Ladies Collection"
          className="w-full h-full block object-cover object-left" 
        />
        
        {/* Subtle gradient on the right side to ensure text legibility */}
        <div className="absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* CONTENT OVERLAY */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {animationComplete && <MobileLadiesContent />}
        </AnimatePresence>
      </div>
    </div>
  );
};
