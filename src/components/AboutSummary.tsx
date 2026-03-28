"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/store/lang-context";

export default function AboutSummary() {
  const { t } = useLang();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Visual Element */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl"
            >
              <Image
                src="/about-summary.png"
                alt="Uuma Group Premium Products"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
            
            {/* Background Decorative Element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-burgundy/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gold/5 rounded-full blur-3xl -z-10" />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-burgundy font-bold uppercase tracking-widest text-[11px] mb-4 block"
            >
              {t.about.tagline}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8"
            >
              {t.about.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg leading-relaxed mb-10"
            >
              {t.about.storyText.slice(0, 200)}...
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/about"
                className="w-full sm:w-auto px-10 py-5 bg-burgundy text-white rounded-3xl font-bold text-sm shadow-xl shadow-burgundy/20 hover:bg-burgundy-dark hover:scale-105 transition-all text-center inline-block"
              >
                Batafsil ma'lumot
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
