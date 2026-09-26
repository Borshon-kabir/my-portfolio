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

// Build continuous drum reel list matching the Framer reference
// [words] + [words] + [words] creates an uninterrupted reel
const reelList = [...words, ...words, ...words];
const START_INDEX = words.length; // Index 9 (First "Bonjour" in middle set)
const END_INDEX = START_INDEX + words.length - 1; // Index 17 ("Hello" in middle set)

export default function Preloader() {
  const pathname = usePathname();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
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

    // If user has already seen it in this session (or refreshed the page), or not on root
    if ((hasSeen || !isRoot) && !forcePreview) {
      setIsLoading(false);
      setHasChecked(true);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    // First time in this session:
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setIsLoading(true);
    setHasChecked(true);

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
    if (!isLoading) return;

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
  }, [isLoading]);

  // Update drum reel items on each animation frame
  const updateReel = (progress: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    // Spacing between rows in rem (matching Framer's clean vertical rhythm)
    const spacingRem = isMobile ? 4.5 : 5.6;

    itemRefs.current.forEach((el, n) => {
      if (!el) return;

      const r = n - progress;
      const a = Math.abs(r);

      // Cull items outside 5-row visible perspective window
      if (a > 3.2) {
        el.style.display = 'none';
        return;
      }

      el.style.display = 'block';

      // Vertical translation in rem
      const s = r * spacingRem;

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

      // Exact Blur Tiers: Center is strictly 0px blur
      const blur = a <= 1 ? 0 + 2.5 * a : a <= 2 ? 2.5 + 2.5 * (a - 1) : 5;

      // Wheel perspective scale taper
      const scale = a <= 1 ? 1 - 0.08 * a : a <= 2 ? 0.92 - 0.1 * (a - 1) : 0.82;

      el.style.transform = `translate(-50%, calc(-50% + ${s}rem)) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : 'none';

      // Minimalist, crisp typography matching greatingloader.framer.website:
      // No heavy glow, no text-shadow, clean font-medium weight
      if (a < 0.3) {
        el.style.fontWeight = '500';
        el.style.color = '#ffffff';
        el.style.textShadow = 'none';
      } else {
        el.style.fontWeight = '400';
        el.style.color = 'rgba(255, 255, 255, 0.4)';
        el.style.textShadow = 'none';
      }
    });
  };

  // Continuous fluid reel scroll animation with Framer's signature physics
  useEffect(() => {
    if (!isLoading) return;

    // Immediately render initial frame at START_INDEX
    updateReel(START_INDEX);

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
          setIsLoading(false);
          try {
            sessionStorage.setItem(STORAGE_KEY, 'true');
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
  }, [isLoading]);

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

  // Fast-path: If in browser and already seen in sessionStorage before hydration completes, render nothing
  if (!hasChecked && typeof window !== 'undefined') {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
        return null;
      }
    } catch {}
  }

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
      {isLoading && (
        <motion.div
          key="framer-clone-preloader"
          initial={{ y: 0 }}
          exit={{
            y: `calc(-100% - ${curveHeight}px)`,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
          }}
          className="fixed inset-0 z-[999] w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030718] select-none pointer-events-auto"
        >
          {/* Subtle cinematic navy ambient glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_65%)]" />

          {/* Vertical Reel Window with Soft Gradient Edge Fade & Clean Sans-Serif Font */}
          <div
            className="font-preloader relative w-full h-[360px] sm:h-[420px] flex items-center justify-center overflow-hidden pointer-events-none z-10"
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Geist', 'Segoe UI', sans-serif",
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
            }}
          >
            {reelList.map((word, i) => (
              <p
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                dir="auto"
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Geist', 'Segoe UI', sans-serif",
                  letterSpacing: 'normal',
                  lineHeight: 1.15,
                  margin: 0,
                  whiteSpace: 'nowrap',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  willChange: 'transform, opacity, filter',
                }}
                className="font-preloader text-3xl sm:text-5xl font-medium tracking-normal text-white select-none text-center antialiased"
              >
                {word}
              </p>
            ))}
          </div>

          {/* Fluid Curved Bottom SVG Curtain */}
          {dimension.width > 0 && (
            <svg
              className="absolute top-[calc(100%-2px)] left-0 w-full pointer-events-none fill-[#030718]"
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
