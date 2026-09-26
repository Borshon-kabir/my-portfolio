"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("hasSeenPreloader");
      if (hasSeen) {
        setShouldRender(false);
        return;
      }
    }

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Interval to cycle words
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Hold on final English "Hello" then trigger exit
          setTimeout(() => {
            setIsFinished(true);
            sessionStorage.setItem("hasSeenPreloader", "true");
            setTimeout(() => {
              setShouldRender(false);
              document.body.style.overflow = "";
            }, 800);
          }, 450);
          return prev;
        }
      });
    }, 160);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isFinished ? (
        <motion.div
          key="preloader-curtain"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] w-screen h-screen bg-[#02071a] flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#02071a] to-[#01040f] pointer-events-none" />

          {/* Reel Window (5 rows visible) */}
          <div
            className="relative z-10 w-full flex items-center justify-center overflow-hidden"
            style={{
              height: `${ITEM_HEIGHT * 5}px`,
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)"
            }}
          >
            {/* Sliding Reel */}
            <motion.div
              animate={{
                y: -index * ITEM_HEIGHT + ITEM_HEIGHT * 2
              }}
              transition={{
                duration: 0.18,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex flex-col items-center w-full"
            >
              {words.map((word, i) => {
                const distance = Math.abs(i - index);
                const isActive = distance === 0;

                return (
                  <div
                    key={word}
                    style={{ height: `${ITEM_HEIGHT}px` }}
                    className={`flex items-center justify-center w-full transition-all duration-150 ${
                      isActive
                        ? "text-white text-4xl sm:text-5xl font-medium tracking-tight opacity-100 scale-100"
                        : distance === 1
                        ? "text-white/40 text-2xl sm:text-3xl font-normal opacity-40 scale-90"
                        : distance === 2
                        ? "text-white/15 text-xl sm:text-2xl font-light opacity-20 scale-80"
                        : "opacity-0"
                    }`}
                  >
                    {word}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
