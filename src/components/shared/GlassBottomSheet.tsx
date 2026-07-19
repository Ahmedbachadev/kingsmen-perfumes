import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface GlassBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onReset?: () => void;
  resetText?: string;
  applyText?: string;
  onApply?: () => void;
}

export const GlassBottomSheet: React.FC<GlassBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onReset,
  resetText = "Reset",
  applyText = "Apply",
  onApply
}) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/60 touch-none"
            onClick={onClose}
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-[rgba(20,20,22,0.85)] backdrop-blur-2xl border-t border-[rgba(235,213,179,0.2)] rounded-t-3xl flex flex-col max-h-[85vh] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {/* Soft internal reflection sweep */}
            <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-transparent pointer-events-none" />
            
            {/* Drag Handle Area */}
            <div className="w-full flex justify-center py-4 relative z-10" onClick={onClose}>
              <div className="w-12 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 relative z-10">
              <h3 className="font-serif text-[#FDFBF7] text-2xl tracking-wide">{title}</h3>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A3A3A3] active:text-[#FDFBF7]"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 relative z-10">
              {children}
            </div>

            {/* Footer / Actions */}
            {(onApply || onReset) && (
              <div className="p-6 border-t border-white/10 flex gap-4 relative z-10 bg-[rgba(20,20,22,0.95)]">
                {onReset && (
                  <button 
                    onClick={onReset}
                    className="flex-1 py-4 rounded-full border border-white/10 text-[#FDFBF7] text-sm tracking-widest uppercase font-medium active:bg-white/5 transition-colors"
                  >
                    {resetText}
                  </button>
                )}
                {onApply && (
                  <button 
                    onClick={onApply}
                    className="flex-1 py-4 rounded-full bg-[#E8D3A2] text-black text-sm tracking-widest uppercase font-semibold shadow-[0_4px_15px_rgba(232,211,162,0.3)] active:bg-white transition-colors"
                  >
                    {applyText}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
