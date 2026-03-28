"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Package, 
  Layers, 
  MessageSquare, 
  HelpCircle, 
  ArrowUpRight,
  TrendingUp,
  Clock,
  Eye
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    testimonials: 0,
    faq: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: prodCount },
        { count: catCount },
        { count: testCount },
        { count: faqCount }
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('faq').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        products: prodCount || 0,
        categories: catCount || 0,
        testimonials: testCount || 0,
        faq: faqCount || 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: "Jami mahsulotlar", value: stats.products, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Kategoriyalar", value: stats.categories, icon: Layers, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Mijozlar fikrlari", value: stats.testimonials, icon: MessageSquare, color: "text-green-600", bg: "bg-green-50" },
    { label: "Savol-javoblar", value: stats.faq, icon: HelpCircle, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-burgundy border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter mb-4">Xush kelibsiz, Admin!</h1>
          <p className="text-gray-500 font-medium tracking-tight">Bugun saytingizda nimalarni yangilaymiz?</p>
        </div>
        <div className="text-right hidden md:block">
          <div className="flex items-center gap-2 text-burgundy font-bold uppercase tracking-widest text-xs mb-1">
             <Clock size={14} /> {new Date().toLocaleTimeString()}
          </div>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">Oxirgi yangilanish: Bugun</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <ArrowUpRight size={20} className="text-gray-300 group-hover:text-burgundy transition-colors" />
              </div>
              <div className="space-y-1">
                <span className="text-4xl font-extrabold text-gray-900 tracking-tighter">{stat.value}</span>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 p-10 shadow-xl shadow-gray-200/10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter flex items-center gap-3">
              <TrendingUp size={24} className="text-burgundy" /> Sayt Faolligi
            </h3>
            <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-gray-500 outline-none hover:bg-white focus:ring-2 focus:ring-burgundy/10 transition-all">
              <option>Oxirgi 7 kun</option>
              <option>Oxirgi 30 kun</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-[2rem] flex items-center justify-center border border-dashed border-gray-200">
             <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Grafik ma'lumotlari tez orada...</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-100 p-10 shadow-xl shadow-gray-200/10 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter mb-8">Tezkor Havolalar</h3>
            <div className="space-y-4">
              {[
                { label: "Yangi mahsulot qo'shish", href: "/admin/products/new" },
                { label: "About sahifasini tahrirlash", href: "/admin/content#about" },
                { label: "Mijoz fikrini qo'shish", href: "/admin/testimonials/new" },
              ].map((link, i) => (
                <button key={i} className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-burgundy hover:text-white rounded-2xl text-[13px] font-bold text-gray-900 transition-all shadow-sm">
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-12 p-8 bg-cream rounded-3xl border border-gold/10 relative overflow-hidden group">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Jonli Ko'rish</p>
                <h4 className="text-lg font-extrabold text-gray-900 tracking-tight leading-none">Saytga o'tish</h4>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-burgundy shadow-sm group-hover:scale-110 transition-transform">
                <Eye size={22} />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-gradient-to-br from-gold/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
