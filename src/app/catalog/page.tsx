"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import StickyBottomBar from "@/components/StickyBottomBar";
import { CartProvider } from "@/store/cart-context";
import { ToastProvider } from "@/store/toast-context";

import { useLang } from "@/store/lang-context";
import RecentlyViewedList from "@/components/RecentlyViewedList";

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-cream" />}>
      <CatalogContent />
    </Suspense>
  );
}

import ProductSkeleton from "@/components/ProductSkeleton";

function CatalogContent() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  
  const [filter, setFilter] = useState(initialType);
  const [brandFilter, setBrandFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "all", label: t.catalog.all },
    { id: "liquid", label: t.categories.liquid },
    { id: "capsules", label: t.categories.capsules },
    { id: "household", label: t.categories.household },
  ];

  // Extract unique brands
  const brands = ["all", ...Array.from(new Set(products.map((p) => p.brand)))];

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let result = [...products];
      if (filter !== "all") {
        result = result.filter((p) => p.category === filter);
      }
      if (brandFilter !== "all") {
        result = result.filter((p) => p.brand === brandFilter);
      }

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        result = result.filter((p) => 
          p.name.toLowerCase().includes(q) || 
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      
      // Sort premium first
      result.sort((a, b) => {
        if (a.tier === "premium" && b.tier !== "premium") return -1;
        if (a.tier !== "premium" && b.tier === "premium") return 1;
        return 0;
      });

      setFilteredProducts(result);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [filter, brandFilter, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24 bg-cream overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-burgundy font-semibold uppercase tracking-widest text-xs mb-4 block"
              >
                {t.catalog.showroom}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
              >
                {t.catalog.title}
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full md:w-80 group"
            >
              <input
                type="text"
                placeholder={t.catalog.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-gray-100 focus:border-burgundy rounded-2xl px-12 py-4 text-sm font-medium outline-none transition-all shadow-lg shadow-gray-200/50"
              />
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-burgundy transition-colors" 
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchQuery.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 overflow-hidden"
                  >
                    {products
                      .filter(p => 
                        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-burgundy/5 transition-colors group/item"
                        >
                          <div className="relative w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-burgundy uppercase tracking-wider">{p.brand}</span>
                            <span className="text-sm font-semibold text-gray-900 group-hover/item:text-burgundy transition-colors line-clamp-1">
                              {p.id === 2 ? t.product.names.belizna : 
                               p.id === 4 ? t.product.names.soap : 
                               p.id === 7 ? t.product.names.basket : 
                               p.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                    {products.filter(p => 
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="p-4 text-center text-gray-400 text-sm italic">
                        {t.catalog.empty}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="space-y-4 mb-12">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 no-scrollbar">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setFilter(cat.id)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                    filter === cat.id
                      ? "bg-burgundy text-white border-burgundy shadow-xl shadow-burgundy/20"
                      : "bg-white text-gray-500 hover:text-burgundy border-gray-100 hover:border-burgundy/30"
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Brand Filters */}
            <div className="flex flex-wrap gap-2 no-scrollbar">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 self-center mr-2">
                {t.catalog.brands}:
              </span>
              {brands.map((brand, i) => (
                <motion.button
                  key={brand}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setBrandFilter(brand)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    brandFilter === brand
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-400 border-gray-100 hover:text-gray-900 hover:border-gray-200"
                  }`}
                >
                  {brand === "all" ? t.catalog.all : brand}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="contents"
                >
                  {[...Array(8)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </motion.div>
              ) : filteredProducts.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="contents"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <p className="text-gray-400 font-medium">{t.catalog.empty}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <RecentlyViewedList />
        </div>
      </main>
      <Footer />
      <Toast />
      <StickyBottomBar />
    </div>
  );
}
