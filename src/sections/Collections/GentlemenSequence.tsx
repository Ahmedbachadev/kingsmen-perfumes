import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 129;
const FRAME_DIGITS = 6;
const FRAME_PREFIX = 'frame_';
const FRAME_EXTENSION = '.png';
const BASE_PATH = '/sequences/gentlemen/desktop/';

const getFramePath = (index: number) => {
  const paddedNumber = index.toString().padStart(FRAME_DIGITS, '0');
  return `${BASE_PATH}${FRAME_PREFIX}${paddedNumber}${FRAME_EXTENSION}`;
};

export const GentlemenSequence: React.FC = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef({ frame: 0 });

  const [progress, setProgress] = useState(0);

  const getOpacity = (inStart: number, inEnd: number) => {
    return Math.min(Math.max((progress - inStart) / (inEnd - inStart), 0), 1);
  };
  const getY = (start: number, end: number, maxDistance: number) => {
    const p = Math.min(Math.max((progress - start) / (end - start), 0), 1);
    return maxDistance * (1 - p);
  };

  // Keep canvas fully opaque so the next section can crossfade over it
  const canvasOpacity = 1;
  const labelOpacity = getOpacity(0.0, 0.1);
  const labelY = getY(0.0, 0.1, 20);
  const headlineOpacity = getOpacity(0.05, 0.15);
  const headlineY = getY(0.05, 0.15, 40);
  const paragraphOpacity = getOpacity(0.1, 0.2);
  const paragraphY = getY(0.1, 0.2, 40);
  const buttonOpacity = getOpacity(0.15, 0.25);
  const buttonY = getY(0.15, 0.25, 40);

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => { loaded++; setLoadedCount(loaded); if (loaded === TOTAL_FRAMES) setIsLoaded(true); };
      img.onerror = () => { loaded++; setLoadedCount(loaded); if (loaded === TOTAL_FRAMES) setIsLoaded(true); };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const images = imagesRef.current;

    const render = () => {
      const frameIndex = Math.round(currentFrameRef.current.frame);
      const img = images[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width; const ch = canvas.height;
      const iw = img.naturalWidth; const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale; const nh = ih * scale;
      const offsetX = (cw - nw) / 2; const offsetY = (ch - nh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, nw, nh);
    };

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; render(); };
    handleResize();
    window.addEventListener('resize', handleResize);

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const frameProgress = Math.min(self.progress / 0.95, 1);
        currentFrameRef.current.frame = frameProgress * (TOTAL_FRAMES - 1);
        setProgress(self.progress);
        render();
      },
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      st.kill();
    };
  }, [isLoaded]);

  return (
    <>
      {/* Added id="gentlemen" for snap targeting */}
      <div id="gentlemen" ref={containerRef} className="relative w-full h-[400vh] bg-black">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ opacity: canvasOpacity }} />
          {isLoaded && (
            <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center">
              <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-start">
                <div className="max-w-xl w-full flex flex-col items-start pointer-events-auto">
                  <motion.p style={{ opacity: labelOpacity, y: labelY }} className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#CFA44F] font-light mb-6 md:mb-8">
                    Gentlemen Collection
                  </motion.p>
                  <motion.h2 style={{ opacity: headlineOpacity, y: headlineY }} className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#FDFBF7] leading-[1.1] tracking-tight mb-8 md:mb-10">
                    Crafted for <br />
                    Modern <br />
                    Gentlemen
                  </motion.h2>
                  <motion.p style={{ opacity: paragraphOpacity, y: paragraphY }} className="text-[#A3A3A3] font-sans text-base md:text-lg leading-relaxed font-light mb-10 max-w-md">
                    Discover the essence of sophisticated masculinity.
                    A bold curation of deep woods, refined spices, and confident accords
                    designed to command the room and leave an unforgettable signature.
                  </motion.p>
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