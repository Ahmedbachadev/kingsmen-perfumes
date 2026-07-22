import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCMSContext } from "../../contexts/CMSContext";

export const HeroOverlay = () => {
  const { config } = useCMSContext();
  // Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth parallax
  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform constraints to max 8px movement
  const x = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse coordinates between -0.5 and 0.5
      const normalizedX = e.clientX / innerWidth - 0.5;
      const normalizedY = e.clientY / innerHeight - 0.5;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const headlineLines = config.hero.title.split('\n');

  return (
    <div id="hero" className="absolute inset-0 w-full h-screen pointer-events-none z-10 overflow-hidden">
      {/* Background Gradient for readability (left side only) */}
      <div className="absolute inset-0 w-[60%] bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Main Content Area */}
      <motion.div
        style={{ x, y }}
        className="absolute bottom-[14vh] left-[7vw] max-w-[520px] pointer-events-auto flex flex-col gap-8"
      >
        {/* Headline */}
        <h1 
          className="text-[#F8F5F1] font-bold tracking-tight"
          style={{ 
            fontSize: 'clamp(72px, 8vw, 108px)', 
            lineHeight: 0.92,
            letterSpacing: '-0.02em'
          }}
        >
          {headlineLines.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-hidden pb-2">
              {line.split('').map((char, charIndex) => (
                <motion.span
                  key={`${lineIndex}-${charIndex}`}
                  className="inline-block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1], // Custom cinematic easing
                    delay: 0.2 + (lineIndex * 0.1) + (charIndex * 0.03),
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#F8F5F1]/80 text-[18px] md:text-[20px] leading-[1.7] max-w-[480px] font-light whitespace-pre-line"
        >
          {config.hero.subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-8 mt-2"
        >
          {/* Primary Button */}
          <a href={config.hero.primaryButtonLink} className="group relative px-8 py-4 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:bg-white/[0.1] hover:border-white/20 text-[#F8F5F1] transition-all duration-500 ease-out overflow-hidden flex items-center justify-center">
            {/* Glossy top edge highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Liquid glass subtle reflection overlay */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 text-[13px] uppercase tracking-[0.15em] font-medium drop-shadow-md">
              {config.hero.primaryButtonText}
            </span>
          </a>

          {/* Secondary Button */}
          <a href={config.hero.secondaryButtonLink} className="group relative px-8 py-4 rounded-full bg-transparent backdrop-blur-md border border-transparent hover:bg-white/[0.03] hover:border-white/10 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-[#F8F5F1]/80 hover:text-[#F8F5F1] transition-all duration-500 ease-out overflow-hidden flex items-center justify-center">
            {/* Glossy top edge highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 text-[13px] uppercase tracking-[0.15em] font-medium drop-shadow-sm">
              {config.hero.secondaryButtonText}
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto"
      >
        <span className="text-[#F8F5F1]/60 text-[10px] uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="w-full h-full bg-[#D4AF37]"
          />
        </div>
      </motion.div>
    </div>
  );
};
