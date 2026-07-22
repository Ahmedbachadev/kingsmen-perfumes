import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Moon, Clock, Flame } from 'lucide-react';

export const OccasionSection: React.FC<{ product?: any }> = ({ product }) => {
  const getSeasons = () => {
    if (Array.isArray(product?.recommended_seasons)) return product.recommended_seasons.join(' / ');
    return product?.recommended_seasons || 'Autumn / Winter';
  };

  const getOccasions = () => {
    if (Array.isArray(product?.recommended_occasions)) return product.recommended_occasions.join(' & ');
    return product?.recommended_occasions || 'Evening & Black Tie';
  };

  const metrics = [
    { label: 'Season', value: getSeasons(), desc: 'Optimized for cooler weather & evening air.', icon: Calendar },
    { label: 'Occasion', value: getOccasions(), desc: 'Designed to command presence.', icon: Moon },
    { label: 'Longevity', value: product?.longevity || '12+ Hours', desc: 'High concentration Extrait formulation.', icon: Clock },
    { label: 'Silllage', value: product?.projection || 'Enormous', desc: 'Leaves a captivating, refined trail.', icon: Flame },
  ];

  return (
    <section className="relative w-full py-16 bg-[#070707] border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-semibold">
                    {metric.label}
                  </span>
                  <Icon className="w-4 h-4 text-[#D4AF37]" />
                </div>

                <div>
                  <h4 className="text-white text-base md:text-lg font-medium tracking-wide mb-1">
                    {metric.value}
                  </h4>
                  <p className="text-white/50 text-xs font-light">
                    {metric.desc}
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
