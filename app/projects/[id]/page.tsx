'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  Columns2,
  Film,
  Layers,
  MonitorPlay,
  Sparkles,
} from 'lucide-react';
import { projects, type Project } from '../../../data/content';

type ViewMode = 'split' | 'final' | 'blueprint';

type ProjectBreakdown = {
  duration: string;
  turnaround: string;
  overview: string;
  software: string[];
  plugins: string[];
  blueprintNotes: string[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const projectBreakdowns: Record<string, ProjectBreakdown> = {
  'project-01': {
    duration: '8:42',
    turnaround: '7 days',
    overview:
      'A documentary-style map animation designed to make a complex story feel immediate. The edit combines archival imagery, geographic motion design, and a deliberate narrative pace that gives each reveal room to land.',
    software: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'],
    plugins: ['Sapphire', 'GeoLayers 3', 'Deep Glow', 'Twixtor'],
    blueprintNotes: ['GeoLayers map rig', 'Archival texture stack', 'Narrative marker pass'],
  },
  'project-02': {
    duration: '1:18',
    turnaround: '4 days',
    overview:
      'A fashion and music-led brand piece built around graphic rhythm. Saturated color, kinetic type, and cut-to-beat transitions turn the campaign message into a fast, memorable visual system.',
    software: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'],
    plugins: ['Sapphire', 'Deep Glow', 'Turbulent Displace', 'Optical Flares'],
    blueprintNotes: ['Kinetic typography rig', 'Beat marker edit', 'Acid-grade adjustment layer'],
  },
  'project-03': {
    duration: '1:05',
    turnaround: '5 days',
    overview:
      'A product launch film that translates a modular software system into a clear, editorial narrative. UI pacing, design details, and restrained motion work together to make the product feel precise and useful.',
    software: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'],
    plugins: ['Sapphire', 'Motion Bro', 'Deep Glow', 'RSMB'],
    blueprintNotes: ['UI sequence pre-comps', 'Product callout pass', 'Sound-sync markers'],
  },
  'project-04': {
    duration: '1:26',
    turnaround: '6 days',
    overview:
      'A premium software commercial built around chrome forms, measured pacing, and a sparse visual world. Every transition and sound cue was shaped to make the brand feel considered and technically confident.',
    software: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'],
    plugins: ['Element 3D', 'Mocha Pro', 'Sapphire', 'Deep Glow'],
    blueprintNotes: ['3D object composites', 'Tracked interface planes', 'Foley timing pass'],
  },
  'project-05': {
    duration: '0:42',
    turnaround: '2 days',
    overview:
      'A social-first product edit made to earn attention in the first second. Tactile transitions, concise captions, and sound-led pacing keep the message clear while the visual energy stays high.',
    software: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'],
    plugins: ['Sapphire', 'RSMB', 'Deep Glow', 'Motion Bro'],
    blueprintNotes: ['Hook-first cutdown', 'Caption rhythm pass', 'Platform-safe framing'],
  },
  'project-06': {
    duration: '0:36',
    turnaround: '3 days',
    overview:
      'A fast SaaS spot that pairs product UI with clean motion cues and retention-focused pacing. The sequence is structured around immediate value, feature clarity, and a decisive final callout.',
    software: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'],
    plugins: ['Sapphire', 'Mocha Pro', 'Deep Glow', 'EaseCopy'],
    blueprintNotes: ['Interface animation rig', 'Feature hierarchy pass', 'CTA end-frame comp'],
  },
};

const viewOptions: Array<{ id: ViewMode; label: string; icon: typeof Columns2 }> = [
  { id: 'split', label: 'Side-by-Side (Split)', icon: Columns2 },
  { id: 'final', label: 'Final Cut Only', icon: MonitorPlay },
  { id: 'blueprint', label: 'AE Blueprint Only', icon: Layers },
];

function getEmbedUrl(url: string) {
  const driveMatch = url.match(/\/file\/d\/([^/]+)\//);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;

  const youtubeMatch = url.match(/[?&]v=([^&]+)/);
  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0`;

  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0`;

  return url;
}

function isDirectVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)(?:[?#]|$)/i.test(url);
}

function ProjectVideoPlayer({ sourceUrl, title, poster }: { sourceUrl: string; title: string; poster: string }) {
  if (isDirectVideoUrl(sourceUrl)) {
    return (
      <video className="absolute inset-0 h-full w-full object-cover border-0" controls playsInline preload="metadata" poster={poster}>
        <source src={sourceUrl} />
        Your browser does not support video playback.
      </video>
    );
  }

  return (
    <iframe
      src={getEmbedUrl(sourceUrl)}
      title={title}
      className="absolute inset-0 h-full w-full object-cover border-0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
}

function SoftwareBadge({ name }: { name: string }) {
  switch (name) {
    case 'After Effects':
      return (
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#00005b] font-sans text-[9px] font-black tracking-tight text-[#9999ff] border border-[#9999ff]/40 select-none leading-none"
        >
          Ae
        </span>
      );
    case 'Premiere Pro':
      return (
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#2a0033] font-sans text-[9px] font-black tracking-tight text-[#ea77ff] border border-[#ea77ff]/40 select-none leading-none"
        >
          Pr
        </span>
      );
    case 'Illustrator':
      return (
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#331400] font-sans text-[9px] font-black tracking-tight text-[#ff9a00] border border-[#ff9a00]/40 select-none leading-none"
        >
          Ai
        </span>
      );
    case 'Photoshop':
      return (
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#001e36] font-sans text-[9px] font-black tracking-tight text-[#31a8ff] border border-[#31a8ff]/40 select-none leading-none"
        >
          Ps
        </span>
      );
    default:
      return null;
  }
}

function MediaViewport({ project, mode, notes }: { project: Project; mode: 'final' | 'blueprint'; notes: string[] }) {
  const isBlueprint = mode === 'blueprint';
  const sourceUrl = isBlueprint ? project.processVideoUrl || project.videoUrl : project.videoUrl;
  const mediaTitle = project.title + (isBlueprint ? ' After Effects blueprint' : ' final render');
  const isVertical = project.format === 'shorts';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      whileTap={{ scale: 0.995 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#0b0c10] shadow-2xl shadow-black/20 dark:shadow-black/50 ${
        isVertical ? 'aspect-[9/16] max-w-[360px] mx-auto' : 'aspect-video'
      }`}
    >
      <ProjectVideoPlayer sourceUrl={sourceUrl} title={mediaTitle} poster={project.thumbnail} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
      <span className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-md backdrop-blur-md select-none">
        {isBlueprint ? <Layers size={12} className="text-purple-400" /> : <Film size={12} className="text-blue-400" />}
        {isBlueprint ? 'AE Timeline & Blueprint' : 'Final Render'}
      </span>
    </motion.article>
  );
}

export default function ProjectBreakdownPage() {
  const params = useParams<{ id: string }>();
  const projectId = decodeURIComponent(Array.isArray(params.id) ? params.id[0] : params.id || '');
  const project = projects.find((item) => item.id === projectId || slugify(item.title) === projectId);
  const [view, setView] = useState<ViewMode>('split');

  if (!project) {
    return (
      <main className="min-h-screen bg-[#f4f4f6] px-5 py-8 text-[#15151a] sm:px-8 sm:py-12">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-black/10 bg-white/75 p-8 text-center backdrop-blur-xl shadow-[0_16px_46px_rgba(20,20,25,0.07)]">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#53545d]">Project not found</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.04em]">This proof page is unavailable.</h1>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#17171d] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  const breakdown = projectBreakdowns[project.id] ?? {
    duration: 'Custom',
    turnaround: 'Custom timeline',
    overview: project.description,
    software: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'],
    plugins: [],
    blueprintNotes: [],
  };
  const visibleViews = view === 'split' ? (['final', 'blueprint'] as const) : [view];

  return (
    <main className="relative min-h-screen bg-[#f4f4f6] text-[#15151a] transition-colors duration-300 dark:bg-[#07080c] dark:text-[#f8fafc] px-5 py-8 sm:px-8 sm:py-12 selection:bg-[#17171d] selection:text-white dark:selection:bg-blue-600 overflow-x-hidden">
      <div className="grain" />

      {/* Subtle radial ambient lighting glow from top-center */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[550px] w-full max-w-5xl rounded-full bg-gradient-to-b from-blue-600/15 via-indigo-500/8 to-transparent blur-[130px] opacity-40 dark:opacity-80" />

      <div className="relative mx-auto max-w-[1160px]">
        {/* Top Header */}
        <header className="flex flex-col gap-4 border-b border-black/10 dark:border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#53545d] dark:text-slate-400 transition-colors duration-200 hover:text-[#15151a] dark:hover:text-white"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#53545d] dark:text-slate-300 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Proof of Work Verified
            <BadgeCheck size={14} className="text-[#15151a] dark:text-emerald-400" />
          </span>
        </header>

        {/* Clean Minimalist Hero Header */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              {project.category} • {project.year}
            </span>

            <h1 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.04]">
              {project.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-normal">
              {project.tagline || project.description}
            </p>
          </div>
        </section>

        {/* Minimalist Video Showcase */}
        <section aria-label="Proof view" className="pt-2 sm:pt-4">
          {/* Centered Segmented Glass Pill Toggles */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div
              className="inline-flex items-center p-1 rounded-full border border-black/10 dark:border-white/10 bg-slate-200/50 dark:bg-white/[0.04] backdrop-blur-xl shadow-sm gap-1"
              role="tablist"
              aria-label="Project proof views"
            >
              {viewOptions.map((option) => {
                const Icon = option.icon;
                const active = view === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setView(option.id)}
                    className={`relative flex items-center justify-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="proof-view-active-pill"
                        className="absolute inset-0 rounded-full bg-slate-900 dark:bg-blue-600 shadow-md"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon size={14} className="relative z-10" />
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Videos Grid - directly side by side */}
          <motion.div
            layout
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className={`grid gap-6 items-stretch ${
              view === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleViews.map((mediaView) => (
                <MediaViewport
                  key={mediaView}
                  project={project}
                  mode={mediaView}
                  notes={breakdown?.blueprintNotes || []}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Request Similar Version CTA Button */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@borshonkabir.online&su=Requesting%20Similar%20Version%20-%20Project%20Inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-slate-950/90 dark:bg-white/[0.05] px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] active:scale-[0.98]"
            >
              <Sparkles size={15} className="text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              <span>Request Similar Version</span>
              <ArrowRight size={15} className="text-blue-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
            </a>
          </div>
        </section>

        {/* Project Overview Section */}
        <section className="mt-8 sm:mt-12 grid gap-8 border-t border-black/10 dark:border-white/10 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7b83] dark:text-slate-400">
              Project overview
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.04em] text-[#15151a] dark:text-white sm:text-4xl">
              Built for clarity, rhythm, and response.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#53545d] dark:text-slate-300 sm:text-lg">
              {breakdown.overview}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: BadgeCheck, label: 'Client', value: project.client },
                { icon: Clock3, label: 'Duration', value: breakdown.duration },
                { icon: CalendarDays, label: 'Turnaround', value: breakdown.turnaround },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] p-4 shadow-sm backdrop-blur-md"
                >
                  <Icon size={16} className="text-[#53545d] dark:text-slate-400" />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a7b83] dark:text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#15151a] dark:text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-black/10 dark:border-white/10 bg-white/75 dark:bg-white/[0.04] p-6 backdrop-blur-xl shadow-lg sm:p-7 self-start">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7b83] dark:text-slate-400">
              Software used
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {breakdown.software.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-[#f4f4f6] dark:bg-slate-900/60 px-3.5 py-1.5 text-xs font-medium text-[#15151a] dark:text-slate-200 shadow-sm transition-transform duration-200 hover:scale-[1.02]"
                >
                  <SoftwareBadge name={item} />
                  <span>{item}</span>
                </span>
              ))}
            </div>
            {breakdown.plugins && breakdown.plugins.length > 0 && (
              <>
                <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7b83] dark:text-slate-400">
                  Plugins & Tools
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {breakdown.plugins.map((plugin) => (
                    <span
                      key={plugin}
                      className="inline-flex items-center rounded-lg border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#53545d] dark:text-slate-300"
                    >
                      {plugin}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Next Project / Booking Banner */}
        <section className="relative mb-8 overflow-hidden rounded-[32px] border border-black/10 dark:border-white/10 bg-[#17171d] dark:bg-gradient-to-br dark:from-[#11131c] dark:to-[#0c0e14] p-8 text-white shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
                <Sparkles size={13} className="text-blue-400" /> Your next project
              </span>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                Need an edit like this?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                Bring the reference, story, and delivery goals. I&apos;ll shape the edit around the result you need.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#17171d] shadow-md transition-all duration-200 hover:bg-[#f4f4f6] hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Now <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
