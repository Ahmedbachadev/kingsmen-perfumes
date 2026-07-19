import { motion } from 'framer-motion';

const notes = [
  { level: 'Top', ingredients: 'Bergamot, Pink Pepper', desc: 'A bright, fleeting introduction.' },
  { level: 'Heart', ingredients: 'Oud, Rose, Iris', desc: 'The deeply resonant core.' },
  { level: 'Base', ingredients: 'Amber, Sandalwood, Musk', desc: 'A lasting, warm foundation.' },
];

export const FragranceNotes = () => {
  return (
    <section className="relative w-full py-32 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-24">
        <div className="text-center mb-24">
          <span className="text-[#E8D3A2] tracking-[0.3em] text-xs uppercase font-semibold block mb-4">Olfactory Profile</span>
          <h2 className="text-white text-4xl lg:text-5xl font-light tracking-widest uppercase">Fragrance Notes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {notes.map((note, idx) => (
            <motion.div
              key={note.level}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative p-10 rounded-xl bg-white/[0.02] border border-white/[0.05] overflow-hidden group"
              style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#E8D3A2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 text-center flex flex-col items-center">
                <span className="text-white/30 tracking-[0.3em] uppercase text-[10px] mb-6 block">
                  {note.level} Notes
                </span>
                <h3 className="text-white text-2xl font-light tracking-wider mb-4">
                  {note.ingredients}
                </h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {note.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
