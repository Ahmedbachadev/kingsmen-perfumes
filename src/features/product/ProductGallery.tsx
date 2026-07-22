import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  '/hero/hero_image_1.jpg',
  '/hero/hero_image_2.jpg'
];

export const ProductGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[400px] md:h-[600px] lg:h-[700px]">
          <motion.div
            style={{ y: y1 }}
            className="relative w-full h-[350px] md:h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <img
              src={images[0]}
              alt="Fragrance Atmosphere 1"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-6 left-6 z-20 text-white/70 text-xs tracking-[0.2em] uppercase font-light">
              Craftsmanship & Heritage
            </span>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="relative w-full h-[350px] md:h-[85%] lg:mt-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <img
              src={images[1]}
              alt="Fragrance Atmosphere 2"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-6 left-6 z-20 text-white/70 text-xs tracking-[0.2em] uppercase font-light">
              Bottled Perfection
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
