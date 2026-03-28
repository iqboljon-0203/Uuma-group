"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/store/lang-context";
import { getFAQ } from "@/lib/db";
import { useEffect, useState } from "react";

export default function FAQSection() {
  const { t, lang } = useLang();
  const [items, setItems] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    getFAQ().then(data => {
      setItems(data || []);
    });
  }, []);

  const faqItems = items.length > 0 ? items : t.faq.items;

  return (
    <section id="faq" className="py-24 bg-cream scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-burgundy font-bold uppercase tracking-widest text-[11px] mb-4 block"
            >
              {t.faq.tagline}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8"
            >
              {t.faq.title}
            </motion.h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const q = typeof item.question === 'string' ? item.question : item.question?.[lang] || item.q;
              const a = typeof item.answer === 'string' ? item.answer : item.answer?.[lang] || item.a;
              
              if (!q) return null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all duration-500 ${
                    isOpen ? "border-burgundy/20 shadow-xl shadow-burgundy/5" : "border-gray-100 hover:border-burgundy/10"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <span className={`text-lg font-bold transition-colors duration-300 ${
                      isOpen ? "text-burgundy" : "text-gray-900 group-hover:text-burgundy"
                    }`}>
                      {q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className={`p-2 rounded-xl transition-colors duration-300 ${
                        isOpen ? "bg-burgundy text-white" : "bg-gray-50 text-gray-400 group-hover:bg-burgundy/10 group-hover:text-burgundy"
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-8 pb-8 pt-2">
                          <p className="text-gray-500 leading-relaxed font-medium">
                            {a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
