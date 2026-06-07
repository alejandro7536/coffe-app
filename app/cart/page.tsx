"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useStore } from "../store";
import { Icon } from "../components/Icon";

export default function CartPage() {
  const { cart, setQty, removeItem, clearCart, showToast } = useStore();

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + (cart.length ? tax + 0.5 : 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  const checkout = () => {
    showToast("Order placed", "Thanks! Your order is brewing — see you soon.");
    clearCart();
  };

  return (
    <div className="page">
      <div className="page-head">
        <h1>Your Cart</h1>
        <p>
          {cart.length
            ? `${itemCount} item${itemCount > 1 ? "s" : ""} ready for pickup.`
            : "Your cart is empty."}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="empty">
          <Icon name="cart" />
          <h3>Nothing brewing yet</h3>
          <p style={{ marginBottom: 22 }}>
            Head to the menu and confirm a selection to fill your cart.
          </p>
          <Link href="/" className="reorder-btn">
            Browse the menu
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((it) => (
              <div
                className="cart-row glass"
                key={it.key}
                style={{ "--card-accent": it.accent } as CSSProperties}
              >
                <div className="cart-thumb">
                  <div className="g" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.img} alt={it.name} />
                </div>
                <div className="cart-info">
                  <div className="cn">{it.name}</div>
                  <div className="cs">
                    {it.size} · {it.tagline}
                  </div>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(it.key, it.qty - 1)} aria-label="Decrease quantity">
                    <Icon name="minus" />
                  </button>
                  <span className="n">{it.qty}</span>
                  <button onClick={() => setQty(it.key, it.qty + 1)} aria-label="Increase quantity">
                    <Icon name="plus" />
                  </button>
                </div>
                <span className="rprice">${(it.price * it.qty).toFixed(2)}</span>
                <button className="del" onClick={() => removeItem(it.key)} aria-label="Remove item">
                  <Icon name="trash" />
                </button>
              </div>
            ))}
          </div>

          <div className="summary glass">
            <h3>Order Summary</h3>
            <div className="sum-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="sum-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="sum-row">
              <span>Service</span>
              <span>$0.50</span>
            </div>
            <div className="promo">
              <input placeholder="Promo code" aria-label="Promo code" />
              <button>Apply</button>
            </div>
            <div className="sum-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="cta" style={{ marginTop: 18, maxWidth: "none" }} onClick={checkout}>
              <span className="sheen" />
              Checkout
              <span className="chev">
                <Icon name="arrow" />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
