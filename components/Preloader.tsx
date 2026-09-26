"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";

// Core sequence of greetings strictly ending on English "Hello"
const WORDS = [
  "Bonjour",
  "Ciao",
  "Hola",
  "مرحبا",
  "やあ",
  "Hallå",
  "Guten Tag",
  "হ্যালো",
  "Hello",
];

// Preceding and trailing buffer words so top and bottom rows are full from frame 0 to exit
const BUFFER_BEFORE = ["Guten Tag", "হ্যালো"];
const BUFFER_AFTER = ["Bonjour", "Ciao"];

const REEL_WORDS = [...BUFFER_BEFORE, ...WORDS, ...BUFFER_AFTER];
const START_INDEX = BUFFER_BEFORE.length; // 2 -> points to "Bonjour"
const END_INDEX = START_INDEX + WORDS.length - 1; // 10 -> points to "Hello"

interface WordRowProps {
  word: string;
  index: number;
  startIndex: number;
  y: MotionValue<number>;
  itemHeight: number;
}

function WordRow({ word, index, startIndex, y, itemHeight }: WordRowProps) {
  const rowOffset = (index - startIndex) * itemHeight;

  // Real-time distance from the focal center (in row units)
  const distUnit = useTransform(y, (currentY) => (rowOffset + currentY) / itemHeight);

  // Optical scale taper matching reference site
  const scale = useTransform(distUnit, (u) => {
    const a = Math.abs(u);
    return Math.max(0.72, 1 - a * 0.08);
  });

  // Opacity tiers: 1.0 (center) -> 0.35 (row 1) -> 0.18 (row 2) -> 0 (row 3+)
  const opacity = useTransform(distUnit, (u) => {
    const a = Math.abs(u);
    if (a <= 1) return 1.0 - 0.65 * a;
    if (a <= 2) return 0.35 - 0.17 * (a - 1);
    if (a <= 3) return 0.18 * (1 - (a - 2));
    return 0;
  });

  // Blur depth-of-field: 0px (center) -> 3px (row 1) -> 6px (row 2+)
  const blur = useTransform(distUnit, (u) => {
    const a = Math.abs(u);
    if (a <= 1) return `blur(${a * 3}px)`;
    if (a <= 2) return `blur(${3 + (a - 1) * 3}px)`;
    return `blur(6px)`;
  });

  // 3D cylindrical drum rotation
  const rotateX = useTransform(distUnit, (u) => -u * 13);

  // Subtle 3D Z depth offset
  const z = useTransform(distUnit, (u) => -Math.pow(Math.abs(u), 1.4) * 22);

  // Ambient luminous text glow when crossing focal center
  const textShadow = useTransform(distUnit, (u) => {
    return Math.abs(u) < 0.35 ? "0 0 35px rgba(96, 165, 250, 0.45)" : "none";
  });

  return (
    <motion.div
      style={{
        height: `${itemHeight}px`,
        scale,
        opacity,
        filter: blur,
        rotateX,
        z,
        textShadow,
        transformPerspective: 1000,
        transformOrigin: "center center",
      }}
      className="flex items-center justify-center w-full shrink-0 text-white font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight select-none will-change-transform leading-none"
    >
      <span dir="auto">{word}</span>
    </motion.div>
  );
}

export default function Preloader() {
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  // Motion value driving the vertical continuous reel roll
  const y = useMotionValue(0);

  const itemHeight = useMemo(() => {
    if (dimension.width === 0) return 68;
    return dimension.width < 640 ? 54 : 68;
  }, [dimension.width]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect if the user refreshed the page -> reset session flag so preloader plays
    try {
      const navEntries = performance.getEntriesByType("navigation");
      const isReload = navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload";
      if (isReload) {
        sessionStorage.removeItem("hasSeenPreloader");
      }
    } catch {}

    const urlParams = new URLSearchParams(window.location.search);
    const forcePreview = urlParams.has("preloader") || urlParams.has("preview");
    const hasSeen = sessionStorage.getItem("hasSeenPreloader") === "true";

    if (hasSeen && !forcePreview) {
      setShouldRender(false);
      return;
    }

    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;

    setDimension({
      width: initialWidth,
      height: initialHeight,
    });

    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Lock page scroll and pause Lenis
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis) {
      lenis.stop();
    }

    const currentItemHeight = initialWidth < 640 ? 54 : 68;
    const scrollDistance = (END_INDEX - START_INDEX) * currentItemHeight;

    // Reset initial y to 0
    y.set(0);

    // Butter-smooth continuous scroll with Framer reference site cubic bezier easing curve
    const controls = animate(y, -scrollDistance, {
      duration: 2.3,
      ease: [0.68, 0, 0.22, 0.98],
      onComplete: () => {
        // Hold for 400ms on final English "Hello" before triggering curtain exit
        setTimeout(() => {
          setIsFinished(true);
          try {
            sessionStorage.setItem("hasSeenPreloader", "true");
            document.documentElement.classList.add("has-seen-preloader");
          } catch {}
        }, 400);
      },
    });

    return () => {
      controls.stop();
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      if (lenis) {
        lenis.start();
      }
    };
  }, [y]);

  const curveHeight = useMemo(() => {
    if (dimension.width === 0) return 200;
    return dimension.width < 640 ? 140 : 250;
  }, [dimension.width]);

  const initialCurve = useMemo(() => {
    return `M0 0 L${dimension.width} 0 Q${dimension.width / 2} ${curveHeight} 0 0 Z`;
  }, [dimension.width, curveHeight]);

  const targetCurve = useMemo(() => {
    return `M0 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 Z`;
  }, [dimension.width]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setShouldRender(false);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
        if (lenis) {
          lenis.start();
        }
      }}
    >
      {!isFinished && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: 0 }}
          exit={{
            y: "-120%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] w-screen h-screen bg-[#02071a] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden"
        >
          {/* Deep Cinematic Navy-Blue Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,138,0.22)_0%,_rgba(15,23,42,0.45)_50%,_#02071a_85%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Perspective Reel Window (5 rows visible with mask fade) */}
          <div
            className="relative z-10 w-full overflow-hidden flex flex-col items-center justify-start"
            style={{
              height: `${itemHeight * 5}px`,
              perspective: "1000px",
              transformStyle: "preserve-3d",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 32%, black 68%, rgba(0,0,0,0.3) 86%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 14%, black 32%, black 68%, rgba(0,0,0,0.3) 86%, transparent 100%)",
            }}
          >
            {/* Sliding Reel Track */}
            <motion.div
              style={{
                y,
                willChange: "transform",
              }}
              className="flex flex-col items-center w-full shrink-0"
            >
              {REEL_WORDS.map((word, index) => (
                <WordRow
                  key={`${word}-${index}`}
                  word={word}
                  index={index}
                  startIndex={START_INDEX}
                  y={y}
                  itemHeight={itemHeight}
                />
              ))}
            </motion.div>
          </div>

          {/* Signature Fluid Curved SVG Bottom Curtain */}
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
                  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                }}
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
