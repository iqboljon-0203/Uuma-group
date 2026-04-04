"use client";

import { useParams, useRouter } from "next/navigation";
import { products, formatPrice } from "@/data/products";
import { useLang } from "@/store/lang-context";
import { useCart } from "@/store/cart-context";
import { useToast } from "@/store/toast-context";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import StickyBottomBar from "@/components/StickyBottomBar";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import RecentlyViewedList from "@/components/RecentlyViewedList";
import { useRecentlyViewed } from "@/store/recently-viewed";

import { supabase } from "@/lib/supabase";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { lang, t } = useLang();
  const { addItem } = useCart();
  const { show } = useToast();
  const { addToRecent } = useRecentlyViewed();
  
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function loadProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (data) {
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || "");
        addToRecent(data);

        // Fetch related
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', data.category_id)
          .neq('id', data.id)
          .limit(4);
        setRelatedProducts(related || []);
      }
      setLoading(false);
    }
    loadProduct();
  }, [slug]);

  if (loading) return <div className="h-screen bg-cream" />;

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-cream">
        <h1 className="text-2xl font-bold mb-4">Mahsulot topilmadi</h1>
        <Link href="/catalog" className="text-burgundy font-bold underline">Katalogga qaytish</Link>
      </div>
    );
  }

  const getDisplayPrice = () => {
    if (!product) return 0;
    let basePrice = product.price;
    if (selectedSize === "M") basePrice += 10000; // M o'lcham uchun +10,000
    if (selectedSize === "L") basePrice += 20000; // L o'lcham uchun +20,000
    return basePrice;
  };

  const getTranslated = (val: any) => {
    if (!val) return "";
    if (typeof val === 'object') return val[lang] || val.uz || "";
    if (typeof val === 'string' && val.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(val);
        return parsed[lang] || parsed.uz || "";
      } catch (e) {
        return val;
      }
    }
    return val;
  };

  const translatedName = getTranslated(product.name);

  const handleAddToCart = () => {
    const finalPrice = getDisplayPrice();
    addItem({ ...product, price: finalPrice, volume: selectedSize });
    show(`${translatedName} ${t.product.added}!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            <Link href="/" className="hover:text-burgundy transition-colors">Bosh sahifa</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-burgundy transition-colors">{t.nav.catalog}</Link>
            <span>/</span>
            <span className="text-burgundy">{translatedName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-burgundy/5 border border-gray-100 flex items-center justify-center p-12"
            >
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={translatedName}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {/* Badges */}
              {product.badge && (
                <div className="absolute top-8 left-8">
                   <span className="px-4 py-2 bg-burgundy text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                     {(t.product.badges as any)[product.badge ?? ""] || product.badge}
                   </span>
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-8">
                <span className="text-sm font-bold text-burgundy uppercase tracking-[0.2em] mb-3 block">
                  {product.brand}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                  {translatedName}
                </h1>
                <div className="flex items-center gap-4">
                  <motion.span 
                    key={selectedSize}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl font-bold text-gray-900"
                  >
                    {formatPrice(getDisplayPrice(), t.cart.currency)}
                  </motion.span>
                  <div className="h-6 w-[1px] bg-gray-200" />
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                    {(t.categories as any)[product.category]}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-burgundy/20 pl-6 py-2">
                  {getTranslated(product.description)}
                </p>
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-10">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">
                    O'lcham / Hanjm
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[80px] px-6 py-4 rounded-2xl text-sm font-bold border-2 transition-all ${
                          selectedSize === size
                            ? "border-burgundy bg-burgundy/5 text-burgundy shadow-lg shadow-burgundy/10"
                            : "border-gray-100 bg-white text-gray-500 hover:border-burgundy/30 cursor-pointer"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-burgundy text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-burgundy/20 hover:bg-burgundy-dark transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                >
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {t.product.addToCart}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-32">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {t.product.related}
                </h2>
                <Link href="/catalog" className="text-burgundy font-bold text-sm uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  {t.catalog.showroom} <span className="text-xl">→</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          <RecentlyViewedList excludeId={product.id} />
        </div>
      </main>

      <Footer />
      <Toast />
      <StickyBottomBar />
    </div>
  );
}
