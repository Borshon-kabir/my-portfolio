'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhyChooseMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── 1. Eyebrow pill: fade + slide up
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { y: 20, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // ── 2. Heading: character-like clip reveal via y + slight skew
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 48, opacity: 0, skewY: 1.5 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.95,
            delay: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // ── 3. Description: delayed fade + subtle rise
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            delay: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // ── 4. Cards: staggered scale + y + blur entrance
      const cols = [col1Ref.current, col2Ref.current, col3Ref.current].filter(Boolean);
      if (cols.length) {
        gsap.fromTo(
          cols,
          { y: 72, opacity: 0, scale: 0.97, filter: 'blur(6px)' },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.0,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              once: true,
            },
          }
        );
      }

      // ── 5. Subtle parallax drift on header while scrolling
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          y: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative px-5 py-24 md:px-10 md:py-32 overflow-hidden"
    >
      <span id="why-choose-me" className="sr-only">Why choose me</span>
      <span id="why-me" className="sr-only">Why me</span>
      <span id="the-craft" className="sr-only">The craft, considered</span>

      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div ref={headerRef} className="max-w-xl will-change-transform">
            <span
              ref={eyebrowRef}
              className="inline-flex items-center rounded-full border border-black/10 bg-[#e5e5e7]/80 px-3.5 py-1 text-xs font-medium text-[#121218] shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm will-change-transform"
            >
              Why choose me
            </span>
            <h2
              ref={headingRef}
              className="mt-4 font-serif text-[clamp(2.5rem,4.5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#121218] will-change-transform"
            >
              Edits that drive<br />retention
            </h2>
          </div>
          <div ref={descRef} className="max-w-md will-change-transform md:pb-2">
            <p className="text-[15px] leading-relaxed text-[#53545d] md:text-base">
              I combine pacing, sound design, and visual storytelling to transform raw footage into high-converting videos with lasting impact.
            </p>
          </div>
        </div>

        {/* 3-Column Card Layout */}
        <div className="mt-14 flex flex-col gap-3.5 md:flex-row md:items-stretch">
          {/* Leading Content Group (Columns 1 & 2) */}
          <div className="flex flex-1 flex-col gap-3.5 sm:flex-row">
            {/* Column 1: Stack of 2 Cards */}
            <div ref={col1Ref} className="flex flex-1 flex-col gap-3.5 will-change-transform">
              {/* Card 1A: Minimal Shorts & Reels Card */}
              <div className="group flex flex-col justify-center rounded-2xl border border-black/10 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                <h3 className="text-base font-semibold text-[#121218]">Minimal Shorts &amp; Reels</h3>
                <p className="mt-1.5 text-xs sm:text-[13px] font-normal leading-relaxed text-[#53545d]">
                  High-retention short-form edits with clean typography and rhythmic pacing.
                </p>
              </div>

              {/* Card 1B: Satisfaction Stat Card */}
              <div className="group flex flex-1 flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] min-h-[220px] sm:min-h-[250px]">
                <p className="text-[15px] font-medium leading-snug text-[#121218] sm:text-base">
                  Every frame edited with purpose, pacing, and passion.
                </p>
                <div className="mt-8">
                  <span
                    className="font-serif text-5xl font-semibold leading-none tracking-tight text-[#121218] sm:text-6xl"
                  >
                    Seamless
                  </span>
                  <p className="mt-2 text-xs font-normal text-[#53545d] sm:text-sm">Transitions &amp; Motion</p>
                </div>
              </div>
            </div>

            {/* Column 2: 15+ Projects Completed Card */}
            <div
              ref={col2Ref}
              className="group flex flex-1 flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] min-h-[340px] sm:min-h-[388px] will-change-transform"
            >
              <p className="text-[15px] font-medium leading-snug text-[#121218] sm:text-base">
                Clean audio mixing, color correction, and dynamic motion graphics.
              </p>
              <div className="my-6">
                <span
                  className="font-serif text-5xl font-semibold leading-none tracking-tight text-[#121218] sm:text-6xl"
                >
                  Pro Stack
                </span>
                <p className="mt-2 text-xs font-normal text-[#53545d] sm:text-sm">Adobe Creative Cloud Workflow</p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-wrap gap-2" aria-label="Adobe Creative Cloud tools">
                  {[
                    ['Pr', 'Premiere Pro', 'bg-[#2a164d] text-[#d5aaff]'],
                    ['Ae', 'After Effects', 'bg-[#24134a] text-[#bca9ff]'],
                    ['Ps', 'Photoshop', 'bg-[#001e36] text-[#62c4ff]'],
                    ['Ai', 'Illustrator', 'bg-[#351400] text-[#ffb44b]'],
                  ].map(([initials, name, color]) => (
                    <span
                      key={initials}
                      aria-label={name}
                      title={name}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-[11px] font-semibold ${color}`}
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-[#edeef1] px-3.5 py-1.5 text-xs font-medium text-[#121218]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>Available for projects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Trailing Dark Card */}
          <div
            ref={col3Ref}
            style={{
              background: 'linear-gradient(180deg, #24242a 0%, #121218 100%)',
              boxShadow:
                '0px 4px 8px -4px rgba(148, 151, 158, 0.4), 0px 12px 24px -2px rgba(148, 151, 158, 0.25), inset 0px 1px 0px 1px #44454c',
            }}
            className="group flex flex-col justify-between rounded-2xl border border-[#121218] p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] md:w-[40%] min-h-[340px] sm:min-h-[388px] will-change-transform"
          >
            <div>
              <h3 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                Documentary, Parallax &amp; 3D Map Animations
              </h3>
              <p className="mt-4 text-[15px] font-normal leading-relaxed text-[#c9cdd2] sm:text-base">
                Specializing in documentary-style video editing, custom 3D map animations, cinematic photo depth (parallax effects), and seamless camera movements that keep viewers hooked.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-end gap-2">
              {['3D Map Animation', 'Photo Depth (Parallax)', 'Documentary Visual Storytelling'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-[#c9cdd2]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
