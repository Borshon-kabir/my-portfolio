'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ============================================================================
// CUSTOMIZABLE STORY CONFIGURATION
// Easily replace the two images, text, and details here:
// ============================================================================
export const STORY_CONFIG = {
  // Section name / title (exactly as requested: "My Story")
  sectionTitle: 'My Story',

  // Main story statement
  storyText:
    "I started editing with a simple curiosity: how can raw footage become a story people actually want to watch?\n\nOver the past 1.5+ years, I’ve built my skills around that idea combining precise pacing, motion graphics, sound design, and visual storytelling to make every moment serve a purpose.\n\nToday, I focus on documentary and story-driven content, where the edit isn’t just about making footage look good, it’s about creating curiosity, clarity, and momentum from beginning to end.\n\nI’m still growing, experimenting, and refining my craft with every project. But one thing remains constant: I care about making edits that have a reason to exist.",

  paragraphs: [
    "I started editing with a simple curiosity: how can raw footage become a story people actually want to watch?",
    "Over the past 1.5+ years, I’ve built my skills around that idea combining precise pacing, motion graphics, sound design, and visual storytelling to make every moment serve a purpose.",
    "Today, I focus on documentary and story-driven content, where the edit isn’t just about making footage look good, it’s about creating curiosity, clarity, and momentum from beginning to end.",
    "I’m still growing, experimenting, and refining my craft with every project. But one thing remains constant: I care about making edits that have a reason to exist.",
  ],

  // First photo (Left Polaroid with pin) - easily replace or update image path
  image1: {
    src: '/images/my-story-1.jpg',
    alt: 'My Story portrait left',
  },

  // Second photo (Right Polaroid with pin) - easily replace or update image path
  image2: {
    src: '/images/my-story-2.jpg',
    alt: 'My Story portrait right',
  },
};

// Hyper-realistic 3D metallic pushpin / thumbtack component
function PushPin({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Soft cast shadow on the polaroid paper */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-2 rounded-full bg-black/45 blur-[2px] transform scale-y-75" />

      {/* 3D Glossy Black Thumbtack Head */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md z-10"
      >
        <defs>
          <radialGradient
            id="pinSpecular"
            cx="32%"
            cy="28%"
            r="68%"
            fx="28%"
            fy="24%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#9a9ba4" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#1e1f26" stopOpacity="1" />
            <stop offset="100%" stopColor="#08080c" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="pinCollar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#434450" />
            <stop offset="50%" stopColor="#181920" />
            <stop offset="100%" stopColor="#0a0a0d" />
          </linearGradient>
          <filter id="pinDropShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" floodColor="#000000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Pin base rim */}
        <ellipse cx="16" cy="21" rx="7" ry="3.5" fill="url(#pinCollar)" />

        {/* Pin spherical head */}
        <circle cx="16" cy="14" r="8.5" fill="url(#pinSpecular)" filter="url(#pinDropShadow)" />

        {/* Primary specular highlight point */}
        <circle cx="13.5" cy="11.5" r="2.2" fill="#ffffff" opacity="0.8" />
        <circle cx="15.2" cy="13.2" r="1.1" fill="#ffffff" opacity="0.4" />
      </svg>
    </div>
  );
}

export default function MyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const photosContainerRef = useRef<HTMLDivElement>(null);
  const cropMarksRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ultra-luxury entrance for the main paper canvas
      if (cardContainerRef.current) {
        gsap.fromTo(
          cardContainerRef.current,
          {
            y: 80,
            opacity: 0,
            scale: 0.96,
            transformPerspective: 1200,
            rotateX: 3,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Corner crop marks delicate mechanical reveal
      if (cropMarksRef.current) {
        gsap.fromTo(
          cropMarksRef.current.children,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.08,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Title reveal precision
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 4. Story paragraph text reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            delay: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 5. Entrance reveal for the polaroids composition
      if (photosContainerRef.current) {
        gsap.fromTo(
          photosContainerRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay: 0.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <section
      ref={sectionRef}
      id="my-story"
      className="relative px-5 py-20 md:px-10 md:py-32 overflow-hidden bg-transparent"
    >
      {/* Anchor targets so both #about and #my-story scroll smoothly to this section */}
      <span id="about" className="sr-only">About Borshon Kabir - My Story</span>
      <span id="about-intro" className="sr-only">About Borshon Kabir</span>
      <span id="story" className="sr-only">My Story</span>
      <div className="mx-auto max-w-[1240px]">
        {/* Standard Design System Card Container */}
        <div
          ref={cardContainerRef}
          className="relative rounded-[32px] border border-slate-200 bg-[#f0f2f5] p-8 sm:p-12 md:p-16 lg:p-20 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-[#141824] dark:text-white will-change-transform will-change-opacity overflow-hidden"
        >
          {/* Minimalist Printer Registration & Crop Marks */}
          <div ref={cropMarksRef} className="pointer-events-none absolute inset-0 z-20">
            {/* Top-Left Crop Mark (L-shape) */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 w-4 h-4 border-t-2 border-l-2 border-slate-300/70 dark:border-slate-700/70" />
            {/* Top-Right Crop Mark */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-4 h-4 border-t-2 border-r-2 border-slate-300/70 dark:border-slate-700/70" />
            {/* Bottom-Left Crop Mark */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-4 h-4 border-b-2 border-l-2 border-slate-300/70 dark:border-slate-700/70" />
            {/* Bottom-Right Crop Mark */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-4 h-4 border-b-2 border-r-2 border-slate-300/70 dark:border-slate-700/70" />

            {/* Subtle Editorial Header Margin Rule */}
            <div className="absolute top-8 left-16 right-16 h-[1px] bg-slate-300/40 dark:bg-slate-700/40 hidden sm:block" />
          </div>

          {/* Centered Title Layout */}
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-slate-900 dark:text-white will-change-transform will-change-opacity relative z-10"
          >
            My Story
          </h2>

          {/* Two-Column Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Column: Story Paragraphs */}
            <div
              ref={textRef}
              className="space-y-4 sm:space-y-5 text-left will-change-transform will-change-opacity"
            >
              {STORY_CONFIG.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-base md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Right Column: Centered Polaroid Photos Container */}
            <div className="flex justify-center items-center py-6 lg:py-0">
              <div
                ref={photosContainerRef}
                className="relative flex items-center justify-center will-change-transform will-change-opacity py-4"
              >
                {/* Left Polaroid (Pool photo): Position slightly lower and tilted counter-clockwise (-rotate-6) */}
                <div
                  className="relative z-0 w-[155px] sm:w-[195px] md:w-[220px] lg:w-[230px] p-3 pb-8 sm:p-3.5 sm:pb-9 md:p-4 md:pb-10 bg-white rounded-[2px] shadow-2xl dark:shadow-black/60 border border-black/[0.08] dark:border-white/10 -rotate-6 mt-4 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-0 hover:z-30 cursor-pointer"
                >
                  {/* Pinned Thumbtack on top center */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <PushPin className="w-7 h-7" />
                  </div>
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e9ec] dark:bg-slate-800 rounded-[1px]">
                    <Image
                      src={STORY_CONFIG.image1.src}
                      alt={STORY_CONFIG.image1.alt}
                      fill
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 240px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Right Polaroid (Sunlight photo): Position slightly higher to the right, tilted (rotate-3), overlapping top-right corner of left polaroid (z-10 -ml-8 -mt-4) */}
                <div
                  className="relative z-10 -ml-8 -mt-4 w-[155px] sm:w-[195px] md:w-[220px] lg:w-[230px] p-3 pb-8 sm:p-3.5 sm:pb-9 md:p-4 md:pb-10 bg-white rounded-[2px] shadow-2xl dark:shadow-black/60 border border-black/[0.08] dark:border-white/10 rotate-3 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:rotate-0 hover:z-30 cursor-pointer"
                >
                  {/* Pinned Thumbtack on top center */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <PushPin className="w-7 h-7" />
                  </div>
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e9ec] dark:bg-slate-800 rounded-[1px]">
                    <Image
                      src={STORY_CONFIG.image2.src}
                      alt={STORY_CONFIG.image2.alt}
                      fill
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 240px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
