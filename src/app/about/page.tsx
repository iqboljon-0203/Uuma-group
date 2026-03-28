"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/store/lang-context";
import Logo from "@/components/Logo";

export default function AboutPage() {
  const { t } = useLang();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-cream overflow-hidden">
        {/* Hero Section - Full Height */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-products.png"
              alt="Premium Household Chemistry"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-burgundy/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-burgundy/80 via-burgundy/20 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-[800px]"
            >
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gold font-extrabold uppercase tracking-[0.4em] text-[12px] mb-6 block"
              >
                {t.about.tagline}
              </motion.span>
              <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-[0.9] mb-12">
                {t.about.title}
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <div className="w-20 h-px bg-gold/50" />
                <span className="text-white/80 font-medium tracking-widest uppercase text-xs italic">Sifatning yangi darajasi</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold vertical-text">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent" />
          </motion.div>
        </section>

        {/* Dynamic Spacing */}
        <div className="py-24" />

        {/* Story Section */}
        <section className="max-w-[1280px] mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
                {t.about.storyTitle}
              </h2>
              <div className="space-y-6 text-lg text-gray-500 leading-relaxed font-medium">
                {t.about.storyText.split('. ').map((sentence: string, i: number) => (
                  <p key={i}>{sentence}.</p>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/category-liquids.png"
                alt="Our Laboratory"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-burgundy/10" />
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white py-32 mb-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Bizning qadriyatlarimiz</h2>
              <div className="w-24 h-1 bg-burgundy mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {t.about.values.map((v: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-cream p-10 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-burgundy shadow-sm mb-8">
                    {i === 0 ? (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : i === 1 ? (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{v.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{v.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Promise */}
        <section className="max-w-[960px] mx-auto px-6 text-center pb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Logo className="w-full h-full scale-[2] text-white rotate-12" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 relative z-10">
              Sizning baxtingiz — bizning maqsadimiz
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-12 relative z-10">
              Biz har bir mahsulotni yaratishda eng yuqori sifat va xavfsizlik talablariga tayanamiz. Uuma Group bilan uyingiz har doim ideal ko'rinishda bo'ladi.
            </p>
            <Link 
              href="/catalog"
              className="inline-block bg-gold text-gray-900 font-bold px-12 py-5 rounded-2xl hover:bg-white transition-colors relative z-10"
            >
              Katalogni ko'rish
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
