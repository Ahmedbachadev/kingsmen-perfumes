import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HeroMobileOverlay } from './HeroMobileOverlay';

const _TOTAL_FRAMES = 108;
const FRAME_STEP = 3;
const TOTAL_FRAMES = Math.ceil(_TOTAL_FRAMES / FRAME_STEP);
const FRAME_DIGITS = 6;
const FRAME_PREFIX = 'frame_';
const FRAME_EXTENSION = '.png';
const BASE_PATH = '/sequences/hero/mobile/';

const getFramePath = (index: number) => {
  const realIndex = index * FRAME_STEP;
  const paddedNumber = realIndex.toString().padStart(FRAME_DIGITS, '0');
  return `${BASE_PATH}${FRAME_PREFIX}${paddedNumber}${FRAME_EXTENSION}`;
};

export const HeroMobile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef({ frame: 0 });
  const hasPlayedRef = useRef(false);
  const wantsToPlayRef = useRef(false);

  // Helper to draw a specific frame
  const drawFrame = (frameIndex: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
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

  const playAnimation = () => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    window.dispatchEvent(new CustomEvent('lenis-lock'));

    gsap.to(currentFrameRef.current, {
      frame: TOTAL_FRAMES - 1,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        drawFrame(Math.round(currentFrameRef.current.frame));
      },
      onComplete: () => {
        window.dispatchEvent(new CustomEvent('lenis-unlock'));
        setIsSequenceComplete(true);
      }
    });
  };

  // 1. Preload Images & Setup Canvas sizing
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(Math.round(currentFrameRef.current.frame));
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial size
    handleResize();

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        loaded++;

        // Draw the very first frame immediately so it's not black
        if (i === 0) {
          handleResize(); // Make sure canvas is sized
          drawFrame(0);
        }

        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.src = getFramePath(i);
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      window.removeEventListener('resize', handleResize);
      window.dispatchEvent(new CustomEvent('lenis-unlock'));
    };
  }, []);

  // 2. Playback Logic (triggered when fully loaded)
  const [isLoaderDone, setIsLoaderDone] = useState(false);

  useEffect(() => {
    // Wait for the 4s GlobalLoader + 0.5s fade out to complete
    const timer = setTimeout(() => {
      setIsLoaderDone(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded && isLoaderDone && !hasPlayedRef.current) {
      playAnimation();
    }
  }, [isLoaded, isLoaderDone]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <HeroMobileOverlay isSequenceComplete={isSequenceComplete} />
    </div>
  );
};
