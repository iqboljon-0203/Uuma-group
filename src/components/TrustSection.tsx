"use client";

import { motion } from "framer-motion";
import { useLang } from "@/store/lang-context";
import { getSiteContent } from "@/lib/db";
import { useEffect, useState } from "react";

export default function TrustSection() {
  const { t, lang } = useLang();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getSiteContent(['trust_1_title', 'trust_1_desc', 'trust_2_title', 'trust_2_desc', 'trust_3_title', 'trust_3_desc', 'trust_4_title', 'trust_4_desc']).then(data => {
      setContent(data);
    });
  }, []);

  const d = (key: string, staticText: string) => content?.[key]?.[lang] || staticText;
  
  const items = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: d('trust_1_title', t.trust.delivery),
      desc: d('trust_1_desc', t.trust.deliveryDesc),
      color: "bg-blue-500/10",
      iconColor: "text-blue-600"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: d('trust_2_title', t.trust.guarantee),
      desc: d('trust_2_desc', t.trust.guaranteeDesc),
      color: "bg-emerald-500/10",
      iconColor: "text-emerald-600"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
      title: d('trust_3_title', t.trust.support),
      desc: d('trust_3_desc', t.trust.supportDesc),
      color: "bg-purple-500/10",
      iconColor: "text-purple-600"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: d('trust_4_title', t.trust.premium),
      desc: d('trust_4_desc', t.trust.premiumDesc),
      color: "bg-orange-500/10",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-burgundy font-bold uppercase tracking-widest text-[11px] mb-4 block"
          >
            {t.trust.tagline}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            {t.trust.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="w-full"
            >
              {i === 2 ? (
                <a 
                  href="https://t.me/Ibrohim_Mobilograf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/20 transition-all flex flex-col items-center text-center group h-full cursor-pointer hover:border-burgundy/10"
                >
                  <div className={`w-16 h-16 ${item.color} ${item.iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </a>
              ) : (
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/20 transition-all flex flex-col items-center text-center group h-full">
                  <div className={`w-16 h-16 ${item.color} ${item.iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
