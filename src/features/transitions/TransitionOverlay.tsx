import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTransitionStore } from './TransitionContext';

export function TransitionOverlay() {
  const { overlayState, targetRoute, setOverlayState, completeTransition } = useTransitionStore();
  const navigate = useNavigate();

  // Handle routing once overlay covers the screen
  useEffect(() => {
    if (overlayState === 'entering') {
      const timer = setTimeout(() => {
        setOverlayState('visible');
        if (targetRoute) {
          navigate(targetRoute);
        }
      }, 800); // Wait for entrance animation
      return () => clearTimeout(timer);
    }
  }, [overlayState, targetRoute, navigate, setOverlayState]);

  // Handle cleanup once overlay exits
  useEffect(() => {
    if (overlayState === 'exiting') {
      const timer = setTimeout(() => {
        completeTransition();
      }, 800); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [overlayState, completeTransition]);

  const isVisible = overlayState !== 'hidden';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={
            overlayState === 'entering' || overlayState === 'visible'
              ? { opacity: 1, backdropFilter: 'blur(20px)' }
              : { opacity: 0, backdropFilter: 'blur(0px)' }
          }
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]/95 pointer-events-none"
        >
          {/* Ambient Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#E8D3A2]/20"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: ['0%', '-100%'],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
            animate={
              overlayState === 'entering' || overlayState === 'visible'
                ? { scale: 1, opacity: 1, filter: 'blur(0px)' }
                : { scale: 1.1, opacity: 0, filter: 'blur(10px)' }
            }
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Elegant Soft Gradient behind logo */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,211,162,0.15),transparent_70%)] w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none" />
            
            <span className="font-serif text-[#FDFBF7] text-3xl tracking-[0.3em] uppercase relative drop-shadow-[0_0_20px_rgba(232,211,162,0.3)]">
              Kingsmen
            </span>
            <motion.div 
              className="h-[1px] bg-gradient-to-r from-transparent via-[#E8D3A2]/50 to-transparent mt-4"
              initial={{ width: 0 }}
              animate={
                overlayState === 'entering' || overlayState === 'visible'
                  ? { width: '100px' }
                  : { width: 0 }
              }
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
