import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call for newsletter subscription
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section className="relative w-full h-screen bg-[#111111] flex flex-col items-center justify-center overflow-hidden z-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Smoke Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a2a2a]/20 via-[#111111]/80 to-[#111111] opacity-70"></div>
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-black via-black/50 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
        <Particles />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 md:px-12 flex flex-col items-center text-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#EBD5B3] font-light mb-8 block"
          >
            HOUSE OF KINGSMEN
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FDFBF7] leading-[1.1] tracking-tight mb-8">
            <span className="block overflow-hidden pb-2"><motion.span className="block" initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>Become</motion.span></span>
            <span className="block overflow-hidden pb-2"><motion.span className="block" initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>Part of</motion.span></span>
            <span className="block overflow-hidden pb-2"><motion.span className="block" initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>Kingsmen</motion.span></span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#A3A3A3] font-sans text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto"
          >
            Receive exclusive fragrance launches, limited collections, seasonal releases and stories crafted for those who appreciate timeless luxury.
          </motion.p>
        </div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center p-6 border border-[#EBD5B3]/30 rounded-sm bg-[rgba(20,20,22,0.6)] backdrop-blur-md"
              >
                <span className="text-[#EBD5B3] font-serif text-xl tracking-wide">
                  ✓ Welcome to Kingsmen.
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="relative flex-grow group overflow-hidden rounded-sm">
                  {/* Subtle input reflection hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(235,213,179,0.05)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={status === 'loading'}
                    className="relative w-full h-14 bg-[rgba(20,20,22,0.4)] border border-[rgba(235,213,179,0.2)] rounded-sm px-6 text-[#FDFBF7] font-sans text-base placeholder:text-[#A3A3A3] placeholder:transition-opacity focus:placeholder:opacity-50 focus:outline-none focus:border-[#EBD5B3]/60 transition-all duration-500 backdrop-blur-md caret-[#EBD5B3] z-0"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="relative overflow-hidden group h-14 px-10 rounded-sm bg-[rgba(20,20,22,0.4)] border border-[rgba(235,213,179,0.4)] backdrop-blur-md transition-all duration-500 hover:border-[#EBD5B3] hover:bg-[rgba(235,213,179,0.05)] text-[#FDFBF7] flex items-center justify-center min-w-[200px]"
                >
                  <span className="absolute inset-0 w-full h-full -skew-x-[20deg] translate-x-[-150%] bg-gradient-to-r from-transparent via-[rgba(235,213,179,0.15)] to-transparent group-hover:animate-[specular_1.5s_ease-in-out_infinite]" />
                  {status === 'loading' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-[#EBD5B3]/30 border-t-[#EBD5B3] rounded-full relative z-10"
                    />
                  ) : (
                    <span className="relative z-10 text-sm tracking-widest font-light uppercase">
                      Join the House
                    </span>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Microcopy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <p className="text-[#888888] font-sans text-xs tracking-wide">
            No spam. Only timeless releases and exclusive updates.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
