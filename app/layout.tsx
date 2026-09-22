import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Lora } from 'next/font/google';
import './globals.css';
import './mobile-performance.css';
import { ThemeProvider } from '../components/ThemeProvider';
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const serif = Lora({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '500', '600', '700'] });
export const metadata: Metadata = {
  metadataBase: new URL('https://my-portfolio-seven-ashen-ahlwc08ka.vercel.app'),
  title: 'Borshon Kabir - Video Editor & Motion Designer',
  description: 'Video Editor & Motion Designer',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/icon.png?v=2',    type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png?v=2',
  },
  openGraph: {
    title: 'Borshon Kabir - Video Editor & Motion Designer',
    description: 'Video Editor & Motion Designer',
    url: 'https://my-portfolio-seven-ashen-ahlwc08ka.vercel.app',
    siteName: 'Borshon Kabir',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://my-portfolio-seven-ashen-ahlwc08ka.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Borshon Kabir - Video Editor Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borshon Kabir - Video Editor & Motion Designer',
    description: 'Video Editor & Motion Designer',
    images: ['https://my-portfolio-seven-ashen-ahlwc08ka.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('borshon-theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}}catch(e){}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);if(window.location.hash){history.replaceState(null,'',window.location.pathname+window.location.search);}`,
          }}
        />
      </head>
      <body className="bg-[#f8fafc] transition-colors duration-300 dark:bg-[#0a0b10]"><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
