'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { usePathname } from 'next/navigation';

const words = [
  'Bonjour',
  'Ciao',
  'Hola',
  'مرحبا',
  'やあ',
  'Hallå',
  'Guten Tag',
  'হ্যালো',
  'Hello',
];

const STORAGE_KEY = 'hasSeenPreloader';

// Prepend 2 words so rows -1 and -2 are filled above "Bonjour"
// Append 2 words so rows +1 and +2 are filled below "Hello"
const prefix = ['হ্যালো', 'Hello'];
const suffix = ['Bonjour', 'Ciao'];
const reelList = [...prefix, ...words, ...suffix];
const START_INDEX = prefix.length; // Index 2 ("Bonjour")
const END_INDEX = prefix.length + words.length - 1; // Index 10 ("Hello")

const ITEM_HEIGHT = 64; // px per row item
const CONTAINER_HEIGHT = ITEM_HEIGHT * 5; // 320px (5 visible rows)
const CENTER_OFFSET = 2 * ITEM_HEIGHT; // 128px (row 3 is center)

export default function Preloader() {
  const pathname = usePathname();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const [checkedStorage, setCheckedStorage] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const reelRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const isRoot = pathname === '/';
    const urlParams = new URLSearchParams(window.location.search);
    const forcePreview = urlParams.has('preloader') || urlParams.has('preview');

    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      hasSeen = false;
    }

    if ((hasSeen || !isRoot) && !forcePreview) {
      setLoading(false);
      setCheckedStorage(true);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    // First time in this session:
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setLoading(true);
    setCheckedStorage(true);

    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname]);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (!loading) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Pause Lenis smooth scroll if present
    const checkLenis = () => {
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis) {
        lenis.stop();
      }
    };
    checkLenis();
    const lenisCheckTimer = setTimeout(checkLenis, 300);

    return () => {
      clearTimeout(lenisCheckTimer);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
      if (lenis) {
        lenis.start();
      }
    };
  }, [loading]);

  // Update drum reel items on each animation frame
  const updateReel = (progress: number) => {
    // Translate the flex reel container vertically
    if (reelRef.current) {
      const currentY = CENTER_OFFSET - progress * ITEM_HEIGHT;
      reelRef.current.style.transform = `translateY(${currentY}px)`;
    }

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const a = Math.abs(i - progress);

      // Exact Opacity Tiers replicated from greatingloader.framer.website:
      // center (0): 1.0 | mid (1): 0.40 | edge (2): 0.18 | beyond (3): 0.0
      let opacity = 0;
      if (a <= 1) {
        opacity = 1 + (0.4 - 1) * a;
      } else if (a <= 2) {
        opacity = 0.4 + (0.18 - 0.4) * (a - 1);
      } else if (a <= 3) {
        opacity = 0.18 * (1 - (a - 2));
      }
      opacity = Math.max(0, opacity);

      // Exact Blur Tiers: Center (a=0) is strictly 0px blur
      const blur = a <= 1 ? 0 + 2.5 * a : a <= 2 ? 2.5 + 2.5 * (a - 1) : 5;

      // Wheel perspective scale taper
      const scale = a <= 1 ? 1 - 0.08 * a : a <= 2 ? 0.92 - 0.1 * (a - 1) : 0.82;

      el.style.opacity = `${opacity}`;
      el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : 'none';
      el.style.transform = `scale(${scale})`;

      // Minimalist, crisp typography matching greatingloader.framer.website:
      if (a < 0.3) {
        el.style.fontWeight = '500';
        el.style.color = '#ffffff';
      } else {
        el.style.fontWeight = '400';
        el.style.color = 'rgba(255, 255, 255, 0.4)';
      }
    });
  };

  // Mount guard to allow layout to settle before revealing text (zero overlap flash)
  useEffect(() => {
    if (!loading || !checkedStorage) return;

    // Position initial frame before revealing text
    updateReel(START_INDEX);

    const readyRaf = requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => cancelAnimationFrame(readyRaf);
  }, [loading, checkedStorage]);

  // Continuous fluid reel scroll animation with Framer's signature physics
  useEffect(() => {
    if (!loading || !checkedStorage || !isReady) return;

    let exitTimeoutId: ReturnType<typeof setTimeout>;

    // Exact Framer reel inertia curve [.68, 0, .22, .98]
    const controls = animate(START_INDEX, END_INDEX, {
      duration: 2.4, // Fluid tempo matching reference site
      ease: [0.68, 0, 0.22, 0.98],
      onUpdate: (latest) => {
        updateReel(latest);
      },
      onComplete: () => {
        // Pause briefly (~400ms) on "Hello" before triggering the signature curved SVG curtain reveal
        exitTimeoutId = setTimeout(() => {
          setLoading(false);
          try {
            sessionStorage.setItem(STORAGE_KEY, 'true');
            document.documentElement.classList.add('has-seen-preloader');
          } catch {
            // ignore private browsing quota errors
          }
        }, 400);
      },
    });

    return () => {
      controls.stop();
      if (exitTimeoutId) clearTimeout(exitTimeoutId);
    };
  }, [loading, checkedStorage, isReady]);

  const curveHeight = useMemo(() => {
    if (dimension.width === 0) return 200;
    return dimension.width < 640 ? 140 : 260;
  }, [dimension.width]);

  const initialCurve = useMemo(() => {
    return `M0 0 L${dimension.width} 0 Q${dimension.width / 2} ${curveHeight} 0 0 Z`;
  }, [dimension.width, curveHeight]);

  const targetCurve = useMemo(() => {
    return `M0 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 Z`;
  }, [dimension.width]);

  // Fast Exit: If in browser and already seen or not on root, return null immediately
  if (typeof window !== 'undefined') {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forcePreview = urlParams.has('preloader') || urlParams.has('preview');
      if (!forcePreview && (sessionStorage.getItem(STORAGE_KEY) === 'true' || window.location.pathname !== '/')) {
        return null;
      }
    } catch {}
  }

  if (checkedStorage && !loading) {
    return null;
  }

  const initialY = CENTER_OFFSET - START_INDEX * ITEM_HEIGHT;

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // Cleanly restore scroll when animation finishes
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
        if (lenis) {
          lenis.start();
        }
      }}
    >
      {loading && (
        <motion.div
          key="framer-clone-preloader"
          initial={{ y: 0 }}
          exit={{
            y: `calc(-100% - ${curveHeight}px)`,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
          }}
          className="preloader-root fixed inset-0 z-[9999] w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#02071a] select-none pointer-events-auto"
        >
          {/* Subtle cinematic navy ambient glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_65%)]" />

          {/* Vertical Reel Window with Soft Gradient Edge Fade */}
          <div
            className="font-preloader relative w-full flex items-center justify-center overflow-hidden pointer-events-none z-10"
            style={{
              height: `${CONTAINER_HEIGHT}px`,
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
            }}
          >
            {/* Rigid vertical flex container to prevent any word collapsing or stacking */}
            <div className={`w-full transition-opacity duration-150 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
              <div
                ref={reelRef}
                className="w-full flex flex-col items-center"
                style={{
                  transform: `translateY(${initialY}px)`,
                  willChange: 'transform',
                }}
              >
                {reelList.map((word, i) => (
                  <div
                    key={i}
                    style={{ height: `${ITEM_HEIGHT}px` }}
                    className="w-full flex items-center justify-center shrink-0"
                  >
                    <p
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      dir="auto"
                      style={{
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'Inter', 'Geist', 'Segoe UI', sans-serif",
                        lineHeight: 1.15,
                        margin: 0,
                        whiteSpace: 'nowrap',
                        willChange: 'transform, opacity, filter',
                      }}
                      className="font-preloader text-3xl sm:text-5xl font-medium tracking-normal text-white select-none text-center antialiased"
                    >
                      {word}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fluid Curved Bottom SVG Curtain */}
          {dimension.width > 0 && (
            <svg
              className="absolute top-[calc(100%-2px)] left-0 w-full pointer-events-none fill-[#02071a]"
              style={{ height: `${curveHeight}px` }}
              viewBox={`0 0 ${dimension.width} ${curveHeight}`}
              preserveAspectRatio="none"
            >
              <motion.path
                initial={{ d: initialCurve }}
                exit={{
                  d: targetCurve,
                  transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
                }}
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
