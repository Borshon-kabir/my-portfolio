import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Lora } from 'next/font/google';
import './globals.css';
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const serif = Lora({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '500', '600', '700'] });
export const metadata: Metadata = { title: 'Borshon Kabir — Video Editor', description: 'Cinematic video editing from Sylhet, Bangladesh.', metadataBase: new URL('https://borshonkabir.com'), openGraph: { title: 'Borshon Kabir — Video Editor', description: 'Cinematic stories made to be felt.', type: 'website' }, twitter: { card: 'summary_large_image' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
