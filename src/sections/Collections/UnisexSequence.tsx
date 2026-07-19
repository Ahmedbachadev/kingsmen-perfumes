import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSContext } from '../../contexts/CMSContext';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 130;
const FRAME_DIGITS = 6;
const FRAME_PREFIX = 'frame_';
const FRAME_EXTENSION = '.jpg';
const BASE_PATH = '/sequences/unisex/desktop/';

const getFramePath = (index: number) => {
  const paddedNumber = index.toString().padStart(FRAME_DIGITS, '0');
  return `${BASE_PATH}${FRAME_PREFIX}${paddedNumber}${FRAME_EXTENSION}`;
};

export const UnisexSequence: React.FC = () => {
  const { config } = useCMSContext();
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef({ frame: 0 });

  const [progress, setProgress] = useState(0);

  // UI Animations driven directly by GSAP progress
  const getOpacity = (start: number, end: number) => {
    return Math.min(Math.max((progress - start) / (end - start), 0), 1);
  };
  const getY = (start: number, end: number, maxDistance: number) => {
    const p = Math.min(Math.max((progress - start) / (end - start), 0), 1);
    return maxDistance * (1 - p);
  };

  // Canvas fades in from 0 to 1 very quickly (0.0 to 0.05) to crossfade over the previous section
  const canvasOpacity = getOpacity(0.0, 0.05);

  // UI elements fade in (0.15 to 0.25). 
  // We do NOT fade them out at the end, as requested.
  const labelOpacity = getOpacity(0.15, 0.25);
  const labelY = getY(0.15, 0.25, 20);

  const headlineOpacity = getOpacity(0.2, 0.3);
  const headlineY = getY(0.2, 0.3, 40);

  const paragraphOpacity = getOpacity(0.25, 0.35);
  const paragraphY = getY(0.25, 0.35, 40);

  const buttonOpacity = getOpacity(0.3, 0.4);
  const buttonY = getY(0.3, 0.4, 40);

  // 1. Preload Images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // 2. Setup Canvas & GSAP
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current || !stickyRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;

    const render = () => {
      const frameIndex = Math.round(currentFrameRef.current.frame);
      const img = images[frameIndex];

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Using Math.max to make it cover/fit the entire screen size
      const scale = Math.max(cw / iw, ch / ih);

      const nw = iw * scale;
      const nh = ih * scale;
      const offsetX = (cw - nw) / 2;
      const offsetY = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, nw, nh);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        // Delay the start slightly for the crossfade overlap (starts at 0.02)
        // Frames finish by 0.9 so the final frame holds before unpinning
        const frameProgress = Math.min(Math.max((self.progress - 0.02) / 0.88, 0), 1);
        currentFrameRef.current.frame = frameProgress * (TOTAL_FRAMES - 1);
        setProgress(self.progress);
        render();
      },
    });

    // Crossfade Transition
    const transitionTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100vh', // Transition completes exactly over the 100vh overlap
        scrub: 1,
      }
    });

    gsap.set(stickyRef.current, { opacity: 0 });
    transitionTl.to(stickyRef.current, { opacity: 1, duration: 1, ease: 'power2.inOut' });

    return () => {
      window.removeEventListener('resize', handleResize);
      st.kill();
      transitionTl.kill();
    };
  }, [isLoaded]);

  return (
    <>
      {/* Added id="unisex" for snap targeting */}
      {/* -mt-[100vh] creates an overlap with the last 100vh of the Ladies section.
          Since this is later in the DOM, it renders on top and fades in its sticky container.
          This achieves a perfect dissolve. */}
      <div id="unisex" ref={containerRef} className="relative w-full h-[400vh] bg-transparent -mt-[100vh] z-30">
        <div ref={stickyRef} className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">

          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            style={{ opacity: canvasOpacity }}
          />

          {isLoaded && (
            <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center">
              <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-start">

                <div className="max-w-xl w-full flex flex-col items-start pointer-events-auto">

                  <p
                    style={{ opacity: labelOpacity, transform: `translateY(${labelY}px)` }}
                    className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#EBD5B3] font-light mb-6 md:mb-8"
                  >
                    Unisex Collection
                  </p>

                  <h2
                    style={{ opacity: headlineOpacity, transform: `translateY(${headlineY}px)` }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FDFBF7] leading-[1.1] tracking-tight mb-8 md:mb-10 whitespace-pre-line"
                  >
                    {config.collections.unisex.title}
                  </h2>

                  <p
                    style={{ opacity: paragraphOpacity, transform: `translateY(${paragraphY}px)` }}
                    className="text-[#A3A3A3] font-sans text-base md:text-lg leading-relaxed font-light mb-10 max-w-md whitespace-pre-line"
                  >
                    {config.collections.unisex.description}
                  </p>

                  <div style={{ opacity: buttonOpacity, transform: `translateY(${buttonY}px)` }}>
                    <button className="group relative px-10 py-5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:bg-white/[0.1] hover:border-white/20 text-[#FDFBF7] transition-all duration-500 ease-out overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="absolute inset-0 w-full h-full -skew-x-[20deg] translate-x-[-150%] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent group-hover:animate-[specular_1.5s_ease-in-out_infinite]" />
                      <span className="relative z-10 text-sm tracking-widest font-light uppercase drop-shadow-md">
                        Explore Collection
                      </span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
