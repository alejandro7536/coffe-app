// ===== Chap Coffee — App root =====
const { useState: useS, useEffect: useE, useMemo, useCallback: useCb } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "split",
  "mode3d": "coverflow",
  "anim": "kinetic",
  "glass": "medium",
  "showNotes": true,
  "ambientGlow": true
}/*EDITMODE-END*/;

const GLASS_PRESETS = {
  subtle:  { blur: "14px", fill: "0.40", fillStrong: "0.58", stroke: "0.08" },
  medium:  { blur: "22px", fill: "0.55", fillStrong: "0.72", stroke: "0.12" },
  frosted: { blur: "34px", fill: "0.68", fillStrong: "0.82", stroke: "0.20" },
};

function Nav({ screen, go, cartCount, favCount }) {
  const links = [
    ["menu", "Menu"], ["favourites", "Favourites"], ["history", "History"], ["profile", "Profile"],
  ];
  return (
    <nav className="nav">
      <div className="brand" onClick={() => go("menu")}>
        <span className="brand-mark"><Icon name="leaf" /></span>
        <span className="brand-name">Chap <b>Coffee</b></span>
      </div>
      <div className="nav-links">
        {links.map(([k, label]) => (
          <button key={k} className={"nav-link" + (screen === k ? " active" : "")} onClick={() => go(k)}>{label}</button>
        ))}
      </div>
      <div className="nav-actions">
        <div className="icon-btn glass" style={{ position: "relative" }} onClick={() => go("favourites")}>
          <Icon name="heartOutline" />
          {favCount > 0 && <span className="badge-dot">{favCount}</span>}
        </div>
        <div className="icon-btn glass" style={{ position: "relative" }} onClick={() => go("cart")}>
          <Icon name="cart" />
          {cartCount > 0 && <span className="badge-dot">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 Chap Coffee. All rights reserved.</span>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </div>
    </footer>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const drinks = window.DRINKS;
  const drinksById = useMemo(() => Object.fromEntries(drinks.map((d) => [d.id, d])), [drinks]);

  const [screen, setScreen] = useS("menu");
  const [index, setIndex] = useS(0);
  const [sizeIdx, setSizeIdx] = useS(0);
  const [favs, setFavs] = useS(() => new Set(["mocha", "caramel-macchiato"]));
  const [cart, setCart] = useS([]);
  const [toast, setToast] = useS(null);

  // reset size when drink changes
  useE(() => { setSizeIdx(0); }, [index]);

  // apply glass preset + accent to :root
  useE(() => {
    const g = GLASS_PRESETS[t.glass] || GLASS_PRESETS.medium;
    const r = document.documentElement.style;
    r.setProperty("--glass-blur", g.blur);
    r.setProperty("--glass-fill", `rgba(41,29,23,${g.fill})`);
    r.setProperty("--glass-fill-strong", `rgba(52,39,33,${g.fillStrong})`);
    r.setProperty("--glass-stroke", `rgba(245,222,213,${g.stroke})`);
  }, [t.glass]);

  useE(() => {
    document.documentElement.style.setProperty("--accent", drinks[index].accent);
  }, [index]);

  // keyboard arrows on menu
  useE(() => {
    if (screen !== "menu") return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % drinks.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + drinks.length) % drinks.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, drinks.length]);

  const showToast = useCb((msg) => {
    setToast(msg);
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => setToast(null), 2400);
  }, []);

  const toggleFav = useCb((id) => {
    setFavs((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const addToCart = useCb((drink, sIdx = 0) => {
    const size = drink.sizes[sIdx];
    const key = drink.id + "-" + size.label;
    setCart((prev) => {
      const ex = prev.find((it) => it.key === key);
      if (ex) return prev.map((it) => it.key === key ? { ...it, qty: it.qty + 1 } : it);
      return [...prev, { key, id: drink.id, name: drink.name, tagline: drink.tagline, img: drink.img, accent: drink.accent, size: size.label, price: size.price, qty: 1 }];
    });
    showToast(`${drink.name} added to cart`);
  }, [showToast]);

  const onConfirm = useCb(() => {
    addToCart(drinks[index], sizeIdx);
  }, [index, sizeIdx, addToCart]);

  const setQty = useCb((key, q) => {
    setCart((prev) => q <= 0 ? prev.filter((it) => it.key !== key) : prev.map((it) => it.key === key ? { ...it, qty: q } : it));
  }, []);
  const removeItem = useCb((key) => setCart((prev) => prev.filter((it) => it.key !== key)), []);

  const openDrink = useCb((id) => {
    const i = drinks.findIndex((d) => d.id === id);
    if (i >= 0) { setIndex(i); setScreen("menu"); }
  }, [drinks]);

  const reorder = useCb((h) => {
    const d = drinksById[h.id];
    const sIdx = Math.max(0, d.sizes.findIndex((s) => s.label === h.size));
    addToCart(d, sIdx);
  }, [drinksById, addToCart]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="app">
      <div className={"ambient" + (t.ambientGlow ? " breathe" : "")}><div className="grain" /></div>
      <Nav screen={screen} go={setScreen} cartCount={cartCount} favCount={favs.size} />

      {screen === "menu" && (
        <SelectionScreen
          drinks={drinks} index={index} onIndex={setIndex}
          layout={t.layout} mode={t.mode3d} anim={t.anim}
          sizeIdx={sizeIdx} setSizeIdx={setSizeIdx}
          favs={favs} toggleFav={toggleFav} onConfirm={onConfirm}
          showNotes={t.showNotes}
        />
      )}
      {screen === "favourites" && (
        <FavouritesScreen drinks={drinks} favs={favs} toggleFav={toggleFav} onAdd={(d) => addToCart(d, 0)} onOpen={openDrink} />
      )}
      {screen === "history" && (
        <HistoryScreen drinksById={drinksById} history={window.HISTORY} onReorder={reorder} />
      )}
      {screen === "profile" && (
        <ProfileScreen drinksById={drinksById} favCount={favs.size} orderCount={window.HISTORY.length + cartCount} />
      )}
      {screen === "cart" && (
        <CartScreen cart={cart} setQty={setQty} removeItem={removeItem}
          onCheckout={() => { showToast("Order placed — see you soon!"); setCart([]); }}
          onBrowse={() => setScreen("menu")} />
      )}

      <Footer />

      <div className={"toast" + (toast ? " show" : "")}>
        <span className="ok"><Icon name="check" /></span>
        {toast}
      </div>

      <TweaksPanel>
        <TweakSection label="Layout" />
        <TweakRadio label="Arrangement" value={t.layout}
          options={[{ value: "split", label: "Split" }, { value: "spotlight", label: "Spotlight" }, { value: "editorial", label: "Editorial" }]}
          onChange={(v) => setTweak("layout", v)} />

        <TweakSection label="3D selection" />
        <TweakSelect label="Mechanic" value={t.mode3d}
          options={[
            { value: "coverflow", label: "Coverflow carousel" },
            { value: "tilt", label: "Tilt parallax (mouse)" },
            { value: "turntable", label: "Turntable (drag to spin)" },
            { value: "orbit", label: "Orbit ring" },
          ]}
          onChange={(v) => setTweak("mode3d", v)} />

        <TweakSection label="Animation preset" />
        <TweakRadio label="Feel" value={t.anim}
          options={[{ value: "smooth", label: "Smooth" }, { value: "vapor", label: "Vapor" }, { value: "kinetic", label: "Kinetic" }]}
          onChange={(v) => setTweak("anim", v)} />
        <TweakToggle label="Ambient glow pulse" value={t.ambientGlow} onChange={(v) => setTweak("ambientGlow", v)} />

        <TweakSection label="Surface" />
        <TweakRadio label="Glass intensity" value={t.glass}
          options={[{ value: "subtle", label: "Subtle" }, { value: "medium", label: "Medium" }, { value: "frosted", label: "Frosted" }]}
          onChange={(v) => setTweak("glass", v)} />
        <TweakToggle label="Show flavor notes" value={t.showNotes} onChange={(v) => setTweak("showNotes", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
