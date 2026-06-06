"use client";

import { useState } from "react";
import { Coffee, CartItem } from "../data/menu";
import Image from "next/image";

interface CoffeeDetailProps {
  coffee: Coffee;
  onAddToCart: (item: Omit<CartItem, "cartId">) => void;
}

export default function CoffeeDetail({ coffee, onAddToCart }: CoffeeDetailProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);

  const toggleExtra = (index: number) => {
    setSelectedExtras((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const extrasTotal = selectedExtras.reduce(
    (sum, i) => sum + coffee.extras[i].price,
    0
  );

  const totalPrice =
    (coffee.price + coffee.sizes[selectedSize].priceModifier + extrasTotal) *
    quantity;

  const renderStars = (rating: number) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.3;
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--primary-container)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === full && hasHalf) {
        stars.push(
          <svg key={i} width="18" height="18" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-${coffee.id}`}>
                <stop offset="50%" stopColor="var(--primary-container)" />
                <stop offset="50%" stopColor="var(--outline-variant)" />
              </linearGradient>
            </defs>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#half-${coffee.id})`} />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--outline-variant)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "0",
      }}
    >
      {/* Hero Image Section */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 24px 16px",
          minHeight: "280px",
        }}
      >
        {/* Glow behind image */}
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249, 168, 102, 0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
            zIndex: 0,
          }}
        />
        <div
          className="animate-float"
          style={{
            width: "220px",
            height: "220px",
            position: "relative",
            zIndex: 1,
            filter: "drop-shadow(0 16px 40px rgba(0, 0, 0, 0.4))",
          }}
        >
          <Image
            src={coffee.image}
            alt={coffee.name}
            fill
            sizes="220px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "0 24px 24px",
          overflowY: "auto",
        }}
      >
        {/* Title + Rating */}
        <div className="animate-fade-in-up delay-1">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            {coffee.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "linear-gradient(135deg, var(--tertiary-container), var(--primary-container))",
                  color: "#3E2723",
                  fontFamily: "var(--font-label)",
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h2
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--on-surface)",
              marginTop: "8px",
              marginBottom: "8px",
              lineHeight: "36px",
            }}
          >
            {coffee.name}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {renderStars(coffee.rating)}
            </div>
            <span
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              {coffee.rating}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--on-surface-variant)",
              }}
            >
              ({coffee.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="animate-fade-in-up delay-2"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            lineHeight: "22px",
            color: "var(--on-surface-variant)",
          }}
        >
          {coffee.description}
        </p>

        {/* Size Selector */}
        <div className="animate-fade-in-up delay-3">
          <h4
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--on-surface)",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Size
          </h4>
          <div style={{ display: "flex", gap: "10px" }}>
            {coffee.sizes.map((size, i) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(i)}
                style={{
                  flex: 1,
                  padding: "12px 8px",
                  background:
                    selectedSize === i
                      ? "var(--primary-container)"
                      : "var(--surface-container)",
                  border:
                    selectedSize === i
                      ? "1.5px solid var(--primary-container)"
                      : "1.5px solid var(--outline-variant)",
                  borderRadius: "var(--radius-lg)",
                  color:
                    selectedSize === i
                      ? "var(--on-primary-container)"
                      : "var(--on-surface-variant)",
                  fontFamily: "var(--font-label)",
                  fontSize: "14px",
                  fontWeight: selectedSize === i ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <span>{size.label}</span>
                <span style={{ fontSize: "11px", opacity: 0.7 }}>
                  {size.ml}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="animate-fade-in-up delay-4">
          <h4
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--on-surface)",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Extras
          </h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {coffee.extras.map((extra, i) => (
              <button
                key={extra.label}
                onClick={() => toggleExtra(i)}
                style={{
                  padding: "8px 16px",
                  background: selectedExtras.includes(i)
                    ? "rgba(249, 168, 102, 0.15)"
                    : "var(--surface-container)",
                  border: selectedExtras.includes(i)
                    ? "1.5px solid var(--primary-container)"
                    : "1.5px solid var(--outline-variant)",
                  borderRadius: "var(--radius-full)",
                  color: selectedExtras.includes(i)
                    ? "var(--primary)"
                    : "var(--on-surface-variant)",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {extra.label}
                {extra.price > 0 && (
                  <span style={{ opacity: 0.7 }}> +${extra.price.toFixed(2)}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Add to Cart */}
        <div
          className="animate-fade-in-up delay-5"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "auto",
            paddingTop: "8px",
          }}
        >
          {/* Quantity */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "var(--surface-container)",
              border: "1.5px solid var(--outline-variant)",
              borderRadius: "var(--radius-lg)",
              padding: "6px 12px",
            }}
          >
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                color: "var(--on-surface)",
                fontSize: "20px",
                cursor: "pointer",
                borderRadius: "var(--radius-default)",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface-container-high)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "none")
              }
            >
              −
            </button>
            <span
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--on-surface)",
                minWidth: "24px",
                textAlign: "center",
              }}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                color: "var(--on-surface)",
                fontSize: "20px",
                cursor: "pointer",
                borderRadius: "var(--radius-default)",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface-container-high)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "none")
              }
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() =>
              onAddToCart({
                coffee,
                size: coffee.sizes[selectedSize],
                extras: selectedExtras.map((i) => coffee.extras[i]),
                quantity,
                unitPrice:
                  coffee.price +
                  coffee.sizes[selectedSize].priceModifier +
                  extrasTotal,
              })
            }
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "14px 24px",
              background: "linear-gradient(135deg, var(--tertiary-container), var(--primary-container))",
              color: "#3E2723",
              fontFamily: "var(--font-label)",
              fontSize: "15px",
              fontWeight: 700,
              border: "none",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(249, 168, 102, 0.3)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(249, 168, 102, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(249, 168, 102, 0.3)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Add — ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
