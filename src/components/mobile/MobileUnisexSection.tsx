import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import { MobileUnisexContent } from './MobileUnisexContent';

gsap.registerPlugin(ScrollTrigger);

export const MobileUnisexSection: React.FC = () => {
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
    <div id="unisex-mobile" ref={containerRef} className="relative w-full h-[100dvh] bg-[#0a0a0a] lg:hidden overflow-hidden flex flex-col">
      {/* FULL SCREEN IMAGE */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/sequences/unisex/mobile/ChatGPT Image Jul 23, 2026, 01_19_47 AM.png"
          alt="Unisex Collection"
          className="w-full h-full block object-cover object-center" 
        />
        
        {/* Subtle dark-to-warm gradient transition at the bottom to blend with next section */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#110e0c] via-[#110e0c]/50 to-transparent pointer-events-none opacity-80" />
      </div>

      {/* CONTENT OVERLAY */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {animationComplete && <MobileUnisexContent />}
        </AnimatePresence>
      </div>
    </div>
  );
};
