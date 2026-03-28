"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

import { useLang } from "@/store/lang-context";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-[#1A1A1A] text-[#FAFAFA] pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 items-start">
          <div className="max-w-[320px]">
            <Link href="/" className="flex items-center mb-8 scale-110 origin-left">
              <Logo className="text-gold" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              {t.footer.desc}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/uumagroup_official" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-burgundy hover:text-white hover:border-burgundy transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="18" height="18" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://t.me/uumagroup_official" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc] transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.49.99-.74 3.88-1.69 6.47-2.8 7.77-3.32 3.69-1.48 4.45-1.74 4.95-1.75.11 0 .35.03.5.16.14.12.18.28.2.46-.02.04-.01.12-.02.16z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/998950154229" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-1 pt-[6px]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#FFF8E7]/50 mb-8">
              {t.footer.pages}
            </h4>
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {t.nav.home}
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {t.about.tagline}
              </Link>
              <Link href="/catalog" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {t.nav.catalog}
              </Link>
              <Link href="/#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {t.nav.faq}
              </Link>
            </nav>
          </div>

          <div className="md:col-span-1 pt-[6px]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#FFF8E7]/50 mb-8">
              {t.footer.categories}
            </h4>
            <nav className="flex flex-col gap-4">
              <Link href="/catalog?type=liquid" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {t.categories.liquid}
              </Link>
              <Link href="/catalog?type=capsules" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {t.categories.capsules}
              </Link>
              <Link href="/catalog?type=household" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {t.categories.household}
              </Link>
            </nav>
          </div>

          <div className="md:col-span-1 pt-[6px]">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#FFF8E7]/50 mb-8">
              {t.footer.contact}
            </h4>
            <nav className="flex flex-col gap-4">
              <a
                href="tel:+998950154229"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +998 95 015 42 29
              </a>
              <a
                href="tel:+998331717133"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +998 33 171 71 33
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Mirobod+tumani+Toshkent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-400 hover:text-white flex items-start gap-3 group transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 group-hover:text-gold transition-colors">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t.footer.address}</span>
              </a>
              <div className="text-sm font-medium text-gray-500 mt-2 pl-7 italic">
                {t.footer.workHours}
              </div>
            </nav>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-600 font-medium tracking-tight">
            © 2026 Uuma Group. {t.footer.allRights}
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] text-gray-700 font-bold uppercase tracking-tighter">Premium Household Chemicals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
