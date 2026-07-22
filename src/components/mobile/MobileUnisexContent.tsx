import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../shared/GlassButton';
<<<<<<< HEAD
import { MobileProductCarousel } from './MobileProductCarousel';
import { useCMSContext } from '../../contexts/CMSContext';
=======
>>>>>>> 3fef0dc (production ready version with admin panel)

export const MobileUnisexContent: React.FC = () => {
  const { config } = useCMSContext();
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
        ease: 'easeOut' as any, // Premium Framer Motion easing
      },
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      transition: { duration: 0.4, ease: 'easeOut' as any }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-x-0 top-[12dvh] flex flex-col items-center justify-start text-center px-8 sm:px-12 z-30 pointer-events-auto"
    >
      <motion.p
        variants={itemVariants}
        className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#EBD5B3] font-light mb-4"
      >
        UNISEX COLLECTION
      </motion.p>
      
      <motion.h2
        variants={itemVariants}
        className="text-[26px] sm:text-3xl font-serif text-[#FDFBF7] leading-[1.15] tracking-tight mb-4 whitespace-pre-line"
      >
<<<<<<< HEAD
        {config.collections.unisex.title}
=======
        Crafted For<br />
        Every Presence.
>>>>>>> 3fef0dc (production ready version with admin panel)
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-[#A3A3A3] font-sans text-[11px] sm:text-xs leading-relaxed font-light mb-6 max-w-[220px] whitespace-pre-line"
      >
        {config.collections.unisex.description}
      </motion.p>

      <motion.div variants={itemVariants} className="mt-4">
        <GlassButton className="py-2.5 px-6 sm:px-8 sm:py-3 shadow-2xl">
          Explore Collection
        </GlassButton>
      </motion.div>
    </motion.div>
  );
};
