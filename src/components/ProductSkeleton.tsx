"use client";

import { motion } from "framer-motion";

/**
 * ProductSkeleton component renders an animated placeholder for product cards.
 * Used to improve perceived performance during initial load or filtering.
 */
export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse">
      {/* Image Placeholder */}
      <div className="relative h-56 w-full bg-gray-100/80" />
      
      {/* Info Placeholder */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand */}
        <div className="w-16 h-3 bg-gray-100 rounded mb-2" />
        
        {/* Title */}
        <div className="w-full h-4 bg-gray-100 rounded mb-2" />
        <div className="w-2/3 h-4 bg-gray-100 rounded mb-4" />
        
        {/* Volume */}
        <div className="w-12 h-3 bg-gray-100 rounded mb-6" />
        
        {/* Bottom Bar */}
        <div className="flex items-center justify-between mt-auto">
          <div className="w-20 h-5 bg-gray-100 rounded" />
          <div className="w-24 h-9 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
