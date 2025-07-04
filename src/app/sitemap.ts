import { generateMultilingualSitemapEntries } from '@/lib/seo-utils';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Define all the main pages of the website
  const mainPages = [
    '/',
    '/about',
    '/prayers',
    '/meditations',
    '/saints',
    '/divine-office',
    '/journal',
    '/community',
    '/calendar',
    '/hospice',
    '/contact',
    '/faq',
    '/confession',
    '/auth/login',
    '/auth/signup',
    '/dashboard',
    '/privacy',
    '/terms',
    '/cookies'
  ];

  // Generate multilingual sitemap entries
  const multilingualEntries = generateMultilingualSitemapEntries(mainPages);

  // Add specific high-priority pages
  const specificEntries: MetadataRoute.Sitemap = [
    {
      url: 'https://graces.church',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://graces.church/prayers',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://graces.church/divine-office',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://graces.church/saints',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://graces.church/meditations',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://graces.church/calendar',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }
  ];

  // Combine all entries
  return [...specificEntries, ...multilingualEntries];
}

