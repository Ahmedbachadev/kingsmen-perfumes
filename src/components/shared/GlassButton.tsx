import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GlassButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassButton = ({ children, className = '', onClick, ...props }: GlassButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative flex items-center justify-center gap-2 md:gap-3 px-5 py-3 md:px-8 md:py-4 rounded-full bg-white/[0.04] backdrop-blur-xl border border-[#CFA44F]/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 ease-out hover:bg-white/[0.1] hover:border-[#CFA44F]/60 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#CFA44F]/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <span className="relative z-10 text-[9px] md:text-sm tracking-[0.2em] md:tracking-widest font-light uppercase text-[#FDFBF7] drop-shadow-md">
        {children}
      </span>
      <svg className="relative z-10 w-3 h-3 md:w-4 md:h-4 text-[#FDFBF7] transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </motion.button>
  );
};
