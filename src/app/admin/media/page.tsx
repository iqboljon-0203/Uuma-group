"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Copy, 
  Check,
  Search,
  Grid,
  List
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function MediaAdmin() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState("");
  const [search, setSearch] = useState("");

  const bucketName = 'products'; // Default bucket

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    setLoading(true);
    const { data, error } = await supabase.storage.from(bucketName).list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    });

    if (data) {
      const filesWithUrls = data.map(file => ({
        ...file,
        url: supabase.storage.from(bucketName).getPublicUrl(file.name).data.publicUrl
      }));
      setFiles(filesWithUrls);
    }
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(bucketName).upload(fileName, file);

    if (error) {
      alert("Xatolik yuz berdi: " + error.message);
    } else {
      fetchFiles();
    }
    setUploading(false);
  }

  async function handleDelete(name: string) {
    if (!confirm("Haqiqatan ham o'chirmoqchimisiz?")) return;
    await supabase.storage.from(bucketName).remove([name]);
    fetchFiles();
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 2000);
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tighter mb-4 italic uppercase">Media Kutubxonasi</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] italic">Barcha rasmlar va fayllarni boshqarish</p>
        </div>
        
        <label className="flex items-center gap-4 bg-burgundy text-white px-10 py-5 rounded-[2.5rem] font-bold shadow-2xl shadow-burgundy/20 hover:scale-[1.05] active:scale-[0.95] transition-all cursor-pointer group uppercase tracking-widest text-sm">
          {uploading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Upload size={20} strokeWidth={3} />}
          {uploading ? "Yuklanmoqda..." : "Yangi rasm yuklash"}
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
        </label>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
         <div className="relative group w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-burgundy transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Fayl nomini qidiring..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-[2rem] py-5 pl-14 pr-6 font-bold text-gray-900 shadow-xl shadow-gray-200/10 outline-none focus:ring-4 focus:ring-burgundy/5 transition-all"
            />
         </div>
         <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest bg-white px-6 py-4 rounded-2xl border border-gray-50 italic">
            {filteredFiles.length} ta fayl topildi
         </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-32">
          <div className="w-16 h-16 border-4 border-burgundy border-t-transparent rounded-full animate-spin shadow-2xl"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredFiles.map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/10 hover:shadow-2xl hover:border-burgundy/20 transition-all group relative"
            >
              <div className="relative aspect-square bg-cream/30 overflow-hidden">
                 <Image src={file.url} alt={file.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" unoptimized />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => copyToClipboard(file.url)}
                      className="w-12 h-12 bg-white text-gray-900 rounded-2xl flex items-center justify-center hover:bg-burgundy hover:text-white transition-all shadow-xl"
                      title="Nusxalash"
                    >
                      {copied === file.url ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                    <button 
                      onClick={() => handleDelete(file.name)}
                      className="w-12 h-12 bg-white text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-xl"
                      title="O'chirish"
                    >
                      <Trash2 size={20} />
                    </button>
                 </div>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-black text-gray-900 truncate uppercase tracking-widest">{file.name.split('-').slice(1).join('-') || file.name}</p>
                <p className="text-[9px] font-bold text-gray-400 mt-1 italic uppercase tracking-widest">{(file.metadata.size / 1024).toFixed(1)} KB</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {filteredFiles.length === 0 && !loading && (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/10">
           <ImageIcon size={64} className="mx-auto text-gray-100 mb-6" />
           <p className="text-gray-400 font-black uppercase tracking-widest text-xs italic">Hech qanday fayl topilmadi</p>
        </div>
      )}
    </div>
  );
}
