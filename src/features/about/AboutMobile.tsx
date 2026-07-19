import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSContext } from '../../contexts/CMSContext';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 159;
const FRAME_DIGITS = 6;
const FRAME_PREFIX = 'frame_';
const FRAME_EXTENSION = '.png';
const BASE_PATH = '/sequences/about/mobile/';

const getFramePath = (index: number) => {
  const paddedNumber = index.toString().padStart(FRAME_DIGITS, '0');
  return `${BASE_PATH}${FRAME_PREFIX}${paddedNumber}${FRAME_EXTENSION}`;
};

export const AboutMobile = () => {
  const { config } = useCMSContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const hasPlayedRef = useRef(false);

  // Content Refs
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // 1. Preload Images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        // Even on error, we count as loaded to avoid infinite loading state
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // 2. Setup Canvas & Scroll Logic
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;

    const renderFrame = (frameIndex: number) => {
      const img = images[Math.min(Math.round(frameIndex), TOTAL_FRAMES - 1)];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Imitate object-fit: cover
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      
      // Center horizontally, but align to top vertically 
      // so the gentleman stays in the upper portion
      const offsetX = (cw - nw) / 2;
      const offsetY = 0; 

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, nw, nh);
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const frame = hasPlayedRef.current ? TOTAL_FRAMES - 1 : 0;
      renderFrame(frame);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const lockScroll = () => {
      window.dispatchEvent(new CustomEvent('lenis-lock'));
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    };

    const unlockScroll = () => {
      window.dispatchEvent(new CustomEvent('lenis-unlock'));
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };

    const snapToTop = () => {
      if (containerRef.current) {
        const top = containerRef.current.getBoundingClientRect().top + window.scrollY;
        // Snap cleanly to the top of the section
        window.scrollTo({ top, behavior: 'instant' });
      }
    };

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
      start: 'top top',
      onEnter: () => {
        if (!hasPlayedRef.current) {
          hasPlayedRef.current = true;
          
          lockScroll();
          snapToTop();

          // Smoothly play sequence using requestAnimationFrame via GSAP
          const frameObj = { frame: 0 };
          gsap.to(frameObj, {
            frame: TOTAL_FRAMES - 1,
            duration: 2.8, // 2.8 seconds duration
            ease: 'power2.inOut',
            onUpdate: () => {
              renderFrame(frameObj.frame);
            },
            onComplete: () => {
              unlockScroll();
              contentTl.play();
            }
          });
        }
      },
      onEnterBack: () => {
        // If scrolled back up later, ensure final state is shown
        if (hasPlayedRef.current) {
          renderFrame(TOTAL_FRAMES - 1);
          contentTl.progress(1);
        }
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
      window.removeEventListener('resize', handleResize);
      st.kill();
      if (cardsSt) cardsSt.kill();
      contentTl.kill();
      unlockScroll(); // Ensure scroll is unlocked if unmounted
    };
  }, [isLoaded]);

  return (
    <div id="about-mobile" className="relative w-full bg-[#0a0a0a] text-white z-20 lg:hidden">
      
      {/* 1. HERO COMPOSITION (100vh) */}
      <div ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block transform-gpu" />
        
        {/* Gradient overlay anchored to the bottom to ensure text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
        
        {/* Loading overlay if not loaded */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mb-4" />
            <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Loading Sequence</p>
          </div>
        )}

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
