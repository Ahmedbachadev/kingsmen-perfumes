import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSContext } from '../../contexts/CMSContext';

gsap.registerPlugin(ScrollTrigger);

export const AboutMobile = () => {
  const { config } = useCMSContext();
  const containerRef = useRef<HTMLDivElement>(null);

  // Content Refs
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup GSAP content animation timeline for the hero overlay
    const contentTl = gsap.timeline({ paused: true });
    
    // Initial states for hero content
    gsap.set([labelRef.current, headingRef.current, descRef.current], {
      y: 30,
      opacity: 0,
      filter: 'blur(8px)',
    });

    contentTl
      .to(labelRef.current, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' })
      .to(headingRef.current, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .to(descRef.current, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, '-=0.6');

    // ScrollTrigger to detect when section enters viewport
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 50%',
      onEnter: () => {
        contentTl.play();
      }
    });

    // Cards ScrollTrigger
    let cardsSt: ScrollTrigger | null = null;
    if (cardsRef.current) {
      gsap.set(cardsRef.current.children, { y: 40, opacity: 0, filter: 'blur(10px)' });
      cardsSt = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(cardsRef.current!.children, {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
          });
        }
      });
    }

    return () => {
      st.kill();
      if (cardsSt) cardsSt.kill();
      contentTl.kill();
    };
  }, []);

  return (
    <div id="about-mobile" className="relative w-full bg-[#0a0a0a] text-white z-20 lg:hidden">
      
      {/* 1. HERO COMPOSITION (100vh) */}
      <div ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-black">
        <img 
          src="/sequences/about/mobile/ChatGPT Image Jul 23, 2026, 01_19_06 AM.png"
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover block transform-gpu" 
        />
        
        {/* Gradient overlay anchored to the bottom to ensure text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
        
        {/* Text Overlay - Lower Left */}
        <div className="absolute bottom-16 left-6 right-6 z-20 flex flex-col justify-end text-left max-w-[90%]">
          <p 
            ref={labelRef}
            className="text-[#E8D3A2] tracking-[0.3em] text-[10px] font-semibold uppercase mb-4 opacity-90"
          >
            Our Philosophy
          </p>
          
          <h2 
            ref={headingRef}
            className="text-[34px] font-light leading-[1.15] mb-5 tracking-tight text-white/95 whitespace-pre-line"
          >
            {config.about.title}
          </h2>
          
          <p 
            ref={descRef}
            className="text-white/70 font-light text-[15px] leading-relaxed max-w-sm whitespace-pre-line"
          >
            {config.about.description}
          </p>
        </div>
      </div>

      {/* 2. BRAND VALUE CARDS SECTION */}
      <div className="relative z-20 bg-[#0a0a0a] px-6 pt-16 pb-32">
        <div ref={cardsRef} className="w-full space-y-5">
          {config.about.features.map((feature, index) => {
            const icons = ['✦', '◈', '✧'];
            const icon = icons[index % icons.length];
            return (
              <div key={feature.id} className="p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-2xl flex flex-col items-start relative overflow-hidden">
                <div className="w-10 h-10 mb-6 rounded-full bg-black/40 flex items-center justify-center border border-white/10 shadow-inner">
                  <span className="text-[#E8D3A2] text-lg">{icon}</span>
                </div>
                <h3 className="text-[18px] text-white/90 font-medium mb-3 tracking-wide">{feature.title}</h3>
                <p className="text-[15px] text-white/50 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

