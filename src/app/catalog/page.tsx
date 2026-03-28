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
  const { t, lang } = useLang();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "all", label: t.catalog.all },
    { id: "liquid", label: t.categories.liquid },
    { id: "capsules", label: t.categories.capsules },
    { id: "household", label: t.categories.household },
  ];

  const brands = ["all", ...Array.from(new Set(products.map((p) => p.brand)))];

  const sortOptions = [
    { id: "newest", label: t.catalog.sort.newest },
    { id: "price-low", label: t.catalog.sort.priceLow },
    { id: "price-high", label: t.catalog.sort.priceHigh },
  ];

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let result = [...products];
      
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        result = result.filter((p) => 
          p.name.toLowerCase().includes(q) || 
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      
      result.sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "newest":
          default:
            return b.id - a.id;
        }
      });

      setFilteredProducts(result);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24 bg-cream overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col gap-12 mb-16">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-2">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-burgundy font-bold uppercase tracking-widest text-[11px] block"
                >
                  {t.catalog.showroom}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
                >
                  {t.catalog.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400 font-medium text-sm"
                >
                  {filteredProducts.length} {t.catalog.resultsLabel}
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-2xl">
                {/* Search */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative flex-grow group"
                >
                  <input
                    type="text"
                    placeholder={t.catalog.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border-2 border-transparent focus:border-burgundy/20 focus:bg-white rounded-3xl px-12 py-5 text-sm font-medium outline-none transition-all shadow-xl shadow-gray-200/40"
                  />
                  <svg 
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-burgundy transition-colors" 
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  >
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  
                  {/* Suggestions Popover */}
                  <AnimatePresence>
                    {searchQuery.length > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-3 z-50 overflow-hidden"
                      >
                        <div className="max-h-[360px] overflow-y-auto no-scrollbar">
                          {products
                            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
                            .slice(0, 6)
                            .map((p) => (
                              <Link
                                key={p.id}
                                href={`/product/${p.slug}`}
                                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-burgundy/5 transition-all group/item"
                              >
                                <div className="relative w-14 h-14 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                  <Image src={p.image} alt={p.name} fill className="object-contain p-2 transition-transform duration-500 group-hover/item:scale-110" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-bold text-burgundy uppercase tracking-widest">{p.brand}</span>
                                  <span className="text-sm font-bold text-gray-900 group-hover/item:text-burgundy transition-colors line-clamp-1">
                                    {p.name}
                                  </span>
                                  <span className="text-[11px] text-gray-400 font-medium">UZS {p.price.toLocaleString()}</span>
                                </div>
                              </Link>
                            ))}
                          {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <div className="py-8 text-center">
                              <p className="text-gray-400 text-sm font-medium">{t.catalog.empty}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Custom Sort Dropdown */}
                <div className="relative w-full sm:w-64">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full flex items-center justify-between bg-white border-2 border-transparent focus:border-burgundy/10 rounded-3xl px-8 py-5 text-sm font-bold outline-none transition-all shadow-xl shadow-gray-200/40 cursor-pointer group"
                  >
                    <span className="text-gray-900 group-hover:text-burgundy transition-colors">
                      {sortOptions.find(o => o.id === sortBy)?.label}
                    </span>
                    <motion.div
                      animate={{ rotate: isSortOpen ? 180 : 0 }}
                      className="text-gray-400 group-hover:text-burgundy transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setIsSortOpen(false)}
                          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-50 overflow-hidden"
                        >
                          <div className="flex flex-col gap-1">
                            {sortOptions.map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  setSortBy(opt.id);
                                  setIsSortOpen(false);
                                }}
                                className={`flex items-center justify-between w-full px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                                  sortBy === opt.id
                                    ? "bg-burgundy text-white shadow-xl shadow-burgundy/20"
                                    : "text-gray-600 hover:bg-burgundy/5 hover:text-burgundy"
                                }`}
                              >
                                {opt.label}
                                {sortBy === opt.id && (
                                  <motion.div layoutId="sort-active" className="w-1.5 h-1.5 bg-white rounded-full" />
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
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
