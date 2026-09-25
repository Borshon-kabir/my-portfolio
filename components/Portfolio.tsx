'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Check, Copy, Loader2, Mail, Menu, MessageCircle, Play, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { projects } from '../data/content';
import Hero from './Hero';
import WhyChooseMe from './WhyChooseMe';
import MyStory from './MyStory';
import Process from './Process';
import Pricing from './Pricing';
import Footer from './Footer';

const nav = ['Home', 'About', 'Projects', 'Services', 'Process', 'Pricing', 'Contact'];

export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<'shorts' | 'long'>('long');
  const visibleProjects = projects.filter((project) => project.format === activeProjectTab);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Documentary Edit',
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
      setFormData({ name: '', email: '', projectType: 'Documentary Edit', message: '' });
    } catch (err: any) {
      setFormStatus('error');
      setFormError(err.message || 'Failed to send message. Please try again.');
    }
  };

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // High-performance 120fps GSAP lerped cursor (Only active on desktop fine pointers)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDesktopPointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    if (!isDesktopPointer || !cursorDotRef.current || !cursorRingRef.current) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3.out' });

    let hasMoved = false;
    let checkHoverTimer: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      if (!checkHoverTimer) {
        checkHoverTimer = window.requestAnimationFrame(() => {
          checkHoverTimer = null;
          const target = e.target as HTMLElement | null;
          if (
            target &&
            target.closest(
              'a, button, [role="button"], input, textarea, select, .work-card-anim, .intro-card, .process-card-anim, .pricing-card-anim, .dark-cta'
            )
          ) {
            setCursorHover(true);
          } else {
            setCursorHover(false);
          }
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      hasMoved = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      if (checkHoverTimer) window.cancelAnimationFrame(checkHoverTimer);
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
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollTrigger.clearScrollMemory === 'function') {
      ScrollTrigger.clearScrollMemory('manual');
    }

    const isDesktopPointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    let l: Lenis | null = null;
    let updateRaf: ((time: number) => void) | null = null;

    if (isDesktopPointer) {
      l = new Lenis({ lerp: 0.1, duration: 0.8, smoothWheel: true, wheelMultiplier: 1.0 });
      if (!window.location.hash) {
        l.scrollTo(0, { immediate: true });
      }
      (window as any).__lenis = l;

      l.on('scroll', ScrollTrigger.update);
      updateRaf = (time: number) => {
        l?.raf(time * 1000);
      };
      gsap.ticker.add(updateRaf);
    }

    // Prevents stutter & jerky jumps during frame drops
    gsap.ticker.lagSmoothing(500, 33);

    const my = (n: number) => n;
    const md = (n: number) => n;

    const ctx = gsap.context(() => {
      // Projects Section Reveal
      gsap.fromTo(
        '.project-header-anim',
        { y: my(25), opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: md(0.7),
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
        { y: my(35), opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: md(0.75),
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
        { y: my(35), opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: md(0.8),
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
        { y: my(25), opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: md(0.7),
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
        { y: my(35), opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: md(0.75),
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

      if (updateRaf) {
        gsap.ticker.remove(updateRaf);
      }
      if (l) {
        l.destroy();
      }
      ctx.revert();
    };
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
            duration: 0.5,
            immediate: false,
          });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (targetId === 'home') {
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { duration: 0.5 });
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
        (window as any).__lenis.scrollTo(target, { offset: -80, duration: 0.5 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'home') {
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 0.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <main className="min-h-screen text-[#15151a] selection:bg-[#17171d] selection:text-white transition-colors duration-300 dark:text-[#f8fafc] dark:selection:bg-[#3b82f6]">
      <div className="grain" />

      {/* 120fps Dual-Element Magnetic Cursor (Desktop Only) */}
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[95] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15151a] opacity-0 transition-transform duration-150 ease-out lg:block will-change-transform h-1.5 w-1.5"
      />
      <div
        ref={cursorRingRef}
        className={`custom-cursor-ring pointer-events-none fixed top-0 left-0 z-[90] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#15151a]/30 opacity-0 transition-all duration-300 ease-out lg:block will-change-transform ${
          cursorHover
            ? 'h-12 w-12 border-[#15151a]/60 bg-[#15151a]/10 backdrop-blur-[1px] scale-110'
            : 'h-8 w-8 bg-transparent'
        }`}
      />

      <header className="fixed inset-x-0 top-0 z-40 px-5 py-4 md:px-10 bg-transparent border-none shadow-none">
        <div className="mx-auto max-w-[1160px] w-full flex items-center justify-between">
          {/* Left Slot: Logo */}
          <div className="w-1/3 flex justify-start items-center">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                go('Home');
              }}
              className="display text-lg font-bold text-[#15151a] transition-colors duration-300 dark:text-[#f8fafc] flex-shrink-0"
            >
              BK<span className="text-[#15151a] dark:text-[#60a5fa]">.</span>
            </a>
          </div>

          {/* Middle Slot: Nav Links (Strictly Centered) */}
          <div className="w-1/3 flex justify-center items-center">
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {nav.map((x) => (
                <a
                  key={x}
                  href={`#${x.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(x);
                  }}
                  className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#53545d] transition-colors hover:text-[#15151a] dark:text-[#94a3b8] dark:hover:text-[#f8fafc] whitespace-nowrap"
                >
                  {x}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Slot: Let's talk + Theme Toggle */}
          <div className="w-1/3 flex justify-end items-center gap-3">
            <a
              href="mailto:hello@borshonkabir.online"
              className="hidden rounded-full bg-[#17171d] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-[#34343a] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] sm:block whitespace-nowrap"
            >
              Let&apos;s Talk <ArrowUpRight className="inline" size={13} />
            </a>
            <ThemeToggle />
            <button
              aria-label="Open menu"
              onClick={() => setMenu(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-black/15 text-[#17171d] transition-colors dark:border-[#23293e] dark:text-[#f8fafc] md:hidden"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            whileTap={{ scale: 0.995 }}
            viewport={{ once: true, amount: 0.1 }}
            className="fixed inset-0 z-50 flex flex-col border-b border-black/10 bg-[#f4f4f6] p-6 text-[#15151a] transition-colors duration-300 dark:border-[#23293e] dark:bg-[#0a0b10] dark:text-[#f8fafc]"
          >
            <div className="ml-auto flex items-center gap-3">
              <ThemeToggle />
              <button onClick={() => setMenu(false)} className="text-[#15151a] dark:text-[#f8fafc]"><X size={30} /></button>
            </div>
            <div className="my-auto">
              {nav.map((x) => (
                <a
                  href={`#${x.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(x);
                  }}
                  key={x}
                  className="display block text-6xl font-bold leading-tight text-[#15151a] transition-colors hover:text-[#53545d] dark:text-[#f8fafc] dark:hover:text-[#94a3b8]"
                >
                  {x}
                </a>
              ))}
            </div>
            <p className="text-xs uppercase tracking-[.2em] text-[#7a7b83] dark:text-[#94a3b8]">
              Rangpur, Bangladesh — available worldwide
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
{/* Selected Work Section */}
      <section id="work" className="px-5 py-24 md:px-10 md:py-32">
        <span id="projects" className="sr-only">Featured Edits &amp; Stories</span>

        <div className="mx-auto max-w-[1160px]">
          <div className="text-center">
            <p className="project-header-anim inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#e5e5e7] px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-[#53545d] backdrop-blur-md will-change-transform will-change-opacity">
              Selected work
            </p>
            <h2 className="project-header-anim mt-5 font-serif text-[clamp(2.75rem,5.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#15151a] will-change-transform will-change-opacity">
              Featured Edits &amp; Stories
            </h2>
            <p className="project-header-anim mx-auto mt-4 max-w-xl text-base text-[#53545d] will-change-transform will-change-opacity">
              A curated collection of high-retention videos, reels, and ads crafted for modern creators and brands.
            </p>
          </div>

          <div className="project-header-anim mt-9 flex justify-center will-change-transform will-change-opacity">
            <div role="tablist" aria-label="Project categories" className="inline-flex rounded-full border border-black/10 bg-white/70 p-1 shadow-sm">
              {[
                { id: 'long', label: 'Long Videos' },
                { id: 'shorts', label: 'Shorts' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeProjectTab === tab.id}
                  onClick={() => setActiveProjectTab(tab.id as 'shorts' | 'long')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all sm:px-5 ${
                    activeProjectTab === tab.id
                      ? 'bg-[#17171d] text-white shadow-[0_4px_12px_rgba(23,23,29,0.18)]'
                      : 'text-[#53545d] hover:text-[#15151a]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`projects-grid-container mt-12 grid ${
              activeProjectTab === 'shorts'
                ? 'grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'
                : 'grid-cols-1 gap-8 md:grid-cols-2'
            }`}
          >
            {visibleProjects.length === 0 && (
              <div className="col-span-full grid min-h-56 place-items-center rounded-[28px] border border-dashed border-black/15 bg-white/40 px-6 text-center">
                <div>
                  <p className="font-serif text-2xl font-semibold tracking-tight text-[#15151a]">
                    Short-form edits &amp; reels coming soon
                  </p>
                  <p className="mt-2 text-sm text-[#7a7b83]">
                    New work will appear here automatically.
                  </p>
                </div>
              </div>
            )}
            {visibleProjects.map((project) => {
              const isVertical = activeProjectTab === 'shorts';

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="project-card-anim group block cursor-pointer text-left will-change-transform will-change-opacity"
                >
                  <div
                    className={`relative w-full overflow-hidden rounded-[28px] border border-black/5 bg-[#17171d] shadow-sm transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[0_24px_50px_rgba(20,20,25,0.18)] ${
                      isVertical ? 'aspect-[9/16]' : 'aspect-video'
                    }`}
                    style={{ backgroundColor: project.themeColor }}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} project thumbnail`}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/90 backdrop-blur-sm">
                      {project.category}
                    </span>
                    <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="grid h-14 w-14 place-items-center rounded-full border border-white/40 bg-black/50 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <Play size={20} className="translate-x-0.5 fill-current" />
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[9px] font-mono uppercase tracking-widest text-white/60">{project.client} · {project.year}</p>
                      <h3 className="mt-1 font-serif text-xl font-semibold leading-tight text-white sm:text-2xl">{project.title}</h3>
                    </div>
                  </div>
                  {activeProjectTab === 'long' ? (
                    <div className="mt-4 flex items-start justify-between gap-4 px-1">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold tracking-tight text-[#15151a] transition-colors group-hover:text-black">
                          {project.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#7a7b83]">
                          {project.category} · {project.year}
                        </p>
                      </div>
                      <span className="mt-0.5 text-[#7a7b83] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#15151a]">
                        <ArrowUpRight size={22} />
                      </span>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-start justify-between gap-3 px-1">
                      <div>
                        <p className="text-xs text-[#7a7b83]">{project.tagline}</p>
                        <p className="mt-1 text-sm font-medium text-[#15151a]">Short-form video</p>
                      </div>
                      <span className="mt-0.5 text-[#7a7b83] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#15151a]">
                        <ArrowUpRight size={21} />
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
          <p className="mt-12 flex items-center justify-center gap-2.5 text-xs font-medium tracking-wide text-zinc-500 md:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            More projects coming soon.
          </p>
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
      {/* Editorial Manifesto */}
      <section id="testimonials" className="overflow-hidden py-24 md:py-32 text-[#15151a]">
        <div className="mx-auto max-w-[1100px] px-5 text-center">
          <div className="testimonial-anim relative mt-10 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#111522] px-8 py-16 shadow-xl shadow-zinc-900/5 backdrop-blur-md md:px-14 will-change-transform will-change-opacity transition-colors duration-300">
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 inline-flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-widest uppercase">
                <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
                PHILOSOPHY
                <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
              </p>
              <blockquote className="text-slate-800 dark:text-slate-100 text-lg md:text-xl font-medium text-center leading-relaxed">
                <span className="text-slate-500 dark:text-slate-400 font-semibold tracking-widest mr-1">&ldquo;</span>
                The goal isn&apos;t to make viewers watch. It&apos;s to give them a reason to keep watching.
                <span className="text-slate-500 dark:text-slate-400 font-semibold tracking-widest ml-1">&rdquo;</span>
              </blockquote>
              <div className="mx-auto my-6 h-px w-12 bg-slate-300 dark:bg-slate-700" />
              <div>
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-slate-900 dark:text-white">
                  BORSHON KABIR
                </p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold tracking-widest uppercase">
                  DOCUMENTARY &amp; MOTION EDITOR
                </p>
              </div>
            </div>
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
                navigator.clipboard.writeText('hello@borshonkabir.online');
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
                  <Copy size={17} /> hello@borshonkabir.online
                </>
              )}
            </button>
            <p className="contact-text-anim mt-4 text-sm text-[#53545d] will-change-transform will-change-opacity">Rangpur, Bangladesh · +880 1750071200</p>
            <div className="contact-text-anim mt-8 flex gap-3 will-change-transform will-change-opacity">
              {[
                { Icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/8801750071200' },
                { Icon: Mail, label: 'Email', href: 'mailto:hello@borshonkabir.online' },
              ].map(({ Icon, label, href }) => (
                <a
                  aria-label={label}
                  key={label}
                  href={href}
                  {...(href.startsWith('https') ? { target: '_blank', rel: 'noreferrer' } : {})}
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
                  placeholder="your@email.com"
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
                  <option>Documentary Edit</option>
                  <option>YouTube Faceless Video</option>
                  <option>Short Edit</option>
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

    </main>
  );
}
