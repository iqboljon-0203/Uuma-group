export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: "liquid" | "capsules" | "household";
  volume: string;
  price: number;
  image: string;
  tier: "premium" | "standard";
  badge?: string;
  featured: boolean;
  sizes: string[];
  desc?: {
    uz: string;
    ru: string;
    en: string;
  }
}

export const products: Product[] = [
  {
    id: 1,
    slug: "habfer-universal-gel-4l",
    name: "Universal Gel 4L",
    brand: "Habfer",
    category: "liquid",
    volume: "4L",
    price: 89000,
    image: "/habfer-gel-4l.png",
    tier: "premium",
    badge: "premium",
    featured: true,
    sizes: ["4L"],
    desc: {
      uz: "Habfer Universal Gel - har qanday turdagi matolar uchun professional tozalik. Chuqur kiruvchi formulasi hatto eng qiyin dog'larni ham oson ketkazadi.",
      ru: "Универсальный гель Habfer - профессиональная чистота для всех типов тканей. Формула глубокого проникновения легко удаляет даже самые стойкие пятна.",
      en: "Habfer Universal Gel - professional cleanliness for all types of fabrics. Its deep-penetrating formula easily removes even the toughest stains."
    }
  },
  {
    id: 2,
    slug: "habfer-belizna-oqartiruvchi",
    name: "Belizna: Oqartiruvchi",
    brand: "Habfer",
    category: "liquid",
    volume: "1L",
    price: 35000,
    image: "/belizna.jpg",
    tier: "standard",
    badge: "bestSeller",
    featured: true,
    sizes: ["1L"],
    desc: {
      uz: "Belizna oqartiruvchisi - kiyimlaringizga oppoq rang va gigienik tozalik beradi. Ranglarni saqlagan holda matoni dezinfektsiya qiladi.",
      ru: "Отбеливатель Белизна - дарит вашим вещам белоснежный цвет и гигиеническую чистоту. Дезинфицирует ткань, сохраняя волокна.",
      en: "Bleach Belizna - gives your clothes a snow-white color and hygienic purity. Disinfects the fabric while preserving the fibers."
    }
  },
  {
    id: 3,
    slug: "jieti-scent-booster-fruity",
    name: "Scent Booster: Fruity",
    brand: "Jieti",
    category: "capsules",
    volume: "220g",
    price: 65000,
    image: "/jieti-green.png",
    tier: "premium",
    badge: "scented",
    featured: true,
    sizes: ["220g"],
    desc: {
      uz: "Jieti Scent Booster - meva ifori bilan uyingizni to'ldiring. Uzoq muddatli xushbo'y hid va kiyimlar uchun maxsus yumshoqlik.",
      ru: "Ароматизатор Jieti - наполните дом фруктовым ароматом. Длительная свежесть и особая мягкость для вашей одежды.",
      en: "Jieti Scent Booster - fill your home with a fruity aroma. Long-lasting freshness and special softness for your clothes."
    }
  },
  {
    id: 4,
    slug: "habfer-suyuq-sovun-dengiz",
    name: "Suyuq sovun: Dengiz",
    brand: "Habfer",
    category: "liquid",
    volume: "1L",
    price: 28000,
    image: "/habfer-soap.png",
    tier: "standard",
    badge: "new",
    featured: true,
    sizes: ["1L"],
    desc: {
      uz: "Habfer Suyuq sovuni - nozik terilar uchun maxsus formula. Dengiz ifori va mukammal namlantirish xususiyatiga ega.",
      ru: "Жидкое мыло Habfer - специальная формула для чувствительной кожи. Морской аромат и отличное увлажнение.",
      en: "Habfer Liquid Soap - special formula for sensitive skin. Sea breeze fragrance and excellent moisturizing properties."
    }
  },
  {
    id: 5,
    slug: "jieti-scent-booster-cherry-rose",
    name: "Scent Booster: Cherry Rose",
    brand: "Jieti",
    category: "capsules",
    volume: "220g",
    price: 65000,
    image: "/jieti-pink.jpg",
    tier: "premium",
    featured: true,
    sizes: ["220g"],
    desc: {
      uz: "Gilos va atirgul iforli xushbo'ylantirgich. Kiyimlarga go'zal gullar iforini beradi va uzoq vaqt saqlanadi.",
      ru: "Ароматизатор с ароматом вишни и розы. Придает одежде прекрасный цветочный аромат, который сохраняется надолго.",
      en: "Cherry Rose scented booster. Gives clothes a beautiful floral scent that lasts for a long time."
    }
  },
  {
    id: 7,
    slug: "uuma-premium-saqlash-savati",
    name: "Premium Saqlash Savati",
    brand: "Uuma",
    category: "household",
    volume: "L o'lcham",
    price: 48000,
    image: "/basket-real.jpg",
    tier: "standard",
    badge: "new",
    featured: true,
    sizes: ["S", "M", "L"],
    desc: {
      uz: "Uuma Premium saqlash savati - uyingizdagi tartib uchun ideal yordamchi. Yuqori sifatli material va zamonaviy dizayn.",
      ru: "Корзина для хранения Uuma Premium - идеальный помощник для порядка в доме. Высококачественный материал и современный дизайн.",
      en: "Uuma Premium storage basket - an ideal assistant for order in your home. High-quality material and modern design."
    }
  },
];

export const formatPrice = (price: number, currency: string = "so'm"): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + currency;
};
