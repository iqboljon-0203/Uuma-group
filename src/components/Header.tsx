"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useCart } from "@/store/cart-context";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const { totalCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Bosh sahifa" },
    { href: "/catalog", label: "Katalog" },
  ];

  const isHome = pathname === "/";
  const isLightText = isHome && !scrolled;

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
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Logo
              className={`transition-colors duration-500 ${
                isLightText ? "text-gold" : "text-burgundy"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                  pathname === link.href
                    ? isLightText ? "text-white" : "text-burgundy"
                    : isLightText ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-burgundy"
                }`}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute inset-0 rounded-lg transition-colors duration-300 ${
                      isLightText ? "bg-white/20" : "bg-burgundy/5"
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
            <Link
              href="/cart"
              className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                pathname === "/cart"
                  ? isLightText ? "text-white bg-white/20" : "text-burgundy bg-burgundy/5"
                  : isLightText ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-burgundy"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-colors duration-300">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Savat
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
          </nav>

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
              className="fixed top-0 right-0 w-[280px] h-full bg-cream z-[1000] p-8 pt-20"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-2xl rounded-lg hover:bg-burgundy/5 transition"
              >
                ×
              </button>
              <nav className="flex flex-col gap-2">
                {[...navLinks, { href: "/cart", label: "Savat" }].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-4 text-lg font-semibold rounded-lg hover:text-burgundy hover:bg-burgundy/5 transition"
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
