"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Product } from "@/data/products";

interface RecentlyViewedContextType {
  recentProducts: Product[];
  addToRecent: (product: Product) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

/**
 * RecentlyViewedProvider manages the user's browsing history in localStorage.
 * It tracks the last 10 products viewed by the user.
 */
export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("uuma_recent_products");
    if (saved) {
      try {
        setRecentProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load recent products", e);
      }
    }
  }, []);

  const addToRecent = useCallback((product: Product) => {
    setRecentProducts((prev) => {
      // Remove if already exists and add to front
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 10);
      localStorage.setItem("uuma_recent_products", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ recentProducts, addToRecent }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return context;
}
