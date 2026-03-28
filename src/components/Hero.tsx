"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

import { useLang } from "@/store/lang-context";

export default function Hero() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const stats = [
    { num: "50+", label: t.hero.stats.products },
    { num: "10K+", label: t.hero.stats.customers },
    { num: "100%", label: t.hero.stats.quality },
  ];

  return (
    <section ref={ref} className="relative min-h-[95vh] flex items-center overflow-hidden bg-cream">
      {/* Background with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src="/hero-lifestyle.png"
          alt="Premium maishiy kimyo"
          fill
          className="object-cover"
          id="hero-bg-img"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-burgundy/90 via-burgundy/70 to-burgundy/10" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 md:pt-40 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity }}
          className="max-w-[720px]"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-cream text-[11px] font-bold uppercase tracking-widest backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 bg-gold border border-gold/50 rounded-full animate-pulse glow-gold" />
            {t.hero.tagline}
          </motion.div>

          <h1 className="flex flex-col gap-4 mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-gold drop-shadow-2xl"
            >
              {t.hero.title}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-light text-gold-light tracking-wide shimmer-text"
            >
              {t.hero.subtitle}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-[560px] mb-12 font-medium"
          >
            {t.hero.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link
              href="/catalog"
              className="btn--lg bg-burgundy hover:bg-burgundy-dark text-white rounded-xl font-bold flex items-center gap-3 px-8 py-5 shadow-2xl shadow-burgundy/40 group transition-all"
            >
              {t.hero.cta}
              <motion.svg
                whileHover={{ x: 5 }}
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-24 flex items-center gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {stat.num}
              </span>
              <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Particles */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [0, -100],
              x: [0, Math.random() * 50 - 25]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 2
            }}
            className="particle w-1.5 h-1.5 bg-gold/30 blur-[1px]"
            style={{
              left: `${15 + i * 15}%`,
              bottom: "-5%"
            }}
          />
        ))}
      </div>
    </section>
  );
}
