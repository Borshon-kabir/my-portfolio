'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Menu } from 'lucide-react';

const metrics = [
  { target: 5, suffix: '+', label: 'Pro Tools Mastered', decimals: 0 },
  { target: 1.5, suffix: 'yr+', label: 'Experience', decimals: 1 },
  { target: 6, suffix: '+', label: 'Editing & Motion Skills', decimals: 0 },
];

const tools = [
  'Adobe After Effects',
  'Adobe Premiere Pro',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe Media Encoder',
  'ChatGPT',
  'Gemini',
  'Claude',
];

function ToolIcon({ tool }: { tool: string }) {
  const iconClass = 'h-4 w-4 shrink-0';

  const adobeBadge = (label: string, fill: string, text: string) => (
    <svg aria-hidden="true" className={iconClass} viewBox="0 0 16 16">
      <rect width="16" height="16" rx="3.5" fill={fill} />
      <text x="8" y="10.4" fill={text} fontFamily="Arial, sans-serif" fontSize="6.2" fontWeight="700" textAnchor="middle">
        {label}
      </text>
    </svg>
  );

  switch (tool) {
    case 'Adobe After Effects':
      return adobeBadge('Ae', '#2B165D', '#B7A8FF');
    case 'Adobe Premiere Pro':
      return adobeBadge('Pr', '#3B174E', '#F0A4FF');
    case 'Adobe Photoshop':
      return adobeBadge('Ps', '#001E36', '#5FC2FF');
    case 'Adobe Illustrator':
      return adobeBadge('Ai', '#351400', '#FFB44B');
    case 'Adobe Media Encoder':
      return adobeBadge('Me', '#063D3A', '#55E2D4');
    case 'ChatGPT':
      return (
        <svg aria-hidden="true" className={iconClass} viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="8" fill="#10A37F" />
          <path d="M8 3.2c1.2-1 3.1-.2 3.2 1.4 1.6-.2 2.5 1.6 1.5 2.8 1.2 1 0.7 3-.8 3.3.2 1.6-1.6 2.5-2.8 1.5-1 1.2-3 .7-3.3-.8-1.6.2-2.5-1.6-1.5-2.8-1.2-1-.7-3 .8-3.3-.2-1.6 1.6-2.5 2.8-1.5Z" fill="none" stroke="white" strokeWidth="1.15" strokeLinejoin="round" />
          <circle cx="8" cy="8" r="1.45" fill="white" />
        </svg>
      );
    case 'Gemini':
      return (
        <svg aria-hidden="true" className={iconClass} viewBox="0 0 16 16">
          <path d="M8 0.8 10.1 5.9 15.2 8l-5.1 2.1L8 15.2l-2.1-5.1L0.8 8l5.1-2.1L8 0.8Z" fill="#4285F4" />
          <path d="M8 0.8 10.1 5.9 8 8V0.8Z" fill="#EA4335" />
          <path d="M15.2 8 10.1 10.1 8 8h7.2Z" fill="#34A853" />
          <path d="M8 15.2 5.9 10.1 8 8v7.2Z" fill="#FBBC05" />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" className={iconClass} viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="8" fill="#D97757" />
          <path d="M10.9 4.7A4.1 4.1 0 1 0 10.9 11.3" fill="none" stroke="white" strokeLinecap="round" strokeWidth="1.75" />
          <path d="M9.7 5.3 12.5 8l-2.8 2.7" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
        </svg>
      );
  }
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }

    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .fromTo('.show-nav', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(
          '.show-kicker',
          { y: 15, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.45 },
          '-=0.35'
        )
        .fromTo(
          '.show-char',
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.012,
            duration: 0.65,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .fromTo(
          '.show-photo',
          { scale: 1.05, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          '.show-floating',
          { y: 20, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
            onComplete: () => {
              gsap.to('.show-floating', {
                y: -6,
                duration: 2.6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
            },
          },
          '-=0.6'
        )
        .fromTo(
          '.show-copy',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.55, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.show-metric',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.55, ease: 'power3.out' },
          '-=0.45'
        );

      // Smooth number counter rolling up
      metrics.forEach(({ target, suffix, decimals }, index) => {
        const val = { n: 0 };
        timeline.to(
          val,
          {
            n: target,
            duration: 0.9,
            ease: 'power2.out',
            onUpdate: () => {
              if (counterRefs.current[index]) {
                const value = decimals ? val.n.toFixed(decimals) : String(Math.round(val.n));
                counterRefs.current[index]!.textContent = `${value}${suffix}`;
              }
            },
          },
          index === 0 ? '-=0.45' : '<'
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Kinetic character-by-character letter split with overflow hidden wrapper
  const textChars = (value: string) =>
    value.split('').map((char, index) => (
      <span key={index} className="inline-block overflow-hidden align-top">
        <span className="show-char inline-block will-change-transform will-change-opacity">
          {char === ' ' ? '\u00a0' : char}
        </span>
      </span>
    ));

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const id = hash.replace('#', '').toLowerCase();
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch {
        window.location.hash = id;
      }
      let target = document.getElementById(id);
      if (id === 'about' || id === 'story') {
        target = document.getElementById('my-story') || document.getElementById('about');
      } else if (!target) {
        if (id === 'projects') target = document.getElementById('work');
        if (id === 'work') target = document.getElementById('projects');
        if (id === 'services') target = document.getElementById('why-choose-me');
      }

      if (target) {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(target, { offset: -80, duration: 0.5 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (id === 'home') {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(0, { duration: 0.5 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section ref={root} id="home" className="min-h-screen px-5 pb-20 pt-6 md:px-10 md:pt-7">
      <nav className="show-nav mx-auto flex max-w-[1160px] items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 font-semibold tracking-[-.04em] text-[#15151a]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#15151a] font-serif text-xl text-[#f5f5f4]">
            B
          </span>
          <span>Borshon.</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-[#25252b] md:flex">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="hover:text-[#15151a] transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="hover:text-[#15151a] transition-colors"
          >
            About
          </a>
          <a
            href="#work"
            onClick={(e) => handleNavClick(e, '#work')}
            className="hover:text-[#15151a] transition-colors"
          >
            Projects
          </a>
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, '#services')}
            className="hover:text-[#15151a] transition-colors"
          >
            Services
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, '#pricing')}
            className="hover:text-[#15151a] transition-colors"
          >
            Pricing
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hover:text-[#15151a] transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="dark-cta group flex items-center gap-3 rounded-lg bg-[#17171d] py-2 pl-4 pr-2 text-sm font-semibold text-white shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <button aria-label="Open menu" className="text-[#17171d] md:hidden">
            <Menu size={21} />
          </button>
        </div>
      </nav>

      <div className="relative mx-auto mt-16 grid min-h-[610px] max-w-[1160px] overflow-hidden rounded-[32px] bg-[#e5e5e7] px-8 py-12 md:mt-20 md:grid-cols-[1fr_1fr] md:px-20 md:py-16 shadow-xl">
        <div className="relative z-10 flex max-w-[470px] flex-col justify-center">
          <p className="show-kicker text-sm md:text-base font-medium text-[#686973] will-change-transform will-change-opacity mb-2">
            Hey, I&apos;m Borshon Kabir.
          </p>
          <h1
            aria-label="Craft better edits, faster."
            className="mt-0 font-serif text-4xl font-semibold leading-[1.08] tracking-[-.045em] text-[#15151a] md:text-5xl lg:text-6xl"
          >
            <span className="block">{textChars('Craft better')}</span>
            <span className="block">
              {textChars('edits, ')}
              <span className="text-[#a8a9b0]">{textChars('faster.')}</span>
            </span>
          </h1>

          <p className="show-copy mt-5 max-w-[365px] text-[15px] leading-6 text-[#53545d] will-change-transform will-change-opacity">
            I cut with precision, pace with purpose, and keep every frame moving.🔥
          </p>

          <div className="show-copy mt-7 flex gap-2 will-change-transform will-change-opacity">
            <a
              href="#work"
              className="dark-cta rounded-lg bg-[#17171d] px-5 py-3 text-sm font-semibold text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-[#c9cbd1] bg-white/60 px-5 py-3 text-sm font-medium text-[#292a30] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:border-[#17171d] hover:shadow-sm active:scale-[0.98]"
            >
              Get in touch
            </a>
          </div>

          <div className="relative z-30 mt-auto grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-md pt-16 md:pt-20">
            {metrics.map(({ label }, index) => (
              <div className="show-metric min-w-0 text-left will-change-transform will-change-opacity" key={label}>
                <p className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                  <span
                    ref={(element) => {
                      counterRefs.current[index] = element;
                    }}
                  >
                    0
                  </span>
                </p>
                <p className="text-[10px] sm:text-xs text-neutral-500 leading-tight block mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="show-photo absolute bottom-0 right-4 md:right-8 w-[380px] lg:w-[460px] h-[85%] lg:h-[92%] z-0 pointer-events-none flex items-end justify-center will-change-transform will-change-opacity"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 75%, transparent 100%), linear-gradient(to left, black 90%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskImage:
              '-webkit-linear-gradient(top, black 75%, transparent 100%), -webkit-linear-gradient(right, black 90%, transparent 100%)',
          }}
        >
          <Image
            src="/assets/hero.jpg"
            fill
            alt="Borshon Kabir"
            className="object-contain object-bottom"
            priority
          />
        </div>

        <div className="show-floating absolute top-3 right-3 md:top-3 md:right-8 z-20 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-4 max-w-[220px] text-white shadow-2xl transition-all duration-300 hover:border-white/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] will-change-transform will-change-opacity">
          <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Select project</p>
          <h4 className="text-xs font-semibold mb-1">Available for projects</h4>
          <p className="text-[11px] text-neutral-300 leading-tight mb-2">
            Share a few details, and I&apos;ll get back with a clear direction.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center w-6 h-6 bg-white text-black rounded-full text-xs hover:scale-110 active:scale-95 transition-transform"
          >
            ↗
          </a>
        </div>
      </div>

      <div className="mx-auto mt-11 flex max-w-[1160px] flex-col items-center gap-4 border-t border-white/5 pt-4 md:flex-row md:gap-8">
        {/* Label — sits outside the scrolling track, never clips */}
        <p className="shrink-0 text-xs leading-4 text-[#7a7b83] md:w-28">
          Tools I use
        </p>

        {/* Scrolling track wrapper — overflow-hidden is scoped here only */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="brand-track flex min-w-max items-center gap-3 px-3 py-1 text-[11px] font-medium md:gap-4">
            {[...tools, ...tools].map((tool, index) => (
              <span
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-[#17171d] px-3 py-1 text-neutral-100 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
                key={`${tool}-${index}`}
              >
                <ToolIcon tool={tool} />
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
