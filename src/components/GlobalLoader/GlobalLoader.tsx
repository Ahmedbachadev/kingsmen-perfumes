import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GlobalLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep the loader visible for a shorter time
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
        >
          {/* Golden particles/blur blobs */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 80, 0],
                y: [0, -40, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/30 rounded-full blur-[100px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                x: [0, -80, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-[#FFDF00]/20 rounded-full blur-[120px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B8860B]/40 rounded-full blur-[80px]"
            />
          </div>

          {/* Liquid glass style container */}
          <div className="relative z-10 flex items-center justify-center w-full h-full backdrop-blur-2xl bg-black/30 border border-white/5 shadow-[inset_0_0_100px_rgba(212,175,55,0.05)]">
            
            {/* Animated text loader */}
            <div className="relative inline-block text-4xl md:text-6xl lg:text-8xl font-serif tracking-[0.3em] uppercase text-white/10 select-none">
              KINGSMEN
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                style={{ backgroundSize: '200% auto' }}
              >
                KINGSMEN
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
