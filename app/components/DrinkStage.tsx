"use client";

import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { DRINKS } from "@/lib/drinks";
import { useStore } from "../store";
import { Icon } from "./Icon";

const SPRING = "cubic-bezier(0.34,1.56,0.64,1)";

// 3D mechanic: TURNTABLE (locked). Only the hero cup is shown; drag it
// horizontally to spin (rotateY clamped to ±46°, slight scale-down while
// spinning). Releasing past a ~60px threshold advances to the next/previous
// drink, otherwise it springs back. A "Drag to spin" hint sits at the bottom.
export default function DrinkStage() {
  const { index, activeDrink: hero, setIndex } = useStore();
  const N = DRINKS.length;
  const prev = DRINKS[(index - 1 + N) % N];
  const next = DRINKS[(index + 1) % N];

  const heroInner = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const inner = heroInner.current;
    if (inner) inner.style.transition = "none";

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const rot = Math.max(-46, Math.min(46, dx * 0.35));
      if (inner) {
        inner.style.transform = `rotateY(${rot}deg) scale(${1 - Math.abs(rot) / 600})`;
      }
    };

    const onUp = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      const dx = ev.clientX - startX;
      if (inner) {
        inner.style.transition = `transform 0.6s ${SPRING}`;
        inner.style.transform = "";
      }
      if (dx < -60) setIndex((index + 1) % N);
      else if (dx > 60) setIndex((index - 1 + N) % N);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const goPrev = () => setIndex((index - 1 + N) % N);
  const goNext = () => setIndex((index + 1) % N);

  return (
    <div className="stage" style={{ "--accent": hero.accent } as CSSProperties}>
      <div className="stage-floor" />

      <div
        className={"temp-chip glass " + hero.temp}
        title={hero.temp === "cold" ? "Served cold" : "Served hot"}
      >
        <Icon name={hero.temp === "cold" ? "ice" : "fire"} />
      </div>

      {/* hero cup — keyed by id so the cupIn swap animation re-fires */}
      <div
        key={hero.id}
        className="cup is-hero hero-anim"
        onPointerDown={onPointerDown}
      >
        <div className="cup-inner float-bob" ref={heroInner}>
          {/* eslint-disable-next-line @next/next/no-img-element -- transparent
              decorative PNG sized purely via CSS (drop-shadow, drag-to-spin) */}
          <img src={hero.img} alt={hero.name} draggable={false} />
        </div>
      </div>

      <div
        className="neighbour prev"
        onClick={goPrev}
        role="button"
        tabIndex={0}
        aria-label={`Previous drink: ${prev.name}`}
        onKeyDown={(e) => e.key === "Enter" && goPrev()}
      >
        <div className="ring">
          <Icon name="chevL" />
        </div>
        <span className="nb-label">{prev.name}</span>
      </div>

      <div
        className="neighbour next"
        onClick={goNext}
        role="button"
        tabIndex={0}
        aria-label={`Next drink: ${next.name}`}
        onKeyDown={(e) => e.key === "Enter" && goNext()}
      >
        <div className="ring">
          <Icon name="chevR" />
        </div>
        <span className="nb-label">{next.name}</span>
      </div>

      <div className="drag-hint">
        <span className="swipe" /> Drag to spin
      </div>
    </div>
  );
}
