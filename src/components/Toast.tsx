"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/store/toast-context";

export default function Toast() {
  const { message, visible } = useToast();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className="fixed bottom-24 left-1/2 z-[9999] px-6 py-4 bg-[#1A1A1A] text-white rounded-2xl shadow-2xl flex items-center gap-3 border border-white/5 backdrop-blur-md min-w-[320px] md:min-w-[400px]"
        >
          <div className="w-6 h-6 rounded-full bg-burgundy flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight">{message}</span>
          
          {/* Progress Bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 2.5, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-burgundy rounded-b-2xl origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
