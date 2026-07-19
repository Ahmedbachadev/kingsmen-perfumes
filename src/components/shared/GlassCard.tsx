import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = '', ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={`rounded-[28px] md:rounded-[32px] bg-white/[0.02] backdrop-blur-xl border border-[#E8D3A2]/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] ${className}`}
      {...props}
    >
      {/* Subtle top inner reflection for premium depth */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 rounded-t-[28px] md:rounded-t-[32px]" />
      {children}
    </motion.div>
  );
};
