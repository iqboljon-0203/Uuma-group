import { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://uumagroup.uz';
  
  // 1. Static Pages
  const staticPages = [
    '',
    '/about',
    '/catalog',
    '/cart',
    '/#faq'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Products
  const products = await getProducts();
  const productPages = products.map(product => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Dynamic Categories
  const categories = await getCategories();
  const categoryPages = categories.map(cat => ({
    url: `${baseUrl}/catalog?category=${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...categoryPages,
  ];
}
