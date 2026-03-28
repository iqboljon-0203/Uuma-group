"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Camera, 
  Image as ImageIcon, 
  Plus, 
  Save, 
  RefreshCw,
  Trash2,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function InstagramAdmin() {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    setLoading(true);
    const keys = ["insta_img_1", "insta_img_2", "insta_img_3", "insta_img_4", "insta_img_5", "insta_img_6"];
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .in('key', keys);
    
    if (data && data.length > 0) {
      const dbContent = { ...content };
      data.forEach(item => {
        dbContent[item.key] = item.content;
      });
      setContent(dbContent);
    }
    setLoading(false);
  }

  async function handleFileUpload(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `instagram/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('products').upload(fileName, file);

    if (data) {
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
      setContent((prev: any) => ({ ...prev, [key]: publicUrl }));
    }
  }

  async function saveGallery() {
    setSaving(true);
    try {
      // 1. Prepare data (including empty strings to clear the DB slots)
      const updates = Object.entries(content).map(([key, value]) => ({
        key,
        content: value || "" // Empty string will be saved to DB
      }));

      // 2. Perform upserts with explicit conflict handling
      for (const update of updates) {
         const { error } = await supabase
           .from('site_content')
           .upsert(update, { onConflict: 'key' });
           
         if (error) throw error;
      }
      
      alert("Galereya muvaffaqiyatli saqlandi!");
      // 3. Refresh display
      await fetchContent();
    } catch (err: any) {
      console.error(err);
      alert("Xatolik yuz berdi: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-burgundy/20 border-t-burgundy rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 md:space-y-12 pb-20 mt-10 lg:mt-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tighter mb-4 italic uppercase">Instagram Lavhalar</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-[11px] italic">Asosiy sahifadagi 6 ta rasm gallereyasini boshqaring</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={fetchContent}
            className="p-4 md:p-5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-burgundy transition-all shadow-sm"
          >
            <RefreshCw size={22} className={loading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={saveGallery}
            disabled={saving}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-burgundy text-white px-6 md:px-10 py-4 md:py-5 rounded-[2.5rem] font-black shadow-2xl shadow-burgundy/30 hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-sm disabled:opacity-50"
          >
            {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? "Saqlanmoqda..." : "Galereyani saqlash"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6].map(num => {
          const key = `insta_img_${num}`;
          const currentImg = content[key];

          return (
            <motion.div 
              key={num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: num * 0.1 }}
              className="group bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/10 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/40 transition-all p-4"
            >
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 mb-6">
                {currentImg ? (
                  <>
                    <Image 
                      src={currentImg} 
                      alt={`Instagram ${num}`} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                       <button 
                        onClick={() => window.open(currentImg, '_blank')}
                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/40 transition-all"
                       >
                          <ExternalLink size={20} />
                       </button>
                       <button 
                        onClick={() => setContent({ ...content, [key]: "" })}
                        className="w-12 h-12 bg-red-500/80 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-red-600 transition-all"
                       >
                          <Trash2 size={20} />
                       </button>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-200 space-y-4">
                    <Camera size={64} strokeWidth={1} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Rasm yuklanmagan</span>
                  </div>
                )}
              </div>

              <div className="px-4 pb-4 space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-burgundy uppercase tracking-widest italic tracking-widest">Lavha 0{num}</span>
                </div>
                
                <div className="flex gap-3">
                   <input
                      type="text"
                      value={currentImg || ""}
                      onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                      className="flex-1 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-bold outline-none focus:ring-4 focus:ring-burgundy/5 transition-all"
                      placeholder="Rasm URL manzili..."
                   />
                   <label className="w-14 h-14 bg-burgundy/5 text-burgundy border-2 border-dashed border-burgundy/20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-burgundy hover:text-white transition-all shrink-0">
                      <Plus size={24} strokeWidth={3} />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(key, e)} accept="image/*" />
                   </label>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
