"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/store/cart-context";
import { useToast } from "@/store/toast-context";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { show } = useToast();
  const [selectedVolume, setSelectedVolume] = useState(product.volume);
  const isPremium = product.tier === "premium";

  const handleAddToCart = () => {
    addItem(product);
    show(`${product.name} savatga qo'shildi!`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl border flex flex-col ${
        isPremium ? "border-gold/50 gradient-border p-[1px]" : "border-[#E8E5E0]"
      }`}
    >
      <div className={`relative flex flex-col h-full w-full bg-white rounded-[15px] overflow-hidden`}>
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.badge && (
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                isPremium
                  ? "bg-gradient-to-r from-gold to-rose-gold text-white"
                  : "bg-burgundy text-white"
              }`}
            >
              {product.badge}
            </motion.span>
          )}
        </div>

        {/* Image */}
        <div className={`relative h-56 w-full flex items-center justify-center p-6 ${
          isPremium ? "bg-gradient-to-br from-[#FFFCF0] to-[#FFF8E7]" : "bg-[#FAFAFA]"
        }`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-full h-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-burgundy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-grow">
          <span className="text-[10px] font-semibold text-burgundy uppercase tracking-widest mb-1 block">
            {product.brand}
          </span>
          <h3 className="text-base font-semibold text-gray-900 mb-2 leading-tight min-h-[40px]">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-4">{selectedVolume}</p>

          {/* Size Switcher or Placeholder */}
          <div className="min-h-[32px] mb-4">
            {product.sizes.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVolume(size);
                    }}
                    className={`whitespace-nowrap px-3 py-1 text-[10px] font-medium border rounded-md transition-all ${
                      selectedVolume === size
                        ? "border-burgundy text-burgundy bg-burgundy/5"
                        : "border-gray-200 text-gray-500 hover:border-burgundy/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="px-4 py-2 bg-burgundy text-white rounded-lg text-xs font-semibold flex items-center gap-2 hover:bg-burgundy-dark transition-colors shadow-lg shadow-burgundy/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Savatga
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
