import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCMSContext } from '../../contexts/CMSContext';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 119;
const FRAME_DIGITS = 6;
const FRAME_PREFIX = 'frame_';
const FRAME_EXTENSION = '.png';
const BASE_PATH = '/sequences/about/desktop/';

const getFramePath = (index: number) => {
  const paddedNumber = index.toString().padStart(FRAME_DIGITS, '0');
  return `${BASE_PATH}${FRAME_PREFIX}${paddedNumber}${FRAME_EXTENSION}`;
};

export const AboutSequence = () => {
<<<<<<< HEAD
  const { config } = useCMSContext();
  const [loadedCount, setLoadedCount] = useState(0);
=======
  const [, setLoadedCount] = useState(0);
>>>>>>> 3fef0dc (production ready version with admin panel)
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef({ frame: 0 });

  // Content Refs
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

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
    if (!isLoaded || !canvasRef.current || !containerRef.current || !stickyRef.current) return;

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
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      render();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Setup GSAP for Cinematic Entrance Transition (Canvas overlay)
    const transitionTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100vh', // Complete transition exactly as previous section unpins
        scrub: 1, // Smooth scrub
      }
    });

    // Start states for fade-in transition
    gsap.set(stickyRef.current, { opacity: 0 });
    gsap.set(canvas, { scale: 1.1, filter: 'blur(20px)' });

    transitionTl
      .to(stickyRef.current, { opacity: 1, duration: 1, ease: "power2.inOut" })
      .to(canvas, { scale: 1, filter: 'blur(0px)', duration: 1, ease: "power2.out" }, "<0.2");

    // Setup Content Reveal Timeline
    const contentTl = gsap.timeline({ paused: true });

    // Initial states for content
    gsap.set([labelRef.current, headingRef.current, descRef.current, quoteRef.current], {
      opacity: 0,
      filter: 'blur(12px)',
      y: 40
    });

    // Map exact percentages via absolute timeline positions (0 to 1)
    contentTl
      .to(labelRef.current, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.15, ease: 'power1.out' }, 0.3)
      .to(headingRef.current, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.15, ease: 'power1.out' }, 0.45)
      .to(descRef.current, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.2, ease: 'power1.out' }, 0.6)
      .to(quoteRef.current, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.15, ease: 'power1.out' }, 0.85);

    // Setup GSAP for Frame Sequence & Content Sync
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1, // Slight scrub for smooth interpolation
      onUpdate: (self) => {
        // Update frame
        currentFrameRef.current.frame = self.progress * (TOTAL_FRAMES - 1);
        render();
        // Update content timeline
        contentTl.progress(self.progress);
      },
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      transitionTl.kill();
      contentTl.kill();
      st.kill();
    };
  }, [isLoaded]);

  return (
    <>
      {/* Container providing scroll height: 400vh. Overlaps previous section by 200vh on desktop */}
      <div id="about" ref={containerRef} className="relative w-full h-[400vh] bg-transparent mt-0 lg:-mt-[200vh] z-20">

        {/* Sticky viewport container - Split Layout */}
        <div ref={stickyRef} className="sticky top-0 left-0 w-full h-screen overflow-hidden flex bg-black">

          {/* LEFT: CONTENT (40%) */}
          <div className="w-[40%] h-full flex flex-col justify-center px-12 lg:px-24 z-30 relative">
            <div className="max-w-md">
              <p
                ref={labelRef}
                className="text-[#E8D3A2] tracking-[0.3em] text-[11px] font-semibold uppercase mb-8"
              >
                Our Philosophy
              </p>

              <h2
                ref={headingRef}
                className="text-white text-4xl lg:text-5xl font-light leading-[1.15] mb-12 tracking-tight whitespace-pre-line"
              >
                {config.about.title}
              </h2>

              <div
                ref={descRef}
                className="text-gray-400 font-light text-[15px] leading-relaxed space-y-6 whitespace-pre-line"
              >
                {config.about.description}
              </div>

              <div
                ref={quoteRef}
                className="mt-16 pt-8 border-t border-white/10"
              >
                <p className="text-white/90 italic text-xl font-light tracking-wide">
                  "Luxury is not what you wear.<br />It's what people remember."
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: CANVAS (60%) */}
          <div className="w-[60%] h-full relative">
            <canvas ref={canvasRef} className="w-full h-full block transform-gpu" />
          </div>

        </div>
      </div>
    </>
  );
};
