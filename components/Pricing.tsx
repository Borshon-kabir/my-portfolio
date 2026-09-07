'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

// Exact Framer logo SVG geometry extracted from Sevora
function FramerIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M 6 6 L 12 6 L 12 0 L 0 0 Z M 6 6 L 0 6 L 0 12 L 6 18 L 6 12 L 12 12 Z"
        transform="translate(6 3)"
      />
    </svg>
  );
}

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
  'Framer website development',
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
      // 1. Header reveal animation
      gsap.fromTo(
        '.pricing-header-elem',
        { y: 30, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      );

      // 2. Cards entrance animation with 3D perspective stagger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      // Card 1 spring in
      tl.fromTo(
        card1Ref.current,
        {
          y: 80,
          opacity: 0,
          rotateX: 8,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
        },
        0
      );

      // Card 2 spring in with micro delay and deeper stagger
      tl.fromTo(
        card2Ref.current,
        {
          y: 110,
          opacity: 0,
          rotateX: 10,
          scale: 0.93,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.05,
          ease: 'power3.out',
        },
        0.12
      );

      // 3. Counter roll-up for Price 1 ($1,200)
      const count1 = { val: 0 };
      tl.to(
        count1,
        {
          val: 1200,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            if (price1Ref.current) {
              price1Ref.current.textContent = Math.round(count1.val).toLocaleString('en-US');
            }
          },
        },
        0.2
      );

      // 4. Counter roll-up for Price 2 ($2,800)
      const count2 = { val: 0 };
      tl.to(
        count2,
        {
          val: 2800,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            if (price2Ref.current) {
              price2Ref.current.textContent = Math.round(count2.val).toLocaleString('en-US');
            }
          },
        },
        0.3
      );

      // 5. Features checklist cascade
      tl.fromTo(
        '.pricing-f1-item',
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0.4
      );

      tl.fromTo(
        '.pricing-f2-item',
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0.5
      );
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
            Focused packages for design, Framer, and launch.
          </p>
        </div>

        {/* 2-Card Layout Matching Sevora */}
        <div
          ref={cardsContainerRef}
          style={{ perspective: '1200px' }}
          className="mx-auto mt-14 grid max-w-[820px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 items-stretch"
        >
          {/* CARD 1: LIGHT CARD (Framer) */}
          <div
            ref={card1Ref}
            onMouseMove={(e) => handleMouseMove(e, card1Ref.current)}
            onMouseLeave={() => handleMouseLeave(card1Ref.current)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#e0e2e6] bg-white p-6 sm:p-7 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[#cbced6] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] will-change-transform"
          >
            <div>
              {/* Squircle Icon */}
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#e0e2e6] bg-gradient-to-b from-[#f7f7f8] to-[#e8eaed] text-[#121218] shadow-[0_4px_8px_-4px_rgba(201,205,210,0.8),0_12px_18px_-2px_rgba(201,205,210,0.5),inset_0_1px_0_white,inset_0_-1px_0_#c9cdd2]">
                <FramerIcon className="h-5 w-5" />
              </div>

              {/* Title & Description */}
              <h3 className="mt-5 text-lg font-semibold text-[#121218] tracking-tight">
                Framer
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#6c6e79]">
                A focused Framer build for brands that need a clean, responsive, and launch-ready website.
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
