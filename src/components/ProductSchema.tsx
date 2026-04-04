"use client";

import { Product, formatPrice } from "@/data/products";

interface ProductSchemaProps {
  product: Product;
  currency: string;
}

import { useLang } from "@/store/lang-context";

/**
 * ProductSchema component injects JSON-LD structured data for a specific product.
 * This helps search engines understand product details for rich snippets.
 */
export default function ProductSchema({ product, currency }: ProductSchemaProps) {
  const { lang } = useLang();
  const name = typeof product.name === 'string' ? product.name : (product.name as any)?.[lang] || (product.name as any)?.uz || "";
  
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "image": [
      `https://uuma.uz${product.image}`,
    ],
    "description": `${product.brand} - ${product.category} products for professional cleaning. ${product.volume}.`,
    "sku": `UUMA-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://uuma.uz/catalog`,
      "priceCurrency": currency === "so'm" ? "UZS" : (currency === "сум" ? "UZS" : "UZS"),
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Uuma Group"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
