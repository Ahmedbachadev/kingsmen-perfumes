import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// For cinematic gallery without carousels
const images = [
  '/hero/hero_image_1.jpg',
  '/hero/hero_image_2.jpg',
];

export const ProductGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[800px]">
          <motion.div style={{ y: y1 }} className="relative w-full h-full rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <img src={images[0]} alt="Gallery Image 1" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="relative w-full h-[80%] mt-auto rounded-sm overflow-hidden">
             <div className="absolute inset-0 bg-black/20 z-10" />
            <img src={images[1]} alt="Gallery Image 2" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
