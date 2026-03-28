"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  Type,
  ImageIcon,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*');
    if (data) setCategories(data);
  }

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (!error) setProducts(data || []);
    setLoading(false);
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function deleteProduct(id: string) {
    if (!confirm("Haqiqatan ham ushbu mahsulotni o'chirmoqchimisiz?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchProducts();
  }

  async function handleSave() {
    const { id, categories: _, ...payload } = editingProduct;
    if (id) {
      await supabase.from('products').update(payload).eq('id', id);
    } else {
      await supabase.from('products').insert([payload]);
    }
    setEditingProduct(null);
    fetchProducts();
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('products').upload(fileName, file);

    if (data) {
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
      setEditingProduct({ ...editingProduct, image: publicUrl });
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-burgundy border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter mb-4">Mahsulotlar</h1>
          <p className="text-gray-500 font-medium tracking-tight italic">Katalogingizdagi barcha mahsulotlarni boshqaring</p>
        </div>
        <button 
          onClick={() => setEditingProduct({ name: "", brand: "", category_id: categories[0]?.id, price: 0, volume: "", description: { uz: "", ru: "", en: "" }, image: "", is_featured: false, slug: "", sizes: [], badge: "" })}
          className="flex items-center gap-3 px-8 py-5 bg-burgundy text-white rounded-2xl font-bold shadow-xl shadow-burgundy/20 hover:bg-burgundy-dark transition-all scale-105 active:scale-95 group shadow-2xl"
        >
          <Plus size={22} className="group-hover:rotate-90 transition-transform duration-500" />
          Yangi Mahsulot
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/10">
        <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 px-6 py-4 rounded-xl w-full md:w-96 group focus-within:ring-2 focus-within:ring-burgundy/10 focus-within:border-burgundy/20 transition-all">
          <Search size={20} className="text-gray-400 group-focus-within:text-burgundy transition-colors" />
          <input 
            type="text" 
            placeholder="Nomi yoki brendi bo'yicha..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-medium text-gray-900 placeholder:text-gray-400 w-full"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{filteredProducts.length} ta mahsulot</span>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/20 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-cream/50 border-b border-gray-50">
              <th className="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mahsulot</th>
              <th className="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Brend / Kategoriya</th>
              <th className="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Narxi</th>
              <th className="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Holati</th>
              <th className="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence>
              {filteredProducts.map((p, i) => (
                <motion.tr 
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                >
                  <td className="px-10 py-8" onClick={() => setEditingProduct(p)}>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 relative overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
                        <Image 
                          src={p.image || "/brand-logo.png"} 
                          alt={p.name} 
                          width={64} 
                          height={64} 
                          className="object-cover" 
                          unoptimized 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-extrabold text-gray-900 tracking-tight leading-none mb-2">{p.name}</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">{p.volume}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col gap-2">
                       <span className="text-[13px] font-bold text-gray-800 tracking-tight italic uppercase">{p.brand}</span>
                       <span className="inline-flex max-w-fit px-3 py-1 bg-burgundy/5 text-burgundy rounded-lg text-[10px] font-bold uppercase tracking-widest border border-burgundy/10">
                         {p.categories?.name?.uz || "Kategoriya yo'q"}
                       </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 font-black text-gray-900 tracking-tighter">
                    {p.price?.toLocaleString()} so'm
                  </td>
                  <td className="px-10 py-8">
                     {p.is_featured ? (
                       <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase border border-green-100">Mashhur</span>
                     ) : (
                       <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[10px] font-black uppercase border border-gray-100">Oddiy</span>
                     )}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <button onClick={() => setEditingProduct(p)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-burgundy hover:bg-burgundy/5 transition-all"><Edit3 size={18} /></button>
                      <button onClick={(e) => { e.stopPropagation(); deleteProduct(p.id); }} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-6xl my-auto rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 md:p-14 space-y-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tighter italic italic uppercase">
                    {editingProduct.id ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
                  </h2>
                  <button onClick={() => setEditingProduct(null)} className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all"><X size={24} /></button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-8">
                     <div className="p-8 bg-gray-50/30 rounded-[2.5rem] border border-gray-100 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                           <Type size={20} className="text-burgundy" />
                           <span className="text-xs font-black text-gray-900 uppercase tracking-widest italic tracking-widest">Mahsulot Nomi (3 tilda)</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {['uz', 'ru', 'en'].map(lang => (
                             <SectionField 
                               key={lang}
                               label={`Nomi (${lang.toUpperCase()})`}
                               value={editingProduct.name?.[lang] || ""}
                               onChange={(v) => setEditingProduct({ ...editingProduct, name: { ...(editingProduct.name || {}), [lang]: v } })}
                             />
                           ))}
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <SectionField label="Brend" value={editingProduct.brand} onChange={(v) => setEditingProduct({...editingProduct, brand: v})} />
                        <SectionField label="Slug (Unique)" value={editingProduct.slug} onChange={(v) => setEditingProduct({...editingProduct, slug: v})} />
                        <div className="space-y-3">
                           <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Kategoriya</label>
                           <select 
                            value={editingProduct.category_id}
                            onChange={(e) => setEditingProduct({...editingProduct, category_id: e.target.value})}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-gray-900 outline-none"
                           >
                             {categories.map(c => <option key={c.id} value={c.id}>{c.name.uz}</option>)}
                           </select>
                        </div>
                        <SectionField label="Narxi (raqam)" value={editingProduct.price} onChange={(v) => setEditingProduct({...editingProduct, price: parseInt(v) || 0})} />
                        <SectionField label="O'lcham/Hajm" value={editingProduct.volume} onChange={(v) => setEditingProduct({...editingProduct, volume: v})} />
                        
                        <div className="space-y-3 col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Rasm (URL yoki Fayl)</label>
                          <div className="flex gap-3">
                             <input
                              type="text"
                              value={editingProduct.image}
                              onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                              className="flex-1 px-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-burgundy/5 outline-none font-bold text-gray-900"
                              placeholder="Rasm manzili..."
                            />
                            <label className="w-20 h-16 bg-burgundy/5 text-burgundy border-2 border-dashed border-burgundy/20 rounded-[1.5rem] flex items-center justify-center cursor-pointer hover:bg-burgundy hover:text-white transition-all flex-shrink-0">
                               <ImageIcon size={24} />
                               <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-6 col-span-2">
                           <button onClick={() => setEditingProduct({...editingProduct, is_featured: !editingProduct.is_featured})} className={`w-14 h-7 rounded-full relative transition-colors ${editingProduct.is_featured ? 'bg-burgundy' : 'bg-gray-200'}`}>
                             <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${editingProduct.is_featured ? 'right-1' : 'left-1'}`} />
                           </button>
                           <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Mashhur mahsulot sifatida ko'rsatish</span>
                        </div>
                     </div>
                   </div>

                   <div className="space-y-8">
                     {['uz', 'ru', 'en'].map(lang => (
                        <div key={lang} className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 space-y-4">
                           <div className="flex items-center gap-3 mb-2">
                             <div className="w-8 h-8 bg-burgundy rounded-lg flex items-center justify-center text-white text-[10px] font-black">{lang.toUpperCase()}</div>
                             <span className="text-[11px] font-black uppercase text-gray-900">Tavsif ({lang})</span>
                           </div>
                           <textarea 
                            value={editingProduct.description?.[lang] || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description: { ...editingProduct.description, [lang]: e.target.value } })}
                            className="w-full bg-white border border-gray-100 rounded-2xl p-4 h-24 resize-none outline-none focus:ring-4 focus:ring-burgundy/5 transition-all font-medium text-gray-600"
                           />
                        </div>
                     ))}
                   </div>
                </div>

                <div className="pt-10 border-t border-gray-100 flex justify-end">
                   <button 
                    onClick={handleSave}
                    className="flex items-center gap-3 bg-burgundy text-white px-12 py-6 rounded-3xl font-black shadow-2xl shadow-burgundy/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
                   >
                     <Save size={20} strokeWidth={3} /> Mahsulotni saqlash
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

function SectionField({ label, value, onChange }: { label: string, value: any, onChange: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-burgundy/5 outline-none font-bold text-gray-900"
      />
    </div>
  );
}
