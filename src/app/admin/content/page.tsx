"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  Save, 
  RefreshCw, 
  ChevronRight, 
  Layout, 
  Type, 
  Image as ImageIcon,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Settings as SettingsIcon,
  Phone,
  Camera,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ContentAdmin() {
  const [activeTab, setActiveTab] = useState("hero");
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    setLoading(true);
    const { data, error } = await supabase.from('site_content').select('*');
    if (!error) {
      const formatted = data.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.content;
        return acc;
      }, {});
      setContent(formatted);
    }
    setLoading(false);
  }

  const handleUpdate = (key: string, lang: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
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

    const { error } = await supabase.from('site_content').upsert(updates, { onConflict: 'key' });
    
    if (!error) {
       setSuccess(true);
       setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  }

  async function handleFileUpload(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;
    const { data } = await supabase.storage.from('products').upload(fileName, file);

    if (data) {
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
      setContent((prev: any) => ({
        ...prev,
        [key]: publicUrl
      }));
    }
  }

  const tabs = [
    { id: "hero", label: "Hero", icon: Layout },
    { id: "about", label: "Biz haqimizda", icon: ImageIcon },
    { id: "footer", label: "Footer", icon: SettingsIcon },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-burgundy border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter mb-4">Sayt Matnlari</h1>
          <p className="text-gray-500 font-medium tracking-tight">Veb-saytingizdagi barcha marketing matnlarini tahrirlang</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchContent}
            className="p-5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-burgundy hover:bg-burgundy/5 transition-all shadow-sm"
          >
            <RefreshCw size={22} className={loading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={saveContent}
            disabled={saving}
            className="flex items-center gap-3 px-8 py-5 bg-burgundy text-white rounded-2xl font-bold hover:bg-burgundy-dark transition-all scale-105 active:scale-95 group shadow-xl shadow-burgundy/20"
          >
            {success ? <CheckCircle2 size={22} className="text-white" /> : <Save size={22} className="group-hover:scale-110 transition-transform" />}
            {saving ? "Saqlanmoqda..." : success ? "Saqlandi!" : "O'zgarishlarni Saqlash"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl font-bold transition-all ${
                  active 
                    ? "bg-white text-burgundy shadow-xl shadow-gray-200/20 border border-gray-100 scale-[1.05]" 
                    : "text-gray-400 hover:text-gray-900 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={20} className={active ? "text-burgundy" : "text-gray-300"} />
                  <span className="text-sm tracking-tight">{tab.label}</span>
                </div>
                {active && <ChevronRight size={16} className="text-burgundy" />}
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 space-y-8 min-h-[60vh] bg-white border border-gray-100 rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-gray-200/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-burgundy/5 flex items-center justify-center text-burgundy border border-burgundy/10">
                  <Type size={22} />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter uppercase tracking-[0.1em]">
                  {tabs.find(t => t.id === activeTab)?.label} sozlamalari
                </h3>
              </div>


              {activeTab === "footer" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {['uz', 'ru', 'en'].map(lang => (
                        <div key={lang} className="p-8 bg-gray-50/30 rounded-3xl border border-gray-100 space-y-4">
                           <div className="flex items-center gap-3 mb-2">
                             <div className="w-8 h-8 bg-burgundy rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase">{lang}</div>
                             <span className="text-[11px] font-black uppercase text-gray-900 tracking-widest">Footer Tavsifi ({lang})</span>
                           </div>
                           <textarea 
                             value={content.footer_desc?.[lang] || ""}
                             onChange={(e) => handleUpdate("footer_desc", lang, e.target.value)}
                             className="w-full bg-white border border-gray-100 rounded-2xl p-4 h-24 resize-none outline-none focus:ring-4 focus:ring-burgundy/5 transition-all font-medium text-gray-600"
                           />
                        </div>
                     ))}
                   </div>

                   <div className="h-px bg-gray-50 my-6" />

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {['uz', 'ru', 'en'].map(lang => (
                        <SectionField 
                          key={lang}
                          label={`Manzil (${lang.toUpperCase()})`}
                          value={content.footer_address?.[lang] || ""}
                          onChange={(v) => handleUpdate("footer_address", lang, v)}
                        />
                      ))}
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <SectionField label="Telefon 1" value={content.phone_1 || ""} onChange={(v) => setContent({...content, phone_1: v})} />
                      <SectionField label="Instagram URL" value={content.instagram_url || ""} onChange={(v) => setContent({...content, instagram_url: v})} />
                   </div>
                </div>
              )}

              {activeTab === "hero" && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                   <div className="grid grid-cols-1 gap-10">
                     {/* Titles */}
                     <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                           <Layout size={20} className="text-burgundy" />
                           <span className="text-xs font-black text-gray-900 uppercase tracking-widest italic">Hero Sarlavhalari</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {['uz', 'ru', 'en'].map(lang => (
                             <SectionField 
                               key={lang}
                               label={`Sarlavha (${lang.toUpperCase()})`}
                               value={content.hero_title?.[lang] || ""}
                               onChange={(v) => handleUpdate("hero_title", lang, v)}
                             />
                           ))}
                        </div>
                     </div>

                     {/* Descriptions */}
                     <div className="p-10 bg-gray-50/20 rounded-[2.5rem] border border-gray-100 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                           <Type size={20} className="text-burgundy" />
                           <span className="text-xs font-black text-gray-900 uppercase tracking-widest italic">Hero Ta'riflari</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           {['uz', 'ru', 'en'].map(lang => (
                             <div key={lang} className="space-y-3">
                               <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest italic ml-2">Ta'rif ({lang})</label>
                               <textarea 
                                 value={content.hero_desc?.[lang] || ""}
                                 onChange={(e) => handleUpdate("hero_desc", lang, e.target.value)}
                                 className="w-full bg-white border border-gray-100 rounded-2xl p-5 h-28 resize-none outline-none focus:ring-4 focus:ring-burgundy/5 transition-all font-medium text-gray-600"
                               />
                             </div>
                           ))}
                        </div>
                     </div>
                   </div>
                </div>
              )}

              {activeTab === "about" && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20">
                   {/* 1. Asosiy Header va Ta'rif (Home Page Block) */}
                   <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/5 space-y-10">
                      <div className="flex items-center gap-3">
                         <Layout size={20} className="text-burgundy" />
                         <span className="text-xs font-black text-gray-900 uppercase tracking-widest italic tracking-widest text-burgundy">Asosiy sahifa va sarlavhalar</span>
                      </div>
                      
                      {/* Title & Tagline Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-gray-50 pb-10">
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-2">Kichik Sarlavha (Tagline)</label>
                            <div className="grid grid-cols-1 gap-4">
                               {['uz', 'ru', 'en'].map(lang => (
                                 <SectionField 
                                   key={lang}
                                   label={`Tagline (${lang})`}
                                   value={content.about_tagline?.[lang] || ""}
                                   onChange={(v) => handleUpdate("about_tagline", lang, v)}
                                 />
                               ))}
                            </div>
                         </div>
                         <div className="space-y-4 border-l border-gray-50 pl-10">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-2">Asosiy Sarlavha (Sahifaning asosiy nomi)</label>
                            <div className="grid grid-cols-1 gap-4">
                               {['uz', 'ru', 'en'].map(lang => (
                                 <SectionField 
                                   key={lang}
                                   label={`Sarlavha (${lang})`}
                                   value={content.about_title?.[lang] || ""}
                                   onChange={(v) => handleUpdate("about_title", lang, v)}
                                 />
                               ))}
                            </div>
                         </div>
                      </div>

                      {/* Summary Row */}
                      <div className="space-y-6">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-2 text-burgundy">Kompaniya haqida qisqacha ta'rif (Description)</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {['uz', 'ru', 'en'].map(lang => (
                              <div key={lang} className="space-y-4">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{lang}</label>
                                <textarea 
                                  value={content.about_summary?.[lang] || ""}
                                  onChange={(e) => handleUpdate("about_summary", lang, e.target.value)}
                                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-6 h-48 resize-none outline-none focus:ring-4 focus:ring-burgundy/5 transition-all font-medium text-gray-700 leading-relaxed"
                                  placeholder={`${lang} tilda ta'rif...`}
                                />
                              </div>
                          ))}
                        </div>
                      </div>

                      <div className="h-px bg-gray-100" />

                      {/* Image Row */}
                      <div className="space-y-4">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-2">Asosiy rasm (Home About Image)</label>
                        <div className="flex gap-4">
                           <input
                             type="text"
                             value={content.about_image || ""}
                             onChange={(v) => setContent({ ...content, about_image: v.target.value })}
                             className="flex-1 px-8 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium text-gray-900 focus:ring-4 focus:ring-burgundy/5 transition-all"
                             placeholder="Rasm URL manzili..."
                           />
                           <label className="w-16 h-14 bg-burgundy/5 text-burgundy border-2 border-dashed border-burgundy/20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-burgundy hover:text-white transition-all shrink-0">
                              <ImageIcon size={24} />
                              <input type="file" className="hidden" onChange={(e) => handleFileUpload('about_image', e)} />
                           </label>
                        </div>
                      </div>
                   </div>

                   {/* Other Page Sections Below */}

                   {/* History Section */}
                   <div className="p-10 bg-gray-50/30 rounded-[2.5rem] border border-gray-100 space-y-8">
                      <div className="flex items-center gap-3">
                         <FileText size={20} className="text-burgundy" />
                         <span className="text-xs font-black text-gray-900 uppercase tracking-widest italic tracking-widest">Bizning tariximiz bo'limi</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {['uz', 'ru', 'en'].map(lang => (
                            <div key={lang} className="space-y-4">
                               <SectionField 
                                label={`Tariximiz Sarlavhasi (${lang.toUpperCase()})`} 
                                value={content.about_story_title?.[lang] || ""} 
                                onChange={(v) => handleUpdate("about_story_title", lang, v)}
                              />
                               <div className="space-y-3">
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest italic ml-2">Tariximiz matni ({lang})</label>
                                  <textarea 
                                    value={content.about_story_text?.[lang] || ""}
                                    onChange={(e) => handleUpdate("about_story_text", lang, e.target.value)}
                                    className="w-full bg-white border border-gray-100 rounded-2xl p-4 h-40 resize-none outline-none focus:ring-4 focus:ring-burgundy/5 transition-all font-medium text-gray-600"
                                  />
                               </div>
                            </div>
                         ))}
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="space-y-4">
                         <label className="block text-[11px] font-black text-gray-900 uppercase tracking-widest italic ml-2">Tariximiz Rasmi</label>
                         <div className="flex gap-4">
                            <input
                              type="text"
                              value={content.about_story_image || ""}
                              onChange={(v) => setContent({ ...content, about_story_image: v.target.value })}
                              className="flex-1 px-8 py-4 bg-white border border-gray-100 rounded-2xl outline-none font-medium text-gray-900"
                              placeholder="URL..."
                            />
                            <label className="w-16 h-14 bg-burgundy/5 text-burgundy border-2 border-dashed border-burgundy/20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-burgundy hover:text-white transition-all shrink-0">
                               <Plus size={24} />
                               <input type="file" className="hidden" onChange={(e) => handleFileUpload('about_story_image', e)} />
                            </label>
                         </div>
                      </div>
                   </div>

                   {/* Values Grid */}
                   <div className="space-y-6">
                      <div className="flex items-center gap-3">
                         <ShieldCheck size={20} className="text-burgundy" />
                         <span className="text-xs font-black text-gray-900 uppercase tracking-widest italic tracking-widest">Qadriyatlarimiz (3 ta card)</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {[1, 2, 3].map(num => (
                           <div key={num} className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm space-y-6">
                              <span className="text-[10px] font-black text-burgundy uppercase tracking-widest">Qadriyat {num}</span>
                              {['uz', 'ru', 'en'].map(lang => (
                                <div key={lang} className="space-y-4 pt-2 border-t border-gray-50">
                                   <SectionField 
                                      label={`Nomi (${lang})`} 
                                      value={content[`about_v${num}_title`]?.[lang] || ""} 
                                      onChange={(v) => handleUpdate(`about_v${num}_title`, lang, v)}
                                   />
                                   <SectionField 
                                      label={`Tavsifi (${lang})`} 
                                      value={content[`about_v${num}_text`]?.[lang] || ""} 
                                      onChange={(v) => handleUpdate(`about_v${num}_text`, lang, v)}
                                   />
                                </div>
                              ))}
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Brand Promise Banner */}
                   <div className="p-10 bg-gray-900 rounded-[3rem] text-white space-y-8">
                      <div className="flex items-center gap-3 mb-2">
                         <Layout size={20} className="text-gold" />
                         <span className="text-xs font-black text-gold uppercase tracking-widest italic tracking-widest">Pastki Banner (Brand Promise)</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                         {['uz', 'ru', 'en'].map(lang => (
                           <div key={lang} className="space-y-4">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-bold text-gold/60 uppercase tracking-widest">{lang} Sarlavha</label>
                                 <input 
                                   value={content.about_cta_title?.[lang] || ""}
                                   onChange={(e) => handleUpdate("about_cta_title", lang, e.target.value)}
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-gold/50 transition-all font-bold"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-bold text-gold/60 uppercase tracking-widest">{lang} Matn</label>
                                 <textarea 
                                   value={content.about_cta_text?.[lang] || ""}
                                   onChange={(e) => handleUpdate("about_cta_text", lang, e.target.value)}
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 h-24 resize-none outline-none focus:border-gold/50 transition-all text-sm font-medium"
                                 />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SectionField({ label, value, onChange, isTextArea }: { label: string, value: string, onChange: (v: string) => void, isTextArea?: boolean }) {
  return (
    <div className="space-y-3 group">
      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-burgundy transition-colors">{label}</label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/30 focus:bg-white outline-none transition-all font-medium text-gray-900 min-h-[120px]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/30 focus:bg-white outline-none transition-all font-medium text-gray-900"
        />
      )}
    </div>
  );
}
