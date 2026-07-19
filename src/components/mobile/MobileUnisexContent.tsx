import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../shared/GlassButton';
import { MobileProductCarousel } from './MobileProductCarousel';

export const MobileUnisexContent: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Premium Framer Motion easing
      },
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end text-center px-4 sm:px-12 pb-8 z-30 pointer-events-auto"
    >
      <motion.p
        variants={itemVariants}
        className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#EBD5B3] font-light mb-4"
      >
        UNISEX COLLECTION
      </motion.p>
      
      <motion.h2
        variants={itemVariants}
        className="text-[26px] sm:text-3xl font-serif text-[#FDFBF7] leading-[1.15] tracking-tight mb-4"
      >
        Crafted<br />
        For Every Presence.
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-[#A3A3A3] font-sans text-[11px] sm:text-xs leading-relaxed font-light mb-6 max-w-[220px]"
      >
        A timeless collection designed for individuals who value elegance, confidence and individuality.
      </motion.p>

      <motion.div variants={itemVariants} className="w-[100vw] sm:w-[90vw] -mx-4 sm:-mx-12 mb-6">
        <MobileProductCarousel />
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlassButton className="py-2.5 px-6 sm:px-8 sm:py-3 shadow-2xl">
          Explore Collection
        </GlassButton>
      </motion.div>
    </motion.div>
  );
};
