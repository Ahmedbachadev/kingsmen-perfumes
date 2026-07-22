import React from 'react';
import { motion } from 'framer-motion';

interface MobileNavItemProps {
  label: string;
  onClick: (e: React.MouseEvent) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: "easeOut" as any as any } 
  },
  exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.4, ease: 'easeOut' } }
};

export const MobileNavItem: React.FC<MobileNavItemProps> = ({ label, onClick }) => {
  return (
    <motion.div variants={itemVariants} className="w-full flex justify-center">
      <motion.a
        href={`#${label.toLowerCase()}`}
        onClick={onClick}
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        className="group relative flex flex-col items-center justify-center py-4 px-8 cursor-pointer overflow-hidden rounded-2xl"
      >
        <span className="relative z-10 font-sans text-lg tracking-[0.2em] uppercase text-[#A3A3A3] group-hover:text-[#FDFBF7] group-active:text-[#E8D3A2] transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          {label}
        </span>
        
        {/* Soft highlight behind text on hover/tap */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8D3A2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          variants={{
            hover: { opacity: 1, scale: 1.05 }
          }}
        />
      </motion.a>
    </motion.div>
  );
};
