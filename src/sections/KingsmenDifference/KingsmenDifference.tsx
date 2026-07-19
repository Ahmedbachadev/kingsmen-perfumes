import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const columns = [
  {
    number: '01',
    title: 'Exceptional Ingredients',
    description: 'Every fragrance begins with carefully selected premium perfume oils and refined raw materials chosen for depth, richness and longevity.'
  },
  {
    number: '02',
    title: 'Designed to Last',
    description: 'Our compositions evolve beautifully throughout the day, leaving a memorable impression from the first spray to the final dry down.'
  },
  {
    number: '03',
    title: 'Crafted for Presence',
    description: 'Kingsmen fragrances are created for individuals who value confidence, elegance and identity over trends.'
  }
];

export const KingsmenDifference: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Generating static particles to avoid hydration mismatch
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    top: `${(i * 23) % 100}%`,
    duration: 15 + (i % 10) * 2,
    delay: (i % 5) * 2,
    size: i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
  }));

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] text-[#FDFBF7] overflow-hidden flex flex-col justify-center py-32"
    >
      {/* Background Smoke / Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_#1A1814_0%,_transparent_70%)] opacity-40 mix-blend-screen"
          style={{ willChange: 'transform' }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,_#15120E_0%,_transparent_70%)] opacity-40 mix-blend-screen"
          style={{ willChange: 'transform' }}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Gold Particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#D4AF37] opacity-30"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              willChange: 'transform, opacity',
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 h-full flex flex-col justify-center">
        
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#CFA44F] font-light">
            The Kingsmen Difference
          </p>
        </motion.div>

        {/* Headline */}
        <motion.div 
          className="mb-24 lg:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {["Crafted", "Without", "Compromise."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: { 
                    y: "0%", 
                    opacity: 1,
                    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#FDFBF7] leading-[1.1] tracking-tight"
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </motion.div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative mt-auto">
          {/* Subtle top divider */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 hidden md:block" />
          
          {columns.map((col, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 1.2, 
                    delay: 0.2 + index * 0.2,
                    ease: [0.16, 1, 0.3, 1] 
                  }
                }
              }}
              className="relative flex flex-col pt-8 md:pt-12"
            >
              {/* Divider for mobile */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D4AF37]/20 to-transparent block md:hidden" />
              
              <motion.div 
                className="absolute -top-16 md:-top-24 left-0 text-[120px] md:text-[180px] lg:text-[200px] font-serif leading-none tracking-tighter opacity-10 pointer-events-none select-none text-transparent"
                style={{ 
                  WebkitTextStroke: "1px rgba(212, 175, 55, 0.8)",
                  x: useTransform(scrollYProgress, [0, 1], [-20, 20]),
                  willChange: 'transform',
                }}
              >
                {col.number}
              </motion.div>

              <h3 className="text-xl md:text-2xl font-serif text-[#FDFBF7] mb-6 relative z-10">
                {col.title}
              </h3>
              
              <p className="text-[#A3A3A3] font-sans text-sm md:text-base leading-relaxed font-light max-w-sm relative z-10">
                {col.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
