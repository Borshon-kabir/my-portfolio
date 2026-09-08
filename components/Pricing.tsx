'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';

// Exact Crown SVG geometry extracted from Sevora
function CrownIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M 1 5 L 3 16 L 15 16 L 17 5 M 1 5 L 2.716 6.373 C 3.832 7.266 4.39 7.713 4.953 7.781 C 5.446 7.842 5.943 7.717 6.349 7.431 C 6.812 7.105 7.094 6.448 7.657 5.135 L 9 2 M 1 5 C 1.552 5 2 4.552 2 4 C 2 3.448 1.552 3 1 3 C 0.448 3 0 3.448 0 4 C 0 4.552 0.448 5 1 5 Z M 17 5 L 15.284 6.373 C 14.168 7.266 13.61 7.713 13.047 7.781 C 12.554 7.842 12.057 7.717 11.651 7.431 C 11.188 7.105 10.906 6.448 10.344 5.135 L 9 2 M 17 5 C 17.552 5 18 4.552 18 4 C 18 3.448 17.552 3 17 3 C 16.448 3 16 3.448 16 4 C 16 4.552 16.448 5 17 5 Z M 9 2 C 9.552 2 10 1.552 10 1 C 10 0.448 9.552 0 9 0 C 8.448 0 8 0.448 8 1 C 8 1.552 8.448 2 9 2 Z"
        transform="translate(3 4)"
      />
    </svg>
  );
}

const card1Features = [
  'Website development',
  'Responsive page setup',
  'CMS structure setup',
  'Basic interactions',
  'Launch support',
];

const card2Features = [
  'Full website design',
  'Brand identity direction',
  'Visual system guidelines',
  'Responsive page layouts',
  'Final asset handoff',
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const price1Ref = useRef<HTMLSpanElement>(null);
  const price2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── 1. Header: eyebrow pill pops in, heading clips up, subtitle fades
      gsap.fromTo(
        '.pricing-header-elem',
        { y: 36, opacity: 0, filter: 'blur(8px)', skewY: 1 },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          skewY: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      );

      // ── 2. Cards: simultaneously rise + 3D tilt-in + blur dissolve
      const cards = [card1Ref.current, card2Ref.current].filter(Boolean);

      gsap.fromTo(
        cards,
        {
          y: 90,
          opacity: 0,
          rotateX: 12,
          rotateY: (i) => (i === 0 ? -6 : 6),   // light card tilts left, dark right
          scale: 0.94,
          filter: 'blur(10px)',
          transformPerspective: 1000,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      // ── 3. Light card: soft glow border pulse on entry
      if (card1Ref.current) {
        gsap.fromTo(
          card1Ref.current,
          { boxShadow: '0 0 0px 0px rgba(100,100,120,0)' },
          {
            boxShadow: '0 0 0px 0px rgba(100,100,120,0)',
            duration: 0.01,
            scrollTrigger: { trigger: cardsContainerRef.current, start: 'top 82%', once: true },
          }
        );
      }

      // ── 4. Dark card: inner glow shimmer sweep on entry
      if (card2Ref.current) {
        gsap.fromTo(
          '.pricing-dark-shimmer',
          { x: '-110%', opacity: 0.7 },
          {
            x: '110%',
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
            delay: 0.35,
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // ── 5. Price counters — expo roll-up with blur reveal, both at once
      const priceAnim = (ref: React.RefObject<HTMLSpanElement>, target: number, decimals = 0) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { filter: 'blur(12px)', opacity: 0, y: 16 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'expo.out',
            delay: 0.25,
            scrollTrigger: { trigger: cardsContainerRef.current, start: 'top 82%', once: true },
          }
        );
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.7,
          ease: 'expo.out',
          delay: 0.25,
          scrollTrigger: { trigger: cardsContainerRef.current, start: 'top 82%', once: true },
          onUpdate: () => {
            if (ref.current)
              ref.current.textContent = counter.val.toFixed(decimals === 0 ? 0 : decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          },
        });
      };

      priceAnim(price1Ref, 1200);
      priceAnim(price2Ref, 2800);

      // ── 6. Feature lists: spring-wave cascade (both lists start together)
      const featureAnim = (selector: string, delay: number) => {
        gsap.fromTo(
          selector,
          { x: -16, opacity: 0, filter: 'blur(4px)' },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: 0.065,
            ease: 'expo.out',
            delay,
            scrollTrigger: { trigger: cardsContainerRef.current, start: 'top 82%', once: true },
          }
        );
      };

      featureAnim('.pricing-f1-item', 0.5);
      featureAnim('.pricing-f2-item', 0.5);

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  // Interactive 3D Card Hover Tilt handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement | null) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (card: HTMLDivElement | null) => {
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative px-5 py-24 md:px-10 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <div ref={headerRef} className="text-center">
          <span className="pricing-header-elem inline-flex items-center rounded-full border border-black/10 bg-[#e5e5e7]/80 px-3.5 py-1 text-xs font-medium text-[#121218] shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm will-change-transform will-change-opacity">
            Pricing
          </span>

          <h2 className="pricing-header-elem mt-4 font-serif text-[clamp(2.4rem,4.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#121218] will-change-transform will-change-opacity">
            Simple packages, clear outcomes
          </h2>

          <p className="pricing-header-elem mx-auto mt-3.5 max-w-md text-sm sm:text-base text-[#6c6e79] will-change-transform will-change-opacity">
            Focused packages for design, development, and launch.
          </p>
        </div>

        {/* 2-Card Layout Matching Sevora */}
        <div
          ref={cardsContainerRef}
          style={{ perspective: '1200px' }}
          className="mx-auto mt-14 grid max-w-[820px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 items-stretch"
        >
          {/* CARD 1: LIGHT CARD (Basic Plan) */}
          <div
            ref={card1Ref}
            onMouseMove={(e) => handleMouseMove(e, card1Ref.current)}
            onMouseLeave={() => handleMouseLeave(card1Ref.current)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#e0e2e6] bg-white p-6 sm:p-7 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#cbced6] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] will-change-transform"
          >
            <div>
              {/* Squircle Icon */}
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#e0e2e6] bg-gradient-to-b from-[#f7f7f8] to-[#e8eaed] text-[#121218] shadow-[0_4px_8px_-4px_rgba(201,205,210,0.8),0_12px_18px_-2px_rgba(201,205,210,0.5),inset_0_1px_0_white,inset_0_-1px_0_#c9cdd2]">
                <Sparkles className="h-5 w-5 text-[#121218]" strokeWidth={1.8} />
              </div>

              {/* Title & Description */}
              <h3 className="mt-5 text-lg font-semibold text-[#121218] tracking-tight">
                Basic Plan
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#6c6e79]">
                A focused build for brands that need a clean, responsive, and launch-ready website.
              </p>

              {/* Price */}
              <div className="mt-7 flex items-baseline gap-1">
                <span className="font-serif text-3xl font-semibold text-[#121218]">$</span>
                <span
                  ref={price1Ref}
                  className="font-serif text-[48px] sm:text-[54px] font-semibold leading-none tracking-tight text-[#121218]"
                >
                  1,200
                </span>
                <span className="ml-1.5 text-xs font-semibold uppercase tracking-wider text-[#8e8f96]">
                  USD
                </span>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="group/btn relative mt-7 flex h-11 w-full items-center justify-center overflow-hidden rounded-lg bg-[#121218] text-sm font-medium text-white shadow-[0_2px_4px_rgba(18,18,24,0.1),0_4px_8px_rgba(18,18,24,0.15)] transition-all duration-300 hover:bg-[#22222a] hover:shadow-[0_8px_20px_rgba(18,18,24,0.25)] active:scale-[0.99]"
              >
                {/* Specular highlight sheen animation */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover/btn:translate-x-full" />
                <span className="relative z-10">Start a project</span>
              </a>
            </div>

            {/* Added Features Box */}
            <div className="mt-7 rounded-xl border border-[#edeef1] bg-[#f7f7f8] p-5">
              <h4 className="text-xs font-semibold text-[#121218] mb-3.5 tracking-tight">
                Added Features
              </h4>
              <ul className="space-y-2.5">
                {card1Features.map((feat) => (
                  <li
                    key={feat}
                    className="pricing-f1-item flex items-center gap-2.5 text-xs sm:text-[13px] text-[#53545d] will-change-transform will-change-opacity"
                  >
                    <Check size={13} strokeWidth={2.2} className="text-[#121218] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CARD 2: DARK CARD (Premium) */}
          <div
            ref={card2Ref}
            onMouseMove={(e) => handleMouseMove(e, card2Ref.current)}
            onMouseLeave={() => handleMouseLeave(card2Ref.current)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#2e2f38] bg-gradient-to-b from-[#24242a] to-[#121218] p-6 sm:p-7 md:p-8 shadow-[0_4px_8px_-4px_rgba(148,151,158,0.3),0_16px_36px_-2px_rgba(148,151,158,0.2),inset_0_1px_0_1px_#44454c] transition-all duration-300 hover:border-[#44454c] hover:shadow-[0_8px_16px_-4px_rgba(148,151,158,0.4),0_24px_48px_-2px_rgba(148,151,158,0.3)] will-change-transform"
          >
            {/* Animated smoke/fluid glow background */}
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-[380px] w-[380px] overflow-hidden rounded-[inherit] opacity-45 mix-blend-screen">
              <img
                src="/images/pricing-glow.gif"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            {/* Entry shimmer sweep */}
            <div className="pricing-dark-shimmer pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10">
              {/* Squircle Icon */}
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#44454c] bg-gradient-to-b from-[#2e2e36] to-[#1a1a20] text-white shadow-[0_4px_8px_-4px_rgba(18,18,24,0.9),0_12px_18px_-2px_rgba(18,18,24,0.9),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_#121218]">
                <CrownIcon className="h-5 w-5" />
              </div>

              {/* Title & Description */}
              <h3 className="mt-5 text-lg font-semibold text-white tracking-tight">
                Premium
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#9ea0a8]">
                A complete design package for brands that need strategy, identity, and a refined website.
              </p>

              {/* Price */}
              <div className="mt-7 flex items-baseline gap-1">
                <span className="font-serif text-3xl font-semibold text-white">$</span>
                <span
                  ref={price2Ref}
                  className="font-serif text-[48px] sm:text-[54px] font-semibold leading-none tracking-tight text-white"
                >
                  2,800
                </span>
                <span className="ml-1.5 text-xs font-semibold uppercase tracking-wider text-[#7a7b83]">
                  USD
                </span>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="group/btn relative mt-7 flex h-11 w-full items-center justify-center overflow-hidden rounded-lg bg-white text-sm font-medium text-[#121218] shadow-[0_2px_4px_rgba(0,0,0,0.2),0_6px_16px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#f2f2f4] hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] active:scale-[0.99]"
              >
                {/* Specular highlight sheen animation */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-1000 ease-out group-hover/btn:translate-x-full" />
                <span className="relative z-10">Book this package</span>
              </a>
            </div>

            {/* Added Features Box */}
            <div className="relative z-10 mt-7 rounded-xl border border-white/10 bg-[#16161c]/80 backdrop-blur-md p-5">
              <h4 className="text-xs font-semibold text-white mb-3.5 tracking-tight">
                Added Features
              </h4>
              <ul className="space-y-2.5">
                {card2Features.map((feat) => (
                  <li
                    key={feat}
                    className="pricing-f2-item flex items-center gap-2.5 text-xs sm:text-[13px] text-[#a8a9b0] will-change-transform will-change-opacity"
                  >
                    <Check size={13} strokeWidth={2.2} className="text-white shrink-0" />
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
