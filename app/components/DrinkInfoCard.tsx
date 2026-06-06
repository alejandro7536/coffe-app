"use client";

import type { CSSProperties } from "react";
import { useStore } from "../store";
import { Icon } from "./Icon";

// Editorial info card — frosted glass, floats bottom-left over the stage.
// Flavour-notes chips are hidden (locked config).
const CARD_STYLE: CSSProperties = {
  position: "absolute",
  left: 0,
  bottom: "8%",
  maxWidth: 400,
  zIndex: 12,
};

export default function DrinkInfoCard() {
  const { activeDrink: d, sizeIdx, setSizeIdx, favs, toggleFav, addToCart } =
    useStore();
  const fav = favs.has(d.id);
  const price = d.sizes[sizeIdx].price;

  return (
    <div className="info in-glass glass fade-up d3" style={CARD_STYLE}>
      <div className="eyebrow">Coffee Selection</div>
      <h1 className="title-main" style={{ fontSize: "clamp(30px, 3.2vw, 42px)" }}>
        {d.name}
      </h1>
      <div className="tagline">{d.tagline}</div>

      <div className="score-row">
        <Icon name="star" className="star" />
        <span>{d.score.toFixed(1)} Score</span>
      </div>

      <p className="desc" style={{ marginTop: 10, marginBottom: 16 }}>
        {d.desc}
      </p>

      <div className="notes-row" style={{ marginBottom: 20 }}>
        {d.notes.map((n) => (
          <span className="note-chip" key={n}>
            {n}
          </span>
        ))}
      </div>

      <div className="field-label">Select Size</div>
      <div className="size-row">
        {d.sizes.map((s, i) => (
          <button
            key={s.label}
            className={"size-btn" + (i === sizeIdx ? " active" : "")}
            onClick={() => setSizeIdx(i)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="price-block">
        <div className="price-tag">
          <span className="label">Price</span>
          <span className="amount">
            <span className="cur">$</span>
            {price.toFixed(2)}
          </span>
        </div>
        <div className="aux-row">
          <button
            className={"fav-btn" + (fav ? " on" : "")}
            onClick={() => toggleFav(d.id)}
            aria-label="Toggle favourite"
            aria-pressed={fav}
          >
            <Icon name={fav ? "heartFill" : "heartOutline"} />
          </button>
          <span className="pill-badge">
            <Icon name={d.badge.icon} />
            {d.badge.label}
          </span>
        </div>
      </div>

      <button className="cta" onClick={() => addToCart(d, sizeIdx)}>
        <span className="sheen" />
        Confirm Selection
        <span className="chev">
          <Icon name="arrow" />
        </span>
      </button>
    </div>
  );
}
