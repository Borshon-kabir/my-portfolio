import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Lora } from 'next/font/google';
import './globals.css';
import './mobile-performance.css';
import { ThemeProvider } from '../components/ThemeProvider';
import Preloader from '../components/Preloader';
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const serif = Lora({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '500', '600', '700'] });
export const metadata: Metadata = {
  metadataBase: new URL('https://borshonkabir.online'),
  title: 'Borshon Kabir - Video Editor & Motion Designer',
  description: 'Video Editor & Motion Designer',
  icons: {
    icon: [
      { url: '/favicon.ico?v=9' },
      { url: '/favicon-32x32.png?v=9', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=9', sizes: '16x16', type: 'image/png' },
      { url: '/android-chrome-192x192.png?v=9', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png?v=9', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=9', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Borshon Kabir - Video Editor & Motion Designer',
    description: 'Video Editor & Motion Designer',
    url: 'https://borshonkabir.online',
    siteName: 'Borshon Kabir',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://borshonkabir.online/og-image.png',
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
    images: ['https://borshonkabir.online/og-image.png'],
  },
  authors: [{ name: 'Borshon Kabir', url: 'mailto:hello@borshonkabir.online' }],
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Borshon Kabir',
              jobTitle: 'Video Editor & Motion Designer',
              url: 'https://borshonkabir.online',
              email: 'hello@borshonkabir.online',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'hello@borshonkabir.online',
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('borshon-theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}}catch(e){}try{if(sessionStorage.getItem('hasSeenPreloader')==='true'){document.documentElement.classList.add('has-seen-preloader');}}catch(e){}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);if(window.location.hash){history.replaceState(null,'',window.location.pathname+window.location.search);}`,
          }}
        />
      </head>
      <body className="bg-[#f8fafc] transition-colors duration-300 dark:bg-[#0a0b10]">
        <ThemeProvider>
          <Preloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
