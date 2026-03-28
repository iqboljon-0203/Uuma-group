"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useCart } from "@/store/cart-context";
import { useLang } from "@/store/lang-context";
import { Language } from "@/lib/translations";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const { totalCount } = useCart();
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/catalog", label: t.nav.catalog },
    { href: "/#faq", label: t.nav.faq },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "uz", label: "UZ", flag: "https://flagcdn.com/uz.svg" },
    { code: "ru", label: "RU", flag: "https://flagcdn.com/ru.svg" },
    { code: "en", label: "EN", flag: "https://flagcdn.com/gb.svg" },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  const isHeroPage = pathname === "/" || pathname === "/about";
  const isLightText = isHeroPage && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "glass border-b border-[#E8E5E0] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Logo
                className={`transition-colors duration-500 scale-90 md:scale-100 ${
                  isLightText ? "text-gold" : "text-burgundy"
                }`}
              />
            </Link>
          </div>

          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                  pathname === link.href
                    ? isLightText ? "text-white" : "text-burgundy"
                    : isLightText ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-burgundy"
                }`}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute inset-0 rounded-xl transition-colors duration-300 ${
                      isLightText ? "bg-white/20" : "bg-burgundy/5"
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/cart"
              className={`relative flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-bold rounded-lg transition-colors duration-300 ${
                pathname === "/cart"
                  ? isLightText ? "text-white bg-white/20" : "text-burgundy bg-burgundy/5"
                  : isLightText ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-burgundy"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-colors duration-300">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="hidden lg:inline">{t.nav.cart}</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={totalCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="flex items-center justify-center w-5 h-5 bg-burgundy text-white text-[10px] font-bold rounded-full"
                >
                  {totalCount}
                </motion.span>
              </AnimatePresence>
            </Link>

            {/* Lang Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${
                  isLightText 
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                    : "bg-black/5 border-black/5 text-gray-700 hover:bg-black/10"
                }`}
              >
                <img src={currentLang.flag} className="w-5 h-5 rounded-full object-cover border border-white/20 shadow-sm" alt={currentLang.label} />
                <span className="text-xs font-bold uppercase tracking-wider">{currentLang.code}</span>
                <svg 
                  className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsLangOpen(false)}
                      className="fixed inset-0 z-10"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-20 overflow-hidden"
                    >
                      <div className="flex flex-col gap-1">
                        {languages.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => {
                              setLang(l.code);
                              setIsLangOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all ${
                              lang === l.code
                                ? "bg-burgundy text-white"
                                : "text-gray-600 hover:bg-burgundy/5 hover:text-burgundy"
                            }`}
                          >
                            <img src={l.flag} className="w-5 h-5 rounded-full object-cover border border-white/20 shadow-sm" alt={l.label} />
                            <span className="text-xs font-bold uppercase tracking-widest">{l.label}</span>
                            {lang === l.code && (
                              <motion.div layoutId="active-lang-dot" className="ml-auto w-1 h-1 bg-white rounded-full" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Burger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col gap-[5px] p-2"
              aria-label="Menyu"
            >
              <span className={`block w-[22px] h-[2px] rounded transition-colors duration-300 ${isLightText ? "bg-white" : "bg-gray-800"}`} />
              <span className={`block w-[22px] h-[2px] rounded transition-colors duration-300 ${isLightText ? "bg-white" : "bg-gray-800"}`} />
              <span className={`block w-[22px] h-[2px] rounded transition-colors duration-300 ${isLightText ? "bg-white" : "bg-gray-800"}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[999]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-[280px] h-full bg-cream z-[1000] p-8 pt-20 flex flex-col"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-2xl rounded-lg hover:bg-burgundy/5 transition"
              >
                ×
              </button>
              
              <div className="flex items-center gap-2 mb-8 p-1 bg-black/5 rounded-full self-start">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-3 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-2 ${
                      lang === l.code ? "bg-burgundy text-white shadow-lg shadow-burgundy/20" : "text-gray-400 hover:text-gray-800"
                    }`}
                  >
                    <img src={l.flag} className="w-4 h-4 rounded-full object-cover border border-white/10 shadow-sm" alt={l.label} />
                    {l.label}
                  </button>
                ))}
              </div>

              <nav className="flex flex-col gap-2">
                {[...navLinks, { href: "/cart", label: t.nav.cart }].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-lg font-bold rounded-lg hover:text-burgundy hover:bg-burgundy/5 transition"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
