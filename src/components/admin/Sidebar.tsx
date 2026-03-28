"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  FileText, 
  Settings,
  LogOut,
  Image as ImageIcon,
  Camera,
  ShieldCheck,
  MessageSquare,
  HelpCircle,
  Menu,
  X,
  ShoppingCart
} from "lucide-react";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/admin", icon: LayoutDashboard, label: "Asosiy" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Buyurtmalar" },
    { href: "/admin/products", icon: Package, label: "Mahsulotlar" },
    { href: "/admin/categories", icon: Layers, label: "Kategoriyalar" },
    { href: "/admin/content", icon: FileText, label: "Matnlar (UI)" },
    { href: "/admin/instagram", icon: Camera, label: "Instagram" },
    { href: "/admin/trust", icon: ShieldCheck, label: "Afzalliklar" },
    { href: "/admin/testimonials", icon: MessageSquare, label: "Fikrlar" },
    { href: "/admin/faq", icon: HelpCircle, label: "Savollar" },
    { href: "/admin/media", icon: ImageIcon, label: "Media" },
    { href: "/admin/settings", icon: Settings, label: "Sozlamalar" },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 py-8 px-6 overflow-y-auto">
      <div className="mb-10 flex items-center justify-between">
        <Logo />
        <button className="lg:hidden p-2 text-gray-400" onClick={() => setIsOpen(false)}>
           <X size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-burgundy text-white shadow-lg shadow-burgundy/20 italic font-black"
                  : "text-gray-500 hover:bg-gray-50 hover:text-burgundy font-bold"
              }`}
            >
              <Icon
                size={20}
                className={`${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-burgundy"
                }`}
              />
              <span className="text-[13px] tracking-wide uppercase italic tracking-widest">{link.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="pt-8 mt-8 border-t border-gray-50 pb-4">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-4 w-full px-6 py-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold uppercase italic tracking-widest text-[12px]"
        >
          <LogOut size={20} />
          <span>Chiqish</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header (Fixed Top) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between z-40">
        <Logo className="scale-75 origin-left" />
        <button 
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 bg-burgundy/5 text-burgundy rounded-xl flex items-center justify-center hover:bg-burgundy hover:text-white transition-all shadow-sm"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar (Permanent) */}
      <div className="hidden lg:block w-72 h-screen fixed inset-y-0 left-0 z-30">
        <NavContent />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
               initial={{ x: "-100%" }}
               animate={{ x: 0 }}
               exit={{ x: "-100%" }}
               transition={{ type: "spring", damping: 30, stiffness: 300 }}
               className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-[60] lg:hidden shadow-2xl"
            >
               <NavContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
