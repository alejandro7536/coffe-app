"use client";

import { useState } from "react";
import { coffeeMenu, CartItem } from "./data/menu";
import CartDrawer from "./components/CartDrawer";
import Image from "next/image";
import { sileo } from "sileo";

/* ── Badge config per tag ─────────────────────────────────── */
const tagBadge: Record<string, { icon: string; label: string }> = {
  "Popular":      { icon: "★", label: "Viral"    },
  "Best Seller":  { icon: "♛", label: "Trending" },
  "Classic":      { icon: "◈", label: "Classic"  },
  "Trending":     { icon: "↑", label: "Rising"   },
  "Fan Favorite": { icon: "♥", label: "Fan Fav"  },
};

/* ── Page ─────────────────────────────────────────────────── */
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize,  setSelectedSize]  = useState(0);
  const [cartItems,     setCartItems]     = useState<CartItem[]>([]);
  const [cartOpen,      setCartOpen]      = useState(false);

  const coffee     = coffeeMenu[currentIndex];
  const prevCoffee = coffeeMenu[(currentIndex - 1 + coffeeMenu.length) % coffeeMenu.length];
  const nextCoffee = coffeeMenu[(currentIndex + 1) % coffeeMenu.length];
  const cartCount  = cartItems.reduce((s, i) => s + i.quantity, 0);
  const price      = coffee.price + coffee.sizes[selectedSize].priceModifier;
  const badge      = tagBadge[coffee.tags[0]] ?? { icon: "★", label: coffee.tags[0] };

  const navigate = (dir: 1 | -1) => {
    setCurrentIndex((i) => (i + dir + coffeeMenu.length) % coffeeMenu.length);
    setSelectedSize(0);
  };

  const addToCart = () => {
    const cartId = `${coffee.id}-${coffee.sizes[selectedSize].label}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing)
        return prev.map((i) => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { cartId, coffee, size: coffee.sizes[selectedSize], extras: [], quantity: 1, unitPrice: price }];
    });
    sileo.success({ title: "Added to cart", description: `${coffee.name} (${coffee.sizes[selectedSize].label}) has been added to your order. Confirm your selection when you're ready.` });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--surface)", position: "relative", overflow: "hidden" }}>
      <div className="ambient-bg" />

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 56px" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, var(--tertiary-container), var(--primary-container))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px" }}>☕</div>
          <span style={{ fontFamily: "var(--font-headline)", fontSize: "17px", fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.02em" }}>
            Chap<span style={{ color: "var(--primary-container)" }}> Coffee</span>
          </span>
        </div>

        {/* Links — hidden on mobile */}
        <div className="nav-links" style={{ display: "flex", gap: "36px" }}>
          {(["Menu", "Favourites", "History", "Profile"] as const).map((item) => (
            <button key={item} style={{ fontFamily: "var(--font-label)", fontSize: "14px", fontWeight: item === "Menu" ? 600 : 400, color: item === "Menu" ? "var(--on-surface)" : "var(--on-surface-variant)", background: "none", border: "none", borderBottom: item === "Menu" ? "2px solid var(--primary-container)" : "2px solid transparent", paddingBottom: "2px", cursor: "pointer", transition: "color 0.2s" }}>
              {item}
            </button>
          ))}
        </div>

        {/* Icons — hamburger included here so it groups naturally with cart on mobile */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="glass-icon-btn" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="glass-icon-btn" aria-label="Cart" onClick={() => setCartOpen(true)} style={{ position: "relative" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "18px", height: "18px", borderRadius: "50%", background: "var(--primary-container)", color: "#3E2723", fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-label)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
          {/* Hamburger — visible only on mobile, inside the icons group for proper justify-between */}
          <button className="nav-hamburger glass-icon-btn" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <main className="main-layout" style={{ flex: 1, position: "relative", zIndex: 1, display: "flex", alignItems: "center", padding: "0 56px 32px", gap: "0", maxWidth: "1440px", margin: "0 auto", width: "100%" }}>

        {/* LEFT COLUMN — display:contents on mobile so children participate in main-layout order */}
        <div className="left-col" style={{ flex: "0 0 50%", display: "flex", flexDirection: "column" }}>

          {/* sec-header: Eyebrow + heading */}
          <div className="sec-header">
            <p style={{ fontFamily: "var(--font-label)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--on-surface-variant)", marginBottom: "8px", opacity: 0.55 }}>
              What would you like to drink today?
            </p>
            <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(32px, 3.2vw, 46px)", fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "10px" }}>
              Coffee Selection
            </h1>
          </div>

          {/* sec-name: animated name + tagline */}
          <div key={coffee.id} className="animate-coffee-enter sec-name">
            <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "6px" }}>
              {coffee.name}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontStyle: "italic", color: "var(--primary-container)", marginBottom: "0" }}>
              {coffee.tagline}
            </p>
          </div>

          {/* sec-rating */}
          <div className="sec-rating" style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "12px", marginTop: "8px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--primary-container)">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "12px", fontWeight: 500, color: "var(--on-surface-variant)" }}>
              {coffee.rating} Score
            </span>
          </div>

          {/* sec-desc: description */}
          <div className="sec-desc">
            <p key={coffee.id + "-desc"} className="animate-coffee-enter" style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--on-surface-variant)", lineHeight: "21px", maxWidth: "380px", marginBottom: "24px" }}>
              {coffee.description}
            </p>
          </div>

          {/* sec-sizes: size selector */}
          <div className="sec-sizes">
            <p style={{ fontFamily: "var(--font-label)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", marginBottom: "10px", opacity: 0.7 }}>
              Select Size
            </p>
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              {coffee.sizes.map((size, i) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(i)}
                  style={{
                    padding: "11px 28px",
                    borderRadius: "var(--radius-full)",
                    fontFamily: "var(--font-label)",
                    fontSize: "14px",
                    fontWeight: 600,
                    background: selectedSize === i
                      ? "linear-gradient(135deg, var(--tertiary-container), var(--primary-container))"
                      : "rgba(40, 28, 22, 0.7)",
                    border: selectedSize === i ? "none" : "1.5px solid rgba(255,255,255,0.08)",
                    color: selectedSize === i ? "#3E2723" : "var(--on-surface-variant)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backdropFilter: selectedSize === i ? "none" : "blur(12px)",
                    WebkitBackdropFilter: selectedSize === i ? "none" : "blur(12px)",
                    boxShadow: selectedSize === i ? "0 4px 20px rgba(249,168,102,0.35)" : "none",
                  }}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* sec-price: price + badge */}
          <div className="sec-price" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", maxWidth: "400px" }}>
            <div>
              <p className="price-label" style={{ fontFamily: "var(--font-label)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-surface-variant)", marginBottom: "2px", opacity: 0.6 }}>Price</p>
              <p key={coffee.id + "-price"} className="animate-fade-in price-value" style={{ fontFamily: "var(--font-headline)", fontSize: "38px", fontWeight: 700, color: "var(--primary-container)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                ${price.toFixed(2)}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button className="glass-icon-btn" aria-label="Favourite" style={{ width: "42px", height: "42px", color: "var(--on-surface-variant)" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(249,168,102,0.1)", border: "1px solid rgba(249,168,102,0.22)", borderRadius: "var(--radius-full)", padding: "8px 16px 8px 12px" }}>
                <span style={{ fontSize: "16px", lineHeight: 1, color: "var(--primary-container)" }}>{badge.icon}</span>
                <span style={{ fontFamily: "var(--font-label)", fontSize: "13px", fontWeight: 600, color: "var(--primary-container)" }}>{badge.label}</span>
              </div>
            </div>
          </div>

          {/* sec-cta */}
          <div className="sec-cta">
            <button
              onClick={addToCart}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px 0 28px", height: "60px", background: "linear-gradient(135deg, var(--tertiary-container) 0%, var(--primary-container) 100%)", color: "#3E2723", fontFamily: "var(--font-headline)", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.01em", border: "none", borderRadius: "var(--radius-full)", cursor: "pointer", boxShadow: "0 8px 32px rgba(249,168,102,0.35)", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", width: "100%", maxWidth: "400px" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(249,168,102,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(249,168,102,0.35)"; }}
            >
              <span>Confirm Selection</span>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(62,39,35,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN – image ──────────────────────────────── */}
        <div className="sec-image" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", minHeight: "500px", isolation: "isolate" }}>

          {/* Outer ambient glow — reduced radius */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 55% at 50% 54%, rgba(249,168,102,0.30) 0%, rgba(249,168,102,0.08) 55%, transparent 72%)", pointerEvents: "none" }} />

          {/* Inner bright orb — tighter */}
          <div style={{ position: "absolute", width: "220px", height: "220px", top: "50%", left: "50%", transform: "translate(-50%, -46%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,180,80,0.60) 0%, rgba(249,140,30,0.30) 45%, transparent 75%)", filter: "blur(8px)", pointerEvents: "none" }} />

          {/* Coffee image — transparent PNG, glow shines through */}
          <div
            key={coffee.id + "-img"}
            className="animate-float animate-image-enter"
            style={{
              width: "min(380px, 88%)",
              height: "min(440px, 78vh)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Image src={coffee.image} alt={coffee.name} fill sizes="380px" style={{ objectFit: "contain" }} priority />
          </div>

          {/* Category icon — SVG only, no text */}
          <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 3, width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "rgba(40,28,22,0.65)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: coffee.category === "Iced" ? "#a0d8ef" : "#ffa38a" }}>
            <Image
              src={coffee.category === "Iced" ? "/images/ice.svg" : "/images/fire.svg"}
              alt={coffee.category}
              width={28}
              height={28}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Left edge arrow + prev name */}
          <div style={{ position: "absolute", left: "4px", top: "50%", transform: "translateY(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => navigate(-1)}
              style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(40,28,22,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--on-surface)", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary-container)"; e.currentTarget.style.background = "rgba(249,168,102,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.background = "rgba(40,28,22,0.75)"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "12px", fontWeight: 500, color: "var(--on-surface)", opacity: 0.85, whiteSpace: "nowrap" }}>
              {prevCoffee.name}
            </span>
          </div>

          {/* Right edge arrow + next name */}
          <div style={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => navigate(1)}
              style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(40,28,22,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--on-surface)", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary-container)"; e.currentTarget.style.background = "rgba(249,168,102,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.background = "rgba(40,28,22,0.75)"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "12px", fontWeight: 500, color: "var(--on-surface)", opacity: 0.85, whiteSpace: "nowrap" }}>
              {nextCoffee.name}
            </span>
          </div>

          {/* Dot indicators */}
          <div style={{ position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "5px", zIndex: 3 }}>
            {coffeeMenu.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIndex(i); setSelectedSize(0); }}
                style={{ width: i === currentIndex ? "20px" : "6px", height: "6px", borderRadius: "var(--radius-full)", background: i === currentIndex ? "var(--primary-container)" : "var(--outline-variant)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="app-footer" style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 56px", borderTop: "1px solid rgba(83,68,57,0.35)", opacity: 0.45 }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--on-surface-variant)" }}>© 2026 Chap Coffee. All rights reserved.</p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy Policy", "Terms of Service", "Contact Us"].map((l) => (
            <span key={l} style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--on-surface-variant)", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </footer>

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={(cartId) => {
          const item = cartItems.find((i) => i.cartId === cartId);
          setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
          if (item) sileo.error({ title: "Removed from cart", description: `${item.coffee.name} has been removed from your order. You can add it back anytime from the menu.` });
        }}
        onUpdateQty={(cartId, qty) => setCartItems((prev) => prev.map((i) => i.cartId === cartId ? { ...i, quantity: qty } : i))}
      />
    </div>
  );
}
