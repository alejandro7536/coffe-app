"use client";

import { DRINKS } from "@/lib/drinks";
import { useStore } from "../store";
import { Icon } from "../components/Icon";
import DrinkCard from "../components/DrinkCard";

export default function FavouritesPage() {
  const { favs } = useStore();
  const list = DRINKS.filter((d) => favs.has(d.id));

  return (
    <div className="page">
      <div className="page-head">
        <h1>Favourites</h1>
        <p>
          {list.length
            ? `${list.length} drink${list.length > 1 ? "s" : ""} you keep coming back to.`
            : "Tap the heart on any drink to save it here."}
        </p>
      </div>

      {list.length === 0 ? (
        <div className="empty">
          <Icon name="heartOutline" />
          <h3>No favourites yet</h3>
          <p>Heart a coffee from the menu and it will live here for one-tap reordering.</p>
        </div>
      ) : (
        <div className="card-grid">
          {list.map((d) => (
            <DrinkCard key={d.id} drink={d} />
          ))}
        </div>
      )}
    </div>
  );
}
