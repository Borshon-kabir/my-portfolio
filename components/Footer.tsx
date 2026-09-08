'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronUp, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 95%',
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={root} className="px-6 py-16 text-[#15151a] md:px-10 will-change-transform will-change-opacity">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-8">
          <div>
            <a href="#home" className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight text-[#15151a]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#15151a] font-serif text-base font-semibold text-[#f5f5f4]">
                B
              </span>
              <span>Borshon.</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#53545d]">
              Refined cinematic video editing, pacing, and visual storytelling for ambitious brands, directors, and creators worldwide.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-1.5 text-xs text-[#25252b]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for select projects in 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7a7b83]">Navigation</p>
              <ul className="mt-4 space-y-2.5 text-sm text-[#53545d]">
                <li><a href="#home" className="hover:text-[#15151a] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#15151a] transition-colors">My story</a></li>
                <li><a href="#work" className="hover:text-[#15151a] transition-colors">Selected work</a></li>
                <li><a href="#why-me" className="hover:text-[#15151a] transition-colors">Why choose me</a></li>
                <li><a href="#process" className="hover:text-[#15151a] transition-colors">Process</a></li>
                <li><a href="#pricing" className="hover:text-[#15151a] transition-colors">Pricing & packages</a></li>
                <li><a href="#faq" className="hover:text-[#15151a] transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7a7b83]">Connect</p>
              <ul className="mt-4 space-y-2.5 text-sm text-[#53545d]">
                <li>
                  <a href="#" className="group inline-flex items-center gap-1.5 hover:text-[#15151a] transition-colors">
                    <span>Instagram</span>
                    <ArrowUpRight size={13} className="text-[#7a7b83] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#15151a]" />
                  </a>
                </li>
                <li>
                  <a href="#" className="group inline-flex items-center gap-1.5 hover:text-[#15151a] transition-colors">
                    <span>YouTube</span>
                    <ArrowUpRight size={13} className="text-[#7a7b83] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#15151a]" />
                  </a>
                </li>
                <li>
                  <a href="#" className="group inline-flex items-center gap-1.5 hover:text-[#15151a] transition-colors">
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} className="text-[#7a7b83] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#15151a]" />
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@borshonkabir.com" className="group inline-flex items-center gap-1.5 hover:text-[#15151a] transition-colors">
                    <span>Email me</span>
                    <ArrowUpRight size={13} className="text-[#7a7b83] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#15151a]" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-xs text-[#7a7b83] sm:flex-row">
          <p>© {new Date().getFullYear()} Borshon Kabir. Built with intention.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[#53545d] transition-all hover:text-[#15151a] hover:-translate-y-0.5"
          >
            <span>Back to top</span>
            <ChevronUp size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
