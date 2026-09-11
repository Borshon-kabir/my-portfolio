import { Aperture, Clapperboard, Layers3, Music2, Sparkles, Volume2 } from 'lucide-react';
export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  format: 'shorts' | 'long';
  year: string;
  tone: string;
  size?: string;
  tagline: string;
  themeColor: string;
  accentText: string;
  description: string;
  thumbnail: string; // image URL or path
  videoUrl: string;  // YouTube watch URL, YouTube short URL, or Google Drive share URL
  processVideoUrl?: string; // Google Drive share URL or direct video file for the proof-of-work view
  tags: string[];
};
export const longProjects: Project[] = [
  {
    id: 'project-01',
    title: 'Map Animation',
    client: 'Personal Project',
    category: 'Documentary Video',
    format: 'long',
    year: '2024',
    tone: 'from-[#fceee9] to-[#fed6c8]',
    themeColor: '#fed6c8',
    accentText: '#7a2a10',
    tagline: 'Real Stories. Real Impact.',
    description: 'A cinematic documentary-style map animation video crafted with dynamic motion graphics, archival visuals, and compelling storytelling.',
    thumbnail: '/thumbnails/map-animation.jpg',
    videoUrl: 'https://drive.google.com/file/d/1J2pzygfxyluF_Lk2_8yYdK1Hmi-NRNZy/view?usp=sharing',
    processVideoUrl: 'https://drive.google.com/file/d/1ct8vFduSVZC1oB85t1pWYr3sn3wZI3-q/view?usp=sharing',
    tags: ['Documentary', 'Map Animation', 'Motion Graphics'],
  },
];

export const shortsProjects: Project[] = [];

export const projects: Project[] = [...longProjects, ...shortsProjects];
export const services = [
 { icon: Clapperboard, title: 'Video Editing', copy: 'Narrative-led edits that find rhythm, clarity and the human pulse.' }, { icon: Aperture, title: 'Color Grading', copy: 'Intentional palettes and tonal worlds built shot by shot.' }, { icon: Sparkles, title: 'Motion Design', copy: 'Expressive visual systems that keep stories moving.' }, { icon: Volume2, title: 'Sound & Mix', copy: 'Sonic detail that makes every frame land with weight.' }, { icon: Layers3, title: 'Short-form', copy: 'Native social stories engineered to stop the scroll.' }, { icon: Music2, title: 'Creative Direction', copy: 'From rough treatment to final master, a joined-up eye.' }
];
export const testimonials = [{ quote: 'Borshon has a rare instinct for the moment that makes a film memorable. He made our work feel bigger than we imagined.', name: 'Tania Rahman', role: 'Brand Director, Nahal Studio' }, { quote: "The goal isn't to make viewers watch. It's to give them a reason to keep watching.", name: 'Borshon Kabir', role: 'Documentary & Motion Editor' }, { quote: 'He understands pace at a granular level. The launch film became our strongest-performing piece.', name: 'Mehjabin Islam', role: 'Marketing Lead, Arc House' }];
