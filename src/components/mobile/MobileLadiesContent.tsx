import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../shared/GlassButton';
import { useCMSContext } from '../../contexts/CMSContext';

export const MobileLadiesContent: React.FC = () => {
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
        ease: "easeOut" as any as any, // Premium Framer Motion easing
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-y-0 right-0 w-1/2 flex flex-col justify-center pl-1 pr-6 sm:pr-8 z-30 pointer-events-auto"
    >
      <motion.p
        variants={itemVariants}
        className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#EBD5B3] font-light mb-3 sm:mb-4"
      >
        Ladies Collection
      </motion.p>
      
      <motion.h2
        variants={itemVariants}
        className="text-[22px] sm:text-3xl font-serif text-[#FDFBF7] leading-[1.1] tracking-tight mb-4 sm:mb-5 whitespace-pre-line"
      >
        {config.collections.ladies.title}
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-[#A3A3A3] font-sans text-[10px] sm:text-[11px] leading-relaxed font-light mb-6 sm:mb-8 max-w-[170px] sm:max-w-[200px] whitespace-pre-line"
      >
        {config.collections.ladies.description}
      </motion.p>

      <motion.div variants={itemVariants}>
        <GlassButton className="py-2.5 px-4 sm:px-6 sm:py-3 w-fit shadow-2xl">
          Explore Collection
        </GlassButton>
      </motion.div>
    </motion.div>
  );
};
