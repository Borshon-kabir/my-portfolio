'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, MessageCircle, Sparkles } from 'lucide-react';

function CrownIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M 1 5 L 3 16 L 15 16 L 17 5 M 1 5 L 2.716 6.373 C 3.832 7.266 4.39 7.713 4.953 7.781 C 5.446 7.842 5.943 7.717 6.349 7.431 C 6.812 7.105 7.094 6.448 7.657 5.135 L 9 2 M 1 5 C 1.552 5 2 4.552 2 4 C 2 3.448 1.552 3 1 3 C 0.448 3 0 3.448 0 4 C 0 4.552 0.448 5 1 5 Z M 17 5 L 15.284 6.373 C 14.168 7.266 13.61 7.713 13.047 7.781 C 12.554 7.842 12.057 7.717 11.651 7.431 C 11.188 7.105 10.906 6.448 10.344 5.135 L 9 2 M 17 5 C 17.552 5 18 4.552 18 4 C 18 3.448 17.552 3 17 3 C 16.448 3 16 3.448 16 4 C 16 4.552 16.448 5 17 5 Z M 9 2 C 9.552 2 10 1.552 10 1 C 10 0.448 9.552 0 9 0 C 8.448 0 8 0.448 8 1 C 8 1.552 8.448 2 9 2 Z" transform="translate(3 4)" />
    </svg>
  );
}

const card1Features = [
  'Up to 2 minutes duration',
  'Engaging captions & motion typography',
  'Dynamic pacing & retention cuts',
  'Sound design & trending SFX',
  'Optimized for 9:16 (Reels/Shorts/TikTok)',
];

const card2Features = [
  'Up to 10 minutes duration',
  'Advanced narrative pacing & storytelling',
  'Cinematic color grading & style matching',
  'Custom sound design & atmospheric mixing',
  'High-quality 16:9 4K export',
];

const card3Features = [
  'Flexible duration & custom scope',
  'Bulk / monthly retainers available',
  'Full channel management',
  'Dedicated fast communication',
  'Priority turnaround',
];

export default function Pricing() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref     = useRef<HTMLDivElement>(null);
  const card2Ref     = useRef<HTMLDivElement>(null);
  const card3Ref     = useRef<HTMLDivElement>(null);
  const price1Ref    = useRef<HTMLSpanElement>(null);
  const price2Ref    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── 1. Header cascade
      gsap.fromTo(
        '.pricing-header-elem',
        { y: 36, opacity: 0, filter: 'blur(8px)', skewY: 1 },
        {
          y: 0, opacity: 1, filter: 'blur(0px)', skewY: 0,
          duration: 0.9, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%', once: true },
        }
      );

      // ── 2. All 3 cards simultaneously: 3D tilt-in + blur dissolve
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
      gsap.fromTo(
        cards,
        {
          y: 90, opacity: 0, rotateX: 12,
          rotateY: (i) => (i === 0 ? -5 : i === 2 ? 5 : 0),
          scale: 0.94, filter: 'blur(10px)',
          transformPerspective: 1000,
        },
        {
          y: 0, opacity: 1, rotateX: 0, rotateY: 0, scale: 1, filter: 'blur(0px)',
          duration: 1.15, ease: 'expo.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 82%', once: true },
        }
      );

      // ── 3. Dark card shimmer sweep
      gsap.fromTo(
        '.pricing-dark-shimmer',
        { x: '-110%', opacity: 0.7 },
        {
          x: '110%', opacity: 0, duration: 1.1, ease: 'expo.out', delay: 0.35,
          scrollTrigger: { trigger: containerRef.current, start: 'top 82%', once: true },
        }
      );

      // ── 4. Price counters — expo roll-up with blur reveal
      const priceAnim = (ref: React.RefObject<HTMLSpanElement>, target: number) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current,
          { filter: 'blur(12px)', opacity: 0, y: 16 },
          {
            filter: 'blur(0px)', opacity: 1, y: 0,
            duration: 1.0, ease: 'expo.out', delay: 0.25,
            scrollTrigger: { trigger: containerRef.current, start: 'top 82%', once: true },
          }
        );
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target, duration: 1.7, ease: 'expo.out', delay: 0.25,
          scrollTrigger: { trigger: containerRef.current, start: 'top 82%', once: true },
          onUpdate: () => {
            if (ref.current)
              ref.current.textContent = String(Math.round(counter.val));
          },
        });
      };
      priceAnim(price1Ref, 10);
      priceAnim(price2Ref, 110);

      // ── 5. Feature lists: spring-wave cascade, all 3 at once
      ['.pricing-f1-item', '.pricing-f2-item', '.pricing-f3-item'].forEach((sel) => {
        gsap.fromTo(
          sel,
          { x: -16, opacity: 0, filter: 'blur(4px)' },
          {
            x: 0, opacity: 1, filter: 'blur(0px)',
            duration: 0.55, stagger: 0.065, ease: 'expo.out', delay: 0.5,
            scrollTrigger: { trigger: containerRef.current, start: 'top 82%', once: true },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D card tilt on hover
  const onMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement | null) => {
    if (!card) return;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -4;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = (card: HTMLDivElement | null) => {
    if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section ref={sectionRef} id="pricing" className="relative px-5 py-24 md:px-10 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <div ref={headerRef} className="text-center">
          <span className="pricing-header-elem inline-flex items-center rounded-full border border-black/10 bg-[#e5e5e7]/80 px-3.5 py-1 text-xs font-medium text-[#121218] shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm will-change-transform will-change-opacity">
            Pricing
          </span>
          <h2 className="pricing-header-elem mt-4 font-serif text-[clamp(2.4rem,4.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#121218] will-change-transform will-change-opacity">
            Simple packages, clear outcomes
          </h2>
          <p className="pricing-header-elem mx-auto mt-3.5 max-w-md text-sm sm:text-base text-[#6c6e79] will-change-transform will-change-opacity">
            Focused packages for every type of video — from viral shorts to cinematic documentaries.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div
          ref={containerRef}
          style={{ perspective: '1200px' }}
          className="mx-auto mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        >

          {/* ── CARD 1: Shorts & Reels (Light) ── */}
          <div
            ref={card1Ref}
            onMouseMove={(e) => onMove(e, card1Ref.current)}
            onMouseLeave={() => onLeave(card1Ref.current)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#e0e2e6] bg-white p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#cbced6] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] will-change-transform"
          >
            <div>
              {/* Icon */}
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#e0e2e6] bg-gradient-to-b from-[#f7f7f8] to-[#e8eaed] text-[#121218] shadow-[0_4px_8px_-4px_rgba(201,205,210,0.8),0_12px_18px_-2px_rgba(201,205,210,0.5),inset_0_1px_0_white,inset_0_-1px_0_#c9cdd2]">
                <Sparkles className="h-5 w-5 text-[#121218]" strokeWidth={1.8} />
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-5 text-lg font-semibold text-[#121218] tracking-tight">Shorts &amp; Reels</h3>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#6c6e79]">
                Fast-paced, high-retention short-form video edit for videos 2 minutes or less.
              </p>

              {/* Price */}
              <div className="mt-7 flex items-baseline gap-1">
                <span className="font-serif text-3xl font-semibold text-[#121218]">$</span>
                <span ref={price1Ref} className="font-serif text-[48px] sm:text-[54px] font-semibold leading-none tracking-tight text-[#121218]">
                  10
                </span>
                <span className="ml-1.5 text-xs font-semibold uppercase tracking-wider text-[#8e8f96]">USD</span>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="group/btn relative mt-7 flex h-11 w-full items-center justify-center overflow-hidden rounded-lg bg-[#121218] text-sm font-medium text-white shadow-[0_2px_4px_rgba(18,18,24,0.1),0_4px_8px_rgba(18,18,24,0.15)] transition-all duration-300 hover:bg-[#22222a] hover:shadow-[0_8px_20px_rgba(18,18,24,0.25)] active:scale-[0.99]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover/btn:translate-x-full" />
                <span className="relative z-10">Start a project</span>
              </a>
            </div>

            {/* Features */}
            <div className="mt-7 rounded-xl border border-[#edeef1] bg-[#f7f7f8] p-5">
              <h4 className="text-xs font-semibold text-[#121218] mb-3.5 tracking-tight">What's included</h4>
              <ul className="space-y-2.5">
                {card1Features.map((feat) => (
                  <li key={feat} className="pricing-f1-item flex items-center gap-2.5 text-xs sm:text-[13px] text-[#53545d] will-change-transform will-change-opacity">
                    <Check size={13} strokeWidth={2.2} className="text-[#121218] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── CARD 2: Documentary Edit (Dark / Featured) ── */}
          <div
            ref={card2Ref}
            onMouseMove={(e) => onMove(e, card2Ref.current)}
            onMouseLeave={() => onLeave(card2Ref.current)}
            className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#131318] p-7 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_64px_-12px_rgba(0,0,0,0.7)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_32px_80px_-12px_rgba(0,0,0,0.8)] will-change-transform"
          >
            {/* Ambient radial glow — bottom right, no overflow clipping issues */}
            <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-[80px]" />
            <div className="pointer-events-none absolute top-0 left-0 h-48 w-48 rounded-full bg-purple-600/8 blur-[60px]" />

            {/* Entry shimmer sweep */}
            <div className="pricing-dark-shimmer pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            {/* Top row: icon + badge aligned */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <CrownIcon className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                Most Popular
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="relative z-10 mt-6">
              <h3 className="text-lg font-semibold text-white tracking-tight">Documentary Edit</h3>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-white/50">
                Cinematic, story-driven long-form video editing for videos 10 minutes or less.
              </p>
            </div>

            {/* Price */}
            <div className="relative z-10 mt-7 flex items-baseline gap-1">
              <span className="font-serif text-3xl font-semibold text-white">$</span>
              <span ref={price2Ref} className="font-serif text-[48px] sm:text-[54px] font-semibold leading-none tracking-tight text-white">
                110
              </span>
              <span className="ml-1.5 text-xs font-semibold uppercase tracking-wider text-white/30">USD</span>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="group/btn relative z-10 mt-7 flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-white text-sm font-semibold text-[#121218] shadow-[0_2px_8px_rgba(255,255,255,0.12)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#f0f0f2] hover:shadow-[0_8px_28px_rgba(255,255,255,0.18)] active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/8 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
              <span className="relative z-10">Book this package</span>
            </a>

            {/* Divider */}
            <div className="relative z-10 mt-7 border-t border-white/8" />

            {/* Features — seamlessly integrated, no nested card */}
            <div className="relative z-10 mt-5 flex-1">
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-4">
                What's included
              </h4>
              <ul className="space-y-3">
                {card2Features.map((feat) => (
                  <li key={feat} className="pricing-f2-item flex items-center gap-3 text-xs sm:text-[13px] text-white/70 will-change-transform will-change-opacity">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8">
                      <Check size={9} strokeWidth={2.5} className="text-white" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* ── CARD 3: Custom Order (Accent) ── */}
          <div
            ref={card3Ref}
            onMouseMove={(e) => onMove(e, card3Ref.current)}
            onMouseLeave={() => onLeave(card3Ref.current)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#e0e2e6] bg-gradient-to-b from-[#f9f9fb] to-white p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#cbced6] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] will-change-transform"
          >
            <div>
              {/* Icon */}
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#e0e2e6] bg-gradient-to-b from-[#f7f7f8] to-[#e8eaed] text-[#121218] shadow-[0_4px_8px_-4px_rgba(201,205,210,0.8),0_12px_18px_-2px_rgba(201,205,210,0.5),inset_0_1px_0_white,inset_0_-1px_0_#c9cdd2]">
                <MessageCircle className="h-5 w-5 text-[#121218]" strokeWidth={1.8} />
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-5 text-lg font-semibold text-[#121218] tracking-tight">Custom Order</h3>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#6c6e79]">
                Tailored video post-production for high-volume channels, series, or complex projects.
              </p>

              {/* Price */}
              <div className="mt-7 flex items-baseline gap-2">
                <span className="font-serif text-[40px] sm:text-[46px] font-semibold leading-none tracking-tight text-[#121218]">
                  Let's Talk
                </span>
              </div>
              <p className="mt-1.5 text-[11px] text-[#8e8f96] font-medium tracking-wide uppercase">Custom pricing</p>

              {/* CTA */}
              <a
                href="#contact"
                className="group/btn relative mt-7 flex h-11 w-full items-center justify-center overflow-hidden rounded-lg bg-[#121218] text-sm font-medium text-white shadow-[0_2px_4px_rgba(18,18,24,0.1),0_4px_8px_rgba(18,18,24,0.15)] transition-all duration-300 hover:bg-[#22222a] hover:shadow-[0_8px_20px_rgba(18,18,24,0.25)] active:scale-[0.99]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover/btn:translate-x-full" />
                <span className="relative z-10">Get a custom quote</span>
              </a>
            </div>

            {/* Features */}
            <div className="mt-7 rounded-xl border border-[#edeef1] bg-[#f7f7f8] p-5">
              <h4 className="text-xs font-semibold text-[#121218] mb-3.5 tracking-tight">What's included</h4>
              <ul className="space-y-2.5">
                {card3Features.map((feat) => (
                  <li key={feat} className="pricing-f3-item flex items-center gap-2.5 text-xs sm:text-[13px] text-[#53545d] will-change-transform will-change-opacity">
                    <Check size={13} strokeWidth={2.2} className="text-[#121218] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
