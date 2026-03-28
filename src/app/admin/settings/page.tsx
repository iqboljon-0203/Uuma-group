"use client";

import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Save,
  Moon,
  Sun,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsAdmin() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);

  // Mock settings data
  const [profile, setProfile] = useState({
    name: "IQBOLJON2003.YULDASHEV",
    role: "Boshqaruvchi",
    email: "admin@uuma.uz"
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Sozlamalar saqlandi!");
    }, 1000);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tighter mb-4 italic uppercase">Tizim Sozlamalari</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] italic">Boshqaruv paneli va hisobingizni sozlang</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 bg-burgundy text-white px-10 py-5 rounded-[2.5rem] font-black shadow-2xl shadow-burgundy/30 hover:scale-[1.05] active:scale-[0.95] transition-all uppercase tracking-[0.2em] text-sm disabled:opacity-50"
        >
          {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} strokeWidth={3} />}
          {saving ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="space-y-4">
          {[
            { id: "profile", label: "Profil", icon: User },
            { id: "security", label: "Xavfsizlik", icon: Shield },
            { id: "general", label: "Umumiy", icon: Globe },
            { id: "notifications", label: "Bildirishnomalar", icon: Bell },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-8 py-6 rounded-[2rem] font-black transition-all text-sm uppercase tracking-widest ${
                activeTab === tab.id 
                ? "bg-burgundy text-white shadow-2xl shadow-burgundy/20 scale-105" 
                : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={20} strokeWidth={activeTab === tab.id ? 3 : 2} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/20 overflow-hidden"
          >
            <div className="p-10 md:p-14 space-y-12">
              {activeTab === "profile" && (
                <div className="space-y-10">
                  <div className="flex items-center gap-8">
                     <div className="w-24 h-24 bg-cream rounded-[2rem] flex items-center justify-center text-burgundy text-3xl font-black shadow-inner">
                        {profile.name[0]}
                     </div>
                     <div className="space-y-2">
                        <button className="text-xs font-black text-burgundy uppercase tracking-widest hover:underline">Rasmni o'zgartirish</button>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Ruxsat etilgan: JPG, PNG. Max 2MB</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                    <InputField label="Ism Sharifingiz" value={profile.name} />
                    <InputField label="Lavozim" value={profile.role} />
                    <InputField label="Email Manzil" value={profile.email} />
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-10">
                   <div className="p-8 bg-red-50/30 rounded-[2.5rem] border border-red-100/50 flex items-center gap-6">
                      <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
                         <Lock size={20} />
                      </div>
                      <div>
                         <h4 className="font-extrabold text-gray-900 tracking-tight">Parolni yangilash</h4>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Oxirgi marta: 14 kun oldin</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputField label="Hozirgi parol" type="password" placeholder="••••••••" />
                      <div />
                      <InputField label="Yangi parol" type="password" placeholder="••••••••" />
                      <InputField label="Yangi parolni tasdiqlang" type="password" placeholder="••••••••" />
                   </div>
                </div>
              )}

              {activeTab === "general" && (
                <div className="space-y-10">
                   <div className="grid grid-cols-1 gap-12">
                      <div className="flex items-center justify-between p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100">
                         <div className="space-y-1">
                            <h4 className="font-extrabold text-gray-900 tracking-tight uppercase text-sm">Texnik ishlar rejimi (Maintenance)</h4>
                            <p className="text-xs font-medium text-gray-400 italic">Saytni vaqtincha foydalanuvchilar uchun yopish</p>
                         </div>
                         <button className="w-16 h-8 bg-gray-200 rounded-full relative">
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md" />
                         </button>
                      </div>

                      <div className="flex items-center justify-between p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100">
                         <div className="space-y-1">
                            <h4 className="font-extrabold text-gray-900 tracking-tight uppercase text-sm">Tungi rejim (Dark Mode)</h4>
                            <p className="text-xs font-medium text-gray-400 italic">Adminka paneli interfeysi uchun</p>
                         </div>
                         <button className="w-16 h-8 bg-burgundy rounded-full relative">
                            <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-md" />
                         </button>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, type = "text", placeholder = "" }: any) {
  return (
    <div className="space-y-4">
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic ml-2">{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-burgundy/5 outline-none font-bold text-gray-900 transition-all placeholder:text-gray-300"
      />
    </div>
  );
}
