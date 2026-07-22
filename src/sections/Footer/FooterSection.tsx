import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCMSContext } from '../../contexts/CMSContext';
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

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

export const FooterSection = () => {
  const { config } = useCMSContext();
  const containerRef = useRef<HTMLElement>(null);
  const slabRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { damping: 30, stiffness: 100, mass: 1.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  // Smooth springs for light reflections
  const lightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-100, 100]), springConfig);
  const lightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-100, 100]), springConfig);

  // Floating animation for the slab itself
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!slabRef.current) return;
      
      const rect = slabRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the slab (-0.5 to 0.5)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // We divide by viewport size so the effect works across the whole screen smoothly
      const normalizedX = (e.clientX - centerX) / window.innerWidth;
      const normalizedY = (e.clientY - centerY) / window.innerHeight;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="contact" ref={containerRef} className="relative w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden z-20 pt-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a2a2a]/20 via-[#0a0a0a]/80 to-[#0a0a0a] opacity-80"></div>
        <Particles />
      </div>

      {/* Gigantic Background Typography */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
      >
        <h1 className="font-serif text-[#FDFBF7] text-[18vw] leading-none tracking-tight opacity-[0.04] whitespace-nowrap select-none uppercase">
          {config.footer.companyName.split(' ')[0]}
        </h1>
      </motion.div>

      {/* The Liquid Glass Slab */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[90%] max-w-5xl perspective-1000"
      >
        <motion.div
          ref={slabRef}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            mouseX.set(0);
            mouseY.set(0);
          }}
          animate={{
            y: isHovered ? 0 : [0, -4, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="relative w-full rounded-[2.5rem] bg-[rgba(20,20,22,0.4)] backdrop-blur-2xl border border-[rgba(235,213,179,0.3)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center py-16 px-6 md:px-16"
        >
          {/* Glass internal reflection sweep */}
          <motion.div
            style={{ x: lightX, y: lightY }}
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.05)] to-transparent opacity-50 pointer-events-none"
          />
          
          {/* Top Edge Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(235,213,179,0.6)] to-transparent opacity-70" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center w-full" style={{ transform: "translateZ(40px)" }}>
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col items-center mb-6"
            >
              <span className="font-serif text-4xl md:text-5xl text-[#FDFBF7] tracking-widest uppercase mb-1">
                {config.footer.companyName}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="text-[#A3A3A3] font-sans text-sm md:text-base leading-relaxed font-light text-center max-w-lg mb-4"
            >
              Crafting timeless fragrances for individuals who appreciate confidence, elegance and lasting impressions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-[#A3A3A3] font-sans text-xs md:text-sm leading-relaxed font-light text-center max-w-lg mb-12"
            >
              {config.footer.address}<br />
              <a href={`mailto:${config.footer.email}`} className="hover:text-[#FDFBF7] transition-colors">{config.footer.email}</a><br />
              <a href={`tel:${config.footer.phone}`} className="hover:text-[#FDFBF7] transition-colors">{config.footer.phone}</a>
            </motion.p>

            {/* Social Header */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-[10px] tracking-[0.3em] uppercase text-[#EBD5B3] font-light mb-6"
            >
              Follow {config.footer.companyName.split(' ')[0]}
            </motion.span>

            {/* Social Icons */}
            <div className="flex gap-8 mb-16">
              {[
                { Icon: InstagramIcon, label: 'Instagram', url: config.footer.socialLinks.instagram },
                { Icon: TikTokIcon, label: 'TikTok', url: config.footer.socialLinks.tiktok },
                { Icon: FacebookIcon, label: 'Facebook', url: config.footer.socialLinks.facebook },
                { Icon: WhatsAppIcon, label: 'WhatsApp', url: config.footer.phone ? `https://wa.me/${config.footer.phone.replace(/\D/g, '')}` : '#' }
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.4 + (i * 0.1) }}
                  className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.02)] backdrop-blur-md border border-[rgba(235,213,179,0.2)] hover:border-[rgba(235,213,179,0.6)] hover:bg-[rgba(235,213,179,0.05)] transition-colors duration-500 shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                  whileHover={{ y: -6 }}
                >
                  {/* Hover reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.1)] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <social.Icon className="w-5 h-5 text-[#A3A3A3] group-hover:text-[#FDFBF7] transition-colors duration-500 relative z-10" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.8 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12"
            >
              {['Home', 'Collections', 'About', 'FAQ', 'Contact'].map((link, i, arr) => (
                <React.Fragment key={link}>
                  <a href={`#${link.toLowerCase()}`} className="group relative font-sans text-xs tracking-widest uppercase text-[#A3A3A3] hover:text-[#FDFBF7] transition-colors duration-500 py-2">
                    {link}
                    {/* Gold underline on hover */}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#EBD5B3] group-hover:w-full transition-all duration-500 ease-out" />
                  </a>
                  {i < arr.length - 1 && (
                    <div className="w-1 h-1 rounded-full bg-[#EBD5B3]/40" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Bottom Row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 2.0 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(235,213,179,0.2)] to-transparent mb-6" />
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 px-4 text-[#888888] font-sans text-[10px] tracking-wider uppercase font-light">
                <span>{config.footer.copyright}</span>
                <span>Designed with timeless craftsmanship.</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};
