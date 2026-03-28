"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 border border-gray-100"
      >
        <div className="flex justify-center mb-10">
          <Logo className="w-48 h-auto" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-500 text-center text-sm mb-10 font-medium">Iltimos, tizimga kiring</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none transition-all font-medium"
              placeholder="admin@uuma.uz"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-200 rounded-lg bg-white peer-checked:bg-burgundy peer-checked:border-burgundy transition-all duration-300 group-hover:border-burgundy/30" />
                <svg
                  className="absolute left-1 top-1 w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform duration-300"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-burgundy transition-colors">Eslab qolish</span>
            </label>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 italic">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-burgundy text-white rounded-2xl font-bold shadow-xl shadow-burgundy/20 hover:bg-burgundy-dark hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Kirilmoqda..." : "Kirish"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
