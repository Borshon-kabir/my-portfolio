# Borshon Kabir — Cinematic Portfolio

Premium single-page Next.js 14 portfolio for a video editor and motion designer.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Build for production with `npm run build`.

## Editing content

- `data/content.ts` contains all project cards, services and testimonials.
- Replace the abstract portrait placeholders in `components/Portfolio.tsx` with `next/image` pointing to your real `/public/images/hero-portrait.jpg` and `/public/images/about-photo.jpg`.
- Add reel files under `/public/videos/`, then replace each project-card gradient with a muted `<video>` preview. The project modal notes where an embedded player or local video belongs.
- Contact copy, phone number and social URLs are in `components/Portfolio.tsx`.

The design uses a fixed cinematic dark theme, amber signature color, Framer Motion transitions, Lenis smooth scrolling, mobile navigation, responsive layouts, a working front-end enquiry success state, filters, project lightbox, and reduced-motion-safe CSS.
