"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Bell, 
  User,
  ChevronDown
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-30 shadow-sm shadow-gray-100/5">
      {/* Search - Mobile'da yashiriladi */}
      <div className="hidden md:flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl w-full max-w-sm border border-gray-100 focus-within:ring-4 focus-within:ring-burgundy/5 transition-all">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Qidiruv..." 
          className="bg-transparent border-none outline-none text-sm font-bold w-full"
        />
      </div>

      {/* O'ng tomon */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-gray-400 hover:text-burgundy hover:bg-gray-50 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-[1px] bg-gray-100 mx-1 md:mx-2 hidden sm:block" />

        <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] md:text-[12px] font-black text-gray-900 uppercase italic leading-tight">Admin User</p>
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Boshqaruvchi</p>
          </div>
          <button className="w-10 h-10 md:w-12 md:h-12 bg-burgundy/5 text-burgundy rounded-xl flex items-center justify-center hover:bg-burgundy hover:text-white transition-all shadow-sm">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
