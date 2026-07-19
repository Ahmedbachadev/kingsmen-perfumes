import { motion, AnimatePresence } from 'framer-motion';

interface HeroMobileOverlayProps {
  isSequenceComplete: boolean;
}

export const HeroMobileOverlay = ({ isSequenceComplete }: HeroMobileOverlayProps) => {
  const headline = "Master\nthe Art of\nInfluence";
  const headlineLines = headline.split('\n');

  return (
    <AnimatePresence>
      {isSequenceComplete && (
        <motion.div 
          className="absolute inset-0 w-full h-full pointer-events-none z-10 flex flex-col justify-end pb-12 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Main Content Area */}
          <div className="relative pointer-events-auto flex flex-col gap-6 z-20">
            {/* Headline */}
            <h1 
              className="text-[#F8F5F1] font-bold tracking-tight"
              style={{ 
                fontSize: 'clamp(48px, 12vw, 72px)', 
                lineHeight: 0.95,
                letterSpacing: '-0.02em'
              }}
            >
              {headlineLines.map((line, lineIndex) => (
                <span key={lineIndex} className="block overflow-hidden pb-1">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1 + (lineIndex * 0.1),
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#F8F5F1]/80 text-[16px] leading-[1.6] font-light max-w-[90%]"
            >
              A captivating signature scent crafted for those who command the room. 
              Experience the pinnacle of olfactory luxury.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 mt-2"
            >
              {/* Primary Button */}
              <button className="group relative w-full px-6 py-4 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] text-[#F8F5F1] transition-all duration-500 ease-out overflow-hidden flex items-center justify-center">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
                <span className="relative z-10 text-[13px] uppercase tracking-[0.15em] font-medium drop-shadow-md">
                  Explore Collection
                </span>
              </button>

              {/* Secondary Button */}
              <button className="group relative w-full px-6 py-4 rounded-full bg-transparent backdrop-blur-md border border-transparent text-[#F8F5F1]/80 transition-all duration-500 ease-out overflow-hidden flex items-center justify-center">
                <span className="relative z-10 text-[13px] uppercase tracking-[0.15em] font-medium drop-shadow-sm">
                  Discover Sky-Fall
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
