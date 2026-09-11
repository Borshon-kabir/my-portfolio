import type { MetadataRoute } from 'next';

const siteUrl = 'https://my-portfolio-seven-ashen-ahlwc08ka.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
