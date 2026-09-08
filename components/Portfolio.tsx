'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Check, Copy, Instagram, Linkedin, Loader2, Menu, Play, X, Youtube } from 'lucide-react';
import { projects, testimonials, type Project } from '../data/content';
import Hero from './Hero';
import HomeIntro from './HomeIntro';
import WhyChooseMe from './WhyChooseMe';
import MyStory from './MyStory';
import Process from './Process';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Footer from './Footer';

const nav = ['Home', 'About', 'Projects', 'Services', 'Process', 'Pricing', 'FAQ', 'Contact'];

/** Convert Google Drive share links and YouTube watch URLs to embeddable URLs */
function getEmbedUrl(url: string): string {
  // Google Drive: /file/d/{ID}/view → /preview
  const driveMatch = url.match(/\/file\/d\/([^/]+)\//);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  // YouTube watch URL: ?v=ID
  const ytWatch = url.match(/[?&]v=([^&]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}?autoplay=1`;
  // YouTube short URL: youtu.be/ID
  const ytShort = url.match(/youtu\.be\/([^?]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=1`;
  // Already an embed / preview URL — return as-is
  return url;
}

export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [quote, setQuote] = useState(0);
  const [cursorHover, setCursorHover] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Brand Film',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'loading') return;

    setFormStatus('loading');
    setFormError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setFormStatus('success');
      setSent(true);
      setFormData({ name: '', email: '', projectType: 'Brand Film', message: '' });
    } catch (err: any) {
      setFormStatus('error');
      setFormError(err.message || 'Failed to send message. Please try again.');
    }
  };

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // High-performance 120fps GSAP lerped cursor
  useEffect(() => {
    if (!cursorDotRef.current || !cursorRingRef.current) return;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3.out' });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          'a, button, [role="button"], input, textarea, select, .work-card-anim, .intro-card, .process-card-anim, .pricing-card-anim, .faq-item-anim, .dark-cta'
        )
      ) {
        setCursorHover(true);
      } else {
        setCursorHover(false);
      }
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      hasMoved = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      // Always scroll to top on load
      window.scrollTo(0, 0);
      // Remove any hash from URL for a clean Home state
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    const onBeforeUnload = () => {
      if (typeof window !== 'undefined') {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {

    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollTrigger.clearScrollMemory === 'function') {
      ScrollTrigger.clearScrollMemory('manual');
    }

    const l = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });
    if (!window.location.hash) {
      l.scrollTo(0, { immediate: true });
    }
    if (typeof window !== 'undefined') {
      (window as any).__lenis = l;
    }

    l.on('scroll', ScrollTrigger.update);
    const updateRaf = (time: number) => {
      l.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Projects Section Reveal (Projects with clarity)
      gsap.fromTo(
        '.project-header-anim',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#work',
            start: 'top 92%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.project-card-anim',
        { y: 35, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid-container',
            start: 'top 92%',
            once: true,
          },
        }
      );

      // Testimonials reveal
      gsap.fromTo(
        '.testimonial-anim',
        { y: 35, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 92%',
            once: true,
          },
        }
      );

      // Contact reveal
      gsap.fromTo(
        '.contact-text-anim',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 92%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.contact-form-anim',
        { y: 35, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 90%',
            once: true,
          },
        }
      );

      const timer1 = setTimeout(() => ScrollTrigger.refresh(), 200);
      const timer2 = setTimeout(() => ScrollTrigger.refresh(), 800);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    });

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__lenis;
      }

      gsap.ticker.remove(updateRaf);
      l.destroy();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const i = setInterval(() => setQuote((x) => (x + 1) % testimonials.length), 5000);
    return () => clearInterval(i);
  }, []);

  // Auto-scroll on page load/refresh if a URL hash exists, after GSAP animations initialize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollToHash = (isInitial = false) => {
      const rawHash = window.location.hash;
      if (!rawHash) return;

      const targetId = decodeURIComponent(rawHash.replace(/^#/, '')).toLowerCase().trim();
      if (!targetId) return;

      let targetEl = document.getElementById(targetId);
      if (targetId === 'about' || targetId === 'about-intro' || targetId === 'story' || targetId === 'my-story') {
        targetEl = document.getElementById('my-story') || document.getElementById('about');
      } else if (!targetEl) {
        if (targetId === 'projects') targetEl = document.getElementById('work');
        else if (targetId === 'work') targetEl = document.getElementById('projects');
        else if (targetId === 'services' || targetId === 'why-me' || targetId === 'why-choose-me') {
          targetEl = document.getElementById('services');
        }
      }

      if (targetEl) {
        ScrollTrigger.refresh();
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(targetEl, {
            offset: -80,
            duration: isInitial ? 0.9 : 1.2,
            immediate: false,
          });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (targetId === 'home') {
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { duration: 0.8 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    // Automatically scroll to the hashed section after GSAP animations initialize
    const timer1 = setTimeout(() => scrollToHash(true), 250);
    const timer2 = setTimeout(() => scrollToHash(false), 850);

    const onHashChange = () => scrollToHash(false);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const go = (x: string) => {
    setMenu(false);
    const id = x.toLowerCase().trim();

    // 1. Update the URL hash (e.g. /#services, /#about, /#contact)
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch {
        window.location.hash = id;
      }
    }

    let target = document.getElementById(id);
    if (id === 'about' || id === 'story' || id === 'my-story') {
      target = document.getElementById('my-story') || document.getElementById('about');
    } else if (!target) {
      if (id === 'projects') target = document.getElementById('work');
      else if (id === 'services' || id === 'why-me' || id === 'why-choose-me') {
        target = document.getElementById('services');
      }
    }

    if (target) {
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'home') {
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <main className="text-[#15151a] min-h-screen selection:bg-[#17171d] selection:text-white">
      <div className="grain" />

      {/* 120fps Dual-Element Magnetic Cursor */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[95] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15151a] opacity-0 transition-transform duration-150 ease-out md:block will-change-transform h-1.5 w-1.5"
      />
      <div
        ref={cursorRingRef}
        className={`pointer-events-none fixed top-0 left-0 z-[90] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#15151a]/30 opacity-0 transition-all duration-300 ease-out md:block will-change-transform ${
          cursorHover
            ? 'h-12 w-12 border-[#15151a]/60 bg-[#15151a]/10 backdrop-blur-[1px] scale-110'
            : 'h-8 w-8 bg-transparent'
        }`}
      />

      <header className="fixed inset-x-0 top-0 z-40 p-4 md:p-6">
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between rounded-full border border-black/10 bg-[#f4f4f6]/80 px-5 py-3 backdrop-blur-xl">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go('Home');
            }}
            className="display text-lg font-bold text-[#15151a]"
          >
            BK<span className="text-[#15151a]">.</span>
          </a>
          <div className="hidden gap-6 lg:flex">
            {nav.map((x) => (
              <a
                key={x}
                href={`#${x.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(x);
                }}
                className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#53545d] hover:text-[#15151a] transition-colors"
              >
                {x}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go('Contact');
            }}
            className="hidden rounded-full bg-[#17171d] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-[#34343a] sm:block"
          >
            Let&apos;s Talk <ArrowUpRight className="inline" size={13} />
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setMenu(true)}
            className="grid h-9 w-9 place-items-center rounded-full border border-black/15 text-[#17171d] lg:hidden"
          >
            <Menu size={16} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            className="fixed inset-0 z-50 flex flex-col bg-[#f4f4f6] p-6 text-[#15151a] border-b border-black/10"
          >
            <button onClick={() => setMenu(false)} className="ml-auto text-[#15151a]">
              <X size={30} />
            </button>
            <div className="my-auto">
              {nav.map((x) => (
                <a
                  href={`#${x.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(x);
                  }}
                  key={x}
                  className="display block text-6xl font-bold leading-tight text-[#15151a] hover:text-[#53545d] transition-colors"
                >
                  {x}
                </a>
              ))}
            </div>
            <p className="text-xs uppercase tracking-[.2em] text-[#7a7b83]">
              Sylhet, Bangladesh — available worldwide
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <HomeIntro />

      <div className="overflow-hidden py-5">
        <div className="marquee flex gap-8">
          <p className="display whitespace-nowrap text-3xl font-bold text-[#15151a]">
            EDIT • COLOR • MOTION • SOUND • STORY • EDIT • COLOR • MOTION • SOUND • STORY •{' '}
          </p>
          <p className="display whitespace-nowrap text-3xl font-bold text-[#a8a9b0]">
            EDIT • COLOR • MOTION • SOUND • STORY • EDIT • COLOR • MOTION • SOUND • STORY •{' '}
          </p>
        </div>
      </div>

      {/* Selected Work Section (Projects with Clarity) */}
      <section id="work" className="px-5 py-24 md:px-10 md:py-32">
        <span id="projects" className="sr-only">Featured Edits & Stories</span>

        <div className="mx-auto max-w-[1160px]">
          {/* Header */}
          <div className="text-center">
            <p className="project-header-anim inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#e5e5e7] px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-[#53545d] backdrop-blur-md will-change-transform will-change-opacity">
              Selected work
            </p>
            <h2 className="project-header-anim mt-5 font-serif text-[clamp(2.75rem,5.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#15151a] will-change-transform will-change-opacity">
              Featured Edits & Stories
            </h2>
            <p className="project-header-anim mx-auto mt-4 max-w-xl text-base text-[#53545d] will-change-transform will-change-opacity">
              A curated collection of high-retention videos, reels, and ads crafted for modern creators and brands.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="projects-grid-container mt-16 grid gap-8 md:grid-cols-2">
            {/* Card 1: Map Animation */}
            <div
              onClick={() => setActive(projects[0])}
              className="project-card-anim group cursor-pointer will-change-transform will-change-opacity"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[28px] border border-black/5 bg-[#0d1117] shadow-sm transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[0_24px_50px_rgba(20,20,25,0.18)]">
                {/* Thumbnail */}
                <img
                  src="/thumbnails/map-animation.jpg"
                  alt="Map Animation"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {/* Category badge — top left */}
                <span className="absolute left-4 top-4 rounded-full border border-amber-400/30 bg-black/50 px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-amber-300 backdrop-blur-sm">
                  Documentary Video
                </span>
                {/* REC dot — top right */}
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-red-400 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  REC
                </span>
                {/* Bottom title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[9px] font-mono tracking-widest text-white/50 uppercase mb-1">Real Stories. Real Impact.</p>
                  <h4 className="font-serif text-2xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
                    Map Animation
                  </h4>
                </div>
                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/50 backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} className="translate-x-0.5 fill-white text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#15151a] tracking-tight group-hover:text-black transition-colors">
                    Map Animation
                  </h3>
                  <p className="text-xs text-[#7a7b83] mt-0.5">Documentary Video · 2024</p>
                </div>
                <span className="text-[#7a7b83] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#15151a]">
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </div>

            {/* Card 2: Nivora */}
            <div
              onClick={() => setActive(projects[1])}
              className="project-card-anim group cursor-pointer will-change-transform will-change-opacity"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[28px] border border-black/5 bg-[#a2e701] flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[0_24px_50px_rgba(20,20,25,0.12)] p-6 sm:p-7">
                <div className="relative h-full w-full flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#0d2900] text-xs font-mono font-bold tracking-wider">
                    <span>NIVORA</span>
                    <span>SATURDAY, 09:52 AM</span>
                  </div>
                  <div className="relative my-auto flex flex-col items-center justify-center text-center">
                    <div className="relative w-full max-w-[280px] h-[160px] flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 200 200" className="w-full h-full text-[#0d2900] opacity-85">
                        <path d="M100,30 C75,30 55,50 55,80 C55,105 70,120 75,140 C80,160 70,180 60,195 L140,195 C130,180 120,160 125,140 C130,120 145,105 145,80 C145,50 125,30 100,30 Z" fill="currentColor" opacity="0.35" />
                        <circle cx="85" cy="75" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
                        <circle cx="115" cy="75" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
                        <line x1="99" y1="75" x2="101" y2="75" stroke="currentColor" strokeWidth="4" />
                      </svg>
                    </div>
                    <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#0d2900] leading-[0.85] -mt-10 z-10">
                      DESIGN<br />FOR<br />EVERYONE
                    </h3>
                  </div>
                  <p className="text-[9px] font-mono tracking-widest text-[#0d2900]/70 uppercase text-center">
                    THOUGHTFUL DESIGN ACROSS BRANDS, PRODUCTS, AND DIGITAL EXPERIENCES
                  </p>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-md shadow-lg">
                    <Play size={20} className="translate-x-0.5 fill-white text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-serif text-2xl font-semibold text-[#15151a] tracking-tight group-hover:text-black transition-colors">
                  Nivora
                </h3>
                <span className="text-[#7a7b83] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#15151a]">
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </div>

            {/* Card 3: Codify */}
            <div
              onClick={() => setActive(projects[2])}
              className="project-card-anim group cursor-pointer will-change-transform will-change-opacity"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[28px] border border-black/5 bg-[#18392b] p-5 sm:p-7 md:p-8 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[0_24px_50px_rgba(20,20,25,0.12)]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white p-5 shadow-xl flex flex-col justify-between border border-black/5">
                  <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                    <span className="font-bold tracking-tight text-[#15151a] text-xs">Codify.</span>
                    <div className="flex items-center gap-3 text-[9px] text-neutral-400">
                      <span>Services</span>
                      <span>Our work</span>
                      <span>About</span>
                    </div>
                    <span className="rounded-full bg-black px-2 py-0.5 text-[8px] text-white">Book</span>
                  </div>
                  <div className="my-1.5">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Creative Agency
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#15151a] mt-1 leading-snug">
                      Elevating Your Brand with Innovative Design
                    </h4>
                  </div>
                  <div className="grid grid-cols-4 gap-2 h-20 sm:h-24">
                    <div className="rounded-lg bg-[#a2e701] p-1.5 flex flex-col justify-between">
                      <span className="text-[7px] font-black uppercase">Brand</span>
                      <div className="h-1 w-full bg-black/30 rounded" />
                    </div>
                    <div className="rounded-lg bg-[#fed8aa] p-1.5 flex flex-col justify-between">
                      <span className="text-[7px] font-bold">Packaging</span>
                      <div className="h-6 w-full rounded bg-white/60" />
                    </div>
                    <div className="rounded-lg bg-[#15151a] p-1.5 flex flex-col justify-between text-white">
                      <span className="text-[7px] font-mono">Mobile</span>
                      <div className="h-6 w-full rounded bg-neutral-800 border border-white/10" />
                    </div>
                    <div className="rounded-lg bg-[#a5f2fb] p-1.5 flex flex-col justify-between">
                      <span className="text-[7px] font-bold">Identity</span>
                      <div className="h-1 w-full bg-black/30 rounded" />
                    </div>
                  </div>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-md shadow-lg">
                    <Play size={20} className="translate-x-0.5 fill-white text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-serif text-2xl font-semibold text-[#15151a] tracking-tight group-hover:text-black transition-colors">
                  Codify
                </h3>
                <span className="text-[#7a7b83] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#15151a]">
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </div>

            {/* Card 4: Neutra */}
            <div
              onClick={() => setActive(projects[3])}
              className="project-card-anim group cursor-pointer will-change-transform will-change-opacity"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[28px] border border-black/5 bg-[#191920] p-5 sm:p-7 md:p-8 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[0_24px_50px_rgba(20,20,25,0.12)]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#111116] p-5 sm:p-6 shadow-xl flex flex-col justify-between border border-white/10 text-white">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm bg-white" />
                      <span className="text-xs font-bold tracking-tight">Neutra</span>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] text-neutral-400">
                      <span>Docs</span>
                      <span>Features</span>
                      <span>Pricing</span>
                    </div>
                  </div>
                  <div className="relative my-auto grid grid-cols-2 items-center gap-4 py-2">
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-semibold leading-tight text-white">
                        Design for ambitious software companies
                      </h4>
                      <p className="mt-1.5 text-[9px] text-neutral-400 leading-normal">
                        Uncover distinct features engineered for clarity.
                      </p>
                    </div>
                    <div className="relative flex items-center justify-center">
                      <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24">
                        <defs>
                          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="30%" stopColor="#d1d5db" />
                            <stop offset="50%" stopColor="#4b5563" />
                            <stop offset="70%" stopColor="#f3f4f6" />
                            <stop offset="100%" stopColor="#1f2937" />
                          </linearGradient>
                        </defs>
                        <circle cx="60" cy="60" r="34" fill="none" stroke="url(#chromeGrad)" strokeWidth="10" />
                        <polygon points="60,25 90,85 30,85" fill="url(#chromeGrad)" opacity="0.9" />
                        <circle cx="60" cy="60" r="12" fill="#ffffff" opacity="0.9" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[8px] text-neutral-500 pt-2 border-t border-white/5">
                    <span>Enterprise Grade</span>
                    <span>Explore Features ↗</span>
                  </div>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-md shadow-lg">
                    <Play size={20} className="translate-x-0.5 fill-white text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-serif text-2xl font-semibold text-[#15151a] tracking-tight group-hover:text-black transition-colors">
                  Neutra
                </h3>
                <span className="text-[#7a7b83] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#15151a]">
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </div>

            {/* Card 5: Snapkit */}
            <div
              onClick={() => setActive(projects[4])}
              className="project-card-anim group cursor-pointer will-change-transform will-change-opacity"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[28px] border border-black/5 bg-[#16161b] p-5 sm:p-7 md:p-8 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[0_24px_50px_rgba(20,20,25,0.12)]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-xl flex flex-col justify-between border border-black/5 text-[#15151a]">
                  <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                    <span className="font-bold text-xs tracking-tight">Snapkit.</span>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[8px] font-mono text-neutral-600">v2.4 Released</span>
                  </div>
                  <div className="my-auto text-center py-2">
                    <span className="inline-block rounded-full bg-black/5 px-2 py-0.5 text-[8px] font-mono text-neutral-500 mb-1.5">
                      Components &amp; Wireframes
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#15151a] leading-tight">
                      Premium Templates for Nuxt, Framer &amp; Figma
                    </h4>
                    <div className="mt-3 flex justify-center gap-2">
                      <span className="rounded-lg bg-[#15151a] px-3 py-1 text-[9px] font-semibold text-white">Get template</span>
                      <span className="rounded-lg border border-black/10 px-3 py-1 text-[9px] text-neutral-600">Preview</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-[8px] text-neutral-400 pt-2 border-t border-black/5">
                    <span>Framer</span>
                    <span>•</span>
                    <span>Figma</span>
                    <span>•</span>
                    <span>Nuxt</span>
                  </div>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-md shadow-lg">
                    <Play size={20} className="translate-x-0.5 fill-white text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-serif text-2xl font-semibold text-[#15151a] tracking-tight group-hover:text-black transition-colors">
                  Snapkit
                </h3>
                <span className="text-[#7a7b83] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#15151a]">
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </div>

            {/* Card 6: TodoFusion */}
            <div
              onClick={() => setActive(projects[5])}
              className="project-card-anim group cursor-pointer will-change-transform will-change-opacity"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[28px] border border-black/5 bg-[#ede8ff] p-5 sm:p-7 md:p-8 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[0_24px_50px_rgba(20,20,25,0.12)]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-xl flex flex-col justify-between border border-black/5 text-[#15151a]">
                  <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                      <span className="font-bold text-xs">TodoFusion</span>
                    </div>
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[8px] font-medium text-indigo-600">AI Powered</span>
                  </div>
                  <div className="my-1.5">
                    <h4 className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#15151a] leading-tight">
                      Boost Your Productivity with TodoFusion
                    </h4>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-[#faf5ff] p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[8px] text-neutral-500">
                      <span className="font-semibold text-neutral-700">Sprint Roadmap</span>
                      <span className="text-indigo-600 font-bold">84% Done</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-indigo-100 overflow-hidden">
                      <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    </div>
                    <div className="grid grid-cols-3 gap-1 pt-1">
                      <div className="rounded bg-white p-1 shadow-sm border border-black/5 text-center">
                        <span className="text-[6px] text-neutral-400 block">Tasks</span>
                        <b className="text-[9px] text-[#15151a]">42/50</b>
                      </div>
                      <div className="rounded bg-white p-1 shadow-sm border border-black/5 text-center">
                        <span className="text-[6px] text-neutral-400 block">Efficiency</span>
                        <b className="text-[9px] text-emerald-600">+28%</b>
                      </div>
                      <div className="rounded bg-white p-1 shadow-sm border border-black/5 text-center">
                        <span className="text-[6px] text-neutral-400 block">Velocity</span>
                        <b className="text-[9px] text-purple-600">9.8x</b>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur-md shadow-lg">
                    <Play size={20} className="translate-x-0.5 fill-white text-white" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <h3 className="font-serif text-2xl font-semibold text-[#15151a] tracking-tight group-hover:text-black transition-colors">
                  TodoFusion
                </h3>
                <span className="text-[#7a7b83] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#15151a]">
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <MyStory />

      {/* Why Choose Me / Design built around lasting clarity (Replaces 'The craft, considered.') */}
      <WhyChooseMe />

      {/* Structured 6-Step Process */}
      <Process />

      {/* Pricing & Packages */}
      <Pricing />

      {/* FAQs */}
      <FAQ />

      {/* Testimonials */}
      <section id="testimonials" className="overflow-hidden py-28 text-[#15151a]">
        <div className="mx-auto max-w-[1100px] px-5 text-center">
          <p className="eyebrow inline-block text-[#7a7b83]">( 05 — KIND WORDS )</p>
          <div className="testimonial-anim relative mt-12 min-h-[300px] rounded-3xl border border-black/10 bg-[#e5e5e7] p-8 md:p-14 backdrop-blur-xl shadow-lg will-change-transform will-change-opacity">
            <span className="display text-9xl leading-none opacity-10 text-[#15151a] select-none">“</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={quote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-x-0 top-12 px-6 md:px-12"
              >
                <p className="display text-2xl leading-tight tracking-[-.03em] text-[#15151a] md:text-4xl">
                  {testimonials[quote].quote}
                </p>
                <p className="mt-8 text-xs font-bold uppercase tracking-[.15em] text-[#15151a]">
                  {testimonials[quote].name}
                </p>
                <p className="mt-1 text-xs text-[#53545d]">{testimonials[quote].role}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setQuote(i)}
                key={i}
                className={`h-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  i === quote ? 'w-6 bg-[#15151a]' : 'w-2 bg-black/20'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
        <div className="orb absolute -left-60 bottom-0 h-[600px] w-[600px]" />
        <div className="relative mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="contact-text-anim eyebrow text-[#7a7b83] will-change-transform will-change-opacity">( 06 — Contact )</p>
            <h2 className="contact-text-anim display mt-6 text-6xl leading-[.85] tracking-[-.07em] text-[#15151a] md:text-9xl will-change-transform will-change-opacity">
              Let&apos;s make<br />
              something <i className="font-light text-[#7a7b83]">felt.</i>
            </h2>
            <button
              onClick={() => {
                navigator.clipboard.writeText('hello@borshonkabir.com');
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
              className="contact-text-anim mt-12 flex items-center gap-2 border-b border-black/30 pb-2 text-lg text-[#15151a] hover:border-[#15151a] transition-all hover:scale-[1.01] will-change-transform will-change-opacity"
            >
              {copied ? (
                <>
                  <Check size={17} className="text-[#15151a]" /> Email copied!
                </>
              ) : (
                <>
                  <Copy size={17} /> hello@borshonkabir.com
                </>
              )}
            </button>
            <p className="contact-text-anim mt-4 text-sm text-[#53545d] will-change-transform will-change-opacity">Sylhet, Bangladesh · +880 1XXX-XXXXXX</p>
            <div className="contact-text-anim mt-8 flex gap-3 will-change-transform will-change-opacity">
              {[Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a
                  aria-label="Social profile"
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-[#e5e5e7] text-[#15151a] transition-all duration-300 hover:bg-[#17171d] hover:text-white hover:scale-110 hover:-translate-y-1 hover:shadow-md"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="contact-form-anim self-end rounded-3xl border border-black/10 bg-[#e5e5e7] p-6 backdrop-blur-xl md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 will-change-transform will-change-opacity"
          >
            <p className="display text-2xl text-[#15151a]">Start a project</p>
            <div className="mt-7 grid gap-5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#53545d]">
                Name
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={formStatus === 'loading'}
                  className="mt-2 w-full border-b border-black/20 bg-transparent py-3 text-base text-[#15151a] outline-none focus:border-[#15151a] placeholder:text-[#8e8f96] transition-colors disabled:opacity-60"
                  placeholder="Your name"
                />
              </label>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#53545d]">
                Email
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={formStatus === 'loading'}
                  className="mt-2 w-full border-b border-black/20 bg-transparent py-3 text-base text-[#15151a] outline-none focus:border-[#15151a] placeholder:text-[#8e8f96] transition-colors disabled:opacity-60"
                  placeholder="hello@studio.com"
                />
              </label>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#53545d]">
                Project type
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  disabled={formStatus === 'loading'}
                  className="mt-2 w-full border-b border-black/20 bg-[#e5e5e7] py-3 text-base text-[#15151a] outline-none focus:border-[#15151a] transition-colors disabled:opacity-60"
                >
                  <option>Brand Film</option>
                  <option>Music Video</option>
                  <option>Motion Design</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#53545d]">
                Tell me more
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={formStatus === 'loading'}
                  className="mt-2 h-20 w-full border-b border-black/20 bg-transparent py-3 text-base text-[#15151a] outline-none focus:border-[#15151a] placeholder:text-[#8e8f96] transition-colors disabled:opacity-60 resize-none"
                  placeholder="A few details about the work..."
                />
              </label>

              {formStatus === 'error' && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-700">
                  {formError}
                </div>
              )}

              {sent || formStatus === 'success' ? (
                <div className="flex flex-col gap-2">
                  <p className="flex items-center gap-2 text-sm text-[#15151a]">
                    <Check size={16} className="text-emerald-600" /> Thanks — your note is on its way.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setFormStatus('idle');
                    }}
                    className="text-left text-xs text-[#53545d] underline hover:text-[#15151a] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="dark-cta group mt-2 flex w-full items-center justify-between rounded-xl bg-[#17171d] px-5 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#34343a] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span>{formStatus === 'loading' ? 'Sending enquiry...' : 'Send enquiry'}</span>
                  {formStatus === 'loading' ? (
                    <Loader2 size={17} className="animate-spin text-white" />
                  ) : (
                    <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Project Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] grid place-items-center bg-neutral-950/90 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 p-7 md:p-10 text-white shadow-2xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-5 top-5 text-neutral-400 hover:text-white transition-colors"
              >
                <X />
              </button>
              <p className="eyebrow text-neutral-400">
                {active.category} / {active.year}
              </p>
              <h2 className="display mt-4 text-4xl md:text-5xl text-white">{active.title}</h2>

              {/* Video Embed */}
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
                <iframe
                  src={getEmbedUrl(active.videoUrl)}
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={active.title}
                />
              </div>

              {/* Tags */}
              {active.tags && active.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-mono tracking-wider text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description & client */}
              <div className="mt-5 grid gap-4 text-sm leading-6 text-neutral-400 md:grid-cols-2">
                <p>{active.description}</p>
                <p>
                  <b className="text-white">Client:</b> {active.client}
                  <br />
                  <b className="text-white">Year:</b> {active.year}
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
