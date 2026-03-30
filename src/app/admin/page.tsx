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
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [activityData, setActivityData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    testimonials: 0,
    faq: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardUpdates() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        
        if (data.success) {
          setStats(data.stats);
          setActivityData(data.activityData);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardUpdates();
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
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-[10px] font-black uppercase text-gray-500 tracking-widest">
               Real vaqt rejimi
            </div>
          </div>
          
          <div className="h-72 relative mt-8">
             {activityData.some(d => d.count > 0) ? (
                <div className="h-full flex items-end justify-between gap-6 px-4">
                   {activityData.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col h-full items-center group">
                         {/* Count Tooltip */}
                         <div className="mb-2 h-6 flex items-center">
                            <AnimatePresence>
                              {day.count > 0 && (
                                <motion.span 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-[10px] font-black text-burgundy bg-burgundy/5 px-2 py-0.5 rounded-md border border-burgundy/10"
                                >
                                   {day.count}
                                </motion.span>
                              )}
                            </AnimatePresence>
                         </div>

                         {/* Bar Container */}
                         <div className="relative flex-1 w-full flex items-end justify-center">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.max((day.count / Math.max(...activityData.map(d => d.count))) * 100, 5)}%` }}
                              className="w-full max-w-[48px] bg-gradient-to-t from-burgundy/30 via-burgundy/20 to-burgundy/40 border-t-2 border-burgundy/40 rounded-t-2xl group-hover:from-burgundy group-hover:to-burgundy-dark transition-all duration-700 relative shadow-2xl shadow-burgundy/10"
                            >
                               {/* Subtle Texture Overlay */}
                               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none rounded-t-2xl" />
                               
                               {/* Active Glow */}
                               {day.count > 0 && (
                                 <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-burgundy/30 blur-xl animate-pulse" />
                               )}
                            </motion.div>
                         </div>

                         {/* Day Label */}
                         <div className="mt-6 pt-4 border-t border-gray-50 w-full text-center">
                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-burgundy transition-colors">{day.label}</span>
                         </div>
                      </div>
                   ))}
                </div>
             ) : (
                <div className="h-full flex flex-col items-center justify-center bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
                   <Package size={42} className="text-gray-200 mb-4 animate-bounce duration-3000" />
                   <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em] italic">Hozircha jimjitlik...</p>
                </div>
             )}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-100 p-10 shadow-xl shadow-gray-200/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter">Tezkor Havolalar</h3>
               <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg uppercase border border-green-100 italic">
                 Jami: {stats.orders} buyurtma
               </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Yangi mahsulot qo'shish", href: "/admin/products" },
                { label: "About sahifasini tahrirlash", href: "/admin/content#about" },
                { label: "Mijoz fikrini qo'shish", href: "/admin/testimonials" },
              ].map((link, i) => (
                <a key={i} href={link.href} className="block w-full text-left px-6 py-4 bg-gray-50 hover:bg-burgundy hover:text-white rounded-2xl text-[13px] font-bold text-gray-900 transition-all shadow-sm">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <a 
            href="https://uumagroup.uz" 
            target="_blank" 
            className="mt-12 p-8 bg-cream rounded-3xl border border-gold/10 relative overflow-hidden group block hover:shadow-2xl hover:shadow-gold/10 transition-all"
          >
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
          </a>
        </div>
      </div>
    </div>
  );
}
