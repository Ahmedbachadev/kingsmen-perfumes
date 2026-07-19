import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable FAQ Data Structure
const faqs = [
  {
    question: "How long do Kingsmen fragrances last?",
    answer: "Our extraits de parfum are formulated with a high concentration of premium oils, ensuring a lasting presence of 12 to 18 hours on the skin, and longer on garments."
  },
  {
    question: "Are your fragrances suitable for everyday wear?",
    answer: "While profoundly rich, each scent is meticulously balanced to seamlessly transition from daily engagements to exclusive evening occasions."
  },
  {
    question: "Are Kingsmen perfumes inspired by designer fragrances?",
    answer: "No. Each Kingsmen creation is an original masterpiece, conceptualized and blended from scratch to offer a completely unique signature."
  },
  {
    question: "How should I store my fragrance?",
    answer: "To preserve its integrity and depth, store your bottle in a cool, dark environment away from direct sunlight and extreme temperature fluctuations."
  },
  {
    question: "Do you offer nationwide delivery?",
    answer: "Yes. We provide secure, expedited shipping across the nation, ensuring your signature scent arrives in pristine condition."
  },
  {
    question: "How can I choose the right fragrance?",
    answer: "Consider the atmosphere you wish to command. Explore our detailed scent profiles or reach out to our bespoke concierge for a personalized recommendation."
  }
];

// Generates simple floating particles (reused aesthetic)
const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#E8D3A2]/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: '0 0 8px 2px rgba(232, 211, 162, 0.2)',
          }}
          animate={{
            y: ['0%', '-50%', '-100%'],
            x: ['0%', '10%', '-10%', '0%'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full min-h-screen bg-[#111111] flex flex-col items-center py-32 overflow-hidden z-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Smoke Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a2a2a]/20 via-[#111111]/80 to-[#111111] opacity-70"></div>
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-black via-black/50 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
        <Particles />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full flex flex-col items-center mb-24"
        >
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#EBD5B3] font-light mb-8 block">
            Need to Know
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FDFBF7] leading-[1.1] tracking-tight mb-8">
            Frequently <br />
            Asked <br />
            Questions
          </h2>
          <p className="text-[#A3A3A3] font-sans text-base md:text-lg leading-relaxed font-light max-w-xl">
            Everything you need to know before choosing your signature fragrance.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="w-full flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {/* Thin gold divider line */}
                <div className="w-full h-px bg-[#EBD5B3]/20" />
                
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between py-8 text-left group transition-all duration-300"
                  aria-expanded={isOpen}
                >
                  <span className={`font-serif text-xl md:text-2xl tracking-wide transition-colors duration-300 ${isOpen ? 'text-[#EBD5B3]' : 'text-[#FDFBF7] group-hover:text-[#FDFBF7]/80'}`}>
                    {faq.question}
                  </span>
                  <div className="ml-8 flex-shrink-0 flex items-center justify-center w-8 h-8 relative">
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center justify-center text-[#EBD5B3] text-2xl font-light"
                    >
                      +
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#A3A3A3] font-sans text-base leading-relaxed font-light pb-8 pr-12 max-w-3xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {/* Final divider */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: faqs.length * 0.1 }}
            className="w-full h-px bg-[#EBD5B3]/20" 
          />
        </div>
      </div>
    </section>
  );
};
