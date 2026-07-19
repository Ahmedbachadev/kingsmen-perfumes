import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Sparkles, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductDetailsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const ProductDetails = ({ containerRef }: ProductDetailsProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top -500vh',
        end: 'top -600vh',
        scrub: 1,
      }
    });

    gsap.set(wrapperRef.current, { autoAlpha: 0 });
    
    // Set initial states for all animated children
    const elements = contentRef.current.children;
    gsap.set(elements, { x: -50, opacity: 0 });

    tl.to(wrapperRef.current, { autoAlpha: 1, duration: 0.5 })
      .to(elements, { 
        x: 0, 
        opacity: 1, 
        duration: 1.5, 
        stagger: 0.15, 
        ease: "power2.out" 
      }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, [containerRef]);

  const Divider = () => (
    <div className="w-full h-[1px] bg-white/10 my-3" />
  );

  return (
    <div 
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full pointer-events-none flex items-center z-20"
    >
      <div 
        ref={contentRef}
        className="absolute right-[12vw] xl:right-[18vw] 2xl:right-[22vw] flex flex-col items-start text-left pointer-events-auto max-w-sm xl:max-w-md h-[80vh] justify-center"
      >
        {/* Label */}
        <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.3em] font-medium mb-1">
          Signature Fragrance
        </span>
        
        {/* Title */}
        <h2 
          className="text-[#F8F5F1] font-bold tracking-tight text-6xl xl:text-7xl mb-2"
          style={{ fontFamily: 'serif' }}
        >
          Sky-Fall
        </h2>
        
        {/* Description */}
        <p className="text-[#F8F5F1]/70 text-lg font-light leading-relaxed mb-1">
          An olfactory masterpiece where twilight descends into midnight. 
          A seamless blend of smoked woods, midnight jasmine, and warm amber.
        </p>

        <Divider />

        {/* Top Notes */}
        <div className="flex flex-col gap-0.5 w-full">
          <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] font-medium">Top Notes</span>
          <span className="text-[#F8F5F1] text-[15px] font-light tracking-wide">Bergamot, Black Pepper</span>
        </div>

        <Divider />

        {/* Heart Notes */}
        <div className="flex flex-col gap-0.5 w-full">
          <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] font-medium">Heart Notes</span>
          <span className="text-[#F8F5F1] text-[15px] font-light tracking-wide">Lavender, Oud</span>
        </div>

        <Divider />

        {/* Base Notes */}
        <div className="flex flex-col gap-0.5 w-full">
          <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] font-medium">Base Notes</span>
          <span className="text-[#F8F5F1] text-[15px] font-light tracking-wide">Amber, Vanilla</span>
        </div>

        <Divider />

        {/* Metadata */}
        <div className="flex flex-col gap-2.5 w-full mb-5">
          <div className="flex items-center gap-3">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
            <span className="text-[#F8F5F1]/80 text-[13px] font-light tracking-wide">12+ Hours Longevity</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
            <span className="text-[#F8F5F1]/80 text-[13px] font-light tracking-wide">Room-Filling Projection</span>
          </div>
          <div className="flex items-center gap-3">
            <Sun className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
            <span className="text-[#F8F5F1]/80 text-[13px] font-light tracking-wide">Autumn & Winter Season</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="group relative px-10 py-5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:bg-white/[0.1] hover:border-white/20 text-[#F8F5F1] transition-all duration-500 ease-out overflow-hidden flex items-center justify-center w-full">
          {/* Glossy top edge highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Liquid glass subtle reflection overlay */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 text-[14px] uppercase tracking-[0.15em] font-semibold drop-shadow-md">
            Discover Sky-Fall
          </span>
        </button>

      </div>
    </div>
  );
};
