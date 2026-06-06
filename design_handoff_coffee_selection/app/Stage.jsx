// ===== Chap Coffee — 3D cup stage (4 selectable modes) =====
const { useRef, useEffect, useState, useCallback } = React;

function Icon({ name, className }) {
  return <span className={"ic " + (className || "")} dangerouslySetInnerHTML={{ __html: window.ICONS[name] || "" }} />;
}
window.Icon = Icon;

// position of a cup given its signed offset from the hero, per mode
function cupTransform(mode, o, N) {
  // normalise offset to nearest wrap (-N/2 .. N/2)
  let n = o;
  if (n > N / 2) n -= N;
  if (n < -N / 2) n += N;

  if (mode === "orbit") {
    const theta = (n / N) * Math.PI * 2;
    const x = Math.sin(theta) * 360;
    const z = (Math.cos(theta) - 1) * 230;
    const depth = (Math.cos(theta) + 1) / 2; // 1 front .. 0 back
    const s = 0.5 + 0.5 * depth;
    const op = 0.18 + 0.82 * depth;
    const ry = -Math.sin(theta) * 16;
    return {
      transform: `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${s})`,
      opacity: op, zIndex: Math.round(depth * 20) + 1,
      pointerEvents: depth > 0.8 ? "none" : "auto",
    };
  }

  // coverflow (default)
  const map = {
    0: { x: 0, z: 0, ry: 0, s: 1, op: 1, zi: 10, pe: "none" },
    1: { x: 320, z: -150, ry: -34, s: 0.72, op: 0.5, zi: 6, pe: "auto" },
    "-1": { x: -320, z: -150, ry: 34, s: 0.72, op: 0.5, zi: 6, pe: "auto" },
    2: { x: 545, z: -330, ry: -42, s: 0.48, op: 0.2, zi: 4, pe: "auto" },
    "-2": { x: -545, z: -330, ry: 42, s: 0.48, op: 0.2, zi: 4, pe: "auto" },
  };
  const c = map[n];
  if (!c) return { transform: "translate(-50%,-50%) scale(0.4)", opacity: 0, zIndex: 0, pointerEvents: "none" };
  return {
    transform: `translate(-50%,-50%) translateX(${c.x}px) translateZ(${c.z}px) rotateY(${c.ry}deg) scale(${c.s})`,
    opacity: c.op, zIndex: c.zi, pointerEvents: c.pe,
  };
}

function Steam() {
  const ps = [
    { x: "30%", dur: "4.2s", delay: "0s", drift: "-18px" },
    { x: "46%", dur: "5s", delay: "0.8s", drift: "14px" },
    { x: "58%", dur: "4.6s", delay: "1.6s", drift: "22px" },
    { x: "40%", dur: "5.4s", delay: "2.4s", drift: "-10px" },
    { x: "52%", dur: "4.8s", delay: "3.1s", drift: "8px" },
  ];
  return (
    <div className="steam">
      {ps.map((p, i) => (
        <i key={i} style={{ "--x": p.x, "--dur": p.dur, "--delay": p.delay, "--drift": p.drift }} />
      ))}
    </div>
  );
}

function Frost() {
  const ps = Array.from({ length: 14 }).map((_, i) => ({
    x: (10 + Math.random() * 80).toFixed(0) + "%",
    y: (10 + Math.random() * 70).toFixed(0) + "%",
    dur: (2 + Math.random() * 2.5).toFixed(1) + "s",
    delay: (Math.random() * 3).toFixed(1) + "s",
  }));
  return (
    <div className="frost">
      {ps.map((p, i) => (
        <i key={i} style={{ "--x": p.x, "--y": p.y, "--dur": p.dur, "--delay": p.delay }} />
      ))}
    </div>
  );
}

function Stage({ drinks, index, onIndex, mode, anim, neighbours = true }) {
  const N = drinks.length;
  const hero = drinks[index];
  const stageRef = useRef(null);
  const heroInner = useRef(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => { setAnimKey((k) => k + 1); }, [index]);

  // ---- TILT (mouse parallax) ----
  const tilt = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  useEffect(() => {
    if (mode !== "tilt") return;
    const el = stageRef.current;
    let raf;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tilt.current.ry = px * 26;
      tilt.current.rx = -py * 18;
      tilt.current.tx = px * 26;
      tilt.current.ty = py * 18;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      const inner = heroInner.current;
      if (!inner) return;
      const t = tilt.current;
      inner.style.transform = `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateX(${t.tx}px) translateY(${t.ty}px)`;
      const fl = el.querySelector(".stage-floor");
      if (fl) fl.style.transform = `translate(calc(-50% + ${t.tx * 0.6}px), calc(-50% + ${t.ty * 0.6}px))`;
    };
    const onLeave = () => {
      tilt.current = { rx: 0, ry: 0, tx: 0, ty: 0 };
      const inner = heroInner.current;
      if (inner) { inner.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)"; inner.style.transform = ""; setTimeout(() => inner && (inner.style.transition = ""), 600); }
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(raf); };
  }, [mode, index]);

  // ---- TURNTABLE (drag to spin / flick) ----
  const drag = useRef({ active: false, startX: 0, rot: 0 });
  const onPointerDown = (e) => {
    if (mode !== "turntable") return;
    drag.current = { active: true, startX: e.clientX, rot: 0 };
    const inner = heroInner.current;
    if (inner) inner.style.transition = "none";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.rot = Math.max(-46, Math.min(46, dx * 0.35));
    const inner = heroInner.current;
    if (inner) inner.style.transform = `rotateY(${drag.current.rot}deg) scale(${1 - Math.abs(drag.current.rot) / 600})`;
  };
  const onPointerUp = (e) => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    const dx = e.clientX - drag.current.startX;
    drag.current.active = false;
    const inner = heroInner.current;
    if (inner) { inner.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)"; inner.style.transform = ""; }
    if (dx < -60) onIndex((index + 1) % N);
    else if (dx > 60) onIndex((index - 1 + N) % N);
  };

  const goPrev = () => onIndex((index - 1 + N) % N);
  const goNext = () => onIndex((index + 1) % N);
  const prevDrink = drinks[(index - 1 + N) % N];
  const nextDrink = drinks[(index + 1) % N];

  const isFlat = mode === "tilt" || mode === "turntable"; // only hero shown
  const heroFloat = anim === "kinetic";

  return (
    <div className={"stage mode-" + mode} ref={stageRef} style={{ "--accent": hero.accent }}>
      <div className="stage-floor" />

      {/* temp indicator */}
      <div className={"temp-chip glass " + hero.temp} title={hero.temp === "cold" ? "Served cold" : "Served hot"}>
        <Icon name={hero.temp === "cold" ? "ice" : "fire"} />
      </div>

      {/* cups */}
      {drinks.map((d, i) => {
        let o = i - index;
        if (isFlat && i !== index) return null;
        const isHero = i === index;
        const st = isFlat
          ? { transform: "translate(-50%,-50%)", opacity: 1, zIndex: 10 }
          : cupTransform(mode, o, N);
        return (
          <div
            key={d.id}
            className={"cup" + (isHero ? " is-hero" : "")}
            style={st}
            onClick={() => !isHero && onIndex(i)}
            onPointerDown={isHero ? onPointerDown : undefined}
          >
            <div
              className={"cup-inner" + (isHero && heroFloat ? " float-bob" : "")}
              ref={isHero ? heroInner : null}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                key={isHero ? animKey : "s"}
                src={d.img}
                alt={d.name}
                className={isHero ? "hero-anim" : ""}
                draggable="false"
              />
            </div>
          </div>
        );
      })}

      {/* ambient effects keyed to preset + temp */}
      {anim === "vapor" && hero.temp === "hot" && <Steam key={"steam" + index} />}
      {anim === "vapor" && hero.temp === "cold" && <Frost key={"frost" + index} />}

      {/* neighbour navigation */}
      {neighbours && (
        <React.Fragment>
          <div className="neighbour prev" onClick={goPrev}>
            <div className="ring"><Icon name="chevL" /></div>
            {isFlat && <span className="nb-label">{prevDrink.name}</span>}
          </div>
          <div className="neighbour next" onClick={goNext}>
            <div className="ring"><Icon name="chevR" /></div>
            {isFlat && <span className="nb-label">{nextDrink.name}</span>}
          </div>
        </React.Fragment>
      )}

      {mode === "turntable" && (
        <div className="drag-hint"><span className="swipe" /> Drag to spin</div>
      )}
    </div>
  );
}

window.Stage = Stage;
