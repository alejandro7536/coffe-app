"use client";

import { useEffect } from "react";
import { DRINKS } from "@/lib/drinks";
import { useStore } from "./store";
import DrinkStage from "./components/DrinkStage";
import DrinkInfoCard from "./components/DrinkInfoCard";

// Menu — Coffee Selection (editorial layout, tilt mechanic, kinetic motion).
export default function MenuPage() {
  const { index, setIndex, activeDrink } = useStore();
  const N = DRINKS.length;

  // ← / → keys switch drinks (menu screen only — this page only mounts at "/").
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((index + 1) % N);
      else if (e.key === "ArrowLeft") setIndex((index - 1 + N) % N);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, setIndex, N]);

  return (
    <div className="selection">
      <div className="layout-editorial">
        <div className="ghost-title" key={"g" + activeDrink.id}>
          {activeDrink.name.split(" ")[0]}
        </div>

        <DrinkStage />
        <DrinkInfoCard />

        <div style={{ position: "absolute", right: 16, bottom: "8%", zIndex: 12 }}>
          <div className="dots">
            {DRINKS.map((d, i) => (
              <button
                key={d.id}
                className={"dot" + (i === index ? " active" : "")}
                onClick={() => setIndex(i)}
                aria-label={`Select ${d.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
