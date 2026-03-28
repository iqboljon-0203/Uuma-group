"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  ShieldCheck, 
  Save, 
  RefreshCw,
  Layout,
  Type,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function TrustAdmin() {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*').like('key', 'trust_%');
    if (data) {
      const formatted = data.reduce((acc: any, item) => ({
        ...acc,
        [item.key]: item.content
      }), {});
      setContent(formatted);
    }
    setLoading(false);
  }

  const handleUpdate = (key: string, lang: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [key]: {
        ...(prev[key] || { uz: "", ru: "", en: "" }),
        [lang]: value
      }
    }));
  };

  async function saveContent() {
    setSaving(true);
    const updates = Object.entries(content).map(([key, value]) => ({
      key,
      content: value
    }));

    for (const update of updates) {
       await supabase.from('site_content').upsert(update);
    }
    
    setSaving(false);
    alert("Afzalliklar muvaffaqiyatli yangilandi!");
  }

  const SectionField = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-2">{label}</label>
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-burgundy/5 transition-all font-bold text-gray-900"
      />
    </div>
  );

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-burgundy/20 border-t-burgundy rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tighter mb-4 italic uppercase">Afzalliklarimiz</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] italic">"Nima uchun biz?" bo'limidagi 4 ta blokni boshqarish</p>
        </div>
        <div className="flex gap-4">
          <button onClick={fetchContent} className="p-5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-burgundy transition-all shadow-sm">
            <RefreshCw size={22} className={loading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={saveContent}
            disabled={saving}
            className="flex items-center gap-3 bg-burgundy text-white px-10 py-5 rounded-[2.5rem] font-black shadow-2xl shadow-burgundy/30 hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-[0.2em] text-sm disabled:opacity-50"
          >
            {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </div>

      {/* Main Section Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/5 space-y-10">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-burgundy/5 text-burgundy rounded-2xl flex items-center justify-center"><Layout size={24} /></div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Umumiy Sarlavhalar</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
               <label className="text-[11px] font-black text-burgundy uppercase tracking-[0.3em] ml-2">Tagline (Nima uchun uuma group?)</label>
               {['uz', 'ru', 'en'].map(lang => (
                 <SectionField key={lang} label={`Tagline (${lang})`} value={content.trust_tagline?.[lang] || ""} onChange={(v) => handleUpdate("trust_tagline", lang, v)} />
               ))}
            </div>
            <div className="space-y-4">
               <label className="text-[11px] font-black text-burgundy uppercase tracking-[0.3em] ml-2">Sarlavha (Ishonchingiz biz uchun...)</label>
               {['uz', 'ru', 'en'].map(lang => (
                 <SectionField key={lang} label={`Sarlavha (${lang})`} value={content.trust_main_title?.[lang] || ""} onChange={(v) => handleUpdate("trust_main_title", lang, v)} />
               ))}
            </div>
         </div>
      </motion.div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         {[1, 2, 3, 4].map(id => (
            <motion.div 
               key={id} 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: id * 0.1 }}
               className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-lg space-y-8"
            >
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 bg-burgundy text-white rounded-xl flex items-center justify-center font-black italic">0{id}</span>
                    <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest italic">Blokk {id}</span>
                  </div>
                  <CheckCircle2 className="text-emerald-500" size={24} />
               </div>

               <div className="space-y-8">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Sarlavhalar (3 tilda)</label>
                     <div className="grid grid-cols-1 gap-4">
                        {['uz', 'ru', 'en'].map(lang => (
                           <input 
                              key={lang}
                              value={content[`trust_${id}_title`]?.[lang] || ""}
                              onChange={(e) => handleUpdate(`trust_${id}_title`, lang, e.target.value)}
                              className="w-full bg-gray-50 border border-transparent rounded-xl px-6 py-4 outline-none focus:bg-white focus:border-burgundy/10 transition-all font-bold text-sm"
                              placeholder={`Sarlavha (${lang})`}
                           />
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Ta'riflar (3 tilda)</label>
                     <div className="grid grid-cols-1 gap-4">
                        {['uz', 'ru', 'en'].map(lang => (
                           <textarea 
                              key={lang}
                              value={content[`trust_${id}_desc`]?.[lang] || ""}
                              onChange={(e) => handleUpdate(`trust_${id}_desc`, lang, e.target.value)}
                              className="w-full bg-gray-50 border border-transparent rounded-xl px-6 py-4 h-24 resize-none outline-none focus:bg-white focus:border-burgundy/10 transition-all font-medium text-sm text-gray-600"
                              placeholder={`Ta'rif (${lang})`}
                           />
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
         ))}
      </div>
    </div>
  );
}
