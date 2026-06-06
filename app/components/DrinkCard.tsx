"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import type { Drink } from "@/lib/drinks";
import { useStore } from "../store";
import { Icon } from "./Icon";

export default function DrinkCard({ drink }: { drink: Drink }) {
  const router = useRouter();
  const { favs, toggleFav, addToCart, setIndexById } = useStore();
  const fav = favs.has(drink.id);

  const open = () => {
    setIndexById(drink.id);
    router.push("/");
  };

  return (
    <div
      className="drink-card glass"
      style={{ "--card-accent": drink.accent } as CSSProperties}
      onClick={open}
    >
      <div className="glow" />
      <button
        className="card-fav"
        onClick={(e) => {
          e.stopPropagation();
          toggleFav(drink.id);
        }}
        aria-label="Toggle favourite"
        aria-pressed={fav}
      >
        <Icon name={fav ? "heartFill" : "heartOutline"} />
      </button>
      <div className="thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={drink.img} alt={drink.name} />
      </div>
      <div className="card-name">{drink.name}</div>
      <div className="card-sub">
        {drink.tagline} · {drink.score.toFixed(1)} ★
      </div>
      <div className="card-foot">
        <span className="card-price">${drink.sizes[0].price.toFixed(2)}</span>
        <button
          className="mini-add"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(drink, 0);
          }}
          aria-label={`Add ${drink.name} to cart`}
        >
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
}
