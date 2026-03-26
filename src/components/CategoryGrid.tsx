"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useLang } from "@/store/lang-context";

export default function CategoryGrid() {
  const { t } = useLang();
  
  const categories = [
    {
      id: "liquid",
      name: t.categories.liquid,
      desc: t.categories.liquidDesc,
      img: "/category-liquids.png",
    },
    {
      id: "capsules",
      name: t.categories.capsules,
      desc: t.categories.capsulesDesc,
      img: "/category-capsules.png",
    },
    {
      id: "household",
      name: t.categories.household,
      desc: t.categories.householdDesc,
      img: "/category-household.png",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-cream">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-burgundy/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-gold/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-burgundy font-semibold uppercase tracking-widest text-xs mb-4 block"
          >
            {t.categories.tagline}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            {t.categories.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative cursor-pointer"
            >
              <Link href={`/catalog?type=${cat.id}`}>
                <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/95 via-burgundy/30 to-transparent transition-all group-hover:via-burgundy/40" />
                  
                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-[240px]">
                      {cat.desc}
                    </p>
                    
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="mt-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors group-hover:bg-gold group-hover:border-gold group-hover:text-burgundy"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
