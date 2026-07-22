import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MobileNavItem } from './MobileNavItem';
import { GlassButton } from '../shared/GlassButton';

// We'll import SVG for TikTok and WhatsApp since lucide doesn't have all.
// Actually, Lucide has Facebook, Instagram. We'll use generic SVG for TikTok/WhatsApp if not.
// Wait, Lucide usually has Instagram, Facebook. For others, we can just use SVG.

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const MENU_ITEMS = ['Home', 'Products', 'Gentlemen', 'Ladies', 'Unisex', 'About', 'FAQ', 'Contact'];

export const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: {
      opacity: 1,
      backdropFilter: 'blur(24px)',
      transition: { duration: 0.6, ease: "easeOut" as any as any }
    },
    exit: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a]/90"
        >
          {/* Ambient Lighting & Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(184,142,82,0.15),transparent_70%)] blur-[40px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(235,213,179,0.08),transparent_70%)] blur-[50px]" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#E8D3A2]/30"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: ['0%', '-100%'],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 8 + 5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Header (Close Button) */}
          <div className="relative z-10 flex justify-end p-4 pt-6 safe-top">
            <motion.button
              onClick={onClose}
              whileTap={{ scale: 0.9 }}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1, transition: { duration: 0.6, delay: 0.3 } }}
              exit={{ rotate: 90, opacity: 0, transition: { duration: 0.3 } }}
              className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(235,213,179,0.15)] flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.3)] backdrop-blur-md"
            >
              <X className="w-5 h-5 text-[#FDFBF7]" strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Scrollable Menu Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden pb-8 relative z-10 flex flex-col items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full flex flex-col items-center justify-center min-h-full py-8"
            >
              {MENU_ITEMS.map((item) => (
                <MobileNavItem
                  key={item}
                  label={item}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.toLowerCase());
                  }}
                />
              ))}

              {/* Bottom Area */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any as any } },
                  exit: { opacity: 0, y: 10 }
                }}
                className="mt-12 flex flex-col items-center gap-8"
              >
                <GlassButton
                  className="py-3 px-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  onClick={() => {
                    onNavigate('products');
                  }}
                >
                  Explore Collection
                </GlassButton>

                <div className="flex items-center gap-6">
                  {/* Instagram (Custom SVG) */}
                  <a href="#" className="text-[#A3A3A3] hover:text-[#FDFBF7] transition-colors p-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  {/* TikTok (Custom SVG) */}
                  <a href="#" className="text-[#A3A3A3] hover:text-[#FDFBF7] transition-colors p-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                  {/* Facebook (Custom SVG) */}
                  <a href="#" className="text-[#A3A3A3] hover:text-[#FDFBF7] transition-colors p-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  {/* WhatsApp (Custom SVG) */}
                  <a href="#" className="text-[#A3A3A3] hover:text-[#FDFBF7] transition-colors p-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
