import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const recommendations = [
  { handle: 'lucid', title: 'Lucid', desc: 'Clarity in chaos.', price: '$250.00', img: '/hero/hero_image_1.jpg' },
  { handle: 'dominus', title: 'Dominus', desc: 'Absolute command.', price: '$280.00', img: '/hero/hero_image_2.jpg' },
  { handle: 'office', title: 'Office', desc: 'Modern precision.', price: '$240.00', img: '/hero/hero_image_1.jpg' },
];

export const ProductRecommendations: React.FC = () => {
  return (
    <section className="relative w-full py-16 md:py-24 bg-[#070707] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#D4AF37] tracking-[0.3em] text-xs uppercase font-semibold block mb-2">
            Curated Complements
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.15em] uppercase">
            Related Signatures
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {recommendations.map((rec, idx) => (
            <Link key={rec.handle} to={`/products/${rec.handle}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col items-center overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-[#D4AF37]/40 shadow-xl"
              >
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-black/40 border border-white/5">
                  <img
                    src={rec.img}
                    alt={rec.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[#D4AF37] text-sm font-light tabular-nums">
                    {rec.price}
                  </span>
                </div>

                <h3 className="text-white text-lg md:text-xl font-light tracking-[0.15em] uppercase mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {rec.title}
                </h3>
                <p className="text-white/50 text-xs md:text-sm font-light text-center">
                  {rec.desc}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
