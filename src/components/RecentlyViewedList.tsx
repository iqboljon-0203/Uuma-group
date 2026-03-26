"use client";

import { useRecentlyViewed } from "@/store/recently-viewed";
import { useLang } from "@/store/lang-context";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

/**
 * RecentlyViewedList component displays products the user recently looked at.
 */
export default function RecentlyViewedList({ excludeId }: { excludeId?: number }) {
  const { recentProducts } = useRecentlyViewed();
  const { t } = useLang();

  // Filter out current product and limit to 4
  const filtered = recentProducts
    .filter((p) => p.id !== excludeId)
    .slice(0, 4);

  if (filtered.length === 0) return null;

  return (
    <div className="mt-32">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {t.product.recent}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
