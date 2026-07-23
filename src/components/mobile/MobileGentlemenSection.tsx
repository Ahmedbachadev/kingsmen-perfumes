import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

import { GoldButton } from '../shared/GoldButton';

gsap.registerPlugin(ScrollTrigger);

export const MobileGentlemenSection: React.FC = () => {
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
      transition: { duration: 0.8, ease: "easeOut" as any }
    }
  };

  return (
    <div id="gentlemen-mobile" ref={containerRef} className="relative w-full h-[100dvh] bg-[#0a0a0a] lg:hidden overflow-hidden flex flex-col">
      {/* TOP 65% - IMAGE */}
      <div className="absolute top-0 left-0 w-full h-[65dvh]">
        <img 
          src="/sequences/gentlemen/mobile/ChatGPT Image Jul 23, 2026, 01_20_32 AM.png"
          alt="Gentlemen Collection"
          className="w-full h-full block object-cover" 
        />
        
        {/* Subtle gradient to blend the animation into the black background below */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* BOTTOM FLOATING UI */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end pb-8">
        <AnimatePresence>
          {animationComplete && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full flex flex-col items-start px-8"
            >
              <motion.div variants={itemVariants} className="w-full relative z-30 mb-8">
                <span className="text-[#E8D3A2] text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-semibold mb-3 md:mb-4 block opacity-90 text-left">
                  Gentlemen Collection
                </span>
                <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight mb-3 md:mb-4 leading-[1.15] text-left">
                  Confidence,<br />Bottled.
                </h2>
                <p className="text-white/60 text-[13px] md:text-[14px] font-light leading-relaxed text-left max-w-[280px]">
                  Crafted for men who lead with quiet confidence.<br />
                  Timeless fragrances inspired by elegance, ambition and character.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-2 md:mt-4 w-full flex justify-center">
                <GoldButton>Explore Gentlemen Collection</GoldButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
