"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";

const words = [
  "Bonjour",
  "Ciao",
  "Hola",
  "مرحبا",
  "やあ",
  "Hallå",
  "Guten Tag",
  "হ্যালো",
  "Hello"
];

const ITEM_HEIGHT = 56; // height per word row
const CONTAINER_HEIGHT = ITEM_HEIGHT * 5; // 280px (5 visible rows)
const TOTAL_DISTANCE = (words.length - 1) * ITEM_HEIGHT; // 448px

interface WordRowProps {
  word: string;
  index: number;
  y: MotionValue<number>;
  itemHeight: number;
}

function WordRow({ word, index, y, itemHeight }: WordRowProps) {
  // Dynamically compute scale as the word glides across the focal center
  const scale = useTransform(y, (currentY) => {
    const dist = Math.abs(index * itemHeight + currentY);
    if (dist < itemHeight) {
      return 1 - (dist / itemHeight) * 0.12;
    }
    return 0.88;
  });

  // Dynamically compute opacity: 100% in center, 45% in row ±1, 20% in row ±2
  const opacity = useTransform(y, (currentY) => {
    const dist = Math.abs(index * itemHeight + currentY);
    if (dist < itemHeight) {
      return 1 - (dist / itemHeight) * 0.55;
    }
    if (dist < itemHeight * 2) {
      return 0.45 - ((dist - itemHeight) / itemHeight) * 0.25;
    }
    return 0.2;
  });

  return (
    <motion.div
      style={{
        height: `${itemHeight}px`,
        scale,
        opacity,
      }}
      className="flex items-center justify-center w-full shrink-0 text-white text-3xl sm:text-5xl font-medium tracking-tight select-none"
    >
      <span dir="auto">{word}</span>
    </motion.div>
  );
}

export default function Preloader() {
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  // Motion value driving the continuous vertical reel roll
  const y = useMotionValue(0);

  useEffect(() => {
    // Fast check for session storage
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const forcePreview = urlParams.has("preloader") || urlParams.has("preview");
      const hasSeen = sessionStorage.getItem("hasSeenPreloader") === "true";

      if (hasSeen && !forcePreview) {
        setShouldRender(false);
        return;
      }

      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setDimension({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      // Lock body and HTML scroll
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Pause Lenis smooth scroll if active
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis) {
        lenis.stop();
      }

      // Continuous fluid reel roll animation with real momentum and inertia
      const controls = animate(y, -TOTAL_DISTANCE, {
        duration: 2.1, // Total smooth continuous roll duration
        ease: [0.22, 1, 0.36, 1], // Natural weighted momentum into "Hello"
        onComplete: () => {
          // Hold for 400ms on the final English "Hello" before triggering curtain exit
          setTimeout(() => {
            setIsFinished(true);
            try {
              sessionStorage.setItem("hasSeenPreloader", "true");
              document.documentElement.classList.add("has-seen-preloader");
            } catch {
              // ignore storage errors
            }
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
    }
  }, [y]);

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

  // Fast exit in browser if already seen
  if (typeof window !== "undefined") {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forcePreview = urlParams.has("preloader") || urlParams.has("preview");
      if (!forcePreview && sessionStorage.getItem("hasSeenPreloader") === "true") {
        return null;
      }
    } catch {}
  }

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
            y: `calc(-100% - ${curveHeight}px)`,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] w-screen h-screen bg-[#02071a] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#02071a] to-[#01040f] pointer-events-none" />

          {/* Reel Window (5 rows visible with top/bottom gradient fade) */}
          <div
            className="relative z-10 w-full flex items-center justify-center overflow-hidden"
            style={{
              height: `${CONTAINER_HEIGHT}px`,
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 15%, black 32%, black 68%, rgba(0,0,0,0.3) 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 15%, black 32%, black 68%, rgba(0,0,0,0.3) 85%, transparent 100%)",
            }}
          >
            {/* Continuously Sliding Reel with rigid item heights */}
            <motion.div
              style={{
                y,
                paddingTop: `${ITEM_HEIGHT * 2}px`,
                paddingBottom: `${ITEM_HEIGHT * 2}px`,
                willChange: "transform",
              }}
              className="flex flex-col items-center w-full"
            >
              {words.map((word, i) => (
                <WordRow
                  key={word}
                  word={word}
                  index={i}
                  y={y}
                  itemHeight={ITEM_HEIGHT}
                />
              ))}
            </motion.div>
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
