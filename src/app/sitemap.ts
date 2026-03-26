import { MetadataRoute } from 'next';
import { products } from '@/data/products';

/**
 * sitemap() generates a dynamic sitemap.xml for all products and static pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://uuma.uz';

  // Static routes
  const staticRoutes = [
    '',
    '/catalog',
    '/cart',
    '/checkout',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
