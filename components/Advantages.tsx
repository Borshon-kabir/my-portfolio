'use client';
import { Clock, Sliders, Layers, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

const advantages = [
  {
    icon: Clock,
    title: 'Speed & Agility',
    description: 'Rapid turnaround times without sacrificing the fine editorial details that make cuts memorable.'
  },
  {
    icon: Sparkles,
    title: 'Visual Consistency',
    description: 'A disciplined tonal look and color aesthetic across all brand video assets and platform variants.'
  },
  {
    icon: Layers,
    title: 'Scalable Output',
    description: 'Seamless handling of multi-asset campaigns, cutdowns, aspect ratio re-frames, and localized versions.'
  },
  {
    icon: CheckCircle2,
    title: 'High-Fidelity Quality',
    description: 'Mastered in 4K/6K ProRes formats with surgical audio mixing, clean dynamics, and film-emulation color.'
  },
  {
    icon: Sliders,
    title: 'Adaptive Flexibility',
    description: 'Frame.io integration for instant, timestamped feedback that turns revision notes into fast refinements.'
  },
  {
    icon: MessageSquare,
    title: 'Dedicated Support',
    description: 'Direct communication from first project intake to final master export handoff with zero middlemen.'
  }
];

export default function Advantages() {
  return (
    <section id="advantages" className="border-t border-white/10 bg-neutral-950 px-6 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-[1160px]">
        <div>
          <p className="inline-flex rounded-full border border-white/10 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-400">
            Advantages
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-.04em] text-white md:text-5xl lg:text-6xl">
            Design support with clear direction
          </h2>
          <p className="mt-4 max-w-xl text-base text-neutral-400">
            Everything modern creators, agencies, and brand teams need in a dependable post-production partner.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="group rounded-3xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition group-hover:scale-105 group-hover:border-white/30 group-hover:bg-white/10">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-white">
                  {adv.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
