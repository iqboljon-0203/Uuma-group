"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "text-burgundy" }: LogoProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${className}`}
    >
      <svg width="220" height="66" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-12 md:h-14">
        <path d="M40 5L75 25V55L40 75L5 55V25L40 5Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M40 10L70 27V53L40 70L10 53V27L40 10Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        
        <path d="M35 35C35 32 37 32 37 30V26H43V30C43 32 45 32 45 35C45 42 45 48 45 52C45 58 35 58 35 52C35 48 35 42 35 35Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M38 45C38 43 42 43 42 45C42 48 38 48 38 45Z" stroke="currentColor" strokeWidth="1" fill="none"/>
        
        <path d="M52 35V28H56L58 30M52 35C52 32 54 32 54 30M52 35H56V50C56 53 52 53 52 50V35Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M56 28H58V26H56V28Z" fill="currentColor"/>
        
        <path d="M28 38C28 35 30 35 30 33V30H34V33C34 35 36 35 36 38V50C36 53 28 53 28 50V38Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>

        <text x="82" y="38" fill="currentColor" style={{ fontFamily: 'var(--font-outfit), Arial, sans-serif', fontWeight: 800, fontSize: '22px', letterSpacing: '1px' }}>UUMA GROUP</text>
        <text x="82" y="60" fill="currentColor" style={{ fontFamily: 'var(--font-outfit), Arial, sans-serif', fontWeight: 600, fontSize: '18px', letterSpacing: '2px' }}>COMPANY</text>
      </svg>
    </motion.div>
  );
}
