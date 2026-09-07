'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    num: '01',
    icon: Compass,
    title: 'Clear story',
    copy: 'Every edit begins with the emotional through-line that gives the film its purpose and resonant core.',
  },
  {
    num: '02',
    icon: Sparkles,
    title: 'Refined pace',
    copy: 'Rhythm, sound, and visual detail shaped granularly for audience retention across every frame.',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'Reliable finish',
    copy: 'Precision master files, clear collaborative communication, and deliverables built for their stage.',
  },
];

export default function HomeIntro() {
  const root = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.intro-anim-header',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 92%',
            once: true,
          },
        }
      );

      // Staggered cards entrance
      gsap.fromTo(
        '.intro-card',
        { y: 35, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 92%',
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about-intro"
      className="relative min-h-[620px] overflow-hidden px-6 pb-28 pt-24 text-center md:px-10 md:pt-36"
    >
      {/* Subtle ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[640px] rounded-full bg-black/[0.015] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="intro-anim-header inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#e5e5e7] px-4 py-1.5 text-xs font-mono tracking-wider uppercase text-[#53545d] backdrop-blur-md will-change-transform will-change-opacity">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15151a] animate-pulse" />
          Benefits
        </p>

        <h2 className="intro-anim-header mt-6 font-serif text-[clamp(2.75rem,5.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-.045em] text-[#15151a] will-change-transform will-change-opacity">
          Discover why we <span className="italic font-light text-[#7a7b83]">stand out</span>
        </h2>

        <p className="intro-anim-header mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[#53545d] will-change-transform will-change-opacity">
          A deliberate editing process that makes every story clearer, sharper, and more memorable.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="relative z-10 mx-auto mt-16 grid max-w-[1160px] gap-6 text-left md:grid-cols-3"
      >
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="intro-card group relative overflow-hidden rounded-3xl border border-black/10 bg-[#e5e5e7] p-8 md:p-10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-black/20 hover:bg-white hover:shadow-[0_20px_45px_rgba(20,20,25,0.08)] will-change-transform will-change-opacity"
            >
              {/* Radial gradient illumination on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-black/[0.02] blur-2xl transition-all duration-500 group-hover:scale-125" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#7a7b83] transition-colors group-hover:text-[#15151a]">
                  ({b.num})
                </span>
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white text-[#15151a] transition-all duration-300 group-hover:scale-110 group-hover:border-[#17171d] group-hover:bg-[#17171d] group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(20,20,25,0.15)]">
                  <Icon size={18} />
                </div>
              </div>

              <h3 className="relative z-10 mt-12 font-serif text-2xl font-semibold tracking-[-0.02em] text-[#15151a] md:text-3xl">
                {b.title}
              </h3>

              <p className="relative z-10 mt-4 text-sm leading-relaxed text-[#53545d] transition-colors group-hover:text-[#25252b]">
                {b.copy}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

