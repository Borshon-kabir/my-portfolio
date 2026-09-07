import { Aperture, Clapperboard, Layers3, Music2, Sparkles, Volume2 } from 'lucide-react';
export type Project = {
  title: string;
  client: string;
  category: string;
  year: string;
  tone: string;
  size?: string;
  tagline: string;
  themeColor: string;
  description: string;
};
export const projects: Project[] = [
  {
    title: 'Brandora',
    client: 'Brandora Creative',
    category: 'Commercial & Brand Film',
    year: '2024',
    tone: 'from-[#fceee9] to-[#fed6c8]',
    themeColor: '#fed6c8',
    tagline: 'Design Better, Faster, Smarter',
    description: 'A rhythmic brand film and interactive launch campaign showcasing creative digital operations for modern teams.',
  },
  {
    title: 'Nivora',
    client: 'Nivora Collective',
    category: 'Fashion & Music Video',
    year: '2024',
    tone: 'from-[#a2e701] to-[#83ca16]',
    themeColor: '#a2e701',
    tagline: 'Design For Everyone',
    description: 'Bold kinetic typography, acid-green grade, and high-impact pacing built for global streetwear and culture.',
  },
  {
    title: 'Codify',
    client: 'Codify Systems',
    category: 'Product Launch & Tech',
    year: '2024',
    tone: 'from-[#1a382b] to-[#0f241a]',
    themeColor: '#1a382b',
    tagline: 'Elevating Your Brand with Innovative Design',
    description: 'An editorial commercial highlighting modern software craftsmanship, modular systems, and design agility.',
  },
  {
    title: 'Neutra',
    client: 'Neutra Software',
    category: '3D Motion & Commercial',
    year: '2023',
    tone: 'from-[#1c1d22] to-[#121216]',
    themeColor: '#1c1d22',
    tagline: 'Design for ambitious software companies',
    description: 'High-end chrome 3D aesthetics, precision foley, and cinematic post-production for an enterprise design suite.',
  },
  {
    title: 'Snapkit',
    client: 'Snapkit Digital',
    category: 'Motion Design & Web',
    year: '2023',
    tone: 'from-[#18181b] to-[#0d0d10]',
    themeColor: '#18181b',
    tagline: 'Premium Templates for Nuxt, Framer & Figma',
    description: 'Minimalist product video and tactile animation showcasing responsive design workflows.',
  },
  {
    title: 'TodoFusion',
    client: 'TodoFusion AI',
    category: 'SaaS Commercial',
    year: '2024',
    tone: 'from-[#ede8ff] to-[#ddd6fe]',
    themeColor: '#ede8ff',
    tagline: 'Boost Your Productivity with TodoFusion',
    description: 'Dynamic UI pacing, sound-matched cuts, and vibrant product storytelling for a fast-growth productivity app.',
  },
];
export const services = [
 { icon: Clapperboard, title: 'Video Editing', copy: 'Narrative-led edits that find rhythm, clarity and the human pulse.' }, { icon: Aperture, title: 'Color Grading', copy: 'Intentional palettes and tonal worlds built shot by shot.' }, { icon: Sparkles, title: 'Motion Design', copy: 'Expressive visual systems that keep stories moving.' }, { icon: Volume2, title: 'Sound & Mix', copy: 'Sonic detail that makes every frame land with weight.' }, { icon: Layers3, title: 'Short-form', copy: 'Native social stories engineered to stop the scroll.' }, { icon: Music2, title: 'Creative Direction', copy: 'From rough treatment to final master, a joined-up eye.' }
];
export const testimonials = [{ quote: 'Borshon has a rare instinct for the moment that makes a film memorable. He made our work feel bigger than we imagined.', name: 'Tania Rahman', role: 'Brand Director, Nahal Studio' }, { quote: 'Every decision felt intentional. The final film was textured, modern and completely ours.', name: 'Arif Hossain', role: 'Founder, Kora Coffee' }, { quote: 'He understands pace at a granular level. The launch film became our strongest-performing piece.', name: 'Mehjabin Islam', role: 'Marketing Lead, Arc House' }];
