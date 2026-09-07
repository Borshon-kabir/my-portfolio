'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Lightbulb,
  AppWindow,
  Award,
  MessagesSquare,
  Search,
  Sparkles,
} from 'lucide-react';

const processSteps = [
  {
    id: 'discovery',
    title: 'Discovery',
    description:
      'We start by understanding your goals, audience, brand needs, and the direction your project should take.',
    icon: Users,
  },
  {
    id: 'strategy',
    title: 'Strategy',
    description:
      'I define the structure, message, and creative approach before moving into the visual design stage.',
    icon: Lightbulb,
  },
  {
    id: 'direction',
    title: 'Direction',
    description:
      'A clear visual direction is shaped through mood, layout ideas, typography, and overall design language.',
    icon: AppWindow,
  },
  {
    id: 'design',
    title: 'Design',
    description:
      'The main layouts, brand elements, and digital experiences are crafted with careful attention to detail.',
    icon: Award,
  },
  {
    id: 'development',
    title: 'Development',
    description:
      'Designs are turned into responsive, polished pages with smooth interactions and clean structure.',
    icon: MessagesSquare,
  },
  {
    id: 'delivery',
    title: 'Delivery',
    description:
      'Final assets, pages, and guidelines are prepared clearly so everything is ready to launch.',
    icon: Search,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance animation for header
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 2. Timeline Line Progress and Step Activation ScrollTrigger
      stepRefs.current.forEach((stepEl, idx) => {
        if (!stepEl) return;

        ScrollTrigger.create({
          trigger: stepEl,
          start: 'top 68%',
          end: 'bottom 32%',
          onEnter: () => {
            setActiveStep((prev) => Math.max(prev, idx));
            const pct = (idx / (processSteps.length - 1)) * 100;
            setProgressPercent(pct);
          },
          onEnterBack: () => {
            setActiveStep((prev) => Math.max(prev, idx));
            const pct = (idx / (processSteps.length - 1)) * 100;
            setProgressPercent(pct);
          },
          onLeaveBack: () => {
            if (idx > 0) {
              setActiveStep(idx - 1);
              const pct = ((idx - 1) / (processSteps.length - 1)) * 100;
              setProgressPercent(pct);
            } else {
              setActiveStep(0);
              setProgressPercent(0);
            }
          },
        });
      });

      // Smooth continuous scroll scrub for timeline progress bar
      if (rightColRef.current) {
        ScrollTrigger.create({
          trigger: rightColRef.current,
          start: 'top 70%',
          end: 'bottom 50%',
          onUpdate: (self) => {
            const pct = Math.min(100, Math.max(0, self.progress * 100));
            setProgressPercent(pct);

            // Dynamically calculate which step is reached
            const currentStepIdx = Math.min(
              processSteps.length - 1,
              Math.floor(self.progress * processSteps.length)
            );
            setActiveStep(Math.max(0, currentStepIdx));
          },
        });
      }
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
          {/* Left Column: Sticky Header */}
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
          </div>

          {/* Right Column: Interactive Step Cards & Progress Line */}
          <div ref={rightColRef} className="relative lg:col-span-7 space-y-4 md:space-y-6">
            {/* Background vertical track line (starts center of badge 1, ends center of badge 6) */}
            <div className="pointer-events-none absolute left-[20px] md:left-[24px] top-[34px] bottom-[34px] w-[2px] -translate-x-1/2 rounded-full bg-[#edeef1]">
              {/* Dynamic dark fill line */}
              <div
                className="w-full rounded-full bg-[#121218] transition-all duration-300 ease-out"
                style={{ height: `${progressPercent}%` }}
              />
            </div>

            {/* 6 Process Steps */}
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              const isPastOrActive = idx <= activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className="relative flex items-start pl-12 md:pl-16 group"
                >
                  {/* Timeline Badge */}
                  <div
                    className={`absolute left-[20px] md:left-[24px] top-6 -translate-x-1/2 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full transition-all duration-500 z-10 ${
                      isPastOrActive
                        ? 'bg-gradient-to-b from-white to-[#e5e5e7] border border-black/15 shadow-[0_4px_16px_rgba(0,0,0,0.12)] text-[#121218] scale-105'
                        : 'bg-[#edeef1] border border-black/5 text-[#7a7b83] opacity-70'
                    }`}
                  >
                    <Icon size={17} strokeWidth={isPastOrActive ? 2 : 1.75} />
                  </div>

                  {/* Step Card Container */}
                  <div
                    onClick={() => {
                      setActiveStep(idx);
                      setProgressPercent((idx / (processSteps.length - 1)) * 100);
                    }}
                    className={`w-full rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 cursor-pointer ${
                      isPastOrActive
                        ? 'bg-white border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] opacity-100 translate-y-0'
                        : 'bg-transparent border border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#121218] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#53545d]">
                      {step.description}
                    </p>
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
