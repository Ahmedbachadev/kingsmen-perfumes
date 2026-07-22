import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Anchor } from 'lucide-react';

export const FragranceNotes: React.FC<{ product?: any }> = ({ product }) => {
  const notes = [
    {
      level: 'Top',
      title: 'Top Notes',
      icon: Sparkles,
      ingredients: product?.top_notes || 'Bergamot, Pink Pepper & Italian Lemon',
      desc: 'The vibrant opening spark that lingers gracefully upon first contact.',
      color: 'from-[#D4AF37]/20 to-transparent'
    },
    {
      level: 'Heart',
      title: 'Heart Notes',
      icon: Heart,
      ingredients: product?.heart_notes || 'Royal Oud, Bulgarian Rose & Velvet Iris',
      desc: 'The rich, emotional core that unveils as the fragrance warms on skin.',
      color: 'from-[#FFF8DC]/15 to-transparent'
    },
    {
      level: 'Base',
      title: 'Base Notes',
      icon: Anchor,
      ingredients: product?.base_notes || 'Amber Resin, Mysore Sandalwood & White Musk',
      desc: 'The long-lasting foundation creating a profound, memorable aura.',
      color: 'from-[#B8860B]/20 to-transparent'
    }
  ];
  return (
    <section className="relative w-full py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#D4AF37] tracking-[0.3em] text-xs uppercase font-semibold block mb-2">
            Olfactory Architecture
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-light tracking-[0.15em] uppercase">
            Fragrance Pyramid
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {notes.map((note, idx) => {
            const Icon = note.icon;
            return (
              <motion.div
                key={note.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden group hover:border-[#D4AF37]/40 transition-all duration-500 shadow-xl"
              >
                {/* Background Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${note.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-white/40 tracking-[0.3em] uppercase text-xs font-semibold">
                    {note.title}
                  </span>

                  <h3 className="text-white text-lg md:text-xl font-medium tracking-wide">
                    {note.ingredients}
                  </h3>

                  <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
                    {note.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
