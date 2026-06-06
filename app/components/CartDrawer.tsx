"use client";

import { CartItem } from "../data/menu";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (cartId: string) => void;
  onUpdateQty: (cartId: string, qty: number) => void;
}

export default function CartDrawer({
  isOpen,
  items,
  onClose,
  onRemove,
  onUpdateQty,
}: CartDrawerProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          width: "min(420px, 100vw)",
          background: "var(--surface-container-low)",
          borderLeft: "1px solid var(--glass-border)",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "-8px 0 48px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px",
            borderBottom: "1px solid var(--outline-variant)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--on-surface)",
              }}
            >
              Your Cart
            </h2>
            {totalItems > 0 && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--on-surface-variant)",
                  marginTop: "2px",
                }}
              >
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="glass-icon-btn"
            aria-label="Close cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "16px",
                opacity: 0.6,
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--outline)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  color: "var(--on-surface-variant)",
                  textAlign: "center",
                }}
              >
                Your cart is empty.
                <br />
                Add something delicious!
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map((item) => (
                <div
                  key={item.cartId}
                  style={{
                    display: "flex",
                    gap: "14px",
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "14px",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      position: "relative",
                      flexShrink: 0,
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                    }}
                  >
                    <Image
                      src={item.coffee.image}
                      alt={item.coffee.name}
                      fill
                      sizes="72px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "var(--on-surface)",
                        marginBottom: "3px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.coffee.name}
                    </h4>

                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "var(--on-surface-variant)",
                        marginBottom: "6px",
                      }}
                    >
                      {item.size.label} · {item.size.ml}
                      {item.extras.length > 0 &&
                        ` · ${item.extras.map((e) => e.label).join(", ")}`}
                    </p>

                    {/* Qty + price row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Qty controls */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          background: "var(--surface-container)",
                          border: "1px solid var(--outline-variant)",
                          borderRadius: "var(--radius-md)",
                          padding: "4px 8px",
                        }}
                      >
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? onUpdateQty(item.cartId, item.quantity - 1)
                              : onRemove(item.cartId)
                          }
                          style={{
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "none",
                            border: "none",
                            color: "var(--on-surface)",
                            fontSize: "16px",
                            cursor: "pointer",
                            borderRadius: "4px",
                          }}
                        >
                          {item.quantity === 1 ? (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6" />
                              <path d="M14 11v6" />
                            </svg>
                          ) : (
                            "−"
                          )}
                        </button>
                        <span
                          style={{
                            fontFamily: "var(--font-headline)",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "var(--on-surface)",
                            minWidth: "16px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQty(item.cartId, item.quantity + 1)
                          }
                          style={{
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "none",
                            border: "none",
                            color: "var(--on-surface)",
                            fontSize: "16px",
                            cursor: "pointer",
                            borderRadius: "4px",
                          }}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span
                        style={{
                          fontFamily: "var(--font-headline)",
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "var(--primary-container)",
                        }}
                      >
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px 28px",
              borderTop: "1px solid var(--outline-variant)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Subtotal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  color: "var(--on-surface-variant)",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--on-surface)",
                }}
              >
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout button */}
            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Checkout — ${subtotal.toFixed(2)}
            </button>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "var(--on-surface-variant)",
                textAlign: "center",
                opacity: 0.7,
              }}
            >
              Taxes and fees calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
