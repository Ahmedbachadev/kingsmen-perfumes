import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const recommendations = [
  { handle: 'lucid', title: 'Lucid', desc: 'Clarity in chaos.', img: '/products/lucid.png' },
  { handle: 'dominus', title: 'Dominus', desc: 'Absolute command.', img: '/products/dominus.png' },
  { handle: 'office', title: 'Office', desc: 'Modern precision.', img: '/products/office.png' },
];

export const ProductRecommendations = () => {
  return (
    <section className="relative w-full py-32 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl font-light tracking-widest uppercase">Related Signatures</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((rec, idx) => (
            <Link key={rec.handle} to={`/products/${rec.handle}`} className="block group cursor-pointer">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-white/[0.01] border border-white/5 p-8 rounded-xl flex flex-col items-center overflow-hidden transition-all duration-700 hover:bg-white/[0.03] hover:border-[#E8D3A2]/30"
              >
                <div className="relative w-[150px] aspect-[9/16] mb-8">
                  <img src={rec.img} alt={rec.title} className="w-full h-full object-contain scale-110 group-hover:scale-125 transition-transform duration-700" />
                </div>
                <h3 className="text-white text-xl font-light tracking-widest uppercase mb-2 group-hover:text-[#E8D3A2] transition-colors duration-500">{rec.title}</h3>
                <p className="text-white/50 text-sm font-light">{rec.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
