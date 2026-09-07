import { Aperture, Clapperboard, Layers3, Music2, Sparkles, Volume2 } from 'lucide-react';
export type Project = { title: string; client: string; category: string; year: string; tone: string; size: string };
export const projects: Project[] = [
 { title: 'Nocturne', client: 'Vera Atelier', category: 'Commercial', year: '2024', tone: 'from-[#17171A] via-[#111114] to-[#0E0E10]', size: 'md:col-span-7' },
 { title: 'Afterglow', client: 'Mira Khan', category: 'Music Video', year: '2024', tone: 'from-[#17171A] via-[#111114] to-[#0E0E10]', size: 'md:col-span-5' },
 { title: 'Aston Martin / DB12', client: 'Arc House', category: 'Commercial', year: '2023', tone: 'from-[#17171A] via-[#111114] to-[#0E0E10]', size: 'md:col-span-5' },
 { title: 'Static Bloom', client: 'Nahal Studio', category: 'Motion Graphics', year: '2024', tone: 'from-[#17171A] via-[#111114] to-[#0E0E10]', size: 'md:col-span-7' },
 { title: 'The Salt Road', client: 'Wander Journal', category: 'Short Film', year: '2023', tone: 'from-[#17171A] via-[#111114] to-[#0E0E10]', size: 'md:col-span-7' },
 { title: 'Tactile Type', client: 'Form / Found', category: 'Motion Graphics', year: '2023', tone: 'from-[#17171A] via-[#111114] to-[#0E0E10]', size: 'md:col-span-5' },
 { title: 'Daybreak', client: 'Kora Coffee', category: 'Color Grading', year: '2022', tone: 'from-[#17171A] via-[#111114] to-[#0E0E10]', size: 'md:col-span-5' },
 { title: 'Unfold', client: 'Rare Beauty', category: 'Social Content', year: '2024', tone: 'from-[#17171A] via-[#111114] to-[#0E0E10]', size: 'md:col-span-7' }
];
export const services = [
 { icon: Clapperboard, title: 'Video Editing', copy: 'Narrative-led edits that find rhythm, clarity and the human pulse.' }, { icon: Aperture, title: 'Color Grading', copy: 'Intentional palettes and tonal worlds built shot by shot.' }, { icon: Sparkles, title: 'Motion Design', copy: 'Expressive visual systems that keep stories moving.' }, { icon: Volume2, title: 'Sound & Mix', copy: 'Sonic detail that makes every frame land with weight.' }, { icon: Layers3, title: 'Short-form', copy: 'Native social stories engineered to stop the scroll.' }, { icon: Music2, title: 'Creative Direction', copy: 'From rough treatment to final master, a joined-up eye.' }
];
export const testimonials = [{ quote: 'Borshon has a rare instinct for the moment that makes a film memorable. He made our work feel bigger than we imagined.', name: 'Tania Rahman', role: 'Brand Director, Nahal Studio' }, { quote: 'Every decision felt intentional. The final film was textured, modern and completely ours.', name: 'Arif Hossain', role: 'Founder, Kora Coffee' }, { quote: 'He understands pace at a granular level. The launch film became our strongest-performing piece.', name: 'Mehjabin Islam', role: 'Marketing Lead, Arc House' }];
