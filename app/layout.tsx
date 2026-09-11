import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Lora } from 'next/font/google';
import './globals.css';
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const serif = Lora({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '500', '600', '700'] });
export const metadata: Metadata = {
  metadataBase: new URL('https://my-portfolio-seven-ashen-ahlwc08ka.vercel.app'),
  title: 'Borshon Kabir',
  description: 'Video Editor',
  openGraph: {
    title: 'Borshon Kabir',
    description: 'Video Editor',
    url: 'https://my-portfolio-seven-ashen-ahlwc08ka.vercel.app',
    siteName: 'Borshon Kabir',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Borshon Kabir - Video Editor Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borshon Kabir',
    description: 'Video Editor',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);if(window.location.hash){history.replaceState(null,'',window.location.pathname+window.location.search);}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
