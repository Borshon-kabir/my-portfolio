'use client';
import { Star } from 'lucide-react';

const reviews = [
  {
    quote: 'Borshon has a rare instinct for pacing and tension. He took hours of raw footage and turned our launch campaign into our highest-converting video asset to date.',
    author: 'Tania Rahman',
    role: 'Brand Director',
    company: 'Nahal Studio',
    initials: 'TR'
  },
  {
    quote: "The goal isn't to make viewers watch. It's to give them a reason to keep watching.",
    author: 'Borshon Kabir',
    role: 'Documentary & Motion Editor',
    company: '',
    initials: 'BK'
  },
  {
    quote: 'He understands pacing at a granular level. The automotive launch film captured exact brand gravity and became the centerpiece of our global digital campaign.',
    author: 'Mehjabin Islam',
    role: 'Marketing Lead',
    company: 'Arc House',
    initials: 'MI'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-white/10 bg-neutral-950 px-6 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-[1160px]">
        <div>
          <p className="inline-flex rounded-full border border-white/10 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-400">
            Testimonials
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-.04em] text-white md:text-5xl lg:text-6xl">
            What clients say
          </h2>
          <p className="mt-4 max-w-xl text-base text-neutral-400">
            Real feedback from creative directors, founders, and marketing leaders.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.author}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-neutral-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80"
            >
              <div>
                <div className="flex gap-1 text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-6 font-serif text-lg leading-relaxed text-neutral-200">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-xs font-semibold text-white">
                  {r.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{r.author}</p>
                  <p className="text-xs text-neutral-400">{r.role}{r.company ? `, ${r.company}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
