"use client";

import { motion } from "framer-motion";

import { useLang } from "@/store/lang-context";

export default function TrustSection() {
  const { t } = useLang();
  
  const items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" className="fill-burgundy/20" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: t.trust.delivery,
      desc: t.trust.deliveryDesc,
      color: "bg-blue-500/10",
      iconColor: "text-blue-600"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="10" className="fill-burgundy/20" />
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: t.trust.guarantee,
      desc: t.trust.guaranteeDesc,
      color: "bg-emerald-500/10",
      iconColor: "text-emerald-600"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <rect x="3" y="4" width="18" height="16" rx="2" className="fill-burgundy/20" />
          <path d="M12 17L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="7" r="1" fill="currentColor" />
          <path d="M3 4H21V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V4Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: t.trust.support,
      desc: t.trust.supportDesc,
      color: "bg-purple-500/10",
      iconColor: "text-purple-600"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2L15 8H22L17 13L19 20L12 16L5 20L7 13L2 8H9L12 2Z" className="fill-burgundy/20" />
          <path d="M12 2L15 8H22L17 13L19 20L12 16L5 20L7 13L2 8H9L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: t.trust.premium,
      desc: t.trust.premiumDesc,
      color: "bg-amber-500/10",
      iconColor: "text-amber-600"
    },
  ];

  return (
    <section className="py-32 bg-cream overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-burgundy/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-bold text-burgundy uppercase tracking-[0.2em] mb-4 block">{t.trust.tagline}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{t.trust.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative p-8 md:p-10 bg-white rounded-[32px] text-center shadow-xl shadow-gray-200/40 border border-gray-100/50 hover:shadow-2xl hover:shadow-burgundy/5 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-burgundy/0 group-hover:bg-burgundy/10 transition-all rounded-t-full" />
              
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                className={`w-16 h-16 md:w-20 md:h-20 ${item.color} rounded-2xl flex items-center justify-center ${item.iconColor} mx-auto mb-8 relative transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-white/40 blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-8 h-8 md:w-10 md:h-10 relative z-10">{item.icon}</div>
              </motion.div>

              <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-3 tracking-tight group-hover:text-burgundy transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed px-4">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
