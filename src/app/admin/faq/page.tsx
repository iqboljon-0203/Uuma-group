"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  HelpCircle,
  GripVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<any>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    const { data } = await supabase.from('faq').select('*').order('sort_order');
    if (data) setFaqs(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Haqiqatan ham bu savolni o'chirmoqchimisiz?")) return;
    await supabase.from('faq').delete().eq('id', id);
    fetchFaqs();
  }

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tighter mb-4 italic">Savol-javoblar (FAQ)</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] italic">Tez-tez beriladigan savollarni boshqarish</p>
        </div>
        <button 
          onClick={() => setEditingFaq({ question: { uz: "", ru: "", en: "" }, answer: { uz: "", ru: "", en: "" }, sort_order: faqs.length })}
          className="flex items-center gap-4 bg-burgundy text-white px-10 py-5 rounded-[2rem] font-bold shadow-2xl shadow-burgundy/20 hover:scale-[1.05] active:scale-[0.95] transition-all text-sm uppercase tracking-widest"
        >
          <Plus size={20} strokeWidth={3} /> Yangi savol
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="w-16 h-16 border-4 border-burgundy border-t-transparent rounded-full animate-spin shadow-2xl"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 flex items-center gap-8 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:border-burgundy/10 transition-all"
            >
              <div className="h-12 w-12 bg-cream text-burgundy rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <HelpCircle size={22} />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">{faq.question.uz}</h3>
                <p className="text-gray-400 text-sm font-medium line-clamp-1 italic">{faq.answer.uz}</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setEditingFaq(faq)}
                  className="w-14 h-14 flex items-center justify-center bg-gray-50 text-gray-500 rounded-3xl hover:bg-burgundy hover:text-white transition-all shadow-sm"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(faq.id)}
                  className="w-14 h-14 flex items-center justify-center bg-red-50/50 text-red-600 rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editingFaq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-5xl my-auto rounded-[3.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="p-12 md:p-20 space-y-12">
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-extrabold text-gray-900 tracking-tighter italic">
                    {editingFaq.id ? "Savolni tahrirlash" : "Yangi savol"}
                  </h2>
                  <button onClick={() => setEditingFaq(null)} className="w-14 h-14 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all font-bold">
                    <X size={28} strokeWidth={3} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-12">
                  <div className="p-8 bg-gray-50/30 rounded-3xl border border-gray-100 flex items-center gap-6">
                     <span className="text-[11px] font-black text-burgundy uppercase tracking-[0.3em]">Tartib raqami</span>
                     <input 
                      type="number"
                      value={editingFaq.sort_order}
                      onChange={(e) => setEditingFaq({ ...editingFaq, sort_order: parseInt(e.target.value) })}
                      className="w-24 bg-white border border-gray-100 rounded-2xl p-4 font-black text-center text-gray-900 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {['uz', 'ru', 'en'].map(lang => (
                      <div key={lang} className="space-y-8 p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/10">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-burgundy rounded-xl flex items-center justify-center text-white text-[11px] font-black uppercase">
                             {lang}
                           </div>
                           <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{lang === 'uz' ? 'O\'zbekcha' : lang === 'ru' ? 'Ruscha' : 'Inglizcha'}</span>
                         </div>
                         <div className="space-y-4">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Savol</label>
                            <textarea 
                              value={editingFaq.question?.[lang] || ""}
                              onChange={(e) => setEditingFaq({ 
                                ...editingFaq, 
                                question: { ...(editingFaq.question || {}), [lang]: e.target.value } 
                              })}
                              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 font-bold text-gray-900 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all h-28 resize-none"
                            />
                         </div>
                         <div className="space-y-4">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Javob</label>
                            <textarea 
                              value={editingFaq.answer?.[lang] || ""}
                              onChange={(e) => setEditingFaq({ 
                                ...editingFaq, 
                                answer: { ...(editingFaq.answer || {}), [lang]: e.target.value } 
                              })}
                              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 font-medium text-gray-600 outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all h-48 resize-none"
                            />
                         </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-10 flex flex-col md:flex-row gap-6 border-t border-gray-50">
                   <button 
                    onClick={async () => {
                      const { id, ...payload } = editingFaq;
                      if (id) {
                        await supabase.from('faq').update(payload).eq('id', id);
                      } else {
                        await supabase.from('faq').insert([payload]);
                      }
                      setEditingFaq(null);
                      fetchFaqs();
                    }}
                    className="flex-1 flex items-center justify-center gap-4 bg-burgundy text-white py-8 rounded-[2.5rem] font-black shadow-2xl shadow-burgundy/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.3em] text-sm"
                  >
                    <Save size={24} strokeWidth={3} /> Ma'lumotlarni saqlash
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
