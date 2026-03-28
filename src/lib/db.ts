import { supabase } from "./supabase";

export async function getSiteContent(keys: string[]) {
  const { data, error } = await supabase
    .from('site_content')
    .select('key, content')
    .in('key', keys);

  if (error) {
    console.error('Error fetching site content:', error);
    return {};
  }

  return data.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.content;
    return acc;
  }, {});
}

export async function getProducts(options?: { featured?: boolean, category?: string }) {
  let query = supabase.from('products').select(`
    *,
    categories (
      name
    )
  `);

  if (options?.featured) query = query.eq('is_featured', true);
  if (options?.category) query = query.filter('categories.slug', 'eq', options.category);

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
}

export async function getFAQ() {
  const { data, error } = await supabase.from('faq').select('*').order('sort_order', { ascending: true });
  if (error) return [];
  return data;
}

export async function getTestimonials() {
  const { data, error } = await supabase.from('testimonials').select('*');
  if (error) return [];
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*').order('name', { ascending: true });
  if (error) return [];
  return data;
}
