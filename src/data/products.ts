export interface Product {
  id: number;
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
}

export const products: Product[] = [
  {
    id: 1,
    name: "Universal Gel 4L",
    brand: "Habfer",
    category: "liquid",
    volume: "4L",
    price: 89000,
    image: "/habfer-gel-4l.png",
    tier: "premium",
    badge: "Premium",
    featured: true,
    sizes: ["4L"],
  },
  {
    id: 2,
    name: "Belizna: Oqartiruvchi",
    brand: "Habfer",
    category: "liquid",
    volume: "1L",
    price: 35000,
    image: "/belizna.jpg",
    tier: "standard",
    badge: "Xit sotuv",
    featured: true,
    sizes: ["1L"],
  },
  {
    id: 3,
    name: "Scent Booster: Fruity",
    brand: "Jieti",
    category: "capsules",
    volume: "220g",
    price: 65000,
    image: "/jieti-green.png",
    tier: "premium",
    badge: "Eng xushbo'y",
    featured: true,
    sizes: ["220g"],
  },
  {
    id: 4,
    name: "Suyuq sovun: Dengiz",
    brand: "Habfer",
    category: "liquid",
    volume: "1L",
    price: 28000,
    image: "/habfer-soap.png",
    tier: "standard",
    badge: "Yangi",
    featured: true,
    sizes: ["1L"],
  },
  {
    id: 5,
    name: "Scent Booster: Cherry Rose",
    brand: "Jieti",
    category: "capsules",
    volume: "220g",
    price: 65000,
    image: "/jieti-pink.jpg",
    tier: "premium",
    featured: true,
    sizes: ["220g"],
  },
  {
    id: 6,
    name: "Laundry Pods: Sea Scent",
    brand: "Jieti",
    category: "capsules",
    volume: "8X",
    price: 45000,
    image: "/pods-blue.png",
    tier: "standard",
    featured: true,
    sizes: ["8X"],
  },
  {
    id: 7,
    name: "Premium Saqlash Savati",
    brand: "Uuma",
    category: "household",
    volume: "L o'lcham",
    price: 48000,
    image: "/basket-real.jpg",
    tier: "standard",
    badge: "Yangi",
    featured: true,
    sizes: ["S", "M", "L"],
  },
  {
    id: 8,
    name: "Laundry Pods: Freesia",
    brand: "Jieti",
    category: "capsules",
    volume: "8X",
    price: 45000,
    image: "/pods-pink.jpg",
    tier: "standard",
    featured: true,
    sizes: ["8X"],
  },
  {
    id: 9,
    name: "Scent Booster: Lavender",
    brand: "Jieti",
    category: "capsules",
    volume: "220g",
    price: 65000,
    image: "/jieti-purple.jpg",
    tier: "premium",
    featured: true,
    sizes: ["220g"],
  },
  {
    id: 10,
    name: "Scent Booster: West Coast",
    brand: "Jieti",
    category: "capsules",
    volume: "220g",
    price: 65000,
    image: "/jieti-blue.jpg",
    tier: "premium",
    featured: false,
    sizes: ["220g"],
  },
];

export const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
};
