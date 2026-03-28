
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Service role is needed to bypass RLS for migration
const supabase = createClient(supabaseUrl, supabaseKey);

const translations = {
  uz: {
    hero: { tagline: "Premium sifatli tozalash vositalari", title: "Uuma Group", subtitle: "Ayollar va uy uchun mahsulotlar", desc: "Habfer va Jieti brendlari bilan uyingizda mukammal tozalik va xushbo'y iforni yarating. Premium sifatli maishiy kimyo mahsulotlari.", cta: "Katalogni ko'rish" },
    trust: { tagline: "Nima uchun Uuma Group?", title: "Ishonchingiz biz uchun muhim", d1: "Tezkor yetkazib berish", d1s: "Toshkent bo'ylab 24 soat ichida yetkaziladi", d2: "Sifat kafolati", d2s: "100% original va sertifikatlangan mahsulotlar", d3: "24/7 yordam", d3s: "Telegram orqali istalgan vaqtda aloqa", d4: "Premium daraja", d4s: "Habfer va Jieti: Premium maishiy kimyo" },
    about: { tagline: "Kompaniya haqida", title: "Uuma Group — Premium sifat standarti", summary: "Habfer va Jieti brendlari - uyingizda mukammal tozalik va xushbo'y ifor yaratishingiz uchun. Premium sifat, ayollar uchun maxsus ishlab chiqilgan.", storyTitle: "Bizning tariximiz", storyText: "Uuma Group maishiy kimyo bozorida yangi standartlarni o'rnatish maqsadida tashkil etilgan. Bizning Habfer va Jieti brendlarimiz - bu yillar davomida to'plangan tajriba va eng zamonaviy texnologiyalar mahsulidir.", v1t: "Sifat nazorati", v1d: "Har bir mahsulot laboratoriya sinovlaridan o'tadi va xalqaro standartlarga to'liq javob beradi.", v2t: "Mahalliy ishlab chiqarish", v2d: "O'zbekistonda ishlab chiqarilgan mahsulotlarimiz orqali biz milliy iqtisodiyotga hissa qo'xamiz.", v3t: "Ekologik tozalik", v3d: "Mahsulotlarimiz tabiatga va insonga zarar yetkazmaydigan xavfsiz komponentlardan tashkil topgan.", ctaT: "Keling, birga yangi cho'qqilarni zabt etaylik", ctaD: "Uuma Group bilan uyingiz har doim toza va xushbo'y bo'ladi." },
    footer: { desc: "Premium maishiy kimyo mahsulotlari ishlab chiqaruvchisi. Biz uyingizda mukammal tozalik va xushbo'y iforni yaratish uchun yuqori sifatli Habfer va Jieti mahsulotlarini taklif etamiz.", address: "Toshkent sh., Yunusobod tumani, Bog'ishamol ko'chasi, 24-uy", work: "Ish tartibi: 09:00 - 18:00 (Du - Sha)" }
  },
  ru: {
    hero: { tagline: "Чистящие средства премиум-класса", title: "Uuma Group", subtitle: "Товары для женщин и дома", desc: "Создайте идеальную чистоту и аромат в своем доме с брендами Habfer и Jieti. Бытовая химия премиального качества.", cta: "Смотреть каталог" },
    trust: { tagline: "Почему Uuma Group?", title: "Ваше доверие важно для нас", d1: "Быстрая доставка", d1s: "Доставка по Ташкенту в течение 24 часов", d2: "Гарантия качества", d2s: "100% оригинальная и сертифицированная продукция", d3: "Поддержка 24/7", d3s: "Связь через Telegram в любое время", d4: "Премиум уровень", d4s: "Habfer и Jieti: бытовая химия премиум-класса" },
    about: { tagline: "О компании", title: "Uuma Group — Стандарт премиум качества", summary: "Бренды Habfer и Jieti - для создания идеальной чистоты и аромата в вашем доме. Премиум качество, специально для женщин.", storyTitle: "Наша история", storyText: "Uuma Group была основана с целью установить новые стандарты на рынке бытовой химии. Наши бренды Habfer и Jieti — это результат многолетнего опыта и самых современных технологий.", v1t: "Контроль качества", v1d: "Каждый продукт проходит лабораторные испытания и полностью соответствует международным стандартам.", v2t: "Местное производство", v2d: "Через наши продукты, произведенные в Узбекистане, мы вносим вклад в национальную экономику.", v3t: "Экологичность", v3d: "Наши продукты состоят из безопасных компонентов, не наносящих вреда природе и человеку.", ctaT: "Давайте достигать новых вершин вместе", ctaD: "С Uuma Group ваш дом всегда будет чистым и ароматным." },
    footer: { desc: "Производитель бытовой химии премиум-класса.", address: "г. Ташкент, Юнусабадский р-н, ул. Богишамол, 24", work: "График работы: 09:00 - 18:00 (Пн - Сб)" }
  },
  en: {
    hero: { tagline: "Premium Cleaning Solutions", title: "Uuma Group", subtitle: "Products for women and home", desc: "Create perfect cleanliness and fragrance in your home with Habfer and Jieti brands. Premium quality household chemicals.", cta: "View Catalog" },
    trust: { tagline: "Why Uuma Group?", title: "Your Trust Matters to Us", d1: "Fast Delivery", d1s: "Delivered within 24 hours in Tashkent", d2: "Quality Guarantee", d2s: "100% original and certified products", d3: "24/7 Support", d3s: "Contact via Telegram at any time", d4: "Premium Level", d4s: "Habfer & Jieti: Premium Household Chemicals" },
    about: { tagline: "About Us", title: "Uuma Group — Premium Quality Standard", summary: "Habfer and Jieti brands for creating perfect cleanliness and fragrance in your home. Premium quality, specifically designed for women.", storyTitle: "Our Story", storyText: "Uuma Group was founded with the goal of setting new standards in the household chemical market. Our Habfer and Jieti brands are the result of years of experience.", v1t: "Quality Control", v1d: "Every product undergoes laboratory testing and fully complies with international standards.", v2t: "Local Production", v2d: "Through our products manufactured in Uzbekistan, we contribute to the national economy.", v3t: "Eco-Friendly", v3d: "Our products consist of safe components that do not harm nature or humans.", ctaT: "Let's Reach New Heights Together", ctaD: "With Uuma Group, your home is always clean and fragrant." },
    footer: { desc: "Premium household chemicals manufacturer.", address: "24 Bogishamol St, Yunusobod Dist, Tashkent city", work: "Working hours: 09:00 - 18:00 (Mon - Sat)" }
  }
};

const mapping = [
  // Hero
  { key: 'hero_tagline', content: { uz: translations.uz.hero.tagline, ru: translations.ru.hero.tagline, en: translations.en.hero.tagline } },
  { key: 'hero_title', content: { uz: translations.uz.hero.title, ru: translations.ru.hero.title, en: translations.en.hero.title } },
  { key: 'hero_subtitle', content: { uz: translations.uz.hero.subtitle, ru: translations.ru.hero.subtitle, en: translations.en.hero.subtitle } },
  { key: 'hero_desc', content: { uz: translations.uz.hero.desc, ru: translations.ru.hero.desc, en: translations.en.hero.desc } },
  { key: 'hero_cta', content: { uz: translations.uz.hero.cta, ru: translations.ru.hero.cta, en: translations.en.hero.cta } },
  
  // Trust
  { key: 'trust_tagline', content: { uz: translations.uz.trust.tagline, ru: translations.ru.trust.tagline, en: translations.en.trust.tagline } },
  { key: 'trust_main_title', content: { uz: translations.uz.trust.title, ru: translations.ru.trust.title, en: translations.en.trust.title } },
  { key: 'trust_1_title', content: { uz: translations.uz.trust.d1, ru: translations.ru.trust.d1, en: translations.en.trust.d1 } },
  { key: 'trust_1_desc', content: { uz: translations.uz.trust.d1s, ru: translations.ru.trust.d1s, en: translations.en.trust.d1s } },
  { key: 'trust_2_title', content: { uz: translations.uz.trust.d2, ru: translations.ru.trust.d2, en: translations.en.trust.d2 } },
  { key: 'trust_2_desc', content: { uz: translations.uz.trust.d2s, ru: translations.ru.trust.d2s, en: translations.en.trust.d2s } },
  { key: 'trust_3_title', content: { uz: translations.uz.trust.d3, ru: translations.ru.trust.d3, en: translations.en.trust.d3 } },
  { key: 'trust_3_desc', content: { uz: translations.uz.trust.d3s, ru: translations.ru.trust.d3s, en: translations.en.trust.d3s } },
  { key: 'trust_4_title', content: { uz: translations.uz.trust.d4, ru: translations.ru.trust.d4, en: translations.en.trust.d4 } },
  { key: 'trust_4_desc', content: { uz: translations.uz.trust.d4s, ru: translations.ru.trust.d4s, en: translations.en.trust.d4s } },

  // About
  { key: 'about_tagline', content: { uz: translations.uz.about.tagline, ru: translations.ru.about.tagline, en: translations.en.about.tagline } },
  { key: 'about_title', content: { uz: translations.uz.about.title, ru: translations.ru.about.title, en: translations.en.about.title } },
  { key: 'about_summary', content: { uz: translations.uz.about.summary, ru: translations.ru.about.summary, en: translations.en.about.summary } },
  { key: 'about_story_title', content: { uz: translations.uz.about.storyTitle, ru: translations.ru.about.storyTitle, en: translations.en.about.storyTitle } },
  { key: 'about_story_text', content: { uz: translations.uz.about.storyText, ru: translations.ru.about.storyText, en: translations.en.about.storyText } },
  { key: 'about_v1_title', content: { uz: translations.uz.about.v1t, ru: translations.ru.about.v1t, en: translations.en.about.v1t } },
  { key: 'about_v1_text', content: { uz: translations.uz.about.v1d, ru: translations.ru.about.v1d, en: translations.en.about.v1d } },
  { key: 'about_v2_title', content: { uz: translations.uz.about.v2t, ru: translations.ru.about.v2t, en: translations.en.about.v2t } },
  { key: 'about_v2_text', content: { uz: translations.uz.about.v2d, ru: translations.ru.about.v2d, en: translations.en.about.v2d } },
  { key: 'about_v3_title', content: { uz: translations.uz.about.v3t, ru: translations.ru.about.v3t, en: translations.en.about.v3t } },
  { key: 'about_v3_text', content: { uz: translations.uz.about.v3d, ru: translations.ru.about.v3d, en: translations.en.about.v3d } },
  { key: 'about_cta_title', content: { uz: translations.uz.about.ctaT, ru: translations.ru.about.ctaT, en: translations.en.about.ctaT } },
  { key: 'about_cta_text', content: { uz: translations.uz.about.ctaD, ru: translations.ru.about.ctaD, en: translations.en.about.ctaD } },

  // Footer
  { key: 'footer_desc', content: { uz: translations.uz.footer.desc, ru: translations.ru.footer.desc, en: translations.en.footer.desc } },
  { key: 'footer_address', content: { uz: translations.uz.footer.address, ru: translations.ru.footer.address, en: translations.en.footer.address } },
  { key: 'footer_work_hours', content: { uz: translations.uz.footer.work, ru: translations.ru.footer.work, en: translations.en.footer.work } },

  // Images (Premium Habfer/Jieti Style)
  { key: 'about_image', content: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" },
  { key: 'about_story_image', content: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" },
  { key: 'insta_img_1', content: "https://images.unsplash.com/photo-1558444479-c8a51bc730f0?q=80&w=800&auto=format&fit=crop" },
  { key: 'insta_img_2', content: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" },
  { key: 'insta_img_3', content: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=800&auto=format&fit=crop" },
  { key: 'insta_img_4', content: "https://images.unsplash.com/photo-1550966849-219744c8b671?q=80&w=800&auto=format&fit=crop" },
  { key: 'insta_img_5', content: "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?q=80&w=800&auto=format&fit=crop" },
  { key: 'insta_img_6', content: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop" }
];

async function migrate() {
  console.log("Migration started...");
  for (const item of mapping) {
    const { error } = await supabase.from('site_content').upsert(item, { onConflict: 'key' });
    if (error) {
      console.error(`Error upserting ${item.key}:`, error.message);
    } else {
      console.log(`Successfully migrated: ${item.key}`);
    }
  }
  console.log("Migration finished!");
}

migrate();
function alert(arg0: string) {
    throw new Error('Function not implemented.');
}

