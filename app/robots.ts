import type { MetadataRoute } from 'next';

const siteUrl = 'https://borshonkabir.online';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Google-Favicon',
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
