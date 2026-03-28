import { createClient } from '@supabase/supabase-js';
import { products } from '../data/products';
import { translations } from '../lib/translations';

// Note: Replace with your actual env variables or define them here temporarily
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // Use service role for migration

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log('--- Starting Migration ---');

  // 1. Categories (Hardcoded based on products.ts categories)
  const categories = [
    { slug: 'liquid', name: { uz: 'Suyuq mahsulotlar', ru: 'Жидкие продукты', en: 'Liquid Products' }, image: '/category-liquids.png' },
    { slug: 'capsules', name: { uz: 'Kapsula va granulalar', ru: 'Капсулы и гранулы', en: 'Capsules and granules' }, image: '/category-capsules.png' },
    { slug: 'household', name: { uz: "Ro'zg'or buyumlari", ru: 'Хозяйственные товары', en: 'Household items' }, image: '/category-household.png' },
  ];

  const { data: catData, error: catErr } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' }).select();
  if (catErr) console.error('Category Migration Error:', catErr);
  else console.log('Categories migrated.');

  // 3. Site Content (UI Texts)
  const siteContent = [
    { key: 'hero_title', content: { uz: 'YUQORI SIFATLI KIMYOVIY MAHSULOTLAR', ru: 'ВЫСОКОКАЧЕСТВЕННАЯ ХИМИЧЕСКАЯ ПРОДУКЦИЯ', en: 'HIGH QUALITY CHEMICAL PRODUCTS' } },
    { key: 'hero_desc', content: { uz: 'Uuma Group – tozalik va gigiyena sohasida ishonchli hamkoringiz. Biz sizga va uyingizga g\'amxo\'rlik qilamiz.', ru: 'Uuma Group – ваш надежный партнер в области чистоты и гигиены. Мы заботимся о вас и вашем доме.', en: 'Uuma Group – your reliable partner in the field of cleanliness and hygiene. We care about you and your home.' } },
    { key: 'about_summary', content: { uz: 'UUMA GROUP - bu yuqori sifatli maishiy kimyo mahsulotlarini ishlab chiqaruvchi yetakchi kompaniya.', ru: 'UUMA GROUP - ведущий производитель качественной бытовой химии.', en: 'UUMA GROUP is a leading manufacturer of high-quality household chemicals.' } },
    { key: 'about_image', content: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80' },
    { key: 'trust_1', content: { uz: 'Yuqori Sifat', ru: 'Высокое Качество', en: 'High Quality' } },
    { key: 'trust_2', content: { uz: 'Ekologik Toza', ru: 'Экологичность', en: 'Eco Friendly' } },
    { key: 'footer_desc', content: { uz: 'Sizning tozaligingiz - bizning mas\'uliyatimiz.', ru: 'Ваша чистота - наша ответственность.', en: 'Your cleanliness is our responsibility.' } },
    { key: 'footer_address', content: { uz: 'Toshkent sh, Chirchiq tumani, Sanoat zonasi', ru: 'г. Ташкент, Чирчикский район, Промзона', en: 'Tashkent city, Chirchik district, Industrial zone' } }
  ];

  console.log('Migrating site content...');
  const { error: contentError } = await supabase.from('site_content').upsert(siteContent, { onConflict: 'key' });
  if (contentError) console.error('Content error:', contentError);

  // 2. Products
  const productsToMigrate = products.map(p => {
    const cat = catData?.find(c => c.slug === p.category);
    return {
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      price: p.price,
      category_id: cat?.id,
      image: p.image,
      volume: p.volume,
      is_featured: p.featured,
      badge: p.badge,
      description: p.desc,
      sizes: p.sizes
    };
  });

  const { error: prodErr } = await supabase.from('products').upsert(productsToMigrate, { onConflict: 'slug' });
  if (prodErr) console.error('Product Migration Error:', prodErr);
  else console.log('Products migrated.');

  // 3. FAQ
  const faqData = [
    {
      question: { uz: translations.uz.faq.items[0].q, ru: translations.ru.faq.items[0].q, en: translations.en.faq.items[0].q },
      answer: { uz: translations.uz.faq.items[0].a, ru: translations.ru.faq.items[0].a, en: translations.en.faq.items[0].a },
      sort_order: 0
    },
    {
      question: { uz: translations.uz.faq.items[1].q, ru: translations.ru.faq.items[1].q, en: translations.en.faq.items[1].q },
      answer: { uz: translations.uz.faq.items[1].a, ru: translations.ru.faq.items[1].a, en: translations.en.faq.items[1].a },
      sort_order: 1
    },
    {
      question: { uz: translations.uz.faq.items[2].q, ru: translations.ru.faq.items[2].q, en: translations.en.faq.items[2].q },
      answer: { uz: translations.uz.faq.items[2].a, ru: translations.ru.faq.items[2].a, en: translations.en.faq.items[2].a },
      sort_order: 2
    },
    {
      question: { uz: translations.uz.faq.items[3].q, ru: translations.ru.faq.items[3].q, en: translations.en.faq.items[3].q },
      answer: { uz: translations.uz.faq.items[3].a, ru: translations.ru.faq.items[3].a, en: translations.en.faq.items[3].a },
      sort_order: 3
    }
  ];

  const { error: faqErr } = await supabase.from('faq').upsert(faqData);
  if (faqErr) console.error('FAQ Migration Error:', faqErr);
  else console.log('FAQ migrated.');

  // 4. Testimonials
  const testimonials = translations.uz.testimonials.items.map((item, i) => ({
    name: item.name,
    role: { uz: item.role, ru: translations.ru.testimonials.items[i].role, en: translations.en.testimonials.items[i].role },
    text: { uz: item.text, ru: translations.ru.testimonials.items[i].text, en: translations.en.testimonials.items[i].text },
    rating: 5
  }));

  const { error: testErr } = await supabase.from('testimonials').upsert(testimonials);
  if (testErr) console.error('Testimonials Migration Error:', testErr);
  else console.log('Testimonials migrated.');

  console.log('--- Migration Finished ---');
}

migrate();
