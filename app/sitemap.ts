import type { MetadataRoute } from 'next';

const siteUrl = 'https://my-portfolio-seven-ashen-ahlwc08ka.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
