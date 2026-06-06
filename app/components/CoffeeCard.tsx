"use client";

import { Coffee } from "../data/menu";
import Image from "next/image";

interface CoffeeCardProps {
  coffee: Coffee;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export default function CoffeeCard({
  coffee,
  isSelected,
  onClick,
  index,
}: CoffeeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`animate-fade-in-up delay-${index + 1}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: isSelected
          ? "rgba(249, 168, 102, 0.12)"
          : "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isSelected
          ? "2px solid var(--primary-container)"
          : "1px solid var(--glass-border)",
        borderRadius: "var(--radius-lg)",
        padding: "24px 16px 20px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        boxShadow: isSelected
          ? "0 0 0 1px var(--primary-container), 0 0 30px rgba(249, 168, 102, 0.15)"
          : "none",
        textAlign: "center",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = "rgba(41, 29, 23, 0.75)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          e.currentTarget.style.transform = "translateY(-4px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = "var(--glass-bg)";
          e.currentTarget.style.borderColor = "var(--glass-border)";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      {/* Tag */}
      {coffee.tags[0] && (
        <span
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "linear-gradient(135deg, var(--tertiary-container), var(--primary-container))",
            color: "#3E2723",
            fontFamily: "var(--font-label)",
            fontSize: "10px",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "var(--radius-full)",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {coffee.tags[0]}
        </span>
      )}

      {/* Coffee Image */}
      <div
        style={{
          width: "120px",
          height: "120px",
          position: "relative",
          marginBottom: "16px",
          filter: isSelected ? "drop-shadow(0 8px 24px rgba(249, 168, 102, 0.3))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
          transition: "all 0.3s ease",
        }}
      >
        <Image
          src={coffee.image}
          alt={coffee.name}
          fill
          sizes="120px"
          style={{
            objectFit: "contain",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isSelected ? "scale(1.08)" : "scale(1)",
          }}
        />
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "var(--font-headline)",
          fontSize: "16px",
          fontWeight: 600,
          color: isSelected ? "var(--primary)" : "var(--on-surface)",
          marginBottom: "4px",
          transition: "color 0.2s ease",
        }}
      >
        {coffee.name}
      </h3>

      {/* Rating */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginBottom: "8px",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--primary-container)">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--on-surface-variant)",
          }}
        >
          {coffee.rating}
        </span>
      </div>

      {/* Price */}
      <p
        style={{
          fontFamily: "var(--font-headline)",
          fontSize: "18px",
          fontWeight: 700,
          color: "var(--primary-container)",
        }}
      >
        ${coffee.price.toFixed(2)}
      </p>
    </button>
  );
}
