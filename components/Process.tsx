'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Film,
  Scissors,
  Sliders,
  Sparkles,
  Award,
  Search,
  Check,
  ArrowUpRight,
} from 'lucide-react';

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  icon: any;
  deliverable: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 'brief-discovery',
    stepNumber: '01',
    title: 'PHASE 01 — Brief & Discovery',
    tagline: 'Discovery & Scope',
    description:
      'I understand your goals, audience, content style, references, and editing requirements.',
    icon: Search,
    deliverable: 'Creative brief, references & editing direction',
  },
  {
    id: 'story-structure',
    stepNumber: '02',
    title: 'PHASE 02 — Story & Structure',
    tagline: 'Story & Narrative Arc',
    description:
      'I shape the footage into a clear story with the right pacing, structure, and visual flow.',
    icon: Film,
    deliverable: 'Story structure, pacing & edit plan',
  },
  {
    id: 'rough-cut',
    stepNumber: '03',
    title: 'PHASE 03 — Rough Cut',
    tagline: 'Assembly & First Edit',
    description:
      'The first edit comes together with carefully selected footage, music, timing, and transitions.',
    icon: Scissors,
    deliverable: 'Rough cut & initial edit',
  },
  {
    id: 'motion-visuals',
    stepNumber: '04',
    title: 'PHASE 04 — Motion & Visuals',
    tagline: 'Motion Graphics & VFX',
    description:
      'I add motion graphics, typography, transitions, visual effects, and other elements that strengthen the edit.',
    icon: Sparkles,
    deliverable: 'Motion graphics, titles & visual effects',
  },
  {
    id: 'color-sound',
    stepNumber: '05',
    title: 'PHASE 05 — Color & Sound',
    tagline: 'Color Grade & Audio Mix',
    description:
      'I refine the visual tone and audio so the final video feels polished, balanced, and professional.',
    icon: Sliders,
    deliverable: 'Color grade, sound design & audio mix',
  },
  {
    id: 'final-delivery',
    stepNumber: '06',
    title: 'PHASE 06 — Final Delivery',
    tagline: 'Mastering & Publishing',
    description:
      'After revisions, I prepare the final master in the required format and make sure everything is ready for publishing.',
    icon: Award,
    deliverable: 'Final master, revisions & delivery',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const tracerDotRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep, setActiveStep] = useState<number>(0);
  const activeStepRef = useRef<number>(0);

  // Smooth scroll to a specific step
  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    activeStepRef.current = index;

    const targetEl = stepRefs.current[index];
    if (!targetEl) return;

    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetEl, {
        offset: -130,
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance animation for the sticky Left Column
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { y: 35, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Initial staggered entrance animation for Step Cards
      const validStepCards = stepRefs.current.filter(Boolean);
      if (validStepCards.length > 0) {
        gsap.fromTo(
          validStepCards,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. GPU-Accelerated Scrubbed Timeline Progress Line & Tracer Dot
      if (rightColRef.current && progressBarRef.current && trackRef.current) {
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 65%',
            end: 'bottom 45%',
            scrub: 0.6, // Silky smooth GSAP physics-based momentum scrub
            onUpdate: (self) => {
              // Discrete step update to eliminate React virtual DOM thrashing:
              // Only triggers state change when crossing step boundaries!
              const calculatedIdx = Math.min(
                processSteps.length - 1,
                Math.max(0, Math.floor(self.progress * processSteps.length))
              );
              if (calculatedIdx !== activeStepRef.current) {
                activeStepRef.current = calculatedIdx;
                setActiveStep(calculatedIdx);
              }
            },
          },
        });

        // Scale vertical line directly on the GPU layer (no layout recalculation)
        scrubTl.fromTo(
          progressBarRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none' },
          0
        );

        // Animate the illuminated tracer bead gliding down the track
        if (tracerDotRef.current) {
          scrubTl.to(tracerDotRef.current, { opacity: 1, duration: 0.05 }, 0);
          scrubTl.fromTo(
            tracerDotRef.current,
            { y: 0 },
            {
              y: () => {
                const trackH = trackRef.current?.offsetHeight || 0;
                return Math.max(0, trackH);
              },
              ease: 'none',
            },
            0
          );
        }
      }

      // 4. Per-Step precise triggers for forward and reverse scroll fidelity
      stepRefs.current.forEach((stepEl, idx) => {
        if (!stepEl) return;

        ScrollTrigger.create({
          trigger: stepEl,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => {
            if (activeStepRef.current !== idx) {
              activeStepRef.current = idx;
              setActiveStep(idx);
            }
          },
          onEnterBack: () => {
            if (activeStepRef.current !== idx) {
              activeStepRef.current = idx;
              setActiveStep(idx);
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative px-5 py-24 md:px-10 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Sticky Header with Live Phase Tracker */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 lg:sticky lg:top-36 self-start will-change-transform will-change-opacity"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#e5e5e7]/80 px-3.5 py-1 text-xs font-medium text-[#121218] shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm">
              <Sparkles size={13} className="text-[#121218]" />
              <span>Process</span>
            </span>

            <h2 className="mt-5 font-serif text-[clamp(2.5rem,4.5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#121218]">
              How the process flows<br />with clarity
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#53545d]">
              A clear and collaborative workflow that moves each project from first idea to polished final result.
            </p>

            {/* Interactive Live Stage Card */}
            <div className="mt-8 hidden sm:block p-5 rounded-2xl bg-white/70 border border-black/[0.08] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.03)] max-w-md transition-all duration-500">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[#7a7b83] font-medium tracking-wide uppercase">Current Phase</span>
                <span className="font-mono font-semibold text-[#121218] bg-black/[0.05] px-2.5 py-0.5 rounded-md">
                  0{activeStep + 1} / 0{processSteps.length}
                </span>
              </div>

              <div className="font-serif text-xl font-semibold text-[#121218] transition-all duration-300">
                {processSteps[activeStep].title}
              </div>
              <p className="text-xs text-[#53545d] mt-1 line-clamp-1 transition-all duration-300">
                {processSteps[activeStep].deliverable}
              </p>

              {/* Interactive Phase Indicator Bars */}
              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-black/[0.06]">
                {processSteps.map((step, idx) => {
                  const isActive = idx === activeStep;
                  const isCompleted = idx < activeStep;

                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(idx)}
                      title={`Jump to Phase 0${idx + 1}: ${step.title}`}
                      aria-label={`Jump to Phase 0${idx + 1}: ${step.title}`}
                      className={`h-1.5 rounded-full transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-black/20 ${
                        isActive
                          ? 'w-9 bg-[#121218]'
                          : isCompleted
                          ? 'w-4 bg-[#121218]/45 hover:bg-[#121218]/70'
                          : 'w-3 bg-black/10 hover:bg-black/25'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Step Cards & Fluid Progress Beam */}
          <div ref={rightColRef} className="relative lg:col-span-7 space-y-4 md:space-y-6">
            {/* Background vertical track line (starts center of badge 1, ends center of badge 6) */}
            <div
              ref={trackRef}
              className="pointer-events-none absolute left-[22px] sm:left-[26px] md:left-[30px] top-[40px] bottom-[40px] w-[2px] -translate-x-1/2 rounded-full bg-[#e6e7eb] overflow-hidden"
            >
              {/* Ultra-smooth GPU-accelerated progress line */}
              <div
                ref={progressBarRef}
                className="w-full h-full bg-gradient-to-b from-[#121218] via-[#2d2e3b] to-[#121218] rounded-full origin-top will-change-transform"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>

            {/* Glowing tracer bead that glides along the progress line */}
            <div
              ref={tracerDotRef}
              className="pointer-events-none absolute left-[22px] sm:left-[26px] md:left-[30px] top-[40px] -translate-x-1/2 -translate-y-1/2 z-20 will-change-transform opacity-0"
            >
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute h-4 w-4 rounded-full bg-[#121218] opacity-30" />
                <span className="relative h-3 w-3 rounded-full bg-[#121218] border-2 border-white shadow-[0_0_10px_rgba(18,18,24,0.5)]" />
              </div>
            </div>

            {/* 6 Process Steps */}
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;
              const isPastOrActive = idx <= activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className="relative flex items-start pl-14 sm:pl-16 md:pl-20 group"
                >
                  {/* Timeline Badge */}
                  <button
                    onClick={() => handleStepClick(idx)}
                    title={`View ${step.title}`}
                    aria-label={`View ${step.title}`}
                    className={`absolute left-[22px] sm:left-[26px] md:left-[30px] top-6 -translate-x-1/2 flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:h-12 items-center justify-center rounded-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] z-10 focus:outline-none focus:ring-2 focus:ring-black/20 ${
                      isActive
                        ? 'bg-[#121218] text-white ring-4 ring-black/10 shadow-[0_8px_24px_rgba(18,18,24,0.25)] scale-110'
                        : isCompleted
                        ? 'bg-gradient-to-b from-[#252631] to-[#121218] text-white border border-black/15 shadow-[0_2px_8px_rgba(0,0,0,0.08)] scale-100'
                        : 'bg-[#edeef1] border border-black/5 text-[#7a7b83] opacity-75 scale-95 hover:opacity-100 hover:scale-100'
                    }`}
                  >
                    <Icon size={18} strokeWidth={isPastOrActive ? 2.2 : 1.75} />
                  </button>

                  {/* Step Card Container */}
                  <div
                    onClick={() => handleStepClick(idx)}
                    className={`w-full rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none ${
                      isActive
                        ? 'bg-white border border-black/12 shadow-[0_16px_40px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.02)] opacity-100 translate-x-1.5 ring-1 ring-black/[0.04]'
                        : isCompleted
                        ? 'bg-white/80 border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] opacity-90 hover:opacity-100 hover:bg-white hover:border-black/10'
                        : 'bg-white/40 border border-black/[0.03] opacity-60 hover:opacity-85 hover:bg-white/70 hover:border-black/[0.08] backdrop-blur-[2px]'
                    }`}
                  >
                    {/* Card Top Header: Step Number and Status Pill */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#7a7b83]">
                        Step {step.stepNumber} of 06
                      </span>

                      {isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#121218] text-white shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Active Phase</span>
                        </span>
                      ) : isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/[0.04] text-[#53545d]">
                          <Check size={12} className="text-emerald-600 stroke-[2.5]" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-[#8c8d96]">
                          {step.tagline}
                        </span>
                      )}
                    </div>

                    {/* Step Title */}
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#121218] tracking-tight group-hover:text-black transition-colors">
                        {step.title}
                      </h3>
                      <span
                        className={`text-[#7a7b83] transition-transform duration-300 ${
                          isActive ? 'translate-x-0.5 -translate-y-0.5 text-[#121218]' : 'opacity-40 group-hover:opacity-80'
                        }`}
                      >
                        <ArrowUpRight size={18} />
                      </span>
                    </div>

                    {/* Step Description */}
                    <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#53545d]">
                      {step.description}
                    </p>

                    {/* Key Output / Deliverable Tag */}
                    <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs text-[#7a7b83]">
                      <span className="font-medium text-[#121218]/80">Output:</span>
                      <span className="text-right font-medium text-[#53545d]">
                        {step.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
