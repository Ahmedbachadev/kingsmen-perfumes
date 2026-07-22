import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductDetails } from '../../features/product/components/ProductDetails';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;
const FRAME_DIGITS = 6;
const FRAME_PREFIX = 'frame_';
const FRAME_EXTENSION = '.png';
const BASE_PATH = '/sequences/hero/desktop/';

const getFramePath = (index: number) => {
  const paddedNumber = index.toString().padStart(FRAME_DIGITS, '0');
  return `${BASE_PATH}${FRAME_PREFIX}${paddedNumber}${FRAME_EXTENSION}`;
};

export const FrameSequence = () => {
  const [, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef({ frame: 0 });

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
        if (i === 0 || loaded >= 1) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (i === 0 || loaded >= 1) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // 2. Setup Canvas & GSAP
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;

    // Helper to draw image imitating object-fit: cover
    const render = () => {
      const frameIndex = Math.round(currentFrameRef.current.frame);
      let img = images[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let k = frameIndex - 1; k >= 0; k--) {
          if (images[k] && images[k].complete && images[k].naturalWidth > 0) {
            img = images[k];
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const offsetX = (cw - nw) / 2;
      const offsetY = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, nw, nh);
    };

    // Initial render
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    handleResize(); // Size on load
    window.addEventListener('resize', handleResize);

    // Setup GSAP
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1, // Slight scrub value for extra smoothness bridging gaps between fast scroll ticks
      onUpdate: (self) => {
        // self.progress is between 0 and 1 over 800vh.
        // We want the frames to finish scrubbing at 500vh (which is 5/8 of the progress).
        const frameProgress = Math.min(self.progress / (5 / 8), 1);
        currentFrameRef.current.frame = frameProgress * (TOTAL_FRAMES - 1);
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
      {/* Container providing scroll height: 500vh for bottle + 300vh for details = 800vh */}
      <div ref={containerRef} className="relative w-full h-[800vh] bg-black">
        {/* Sticky Canvas covering the viewport */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block canvas-float" />

          {/* Second Section Overlay */}
          {isLoaded && <ProductDetails containerRef={containerRef} />}
        </div>
      </div>
    </>
  );
};
