"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Multilingual greetings sequence strictly ending on English "Hello"
const words = [
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

// Padding algorithm cloned 1:1 from Framer reference site
// Ensures continuous drum wrap with words always visible above and below
const PADDING_FACTOR = Math.ceil(4 / (words.length || 1));
const paddedWords = Array(PADDING_FACTOR).fill(words).flat();
const ALL_WORDS = [...paddedWords, ...words, ...paddedWords];
const START_INDEX = paddedWords.length; // points to words[0] ("Bonjour")
const END_INDEX = START_INDEX + words.length - 1; // points to words[last] ("Hello")

// Opacity and blur tiers matching reference site
const OPACITY_TIERS = { center: 1.0, mid: 0.35, edge: 0.18 };
const BLUR_TIERS = { center: 0, mid: 3, edge: 6 };

export default function Preloader() {
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fast check for session storage
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forcePreview = urlParams.has("preloader") || urlParams.has("preview");
      const hasSeen = sessionStorage.getItem("hasSeenPreloader") === "true";

      if (hasSeen && !forcePreview) {
        setShouldRender(false);
        return;
      }
    } catch {}

    // Register GSAP CustomEase plugin
    try {
      gsap.registerPlugin(CustomEase);
      CustomEase.create("framerReel", "0.68, 0, 0.22, 0.98");
    } catch {
      // fallback handled if plugin already registered
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

    // Lock page scroll and pause Lenis
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis) {
      lenis.stop();
    }

    // Responsive word spacing (in rem)
    const spacing = window.innerWidth < 640 ? 4.75 : 6.2;

    // Direct DOM update function matching reference site physics & perspective
    const updateWordTransforms = (currentProgress: number) => {
      wordRefs.current.forEach((el, index) => {
        if (!el) return;

        const diff = index - currentProgress;
        const absDiff = Math.abs(diff);

        // Opacity tiers formula from reference site
        let opacity = 0;
        if (absDiff <= 1) {
          opacity = OPACITY_TIERS.center + (OPACITY_TIERS.mid - OPACITY_TIERS.center) * absDiff;
        } else if (absDiff <= 2) {
          opacity = OPACITY_TIERS.mid + (OPACITY_TIERS.edge - OPACITY_TIERS.mid) * (absDiff - 1);
        } else if (absDiff <= 3) {
          opacity = OPACITY_TIERS.edge * (1 - (absDiff - 2));
        }
        if (opacity < 0) opacity = 0;

        // Blur tiers formula from reference site
        let blur = 0;
        if (absDiff <= 1) {
          blur = BLUR_TIERS.center + (BLUR_TIERS.mid - BLUR_TIERS.center) * absDiff;
        } else if (absDiff <= 2) {
          blur = BLUR_TIERS.mid + (BLUR_TIERS.edge - BLUR_TIERS.mid) * (absDiff - 1);
        } else {
          blur = BLUR_TIERS.edge;
        }

        // Perspective scale & cylindrical wheel depth
        const scale = Math.max(0.72, 1 - absDiff * 0.08);
        const rotateX = -diff * 13; // degrees of cylindrical rotation
        const translateZ = -Math.pow(absDiff, 1.4) * 22; // 3D depth offset in px
        const yRem = diff * spacing;

        const isVisible = opacity > 0.005;

        // Apply GPU-accelerated 3D transforms directly to DOM node
        el.style.transform = `translate3d(-50%, calc(-50% + ${yRem}rem), ${translateZ}px) scale(${scale}) rotateX(${rotateX}deg)`;
        el.style.opacity = `${opacity}`;
        el.style.filter = `blur(${blur}px)`;
        el.style.visibility = isVisible ? "visible" : "hidden";

        // Subtle center glow highlight when crossing the focal center
        if (absDiff < 0.35) {
          el.style.textShadow = "0 0 35px rgba(96, 165, 250, 0.4)";
        } else {
          el.style.textShadow = "none";
        }
      });
    };

    // Initialize initial frame at START_INDEX immediately
    updateWordTransforms(START_INDEX);

    // Create GSAP Timeline with Framer-matched custom ease and tempo
    const animState = { progress: START_INDEX };
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        // Pause briefly (~400ms) on final English "Hello" before curtain exit
        setTimeout(() => {
          // Soft upward lift and fade on settled greeting text
          if (textContainerRef.current) {
            gsap.to(textContainerRef.current, {
              y: "-=7vh",
              opacity: 0,
              filter: "blur(10px)",
              duration: 0.5,
              ease: "power2.in",
            });
          }

          // Trigger curved curtain upward reveal
          setIsFinished(true);
          try {
            sessionStorage.setItem("hasSeenPreloader", "true");
            document.documentElement.classList.add("has-seen-preloader");
          } catch {}
        }, 400);
      },
    });

    timelineRef.current = tl;

    // Smooth continuous reel roll with inertia into final word
    tl.to(animState, {
      progress: END_INDEX,
      duration: 2.4,
      ease: CustomEase.get("framerReel") || "power3.inOut",
      onUpdate: () => {
        updateWordTransforms(animState.progress);
      },
    });

    return () => {
      tl.kill();
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      if (lenis) {
        lenis.start();
      }
    };
  }, []);

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
          {/* Deep Cinematic Navy-Blue Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,138,0.22)_0%,_rgba(15,23,42,0.45)_50%,_#02071a_85%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Perspective Reel Window with Mask Fade */}
          <div
            ref={containerRef}
            className="relative z-10 w-full h-[360px] sm:h-[420px] flex items-center justify-center overflow-hidden"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 12%, black 28%, black 72%, rgba(0,0,0,0.3) 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 12%, black 28%, black 72%, rgba(0,0,0,0.3) 88%, transparent 100%)",
            }}
          >
            {/* Word Reel Wrapper */}
            <div
              ref={textContainerRef}
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {ALL_WORDS.map((word, index) => (
                <p
                  key={`${word}-${index}`}
                  ref={(el) => {
                    wordRefs.current[index] = el;
                  }}
                  dir="auto"
                  className="absolute top-1/2 left-1/2 m-0 p-0 text-white font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none whitespace-nowrap select-none will-change-transform"
                  style={{
                    transformOrigin: "center center",
                    visibility: "hidden",
                    opacity: 0,
                  }}
                >
                  {word}
                </p>
              ))}
            </div>
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
