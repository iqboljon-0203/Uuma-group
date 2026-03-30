"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number, volume?: string) => void;
  updateQty: (productId: number, delta: number, volume?: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("uuma-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("uuma-cart", JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      // Find if item with same ID AND same Volume already in cart
      const existing = prev.find((i) => i.product.id === product.id && i.product.volume === product.volume);
      if (existing) {
        return prev.map((i) =>
          (i.product.id === product.id && i.product.volume === product.volume) ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: number, volume?: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.product.volume === volume)));
  }, []);

  const updateQty = useCallback((productId: number, delta: number, volume?: string) => {
    setItems((prev) => {
      return prev
        .map((i) =>
          (i.product.id === productId && i.product.volume === volume) ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0);
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
