import { motion } from 'framer-motion';

const metrics = [
  { label: 'Season', value: 'Autumn / Winter', desc: 'Best suited for colder climates.' },
  { label: 'Time', value: 'Evening', desc: 'Designed for the night.' },
  { label: 'Longevity', value: '12+ Hours', desc: 'Extrait de Parfum concentration.' },
  { label: 'Projection', value: 'Enormous', desc: 'Fills the room effortlessly.' },
];

export const OccasionSection = () => {
  return (
    <section className="relative w-full py-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
              className="p-8 border border-white/5 hover:bg-white/[0.02] transition-colors duration-500 flex flex-col justify-between min-h-[200px]"
            >
              <span className="text-white/40 uppercase tracking-widest text-[10px]">
                {metric.label}
              </span>
              <div>
                <h4 className="text-white text-xl font-light tracking-wide mb-2">
                  {metric.value}
                </h4>
                <p className="text-white/50 text-xs font-light">
                  {metric.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
