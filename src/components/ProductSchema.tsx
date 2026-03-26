"use client";

import { Product, formatPrice } from "@/data/products";

interface ProductSchemaProps {
  product: Product;
  currency: string;
}

/**
 * ProductSchema component injects JSON-LD structured data for a specific product.
 * This helps search engines understand product details for rich snippets.
 */
export default function ProductSchema({ product, currency }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
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
