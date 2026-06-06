"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { DRINKS } from "@/lib/drinks";
import { useStore } from "../store";
import { Icon } from "./Icon";

// 3D mechanic: TILT parallax (locked). Only the hero cup is shown; it tilts and
// translates toward the cursor (rotateX/Y + small translate); the floor glow
// follows at 0.6×. Eases back on mouse-leave. Disabled under reduced motion.
export default function DrinkStage() {
  const { index, activeDrink: hero, setIndex } = useStore();
  const N = DRINKS.length;
  const prev = DRINKS[(index - 1 + N) % N];
  const next = DRINKS[(index + 1) % N];

  const stageRef = useRef<HTMLDivElement>(null);
  const heroInner = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tilt = { rx: 0, ry: 0, tx: 0, ty: 0 };
    let raf = 0;

    const apply = () => {
      const inner = heroInner.current;
      if (inner) {
        inner.style.transform = `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateX(${tilt.tx}px) translateY(${tilt.ty}px)`;
      }
      if (floorRef.current) {
        floorRef.current.style.transform = `translate(calc(-50% + ${tilt.tx * 0.6}px), calc(-50% + ${tilt.ty * 0.6}px))`;
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tilt.ry = px * 26;
      tilt.rx = -py * 18;
      tilt.tx = px * 26;
      tilt.ty = py * 18;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      tilt.rx = tilt.ry = tilt.tx = tilt.ty = 0;
      const inner = heroInner.current;
      if (inner) {
        inner.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
        inner.style.transform = "";
        window.setTimeout(() => {
          if (inner) inner.style.transition = "";
        }, 600);
      }
      if (floorRef.current) floorRef.current.style.transform = "translate(-50%, -50%)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [index]);

  const goPrev = () => setIndex((index - 1 + N) % N);
  const goNext = () => setIndex((index + 1) % N);

  return (
    <div
      className="stage"
      ref={stageRef}
      style={{ "--accent": hero.accent } as CSSProperties}
    >
      <div className="stage-floor" ref={floorRef} />

      <div
        className={"temp-chip glass " + hero.temp}
        title={hero.temp === "cold" ? "Served cold" : "Served hot"}
      >
        <Icon name={hero.temp === "cold" ? "ice" : "fire"} />
      </div>

      {/* hero cup — keyed by id so the cupIn swap animation re-fires */}
      <div key={hero.id} className="cup is-hero hero-anim">
        <div className="cup-inner float-bob" ref={heroInner}>
          {/* eslint-disable-next-line @next/next/no-img-element -- transparent
              decorative PNG sized purely via CSS (height-based, drop-shadow) */}
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
    </div>
  );
}
