"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  MessageSquare,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (data) setTestimonials(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Haqiqatan ham bu fikrni o'chirmoqchimisiz?")) return;
    await supabase.from('testimonials').delete().eq('id', id);
    fetchTestimonials();
  }

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tighter mb-4 italic italic">Mijozlar Fikrlari</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] italic">Ijtimoiy ishonchni boshqarish</p>
        </div>
        <button 
          onClick={() => setEditingTestimonial({ name: "", role: { uz: "", ru: "", en: "" }, text: { uz: "", ru: "", en: "" }, rating: 5 })}
          className="flex items-center gap-4 bg-burgundy text-white px-10 py-5 rounded-[2rem] font-bold shadow-2xl shadow-burgundy/20 hover:scale-[1.05] active:scale-[0.95] transition-all text-sm uppercase tracking-widest"
        >
          <Plus size={20} strokeWidth={3} /> Yangi fikr
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="w-16 h-16 border-4 border-burgundy border-t-transparent rounded-full animate-spin shadow-2xl"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 p-10 flex flex-col justify-between shadow-xl shadow-gray-200/10 hover:shadow-2xl hover:border-burgundy/10 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                   <div className="flex gap-1 text-gold">
                      {[...Array(item.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                   </div>
                   <div className="w-10 h-10 bg-burgundy/10 text-burgundy rounded-xl flex items-center justify-center group-hover:bg-burgundy group-hover:text-white transition-colors">
                      <MessageSquare size={18} />
                   </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed italic mb-8 font-medium line-clamp-3">"{item.text.uz}"</p>
              </div>
              <div className="flex items-center justify-between pt-8 border-t border-gray-50 mt-auto">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cream text-burgundy rounded-full flex items-center justify-center font-black text-xs">{item.name[0]}</div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 tracking-tight">{item.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.role.uz}</p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => setEditingTestimonial(item)} className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-burgundy hover:text-white transition-all shadow-sm"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editingTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-5xl my-auto rounded-[3.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-12 md:p-20 space-y-12">
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-extrabold text-gray-900 tracking-tighter italic italic">
                    {editingTestimonial.id ? "Fikrni tahrirlash" : "Yangi fikr qo'shish"}
                  </h2>
                  <button onClick={() => setEditingTestimonial(null)} className="w-14 h-14 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all font-bold">
                    <X size={28} strokeWidth={3} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div>
                        <label className="block text-[11px] font-extrabold text-burgundy uppercase tracking-[0.2em] mb-4">Mijoz ismi</label>
                        <input 
                          type="text"
                          value={editingTestimonial.name}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all shadow-sm"
                          placeholder="masalan: Malika Akromova"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold text-burgundy uppercase tracking-[0.2em] mb-4">Reyting (1-5)</label>
                        <div className="flex gap-4">
                          {[1,2,3,4,5].map(num => (
                             <button
                                key={num}
                                onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: num })}
                                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-black transition-all ${
                                   editingTestimonial.rating === num ? "bg-gold border-gold text-white shadow-lg shadow-gold/20" : "bg-white border-gray-100 text-gray-300 hover:border-gold/30"
                                }`}
                             >
                                <Star size={20} fill={editingTestimonial.rating === num ? "currentColor" : "none"} />
                             </button>
                          ))}
                        </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 gap-8">
                     {['uz', 'ru', 'en'].map(lang => (
                        <div key={lang} className="p-10 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 space-y-6">
                           <div className="flex items-center gap-4">
                             <div className="w-8 h-8 bg-burgundy rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase">{lang}</div>
                             <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Ma'lumotlar ({lang})</span>
                           </div>
                           <input 
                              type="text"
                              value={editingTestimonial.role?.[lang] || ""}
                              onChange={(e) => setEditingTestimonial({ 
                                ...editingTestimonial, 
                                role: { ...(editingTestimonial.role || {}), [lang]: e.target.value } 
                              })}
                              className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all font-bold italic"
                              placeholder="Kasbi..."
                            />
                            <textarea 
                              value={editingTestimonial.text?.[lang] || ""}
                              onChange={(e) => setEditingTestimonial({ 
                                ...editingTestimonial, 
                                text: { ...(editingTestimonial.text || {}), [lang]: e.target.value } 
                              })}
                              className="w-full bg-white border border-gray-100 rounded-2xl p-6 font-medium text-gray-600 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all h-32 resize-none italic"
                              placeholder="Mijoz fikri matni..."
                            />
                        </div>
                     ))}
                   </div>
                </div>

                <div className="pt-10 border-t border-gray-50">
                   <button 
                    onClick={async () => {
                      const { id, ...payload } = editingTestimonial;
                      if (id) {
                        await supabase.from('testimonials').update(payload).eq('id', id);
                      } else {
                        await supabase.from('testimonials').insert([payload]);
                      }
                      setEditingTestimonial(null);
                      fetchTestimonials();
                    }}
                    className="w-full bg-burgundy text-white py-8 rounded-[2.5rem] font-black shadow-2xl shadow-burgundy/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4"
                  >
                    <Save size={24} strokeWidth={3} /> Fikrni saqlash
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
