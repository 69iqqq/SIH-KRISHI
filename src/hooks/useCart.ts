import { useEffect, useMemo, useState } from 'react';

export type CartItem = {
  id: number | string;
  name: string;
  nameML?: string;
  price: number; // unit price
  unit?: string;
  unitML?: string;
  quantity: number; // quantity in cart
};

const STORAGE_KEY = 'cart:v1';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [items]);

  const count = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.quantity, 0), [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeItem = (id: number | string) => setItems((prev) => prev.filter((x) => x.id !== id));

  const updateQuantity = (id: number | string, qty: number) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, quantity: Math.max(0, qty) } : x))
        .filter((x) => x.quantity > 0)
    );
  };

  const clear = () => setItems([]);

  return { items, count, total, addItem, removeItem, updateQuantity, clear };
}
