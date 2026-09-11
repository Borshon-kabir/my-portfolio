'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is your typical turnaround time for an edit?',
    a: 'Turnaround depends on project complexity and footage volume. Social cuts and short-form videos are typically delivered within 48 to 72 hours. Comprehensive brand films and commercial projects generally take 4 to 6 business days for the initial director cut.'
  },
  {
    q: 'How does the revision and review process work?',
    a: 'All reviews are conducted directly through Frame.io. You and your team can pause at any timestamp, draw annotations directly on the video frame, and leave comments. Each package includes dedicated revision cycles to ensure every detail matches your creative vision.'
  },
  {
    q: 'How do I transfer large RAW footage files to you?',
    a: 'We use high-speed cloud workflows including Google Drive, Dropbox, Massive.io, and WeTransfer Pro. For large multi-terabyte camera shoots, we also accept physical encrypted NVMe/SSD drives shipped directly.'
  },
  {
    q: 'What editing and post-production software do you use?',
    a: 'I work primarily in Adobe Premiere Pro and DaVinci Resolve Studio for narrative assembly and color grading, paired with Adobe After Effects for motion graphics and visual enhancements.'
  },
  {
    q: 'What master formats and files will I receive upon completion?',
    a: 'You will receive full-resolution Apple ProRes 422HQ/4444 master files, web-optimized H.264/H.265 deliverables, and tailored aspect ratio versions (16:9 widescreen, 9:16 vertical reels, 1:1 square). Separated audio stems (music, dialogue, sound effects) are also provided upon request.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const root = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.faq-header-anim',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 92%',
            once: true,
          },
        }
      );

      // Staggered accordion items
      gsap.fromTo(
        '.faq-item-anim',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 92%',
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="faq" className="px-6 py-24 text-[#15151a] md:px-10 md:py-32">
      <div className="mx-auto max-w-[880px]">
        <div className="text-center">
          <p className="faq-header-anim inline-flex rounded-full border border-black/10 bg-[#e5e5e7] px-3 py-1 text-xs text-[#53545d] backdrop-blur-md">
            FAQs
          </p>
          <h2 className="faq-header-anim mt-4 font-serif text-4xl font-semibold tracking-[-.04em] text-[#15151a] md:text-5xl lg:text-6xl">
            Explore our FAQs
          </h2>
          <p className="faq-header-anim mx-auto mt-4 max-w-xl text-base text-[#53545d]">
            Everything you need to know about turnaround times, revisions, and post-production workflows.
          </p>
        </div>

        <div ref={listRef} className="mt-14 space-y-4">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={f.q}
                className="faq-item-anim group overflow-hidden rounded-2xl border border-black/10 bg-[#e5e5e7] backdrop-blur-sm transition-all duration-300 hover:border-black/20 hover:bg-white hover:shadow-[0_10px_30px_rgba(20,20,25,0.06)] will-change-transform will-change-opacity"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-serif text-lg font-medium text-[#15151a] md:text-xl">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10 bg-white/70 text-[#15151a] transition-all duration-300 group-hover:bg-[#17171d] group-hover:text-white group-hover:border-[#17171d] ${isOpen ? 'rotate-180 bg-[#17171d] text-white border-[#17171d]' : ''}`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-black/10 px-6 pb-6 pt-3 text-sm leading-relaxed text-[#53545d]">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
