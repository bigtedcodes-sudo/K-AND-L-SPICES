'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductSKU } from '@/data/catalog';
import { CartItem } from '@/lib/whatsapp';

interface CartContextType {
  items: CartItem[];
  addItem: (product: ProductSKU, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSimulatorOpen: boolean;
  setIsSimulatorOpen: (open: boolean) => void;
  simulatorData: { url: string; rawText: string; title?: string };
  openSimulator: (data: { url: string; rawText: string; title?: string }) => void;
  totalItems: number;
  subtotal: number;
  lastAddedName: string | null;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'kl_spices_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);
  const [simulatorData, setSimulatorData] = useState<{
    url: string;
    rawText: string;
    title?: string;
  }>({
    url: '',
    rawText: '',
  });

  // Hydrate cart from localStorage asynchronously after mount to prevent hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setItems(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
      setIsHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync cart to localStorage whenever items change (only after initial hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isHydrated]);

  const addItem = (product: ProductSKU, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setLastAddedName(product.name);
    setTimeout(() => setLastAddedName(null), 3000);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openSimulator = (data: { url: string; rawText: string; title?: string }) => {
    setSimulatorData(data);
    setIsSimulatorOpen(true);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isSimulatorOpen,
        setIsSimulatorOpen,
        simulatorData,
        openSimulator,
        totalItems,
        subtotal,
        lastAddedName,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
