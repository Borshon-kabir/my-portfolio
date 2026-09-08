import { Aperture, Clapperboard, Layers3, Music2, Sparkles, Volume2 } from 'lucide-react';
export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  tone: string;
  size?: string;
  tagline: string;
  themeColor: string;
  accentText: string;
  description: string;
  thumbnail: string; // image URL or path
  videoUrl: string;  // YouTube watch URL, YouTube short URL, or Google Drive share URL
  tags: string[];
};
export const projects: Project[] = [
  {
    id: 'project-01',
    title: 'Map Animation',
    client: 'Personal Project',
    category: 'Documentary Video',
    year: '2024',
    tone: 'from-[#fceee9] to-[#fed6c8]',
    themeColor: '#fed6c8',
    accentText: '#7a2a10',
    tagline: 'Real Stories. Real Impact.',
    description: 'A cinematic documentary-style map animation video crafted with dynamic motion graphics, archival visuals, and compelling storytelling.',
    thumbnail: '/thumbnails/map-animation.jpg',
    videoUrl: 'https://drive.google.com/file/d/1J2pzygfxyluF_Lk2_8yYdK1Hmi-NRNZy/view?usp=sharing',
    tags: ['Documentary', 'Map Animation', 'Motion Graphics'],
  },
  {
    id: 'project-02',
    title: 'Nivora',
    client: 'Nivora Collective',
    category: 'Fashion & Music Video',
    year: '2024',
    tone: 'from-[#a2e701] to-[#83ca16]',
    themeColor: '#a2e701',
    accentText: '#0d2900',
    tagline: 'Design For Everyone',
    description: 'Bold kinetic typography, acid-green grade, and high-impact pacing built for global streetwear and culture.',
    // 🔁 Replace with your actual Google Drive share link or YouTube URL
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
    videoUrl: 'https://drive.google.com/file/d/YOUR_DRIVE_FILE_ID_2/view?usp=sharing',
    tags: ['Music Video', 'Fashion', 'Color Grading'],
  },
  {
    id: 'project-03',
    title: 'Codify',
    client: 'Codify Systems',
    category: 'Product Launch & Tech',
    year: '2024',
    tone: 'from-[#1a382b] to-[#0f241a]',
    themeColor: '#1a382b',
    accentText: '#a2e701',
    tagline: 'Elevating Your Brand with Innovative Design',
    description: 'An editorial commercial highlighting modern software craftsmanship, modular systems, and design agility.',
    // 🔁 Replace with your actual Google Drive share link or YouTube URL
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    videoUrl: 'https://drive.google.com/file/d/YOUR_DRIVE_FILE_ID_3/view?usp=sharing',
    tags: ['Product Video', 'Tech', 'Premiere Pro'],
  },
  {
    id: 'project-04',
    title: 'Neutra',
    client: 'Neutra Software',
    category: '3D Motion & Commercial',
    year: '2023',
    tone: 'from-[#1c1d22] to-[#121216]',
    themeColor: '#1c1d22',
    accentText: '#d1d5db',
    tagline: 'Design for ambitious software companies',
    description: 'High-end chrome 3D aesthetics, precision foley, and cinematic post-production for an enterprise design suite.',
    // 🔁 Replace with your actual Google Drive share link or YouTube URL
    thumbnail: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&q=80',
    videoUrl: 'https://drive.google.com/file/d/YOUR_DRIVE_FILE_ID_4/view?usp=sharing',
    tags: ['3D Motion', 'After Effects', 'Sound Design'],
  },
  {
    id: 'project-05',
    title: 'Snapkit',
    client: 'Snapkit Digital',
    category: 'Reels & Short-form',
    year: '2023',
    tone: 'from-[#18181b] to-[#0d0d10]',
    themeColor: '#18181b',
    accentText: '#f4f4f6',
    tagline: 'Stop the scroll. Own the feed.',
    description: 'Minimalist product video and tactile animation built for social-first storytelling and maximum retention.',
    // 🔁 Replace with your actual Google Drive share link or YouTube URL
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['Reels', 'Short-form', 'Social Media'],
  },
  {
    id: 'project-06',
    title: 'TodoFusion',
    client: 'TodoFusion AI',
    category: 'SaaS Commercial',
    year: '2024',
    tone: 'from-[#ede8ff] to-[#ddd6fe]',
    themeColor: '#ede8ff',
    accentText: '#3b1fa8',
    tagline: 'Boost Your Productivity with TodoFusion',
    description: 'Dynamic UI pacing, sound-matched cuts, and vibrant product storytelling for a fast-growth productivity app.',
    // 🔁 Replace with your actual Google Drive share link or YouTube URL
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['SaaS', 'Product Demo', 'Motion Design'],
  },
];
export const services = [
 { icon: Clapperboard, title: 'Video Editing', copy: 'Narrative-led edits that find rhythm, clarity and the human pulse.' }, { icon: Aperture, title: 'Color Grading', copy: 'Intentional palettes and tonal worlds built shot by shot.' }, { icon: Sparkles, title: 'Motion Design', copy: 'Expressive visual systems that keep stories moving.' }, { icon: Volume2, title: 'Sound & Mix', copy: 'Sonic detail that makes every frame land with weight.' }, { icon: Layers3, title: 'Short-form', copy: 'Native social stories engineered to stop the scroll.' }, { icon: Music2, title: 'Creative Direction', copy: 'From rough treatment to final master, a joined-up eye.' }
];
export const testimonials = [{ quote: 'Borshon has a rare instinct for the moment that makes a film memorable. He made our work feel bigger than we imagined.', name: 'Tania Rahman', role: 'Brand Director, Nahal Studio' }, { quote: 'Every decision felt intentional. The final film was textured, modern and completely ours.', name: 'Arif Hossain', role: 'Founder, Kora Coffee' }, { quote: 'He understands pace at a granular level. The launch film became our strongest-performing piece.', name: 'Mehjabin Islam', role: 'Marketing Lead, Arc House' }];

