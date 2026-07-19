import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HeroMobileOverlay } from './HeroMobileOverlay';

const TOTAL_FRAMES = 108;
const FRAME_DIGITS = 6;
const FRAME_PREFIX = 'frame_';
const FRAME_EXTENSION = '.png';
const BASE_PATH = '/sequences/hero/mobile/';

const getFramePath = (index: number) => {
  const paddedNumber = index.toString().padStart(FRAME_DIGITS, '0');
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

    // Lock scroll during animation
    window.dispatchEvent(new CustomEvent('lenis-lock'));
    document.body.style.overflow = 'hidden';

    gsap.to(currentFrameRef.current, {
      frame: TOTAL_FRAMES - 1,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        drawFrame(Math.round(currentFrameRef.current.frame));
      },
      onComplete: () => {
        window.dispatchEvent(new CustomEvent('lenis-unlock'));
        document.body.style.overflow = '';
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
    };
  }, []);

  // 2. Playback Logic (triggered when fully loaded IF user wanted to play)
  useEffect(() => {
    if (isLoaded && wantsToPlayRef.current && !hasPlayedRef.current) {
      playAnimation();
    }
  }, [isLoaded]);

  // 3. Scroll Interception
  useEffect(() => {
    // If it has already played, do not attach any listeners!
    if (hasPlayedRef.current) return;

    const handleScrollAttempt = (e: Event) => {
      if (hasPlayedRef.current) return;

      // Remove the listeners IMMEDIATELY so they don't block native mobile scrolling after the animation
      window.removeEventListener('wheel', handleScrollAttempt);
      window.removeEventListener('touchmove', handleScrollAttempt);

      // User tried to scroll. Stop them.
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('lenis-lock'));
      document.body.style.overflow = 'hidden';

      if (isLoaded) {
        // If loaded, play immediately
        playAnimation();
      } else {
        // Queue it to play as soon as loading finishes
        wantsToPlayRef.current = true;
      }
    };

    window.addEventListener('wheel', handleScrollAttempt, { passive: false });
    window.addEventListener('touchmove', handleScrollAttempt, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScrollAttempt);
      window.removeEventListener('touchmove', handleScrollAttempt);
    };
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <HeroMobileOverlay isSequenceComplete={isSequenceComplete} />
    </div>
  );
};
