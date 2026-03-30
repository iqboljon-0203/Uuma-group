"use client";

import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/data/products";
import { useCart, CartProvider } from "@/store/cart-context";
import { ToastProvider, useToast } from "@/store/toast-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import StickyBottomBar from "@/components/StickyBottomBar";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useLang } from "@/store/lang-context";

export default function CartPageWrapper() {
  return <CartPage />;
}

function CartPage() {
  const { t } = useLang();
  const { items, updateQty, removeItem, clearCart, totalPrice, totalCount } = useCart();
  const { show } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  const getProductName = (product: any) => {
    if (product.id === 2) return t.product.names.belizna;
    if (product.id === 4) return t.product.names.soap;
    if (product.id === 7) return t.product.names.basket;
    return product.name;
  };

  const handleOrder = async () => {
    const { name, phone, address } = formData;
    if (!name || !phone || !address) {
      show(t.checkout.error);
      return;
    }

    let message = `${t.checkout.telegram.header}\n\n`;
    message += `${t.checkout.telegram.name}: ${name}\n`;
    message += `${t.checkout.telegram.phone}: ${phone}\n`;
    message += `${t.checkout.telegram.address}: ${address}\n\n`;
    message += `${t.checkout.telegram.products}\n`;

    items.forEach((item) => {
      message += `• ${getProductName(item.product)} (${item.product.volume}) × ${item.qty} = ${formatPrice(
        item.product.price * item.qty,
        t.cart.currency
      )}\n`;
    });

    message += `\n${t.checkout.telegram.total}: ${formatPrice(totalPrice, t.cart.currency)}*`;

    try {
      show("Buyurtma yuborilmoqda...");
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name,
          customer_phone: phone,
          customer_address: address,
          items: items.map(i => ({ id: i.product.id, name: getProductName(i.product), qty: i.qty, size: i.product.volume })),
          total_amount: totalPrice,
          message: message
        }),
      });

      const result = await response.json();
      if (result.success) {
        show(t.checkout.success);
        clearCart(); // Savatni tozalaymiz
        setTimeout(() => window.location.href = "/", 2000);
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      console.error(err);
      show("Xato yuz berdi. Iltimos qaytadan urinib ko'ring.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24 bg-cream overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-12">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-burgundy font-semibold uppercase tracking-widest text-xs mb-4 block"
            >
              {t.nav.cart}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            >
              {t.cart.title}
            </motion.h1>
          </div>

          {totalCount === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-32 text-center"
            >
              <div className="w-24 h-24 bg-burgundy/5 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.cart.empty}</h2>
              <p className="text-gray-500 mb-8 max-w-[320px] mx-auto">{t.cart.empty}</p>
              <Link
                href="/catalog"
                className="btn--lg bg-burgundy hover:bg-burgundy-dark text-white rounded-xl font-bold px-8 py-5 shadow-2xl shadow-burgundy/20 inline-block"
              >
                {t.cart.toCatalog}
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
              {/* Item List */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence mode="popLayout">
                  {items.map((item, idx) => (
                    <motion.div
                      key={`${item.product.id}-${item.product.volume}-${idx}`}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="bg-white p-5 rounded-2xl flex items-center gap-6 shadow-xl shadow-gray-200/50 border border-gray-100/50 group"
                    >
                      <div className="relative w-20 h-20 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-grow">
                        <span className="text-[10px] font-bold text-burgundy uppercase tracking-widest mb-1 block">
                          {item.product.brand}
                        </span>
                        <h4 className="text-base font-bold text-gray-900 mb-1 leading-tight">
                          {getProductName(item.product)}
                        </h4>
                        <span className="text-xs text-gray-500">{item.product.volume}</span>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-lg">
                          <button
                            onClick={() => updateQty(item.product.id, -1, item.product.volume)}
                            className="w-8 h-8 flex items-center justify-center font-bold text-gray-900 hover:text-burgundy transition-colors"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold min-w-[20px] text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.product.id, 1, item.product.volume)}
                            className="w-8 h-8 flex items-center justify-center font-bold text-gray-900 hover:text-burgundy transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-base font-extrabold text-[#1A1A1A]">
                          {formatPrice(item.product.price * item.qty, t.cart.currency)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.product.volume)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Checkout Form */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-2xl shadow-burgundy/5 border border-gray-100 flex flex-col gap-6"
              >
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">{t.checkout.title}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{t.checkout.name}</label>
                    <input
                      type="text"
                      placeholder={t.checkout.namePlaceholder}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-cream border-2 border-transparent focus:border-burgundy px-5 py-4 rounded-xl text-sm font-medium outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{t.checkout.phone}</label>
                    <input
                      type="tel"
                      placeholder={t.checkout.phonePlaceholder}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-cream border-2 border-transparent focus:border-burgundy px-5 py-4 rounded-xl text-sm font-medium outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{t.checkout.address}</label>
                    <textarea
                      placeholder={t.checkout.addressPlaceholder}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full bg-cream border-2 border-transparent focus:border-burgundy px-5 py-4 rounded-xl text-sm font-medium outline-none transition-all placeholder:text-gray-300 resize-none"
                    />
                  </div>
                </div>

                <div className="h-[1px] bg-gray-100 w-full mt-4" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-bold text-sm">{t.cart.total}:</span>
                  <span className="text-2xl font-extrabold text-burgundy tracking-tight">{formatPrice(totalPrice, t.cart.currency)}</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOrder}
                  className="w-full bg-burgundy hover:bg-burgundy-dark text-white rounded-xl font-bold flex items-center justify-center gap-3 px-8 py-5 shadow-2xl shadow-burgundy/30 transition-all text-sm uppercase tracking-wider"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.49.99-.74 3.88-1.69 6.47-2.8 7.77-3.32 3.69-1.48 4.45-1.74 4.95-1.75.11 0 .35.03.5.16.14.12.18.28.2.46-.02.04-.01.12-.02.16z"/>
                  </svg>
                  {t.checkout.submit}
                </motion.button>
                <p className="text-[10px] text-gray-400 font-medium text-center uppercase tracking-widest">{t.checkout.confirmNote}</p>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <Toast />
      <StickyBottomBar />
    </div>
  );
}
