"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Layers,
  Save,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('slug');
    if (data) setCategories(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Haqiqatan ham bu kategoriyani o'chirmoqchimisiz?")) return;
    await supabase.from('categories').delete().eq('id', id);
    fetchCategories();
  }

  const filteredCategories = categories.filter(c => 
    c.slug.toLowerCase().includes(search.toLowerCase()) ||
    c.name.uz.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter mb-2">Kategoriyalar</h1>
          <p className="text-gray-500 font-medium tracking-tight italic">Mahsulot turlarini boshqarish</p>
        </div>
        <button 
          onClick={() => setEditingCategory({ slug: "", name: { uz: "", ru: "", en: "" }, description: { uz: "", ru: "", en: "" }, image: "" })}
          className="flex items-center gap-3 bg-burgundy text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-burgundy/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={20} strokeWidth={3} /> Yangi Kategoriya
        </button>
      </div>

      <div className="relative group max-w-md">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-burgundy transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Kategoriyalarni qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-14 pr-6 font-medium text-gray-900 shadow-xl shadow-gray-200/10 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all placeholder:text-gray-300"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="w-12 h-12 border-4 border-burgundy border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:border-burgundy/10 transition-all relative"
            >
              <div className="relative h-48 bg-gray-50">
                {cat.image ? (
                  <Image src={cat.image} alt={cat.name.uz} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <Layers size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">{cat.name.uz}</h3>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{cat.slug}</p>
                </div>
              </div>
              
              <div className="p-8 flex items-center justify-between gap-4">
                <button 
                  onClick={() => setEditingCategory(cat)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-900 rounded-xl font-bold hover:bg-burgundy hover:text-white transition-all text-xs uppercase tracking-widest"
                >
                  <Edit2 size={14} strokeWidth={3} /> Tahrirlash
                </button>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editingCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl"
            >
              <div className="p-10 md:p-14 space-y-12">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tighter">
                      {editingCategory.id ? "Kategoriyani tahrirlash" : "Yangi kategoriya"}
                    </h2>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2 italic">
                      Barcha tillardagi ma'lumotlarni to'ldiring
                    </p>
                  </div>
                  <button onClick={() => setEditingCategory(null)} className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all">
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[11px] font-extrabold text-burgundy uppercase tracking-[0.2em] mb-3">Kategoriya Slugi (Unique ID)</label>
                      <input 
                        type="text"
                        value={editingCategory.slug}
                        onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all"
                        placeholder="masalan: capsules"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-burgundy uppercase tracking-[0.2em] mb-3">Kategoriya Rasmi</label>
                      <div className="flex gap-4">
                        <input 
                          type="text"
                          value={editingCategory.image}
                          onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-5 font-bold text-gray-900 outline-none"
                          placeholder="https://..."
                        />
                        <label className="w-16 h-16 bg-burgundy/5 text-burgundy border-2 border-dashed border-burgundy/20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-burgundy hover:text-white transition-all">
                           <Layers size={22} />
                           <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const fileName = `${Date.now()}-${file.name}`;
                                const { data } = await supabase.storage.from('products').upload(fileName, file);
                                if (data) {
                                  const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
                                  setEditingCategory({ ...editingCategory, image: publicUrl });
                                }
                              }
                           }} />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-12">
                    {['uz', 'ru', 'en'].map(lang => (
                      <div key={lang} className="p-8 bg-gray-50/50 rounded-3xl border border-gray-100 space-y-6">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-burgundy rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase">
                             {lang}
                           </div>
                           <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Nomi ({lang.toUpperCase()})</span>
                         </div>
                         <input 
                          type="text"
                          value={editingCategory.name?.[lang] || ""}
                          onChange={(e) => setEditingCategory({ 
                            ...editingCategory, 
                            name: { ...(editingCategory.name || {}), [lang]: e.target.value } 
                          })}
                          className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all"
                        />
                        <textarea 
                          value={editingCategory.description?.[lang] || ""}
                          onChange={(e) => setEditingCategory({ 
                            ...editingCategory, 
                            description: { ...(editingCategory.description || {}), [lang]: e.target.value } 
                          })}
                          className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-medium text-gray-600 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all resize-none h-24"
                          placeholder="Tavsif..."
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-10 flex flex-col md:flex-row gap-4 border-t border-gray-50">
                   <button 
                    onClick={async () => {
                      const { id, ...payload } = editingCategory;
                      if (id) {
                        await supabase.from('categories').update(payload).eq('id', id);
                      } else {
                        await supabase.from('categories').insert([payload]);
                      }
                      setEditingCategory(null);
                      fetchCategories();
                    }}
                    className="flex-1 flex items-center justify-center gap-3 bg-burgundy text-white py-6 rounded-3xl font-black shadow-2xl shadow-burgundy/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-sm"
                  >
                    <Save size={20} strokeWidth={3} /> Saqlash
                  </button>
                  <button 
                    onClick={() => setEditingCategory(null)}
                    className="px-12 py-6 bg-gray-50 text-gray-500 rounded-3xl font-black hover:bg-red-50 hover:text-red-600 transition-all uppercase tracking-[0.2em] text-sm"
                  >
                    Bekor qilish
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
