"use client";

// ===== Chap Coffee — shared client store =====
// Single source of truth for the active drink selection, favourites, cart and
// transient toast. Favourites + cart persist to localStorage. Drink index /
// size index are intentionally in-memory (they describe the current browsing
// session, not saved data).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DRINKS, DRINKS_BY_ID, type Drink, type HistoryEntry } from "@/lib/drinks";

export interface CartLine {
  key: string;
  id: string;
  name: string;
  tagline: string;
  img: string;
  accent: string;
  size: string;
  price: number;
  qty: number;
}

interface StoreValue {
  // selection
  index: number;
  sizeIdx: number;
  activeDrink: Drink;
  setIndex: (i: number) => void;
  setIndexById: (id: string) => void;
  setSizeIdx: (i: number) => void;
  // favourites
  favs: Set<string>;
  favCount: number;
  toggleFav: (id: string) => void;
  // cart
  cart: CartLine[];
  cartCount: number;
  addToCart: (drink: Drink, sizeIdx?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  reorder: (entry: HistoryEntry) => void;
  // toast
  toast: { title: string; description?: string } | null;
  showToast: (title: string, description?: string) => void;
}

const FAVS_SEED = ["mocha", "caramel-macchiato"];
const FAVS_KEY = "chap.favs";
const CART_KEY = "chap.cart";

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [index, setIndexState] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [favs, setFavs] = useState<Set<string>>(() => new Set(FAVS_SEED));
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toast, setToast] = useState<{ title: string; description?: string } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- selection ----
  const setIndex = useCallback((i: number) => {
    setIndexState(i);
    setSizeIdx(0); // reset size whenever the drink changes
  }, []);

  const setIndexById = useCallback((id: string) => {
    const i = DRINKS.findIndex((d) => d.id === id);
    if (i >= 0) {
      setIndexState(i);
      setSizeIdx(0);
    }
  }, []);

  // ---- hydrate persisted state on mount ----
  useEffect(() => {
    try {
      const f = localStorage.getItem(FAVS_KEY);
      if (f) setFavs(new Set(JSON.parse(f) as string[]));
      const c = localStorage.getItem(CART_KEY);
      if (c) setCart(JSON.parse(c) as CartLine[]);
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // ---- persist (only after hydration, so we never clobber saved data) ----
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(FAVS_KEY, JSON.stringify([...favs]));
    } catch {}
  }, [favs, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated]);

  // ---- toast ----
  const showToast = useCallback((title: string, description?: string) => {
    setToast({ title, description });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // ---- favourites ----
  const toggleFav = useCallback((id: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ---- cart ----
  const addToCart = useCallback(
    (drink: Drink, sIdx = 0) => {
      const size = drink.sizes[sIdx];
      const key = `${drink.id}-${size.label}`;
      setCart((prev) => {
        const existing = prev.find((it) => it.key === key);
        if (existing) {
          return prev.map((it) =>
            it.key === key ? { ...it, qty: it.qty + 1 } : it,
          );
        }
        return [
          ...prev,
          {
            key,
            id: drink.id,
            name: drink.name,
            tagline: drink.tagline,
            img: drink.img,
            accent: drink.accent,
            size: size.label,
            price: size.price,
            qty: 1,
          },
        ];
      });
      showToast("Added to cart", `${drink.name} (${size.label}) added to your order.`);
    },
    [showToast],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((it) => it.key !== key)
        : prev.map((it) => (it.key === key ? { ...it, qty } : it)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((it) => it.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const reorder = useCallback(
    (entry: HistoryEntry) => {
      const drink = DRINKS_BY_ID[entry.id];
      if (!drink) return;
      const sIdx = Math.max(
        0,
        drink.sizes.findIndex((s) => s.label === entry.size),
      );
      addToCart(drink, sIdx);
    },
    [addToCart],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, it) => sum + it.qty, 0),
    [cart],
  );

  const value = useMemo<StoreValue>(
    () => ({
      index,
      sizeIdx,
      activeDrink: DRINKS[index],
      setIndex,
      setIndexById,
      setSizeIdx,
      favs,
      favCount: favs.size,
      toggleFav,
      cart,
      cartCount,
      addToCart,
      setQty,
      removeItem,
      clearCart,
      reorder,
      toast,
      showToast,
    }),
    [
      index,
      sizeIdx,
      favs,
      cart,
      cartCount,
      toast,
      setIndex,
      setIndexById,
      toggleFav,
      addToCart,
      setQty,
      removeItem,
      clearCart,
      reorder,
      showToast,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>");
  return ctx;
}
