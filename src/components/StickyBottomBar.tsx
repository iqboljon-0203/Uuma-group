"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/cart-context";
import { formatPrice } from "@/data/products";

import { useLang } from "@/store/lang-context";

export default function StickyBottomBar() {
  const { t } = useLang();
  const { totalCount, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {totalCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[40] md:hidden glass border-t border-gray-200/50 px-6 py-4 flex items-center justify-between shadow-2xl"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-burgundy opacity-60">
              {totalCount} {t.cart.items}
            </span>
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-2 bg-burgundy hover:bg-burgundy-dark text-white rounded-xl px-5 py-3 text-sm font-bold shadow-lg shadow-burgundy/20"
          >
            {t.cart.viewCart}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
