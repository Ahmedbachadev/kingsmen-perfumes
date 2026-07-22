import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GoldButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  className?: string;
}

export const GoldButton = ({ children, className = '', ...props }: GoldButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative px-8 py-4 rounded-full bg-transparent border border-[#E8D3A2]/40 text-[#E8D3A2] text-xs uppercase tracking-[0.2em] font-medium shadow-[0_0_20px_rgba(232,211,162,0.05)] hover:bg-[#E8D3A2]/10 transition-colors duration-300 flex items-center justify-center gap-3 overflow-hidden group ${className}`}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full -skew-x-[20deg] translate-x-[-150%] bg-gradient-to-r from-transparent via-[rgba(232,211,162,0.1)] to-transparent group-hover:animate-[specular_1.5s_ease-in-out_infinite]" />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">→</span>
    </motion.button>
  );
};
