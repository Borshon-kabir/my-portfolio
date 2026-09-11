'use client';

import { useEffect, useRef, useState } from 'react';
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
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const cropMarksRef = useRef<HTMLDivElement>(null);

  // Mouse tilt states for interactive 3D feel
  const [photo1Loaded, setPhoto1Loaded] = useState(true);
  const [photo2Loaded, setPhoto2Loaded] = useState(true);

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

      // 3. Title reveal with blur-to-clear precision
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 35, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.95,
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

      // 5. High-end multi-plane scroll parallax for the two pinned polaroids
      if (photo1Ref.current && photo2Ref.current) {
        // Initial entrance for polaroids (fly & settle onto the canvas)
        gsap.fromTo(
          photo1Ref.current,
          { y: 70, opacity: 0, rotate: -14 },
          {
            y: 0,
            opacity: 1,
            rotate: -7,
            duration: 1.2,
            delay: 0.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          photo2Ref.current,
          { y: 90, opacity: 0, rotate: 10 },
          {
            y: 0,
            opacity: 1,
            rotate: 4,
            duration: 1.3,
            delay: 0.45,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              once: true,
            },
          }
        );

        // Continuous smooth parallax scrub tied to scroll
        gsap.to(photo1Ref.current, {
          yPercent: -14,
          rotate: -9,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });

        gsap.to(photo2Ref.current, {
          yPercent: -24,
          rotate: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Magnetic hover physics for Polaroid 1
  const handlePhoto1Move = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = photo1Ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 12,
      rotateX: -y * 12,
      scale: 1.04,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handlePhoto1Leave = () => {
    const el = photo1Ref.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.6)',
    });
  };

  // 3D Magnetic hover physics for Polaroid 2
  const handlePhoto2Move = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = photo2Ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 12,
      rotateX: -y * 12,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handlePhoto2Leave = () => {
    const el = photo2Ref.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.6)',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="my-story"
      className="relative px-5 py-20 md:px-10 md:py-32 overflow-hidden selection:bg-[#121218] selection:text-white"
    >
      {/* Anchor targets so both #about and #my-story scroll smoothly to this section */}
      <span id="about" className="sr-only">About Borshon Kabir - My Story</span>
      <span id="about-intro" className="sr-only">About Borshon Kabir</span>
      <span id="story" className="sr-only">My Story</span>
      <div className="mx-auto max-w-[1240px]">
        {/* Editorial Presentation Canvas / Sheet */}
        <div
          ref={cardContainerRef}
          className="relative rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-[#fbfbfc] border border-black/[0.08] p-8 sm:p-12 md:p-16 lg:p-20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.07),0_2px_6px_rgba(0,0,0,0.02)] will-change-transform will-change-opacity overflow-hidden"
        >
          {/* Subtle paper grain & ambient backlight glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-[#fbfbfc] to-[#f4f4f7] opacity-90" />
          <div className="pointer-events-none absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full bg-black/[0.015] blur-[120px]" />

          {/* Minimalist Printer Registration & Crop Marks (Matching reference image) */}
          <div ref={cropMarksRef} className="pointer-events-none absolute inset-0 z-20">
            {/* Top-Left Crop Mark (L-shape) */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 w-4 h-4 border-t-2 border-l-2 border-black/35" />
            {/* Top-Right Crop Mark */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-4 h-4 border-t-2 border-r-2 border-black/35" />
            {/* Bottom-Left Crop Mark */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-4 h-4 border-b-2 border-l-2 border-black/35" />
            {/* Bottom-Right Crop Mark */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-4 h-4 border-b-2 border-r-2 border-black/35" />

            {/* Subtle Editorial Header Margin Rule */}
            <div className="absolute top-8 left-16 right-16 h-[1px] bg-black/[0.05] hidden sm:block" />
          </div>

          {/* Section Header: "My Story" (Centered exactly as in reference) */}
          <div className="relative z-10 text-center mb-10 sm:mb-14 md:mb-16">
            <h2
              ref={titleRef}
              className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#121218] will-change-transform will-change-opacity"
            >
              {STORY_CONFIG.sectionTitle}
            </h2>
          </div>

          {/* Main Layout: Editorial Narrative & Floating Pinned Polaroids */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
            {/* Story Paragraph Column */}
            <div className="lg:col-span-6 xl:col-span-6 max-w-xl xl:max-w-2xl pb-2 lg:pb-6">
              <div
                ref={textRef}
                className="space-y-4 sm:space-y-5 will-change-transform will-change-opacity"
              >
                {STORY_CONFIG.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-sans text-[1.02rem] sm:text-[1.12rem] md:text-[1.18rem] lg:text-[1.22rem] font-normal leading-[1.62] tracking-[-0.015em] text-[#1e1f26]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Pinned Polaroids Composition */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end items-end pt-8 lg:pt-0">
              {/* Container: sized to tightly fit both polaroids on every breakpoint */}
              <div className="relative w-[300px] sm:w-[380px] md:w-[450px] lg:w-[480px] h-[260px] sm:h-[300px] md:h-[350px] lg:h-[360px]">

                {/* PHOTO 1: LEFT POLAROID */}
                <div
                  ref={photo1Ref}
                  onMouseMove={handlePhoto1Move}
                  onMouseLeave={handlePhoto1Leave}
                  style={{ transform: 'rotate(-4deg)' }}
                  className="absolute left-0 bottom-0 z-10 w-[140px] sm:w-[185px] md:w-[225px] lg:w-[240px] p-2.5 pb-6 sm:p-3.5 sm:pb-8 md:p-4 md:pb-10 bg-white rounded-[2px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.22),0_10px_20px_-5px_rgba(0,0,0,0.1)] border border-black/[0.06] cursor-pointer will-change-transform transition-shadow duration-300 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.32)]"
                >
                  {/* Pinned Thumbtack */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <PushPin className="w-7 h-7" />
                  </div>
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e9ec] rounded-[1px]">
                    <Image
                      src={STORY_CONFIG.image1.src}
                      alt={STORY_CONFIG.image1.alt}
                      fill
                      sizes="(max-width: 640px) 145px, (max-width: 768px) 190px, 260px"
                      className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                      loading="lazy"
                      onLoad={() => setPhoto1Loaded(true)}
                    />
                  </div>
                </div>

                {/* PHOTO 2: RIGHT POLAROID */}
                <div
                  ref={photo2Ref}
                  onMouseMove={handlePhoto2Move}
                  onMouseLeave={handlePhoto2Leave}
                  style={{ transform: 'rotate(3deg)' }}
                  className="absolute left-[128px] sm:left-[175px] md:left-[215px] lg:left-[230px] bottom-3 sm:bottom-5 md:bottom-8 z-20 w-[148px] sm:w-[195px] md:w-[230px] lg:w-[245px] p-2.5 pb-6 sm:p-3.5 sm:pb-8 md:p-4 md:pb-10 bg-white rounded-[2px] shadow-[0_28px_65px_-12px_rgba(0,0,0,0.28),0_12px_24px_-6px_rgba(0,0,0,0.12)] border border-black/[0.06] cursor-pointer will-change-transform transition-shadow duration-300 hover:shadow-[0_38px_85px_-18px_rgba(0,0,0,0.36)]"
                >
                  {/* Pinned Thumbtack */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <PushPin className="w-7 h-7" />
                  </div>
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e9ec] rounded-[1px]">
                    <Image
                      src={STORY_CONFIG.image2.src}
                      alt={STORY_CONFIG.image2.alt}
                      fill
                      sizes="(max-width: 640px) 152px, (max-width: 768px) 200px, 260px"
                      className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                      loading="lazy"
                      onLoad={() => setPhoto2Loaded(true)}
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
