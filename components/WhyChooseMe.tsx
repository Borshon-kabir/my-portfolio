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

  const counter92Ref = useRef<HTMLSpanElement>(null);
  const counter56Ref = useRef<HTMLSpanElement>(null);
  const counter49Ref = useRef<HTMLSpanElement>(null);

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

      // ── 6. Counter 92% — smooth expo count + blur reveal
      if (counter92Ref.current) {
        gsap.fromTo(
          counter92Ref.current,
          { filter: 'blur(10px)', opacity: 0, y: 12 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: col1Ref.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
        const val92 = { val: 0 };
        gsap.to(val92, {
          val: 92,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: col1Ref.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (counter92Ref.current)
              counter92Ref.current.textContent = `${Math.round(val92.val)}%`;
          },
        });
      }

      // ── 7. Counter 56+ — smooth expo count
      if (counter56Ref.current) {
        gsap.fromTo(
          counter56Ref.current,
          { filter: 'blur(10px)', opacity: 0, y: 12 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: col2Ref.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
        const val56 = { val: 0 };
        gsap.to(val56, {
          val: 56,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: col2Ref.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (counter56Ref.current)
              counter56Ref.current.textContent = `${Math.round(val56.val)}+`;
          },
        });
      }

      // ── 8. Counter 4.9 — smooth expo count
      if (counter49Ref.current) {
        gsap.fromTo(
          counter49Ref.current,
          { filter: 'blur(10px)', opacity: 0, y: 12 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: col3Ref.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
        const val49 = { val: 0 };
        gsap.to(val49, {
          val: 4.9,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: col3Ref.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (counter49Ref.current)
              counter49Ref.current.textContent = val49.val.toFixed(1);
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
              {/* Card 1A: Avatar Pill Card */}
              <div className="group flex items-center gap-3.5 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    src="/images/avatars/avatar1.jpg"
                    alt="Client"
                    className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-white"
                  />
                  <img
                    src="/images/avatars/avatar2.jpg"
                    alt="Client"
                    className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-white"
                  />
                  <img
                    src="/images/avatars/avatar3.jpg"
                    alt="Client"
                    className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-white"
                  />
                  <img
                    src="/images/avatars/avatar4.jpg"
                    alt="Client"
                    className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-white"
                  />
                </div>
                <span className="text-sm font-semibold text-[#121218]">+3K clients</span>
              </div>

              {/* Card 1B: Satisfaction Stat Card */}
              <div className="group flex flex-1 flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] min-h-[220px] sm:min-h-[250px]">
                <p className="text-[15px] font-medium leading-snug text-[#121218] sm:text-base">
                  Every frame edited with purpose, pacing, and passion.
                </p>
                <div className="mt-8">
                  <span
                    ref={counter92Ref}
                    className="font-serif text-5xl font-semibold leading-none tracking-tight text-[#121218] sm:text-6xl"
                  >
                    92%
                  </span>
                  <p className="mt-2 text-xs font-normal text-[#53545d] sm:text-sm">Client satisfaction</p>
                </div>
              </div>
            </div>

            {/* Column 2: 56+ Projects Completed Card */}
            <div
              ref={col2Ref}
              className="group flex flex-1 flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] min-h-[340px] sm:min-h-[388px] will-change-transform"
            >
              <p className="text-[15px] font-medium leading-snug text-[#121218] sm:text-base">
                Engaging videos, dynamic motion, and seamless edits delivered on time.
              </p>
              <div className="my-6">
                <span
                  ref={counter56Ref}
                  className="font-serif text-5xl font-semibold leading-none tracking-tight text-[#121218] sm:text-6xl"
                >
                  56+
                </span>
                <p className="mt-2 text-xs font-normal text-[#53545d] sm:text-sm">Projects completed</p>
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
            <p className="text-[15px] font-normal leading-relaxed text-[#c9cdd2] sm:text-base">
              I help creators, brands, and teams turn raw footage into engaging visual stories that keep viewers hooked from start to finish.
            </p>
            <div className="mt-8 flex items-end gap-3.5">
              <span
                ref={counter49Ref}
                className="font-serif text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl"
              >
                4.9
              </span>
              <div className="pb-1">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 62 58" className="h-3.5 w-3.5 fill-[#F2B347]">
                      <path d="M29.135 1.812c.66-1.703 3.07-1.703 3.73 0l6.515 16.81a2 2 0 0 0 1.754 1.274l18 1.002c1.824.101 2.569 2.393 1.153 3.547l-13.974 11.39a2 2 0 0 0-.67 2.063l4.61 17.429c.467 1.766-1.482 3.182-3.017 2.192l-15.152-9.77a2 2 0 0 0-2.168 0l-15.152 9.77c-1.535.99-3.484-.426-3.017-2.192l4.61-17.43a2 2 0 0 0-.67-2.061L1.713 24.445c-1.416-1.154-.671-3.446 1.152-3.446l18-1.002a2 2 0 0 0 1.754-1.274l6.515-16.81z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs font-normal text-[#c9cdd2]">Trusted by clients worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
