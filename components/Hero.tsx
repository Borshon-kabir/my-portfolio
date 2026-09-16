'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Menu, X, Sparkles, Clock, Film } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ProfileCardModal from './ProfileCardModal';

const metrics = [
  { target: 5, suffix: '+', label: 'Pro Tools Mastered', decimals: 0, icon: Sparkles },
  { target: 1.5, suffix: 'yr+', label: 'Experience', decimals: 1, icon: Clock },
  { target: 6, suffix: '+', label: 'Editing & Motion Skills', decimals: 0, icon: Film },
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
  const mobileCounterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              const value = decimals ? val.n.toFixed(decimals) : String(Math.round(val.n));
              if (counterRefs.current[index]) {
                counterRefs.current[index]!.textContent = `${value}${suffix}`;
              }
              if (mobileCounterRefs.current[index]) {
                mobileCounterRefs.current[index]!.textContent = `${value}${suffix}`;
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
    <section ref={root} id="home" className="min-h-screen px-4 sm:px-6 pb-20 pt-4 sm:pt-6 md:px-10 md:pt-7">
      <header className="show-nav w-full py-3 sm:py-4 sticky top-0 z-50 bg-transparent backdrop-blur-md border-none shadow-none transition-colors duration-300">
        <div className="mx-auto max-w-[1160px] w-full flex items-center justify-between">
          {/* Left Slot: Logo */}
          <div className="w-auto md:w-1/3 flex justify-start items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 font-semibold tracking-[-.04em] text-[#15151a] dark:text-[#f8fafc] cursor-pointer group hover:opacity-90 transition-all text-left"
              aria-label="View Borshon Kabir profile card"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#15151a] font-serif text-xl text-[#f5f5f4] dark:bg-white dark:text-[#15151a] transition-transform duration-200 group-hover:scale-105">
                B
              </span>
              <span className="transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Borshon.
              </span>
            </button>
          </div>

          {/* Middle Slot: Nav Links (Strictly Centered on desktop) */}
          <div className="hidden md:flex md:w-1/3 justify-center items-center">
            <nav className="flex items-center gap-6 lg:gap-8 text-sm text-[#25252b] dark:text-[#94a3b8]">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="hover:text-[#15151a] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className="hover:text-[#15151a] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                About
              </a>
              <a
                href="#work"
                onClick={(e) => handleNavClick(e, '#work')}
                className="hover:text-[#15151a] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Projects
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, '#services')}
                className="hover:text-[#15151a] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Services
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleNavClick(e, '#pricing')}
                className="hover:text-[#15151a] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Pricing
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="hover:text-[#15151a] dark:hover:text-white transition-colors whitespace-nowrap"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Right Slot: Let's talk + Theme Toggle + Mobile Menu */}
          <div className="w-auto md:w-1/3 flex justify-end items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="dark-cta group flex items-center gap-1.5 sm:gap-2.5 rounded-lg bg-[#17171d] py-1.5 px-2.5 sm:py-2 sm:pl-4 sm:pr-2 text-[11px] sm:text-xs md:text-sm font-semibold text-white shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] whitespace-nowrap shrink-0"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="flex md:hidden items-center justify-center h-8 w-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 text-[#17171d] dark:text-[#f8fafc] hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto mt-6 sm:mt-10 md:mt-20 flex flex-col md:grid md:grid-cols-[1fr_1fr] min-h-[auto] md:min-h-[610px] max-w-[1160px] overflow-hidden rounded-[28px] sm:rounded-[32px] border border-slate-200 bg-[#f0f2f5] px-5 py-8 sm:px-8 sm:py-12 md:px-20 md:py-16 text-slate-900 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-[#141824] dark:text-white">
        <div className="relative z-10 flex max-w-[470px] flex-col justify-center w-full">
          <div className="show-kicker mb-3 flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-400 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
              Hey, I&apos;m Borshon Kabir.
            </span>
          </div>

          <h1
            aria-label="Craft better edits, faster."
            className="mt-0 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-[-.045em] text-slate-900 dark:text-white"
          >
            <span className="block">{textChars('Craft better')}</span>
            <span className="block">
              {textChars('edits, ')}
              <span className="text-slate-400 dark:text-slate-500">{textChars('faster.')}</span>
            </span>
          </h1>

          <p className="show-copy mt-4 sm:mt-5 max-w-[365px] text-sm sm:text-[15px] leading-6 text-slate-600 will-change-transform will-change-opacity dark:text-slate-400">
            I cut with precision, pace with purpose, and keep every frame moving.🔥
          </p>

          <div className="show-copy mt-6 sm:mt-7 flex flex-wrap gap-2.5 will-change-transform will-change-opacity">
            <a
              href="#work"
              onClick={(e) => handleNavClick(e, '#work')}
              className="rounded-lg bg-slate-900 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              View projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-sm active:scale-[0.98] dark:border-slate-700 dark:bg-transparent dark:text-white dark:hover:border-slate-500 dark:hover:bg-slate-800"
            >
              Get in touch
            </a>
          </div>

          {/* Mobile Portrait: Larger size, centered, with seamless bottom and side fade */}
          <div
            className="show-photo relative mx-auto mt-6 flex h-80 sm:h-96 w-[125%] max-w-[360px] sm:max-w-[420px] items-end justify-center overflow-hidden bg-[#f0f2f5] pointer-events-none will-change-transform will-change-opacity md:hidden dark:bg-[#141824]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          >
            <Image
              src="/images/profile-light.png"
              fill
              alt="Borshon Kabir"
              className="block object-contain object-bottom dark:hidden"
              priority
            />
            <Image
              src="/images/profile-dark.jpeg"
              fill
              alt=""
              aria-hidden="true"
              className="hidden object-contain object-bottom dark:block"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f0f2f5] via-[#f0f2f5]/80 to-transparent pointer-events-none dark:from-[#141824] dark:via-[#141824]/80" />
          </div>

          {/* Mobile Metrics Row: Clean horizontal 3-column row below portrait with icons */}
          <div className="show-metric mt-6 grid grid-cols-3 gap-2 sm:gap-3 w-full pt-4 border-t border-slate-200/80 dark:border-slate-800/80 md:hidden">
            {metrics.map(({ label, icon: Icon }, index) => (
              <div
                key={`mobile-${label}`}
                className="flex flex-col items-center text-center p-2 rounded-xl bg-white/60 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 shadow-xs"
              >
                <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                  <Icon size={14} />
                </div>
                <p className="font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  <span
                    ref={(element) => {
                      mobileCounterRefs.current[index] = element;
                    }}
                  >
                    0
                  </span>
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-slate-600 dark:text-slate-400 font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Metrics Row */}
          <div className="relative z-30 mt-auto hidden md:grid grid-cols-3 gap-4 lg:gap-6 w-full max-w-md pt-16 md:pt-20">
            {metrics.map(({ label, icon: Icon }, index) => (
              <div className="show-metric min-w-0 text-left will-change-transform will-change-opacity" key={label}>
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                  <Icon size={15} />
                </div>
                <p className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  <span
                    ref={(element) => {
                      counterRefs.current[index] = element;
                    }}
                  >
                    0
                  </span>
                </p>
                <p className="mt-1 block text-xs leading-tight text-slate-600 dark:text-slate-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Portrait */}
        <div
          className="show-photo absolute bottom-0 right-4 z-0 hidden md:flex h-[85%] w-[380px] items-end justify-center bg-[#f0f2f5] pointer-events-none will-change-transform will-change-opacity md:right-8 lg:h-[92%] lg:w-[460px] dark:bg-[#141824]"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          <Image
            src="/images/profile-light.png"
            fill
            alt="Borshon Kabir"
            className="block object-contain object-bottom dark:hidden"
            priority
          />
          <Image
            src="/images/profile-dark.jpeg"
            fill
            alt=""
            aria-hidden="true"
            className="hidden object-contain object-bottom dark:block"
            priority
          />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f0f2f5] to-transparent dark:from-[#141824]" />
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

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/95 backdrop-blur-xl p-6 md:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white font-serif text-xl text-[#15151a]">
                B
              </span>
              <span>Borshon Kabir</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-5 pt-8 text-lg font-medium text-slate-200">
            {[
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#work', label: 'Projects' },
              { href: '#services', label: 'Services' },
              { href: '#pricing', label: 'Pricing' },
              { href: '#contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, href);
                }}
                className="hover:text-blue-400 transition-colors py-1"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-6 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, '#contact');
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow-lg active:scale-98"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}

      {/* Profile Card Popup Modal */}
      <ProfileCardModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onContactClick={() => {
          const target = document.getElementById('contact');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </section>
  );
}
