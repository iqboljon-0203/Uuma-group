import { MetadataRoute } from 'next';

/**
 * robots() provides direct guidance to search engines crawling the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/checkout'], // Exclude non-content pages
    },
    sitemap: 'https://uuma.uz/sitemap.xml',
  };
}
