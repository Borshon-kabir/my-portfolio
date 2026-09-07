'use client';
import { ArrowUpRight, Play } from 'lucide-react';

const projects = [
  {
    title: 'Nocturne',
    client: 'Vera Atelier',
    category: 'Commercial',
    year: '2024',
    metric: '+2.4M Views',
    description: 'A moody, high-fashion brand campaign focusing on tactile textures and evocative lighting.',
    tone: 'from-neutral-800 via-neutral-900 to-neutral-950'
  },
  {
    title: 'Afterglow',
    client: 'Mira Khan',
    category: 'Music Video',
    year: '2024',
    metric: 'Official Selection',
    description: 'Dynamic rhythm-locked editing with synchronized speed-ramps and filmic color treatment.',
    tone: 'from-neutral-800 via-neutral-900 to-neutral-950'
  },
  {
    title: 'Aston Martin / DB12',
    client: 'Arc House',
    category: 'Commercial',
    year: '2023',
    metric: 'Global Launch',
    description: 'Sound-heavy automotive launch film balancing engine roar and surgical graphic overlays.',
    tone: 'from-neutral-800 via-neutral-900 to-neutral-950'
  },
  {
    title: 'Static Bloom',
    client: 'Nahal Studio',
    category: 'Motion Graphics',
    year: '2024',
    metric: 'Design Award',
    description: 'Expressive typography and 3D kinetic transitions built for an interactive product showcase.',
    tone: 'from-neutral-800 via-neutral-900 to-neutral-950'
  },
  {
    title: 'The Salt Road',
    client: 'Wander Journal',
    category: 'Short Film',
    year: '2023',
    metric: 'Festival Winner',
    description: 'Poetic documentary pacing following traditional salt harvest workers across coastal landscapes.',
    tone: 'from-neutral-800 via-neutral-900 to-neutral-950'
  },
  {
    title: 'Daybreak',
    client: 'Kora Coffee',
    category: 'Color & Film',
    year: '2024',
    metric: 'Brand Relaunch',
    description: 'Warm, organic color palette and naturalistic ambient audio mix for a specialty coffee roaster.',
    tone: 'from-neutral-800 via-neutral-900 to-neutral-950'
  }
];

export default function SelectedWork() {
  return (
    <section id="work" className="border-t border-white/10 bg-neutral-950 px-6 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-[1160px]">
        <div>
          <p className="inline-flex rounded-full border border-white/10 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-400">
            Selected work
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-.04em] text-white md:text-5xl lg:text-6xl">
            Selected work
          </h2>
          <p className="mt-4 max-w-xl text-base text-neutral-400">
            A curated collection of cinematic edits, visual storytelling, and brand video projects.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80 md:p-8"
            >
              <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br ${p.tone} border border-white/5`}>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(115deg,transparent 0 24px,rgba(255,255,255,.07) 25px 26px)'
                  }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-medium text-neutral-300 backdrop-blur-md">
                  {p.metric}
                </div>
              </div>

              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span>{p.category}</span>
                    <span>•</span>
                    <span>{p.year}</span>
                    <span>•</span>
                    <span className="text-neutral-300">{p.client}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-white transition group-hover:text-neutral-200">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    {p.description}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-neutral-300 transition group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
