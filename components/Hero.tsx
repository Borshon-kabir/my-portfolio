'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Menu } from 'lucide-react';

const metrics = [['30+', 'Projects completed'], ['4yr', 'Experience'], ['40+', 'Happy clients']];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } });
      timeline
        .fromTo('.show-nav', { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: .65 })
        .fromTo('.show-kicker', { y: 22, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: .55 }, '-=.2')
        .fromTo('.show-char', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: .025, duration: .82 }, '-=.12')
        .fromTo('.show-copy', { y: 22, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', stagger: .08, duration: .55 }, '-=.32')
        .fromTo('.show-photo', { scale: .94, opacity: 0, filter: 'blur(8px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: .9 }, '-=.52')
        .fromTo('.show-metric', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: .1, duration: .55 }, '-=.22');
      [30, 4, 40].forEach((target, index) => { const value = { number: 0 }; const suffix = index === 1 ? 'yr' : '+'; timeline.to(value, { number: target, duration: .75, ease: 'power2.out', onUpdate: () => { if (counterRefs.current[index]) counterRefs.current[index]!.textContent = `${Math.round(value.number)}${suffix}`; } }, index === 0 ? '-=.35' : '<'); });
    }, root);
    return () => ctx.revert();
  }, []);
  const text = (value: string) => value.split('').map((character, index) => <span key={index} className="inline-block overflow-hidden align-top"><span className="show-char inline-block">{character === ' ' ? '\u00a0' : character}</span></span>);
  return <section ref={root} id="home" className="sevora-light min-h-screen px-5 pb-20 pt-6 md:px-10 md:pt-7">
    <nav className="show-nav mx-auto flex max-w-[1160px] items-center justify-between"><a href="#home" className="flex items-center gap-2 font-semibold tracking-[-.04em] text-[#15151a]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#15151a] font-serif text-xl text-[#f5f5f4]">B</span><span>Borshon.</span></a><div className="hidden items-center gap-8 text-sm text-[#25252b] md:flex"><a href="#home">Home</a><a href="#about">About</a><a href="#work">Projects</a><a href="#services">Services</a><a href="#contact">Contact</a></div><div className="flex items-center gap-3"><a href="#contact" className="dark-cta flex items-center gap-3 rounded-lg bg-[#17171d] py-2 pl-4 pr-2 text-sm font-semibold text-white"><span>Let&apos;s talk</span><ArrowUpRight size={15}/></a><button aria-label="Open menu" className="text-[#17171d] md:hidden"><Menu size={21}/></button></div></nav>
    <div className="relative mx-auto mt-20 grid min-h-[610px] max-w-[1160px] overflow-hidden rounded-[30px] bg-[#e6e7eb] px-10 py-16 md:mt-20 md:grid-cols-[1.05fr_.95fr] md:px-24">
      <div className="relative z-20 flex max-w-[470px] flex-col justify-center"><p className="show-kicker text-base text-[#686973]">Hey, I&apos;m Borshon Kabir.</p><h1 aria-label="Craft better edits, faster." className="mt-5 font-serif text-[clamp(4rem,6.1vw,6.7rem)] font-semibold leading-[.83] tracking-[-.055em] text-[#15151a]"><span className="block">{text('Craft better')}</span><span className="block">{text('edits, ')}<span className="text-[#a8a9b0]">{text('faster.')}</span></span></h1><p className="show-copy mt-5 max-w-[365px] text-[15px] leading-6 text-[#53545d]">I craft refined cinematic videos, pacing, and visual storytelling for ambitious brands and creators.</p><div className="show-copy mt-7 flex gap-2"><a href="#work" className="dark-cta rounded-lg bg-[#17171d] px-5 py-3 text-sm font-semibold text-white">View projects</a><a href="#contact" className="rounded-lg border border-[#c9cbd1] px-5 py-3 text-sm font-medium text-[#292a30] transition hover:-translate-y-0.5 hover:bg-white">Get in touch</a></div><div className="relative z-30 mt-16 grid grid-cols-3 gap-7 md:mt-20">{metrics.map(([,label], index) => <div className="show-metric" key={label}><p className="font-serif text-[2rem] font-semibold tracking-[-.05em] text-[#15151a]"><span ref={element => { counterRefs.current[index] = element; }}>0</span></p><p className="mt-1 text-sm leading-5 text-[#575862]">{label}</p></div>)}</div></div>
      <div className="show-photo pointer-events-none absolute inset-y-0 right-0 z-10 w-[52%] md:w-[53%]"><div className="absolute inset-[8%] rounded-full bg-white/40 blur-[80px]"/><Image src="/images/borshon-cutout.png" alt="Borshon Kabir" fill priority sizes="(max-width: 768px) 56vw, 50vw" className="object-contain object-bottom grayscale contrast-110"/><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_54%,#e6e7eb_92%)]"/></div>
      <div className="glass-project show-copy absolute bottom-10 right-10 z-30 hidden w-[330px] rounded-2xl border border-white/30 bg-[#242429]/90 p-6 text-white shadow-2xl backdrop-blur md:block"><p className="text-sm text-white/60">Select project</p><h2 className="mt-2 text-lg font-semibold">Available for projects</h2><p className="mt-2 max-w-[220px] text-sm leading-5 text-white/80">Share a few details, and I&apos;ll get back with a clear direction.</p><span className="absolute bottom-6 right-6 grid h-12 w-12 place-items-center rounded-xl bg-white text-[#17171d]"><ArrowUpRight size={19}/></span></div>
    </div>
    <div className="mx-auto mt-11 flex max-w-[1160px] items-center gap-9 overflow-hidden text-[#26262d] md:gap-12"><p className="w-24 shrink-0 text-xs leading-4 text-[#7a7b83]">Trusted by creators & brands</p><div className="brand-track flex min-w-max items-center gap-9 text-base font-semibold md:gap-12">{['AGENTIFY','TODOFUSION','IDENTIFY','NEXUS AI','LANDIFY','FLEXIFY','AGENTIFY','TODOFUSION'].map((brand, index) => <span className="flex items-center gap-2" key={`${brand}-${index}`}><span className="h-4 w-4 rounded-sm bg-[#25252b]"/>{brand}</span>)}</div></div>
  </section>;
}
