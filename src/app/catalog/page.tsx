"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import StickyBottomBar from "@/components/StickyBottomBar";
import { CartProvider } from "@/store/cart-context";
import { ToastProvider } from "@/store/toast-context";

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-cream" />}>
      <CatalogContent />
    </Suspense>
  );
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  
  const [filter, setFilter] = useState(initialType);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const categories = [
    { id: "all", label: "Barchasi" },
    { id: "liquid", label: "Suyuq mahsulotlar" },
    { id: "capsules", label: "Kapsula va granulalar" },
    { id: "household", label: "Ro'zg'or buyumlari" },
  ];

  useEffect(() => {
    let result = [...products];
    if (filter !== "all") {
      result = result.filter((p) => p.category === filter);
    }
    
    // Sort premium first
    result.sort((a, b) => {
      if (a.tier === "premium" && b.tier !== "premium") return -1;
      if (a.tier !== "premium" && b.tier === "premium") return 1;
      return 0;
    });

    setFilteredProducts(result);
  }, [filter]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24 bg-cream">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-12">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-burgundy font-semibold uppercase tracking-widest text-xs mb-4 block"
            >
              Showroom
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            >
              Mahsulotlar katalogi
            </motion.h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-200/50 pb-8 no-scrollbar">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat.id
                    ? "bg-burgundy text-white shadow-xl shadow-burgundy/20"
                    : "bg-white text-gray-500 hover:text-burgundy hover:bg-burgundy/5 border border-gray-200/50"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <Footer />
      <Toast />
      <StickyBottomBar />
    </div>
  );
}
