import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GlobalLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = 'hidden';
    
    // 4 seconds firm duration before hiding the loader
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  const letters = ['K', 'I', 'N', 'G', 'S', 'M', 'E', 'N'];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000] overflow-hidden pointer-events-auto select-none"
        >
          {/* Animated text loader on solid black background */}
          <div className="relative flex items-center justify-center text-4xl md:text-6xl lg:text-8xl font-serif select-none uppercase tracking-[0.3em] pl-[0.3em]">
            {letters.map((char, i) => (
              <span key={i} className="relative inline-block">
                {/* Base dimmed letter */}
                <span className="text-white/10">{char}</span>
                {/* Glowing golden letter */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: i * 0.5,
                    duration: 0.5,
                    ease: 'easeInOut'
                  }}
                  className="absolute top-0 left-0 w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.7)]"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
