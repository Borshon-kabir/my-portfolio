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
  const [activeProjectTab, setActiveProjectTab] = useState<'shorts' | 'long'>('long');
  const visibleProjects = projects.filter((project) => project.format === activeProjectTab);

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

    const isMobile = window.innerWidth <= 768;

    const l = new Lenis(
      isMobile
        ? { lerp: 0.15, duration: 0.5, smoothWheel: true, wheelMultiplier: 0.9 }
        : { lerp: 0.12, duration: 0.5, smoothWheel: true, wheelMultiplier: 1.0 }
    );
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

    // Helper: reduce y offset and duration on mobile for smooth 60fps
    const my = (n: number) => (isMobile ? Math.round(n * 0.4) : n);
    const md = (n: number) => (isMobile ? +(n * 0.65).toFixed(2) : n);

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
            {visibleProjects.map((project) => {
              const isVertical = activeProjectTab === 'shorts';

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActive(project)}
                  className="project-card-anim group cursor-pointer text-left will-change-transform will-change-opacity"
                >
                  <div
                    className={`relative w-full overflow-hidden rounded-[28px] border border-black/5 bg-[#17171d] shadow-sm transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[0_24px_50px_rgba(20,20,25,0.18)] ${
                      isVertical ? 'aspect-[9/16]' : 'aspect-video'
                    }`}
                    style={{ backgroundColor: project.themeColor }}
                  >
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} project thumbnail`}
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
                </button>
              );
            })}
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
            className="fixed inset-0 z-[90] flex items-center justify-center bg-neutral-950/90 p-3 sm:p-5 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[92vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-900 p-4 sm:p-7 md:p-10 text-white shadow-2xl my-auto"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 sm:right-5 sm:top-5 text-neutral-400 hover:text-white transition-colors z-10"
              >
                <X />
              </button>
              <p className="eyebrow text-neutral-400 pr-8">
                {active.category} / {active.year}
              </p>
              <h2 className="display mt-4 text-2xl sm:text-4xl md:text-5xl text-white pr-8">{active.title}</h2>

              {/* Video Embed — strict 16:9 aspect ratio, no crop */}
              <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-950">
                <iframe
                  src={getEmbedUrl(active.videoUrl)}
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={active.title}
                  style={{ display: 'block' }}
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
