# Handoff: Chap Coffee — Coffee Selection Redesign

## Overview
Redesign of the **Chap Coffee** ordering web app: a glassmorphism UI on a warm "obsidian + amber" palette, centered on a **3D coffee selection** experience, plus supporting screens (Favourites, History, Profile, Cart). Built to be ported into an existing **Next.js** codebase.

## About the design files
The files in this bundle are **design references created in HTML/CSS/React-via-Babel** — a runnable prototype that shows the intended look, motion and behavior. They are **not** meant to be shipped as-is. Your task is to **recreate these designs inside the existing Next.js app**, using its real conventions: Next.js `app/` (or `pages/`) routing, real React components (`.jsx/.tsx`), a proper CSS strategy (CSS Modules / Tailwind / styled — match what the repo already uses), `next/font` for fonts and `next/image` (or plain `<img>`) for the cup PNGs. Treat the prototype as the source of truth for **visuals, tokens, copy and interactions**.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, radii, shadows and motion are final. Recreate pixel-for-pixel; only adapt the *implementation* to the codebase's patterns.

---

## ⭐ Locked configuration (build THIS as the default)
The prototype exposes several variants via a tweak panel. Ship the following combination as the default — ignore the other variants unless asked. These exact values are also set as `TWEAK_DEFAULTS` in `app/App.jsx`:

- **Layout:** `editorial` — full-bleed 3D stage with a giant ghosted drink word behind the cup; a glass info card floats bottom-left; progress dots bottom-right.
- **3D mechanic:** `turntable` — only the hero cup is shown; **drag horizontally to spin it** (rotateY clamped to ±46°, slight scale-down while spinning); releasing past a ~60px threshold advances to the next/previous drink, otherwise it springs back. A "Drag to spin" hint sits at the bottom of the stage; neighbour chevrons (with prev/next drink name) also change the selection.
- **Animation preset:** `kinetic` — hero cup gently floats (bob), ambient amber glow "breathes", buttons use spring easing, cup swaps fade+scale in.
- **Glass intensity:** `subtle` — `--glass-blur: 14px`, fill `rgba(41,29,23,0.40)`, strong `rgba(52,39,33,0.58)`, stroke `rgba(245,222,213,0.08)`.
- **Flavor notes chips:** **shown** (the small "Vanilla / Caramel / Espresso" pills under the description).
- **Ambient glow pulse:** on.

> The other variants in the prototype (layouts `split`/`spotlight`; mechanics `coverflow`/`tilt`/`orbit`; presets `smooth`/`vapor`) are documented in `app/Stage.jsx` and `app/Selection.jsx` if you ever want them, but are **out of scope** for the build.

## Change log (most recent design revisions)
- **Heart icon:** all heart glyphs (`heart`, `heartOutline`, `heartFill` in `app/data.js`) replaced with a clean, symmetric heart that has a sharp bottom point — no flat "base". Used in the nav favourite button, the card heart toggle, the menu favourite button, and the "Fan Fav" badge.
- **Favourites cards:** the cup image is now height-capped (`max-height: 180px`, `max-width: 78%`) inside a flex-centered thumb so it can never overlap the drink name/price below; the card name also got a subtle `text-shadow` for legibility. See `.drink-card .thumb` / `.drink-card .thumb img` / `.drink-card .card-name` in `styles.css`.
- **Locked config** updated to the values above (was previously split / coverflow / frosted / notes-hidden).

---

## Screens / Views

### 1. Menu — Coffee Selection (primary)
- **Purpose:** Browse the 6 drinks, pick a size, confirm to add to cart.
- **Layout (editorial):** Full-height stage centered in the viewport. Behind the cup, a giant outlined word (first word of the drink name, e.g. "Caramel") at `clamp(120px,19vw,320px)`, weight 800, transparent fill with `1.5px` stroke `rgba(245,222,213,0.10)`. The hero cup PNG sits center, ~`min(46%,360px)` wide, drop-shadow `0 38px 34px rgba(0,0,0,0.55)`. A frosted glass card (max-width 400px) floats at `left:0; bottom:8%` containing: eyebrow "Coffee Selection", drink name (gradient text), italic tagline, score row (star + "4.9 Score"), description, size selector, price + favourite + badge, and the primary CTA. Progress dots at `right:16px; bottom:8%`.
- **Stage chrome:** temp chip (fire/ice icon) top-right of stage; circular neighbour chevrons left/right at vertical center, each with the neighbour drink's name beneath.
- **Hero interaction (turntable):** on `pointerdown` over the hero cup, track horizontal drag: rotate the cup `rotateY(clamp(dx*0.35, -46deg, 46deg))` with a slight `scale(1 - abs(rot)/600)` while dragging (transition off during drag). On release: if `dx < -60` advance to next drink, if `dx > 60` go to previous, otherwise spring back (`transform 0.6s cubic-bezier(0.34,1.56,0.64,1)`). A "Drag to spin" hint with an animated swipe dot sits at the bottom of the stage.
- **Selection change:** clicking a neighbour chevron (or ← →, or a dot) changes `index`; the new cup fades+scales in (`cupIn` keyframe, 0.7s), accent color + ambient glow cross-fade to the drink's accent, size resets to first.

### 2. Favourites
- **Purpose:** Grid of hearted drinks; quick add or open.
- **Layout:** Page header ("Favourites" + count line). Responsive card grid `repeat(auto-fill, minmax(260px,1fr))`, gap 20px. Each card = frosted glass, accent radial glow top-right, heart toggle top-right, centered cup thumb (190px tall, lifts on hover), name, "tagline · score ★", price + circular `+` add button. Empty state: outline heart icon, "No favourites yet", helper copy.
- **Seeded favourites:** `mocha`, `caramel-macchiato`.

### 3. History
- **Purpose:** Recent orders with one-tap reorder.
- **Layout:** Header + vertical list. Each row (glass) = 64px rounded thumb, name + size + relative date, status pill (`Ready` amber / `Picked up` muted), price, "Reorder" button. Row slides right 4px on hover. Reorder adds that drink+size to cart.

### 4. Profile
- **Purpose:** Identity, rewards, preferences, usual order.
- **Layout:** Two columns (`360px 1fr`, collapses < 1080px). Left: glass profile card — gradient circular avatar with initial "A", name "Alex Rivera", email, "Gold Roaster" tier pill, a "Beans to next reward" progress bar (72%, 720/1000). Right: 3 stat tiles (Total orders / Favourites / Avg rating 4.8), a Preferences card (Default size Medium, Milk Oat, Sweetness Low, Favourite roast Dark · Single origin), and a "Usual order" card (Mocha · Medium · ordered 14× · $6.79).

### 5. Cart
- **Purpose:** Review items, adjust qty, checkout.
- **Layout:** Two columns (`1fr 380px`, collapses < 1080px). Left: item rows (glass) — 76px thumb with accent glow, name, "size · tagline", qty stepper (− n +), line price, delete. Right: sticky summary — Subtotal, Tax (8%), Service $0.50, promo input + Apply, Total (gradient amount), Checkout CTA. Empty state: cart icon, "Nothing brewing yet", "Browse the menu" button. Checkout fires a success toast and clears the cart.

---

## Global chrome
- **Top nav:** brand (leaf mark in gradient tile + "Chap **Coffee**"), center links (Menu / Favourites / History / Profile) with animated active underline, right actions = favourite + cart icon buttons (glass) with count badges.
- **Footer:** © line + Privacy / Terms / Contact links.
- **Toast:** bottom-center glass pill with check mark, slides up on add-to-cart / checkout, auto-hides ~2.4s.
- **Ambient background:** fixed warm-obsidian canvas, radial amber aurora keyed to the active drink's accent, that "breathes" (7s scale/opacity loop) when glow is on; subtle SVG grain overlay at 4% opacity.

---

## Interactions & Behavior
- **Drink switch:** ← / → keys, neighbour chevrons, progress dots. Each switch: cross-fade cup, retint accent + ambient glow, reset size index to 0.
- **Turntable:** drag the hero cup horizontally to spin it; release past ±60px to change drink, otherwise spring back (see Menu above). Disabled feel under `prefers-reduced-motion`.
- **Favourite:** heart toggles membership in a `Set`; nav badge + Favourites grid update live.
- **Add to cart / Confirm:** dedupes by `drinkId-sizeLabel`, increments qty if present; shows toast.
- **Qty stepper:** decrement below 1 removes the line.
- **Checkout:** toast + clear cart.
- **Motion timings:** entrances `0.6s cubic-bezier(0.16,1,0.3,1)` with staggered delays (.05–.4s); springs `cubic-bezier(0.34,1.56,0.64,1)`; CTA sheen sweep on hover (0.9s).
- **Reduced motion:** all animations collapse to ~0ms via the `prefers-reduced-motion` block in `styles.css` — preserve this.

## State management
Single source of truth (in the prototype, React state in `app/App.jsx`):
- `screen` — `'menu' | 'favourites' | 'history' | 'profile' | 'cart'` (in Next.js, prefer **routes**: `/`, `/favourites`, `/history`, `/profile`, `/cart`).
- `index` — active drink index (0–5).
- `sizeIdx` — selected size for the active drink (resets to 0 on `index` change).
- `favs` — `Set<drinkId>`, seeded with `mocha`, `caramel-macchiato`.
- `cart` — array of `{ key, id, name, tagline, img, accent, size, price, qty }`.
- `toast` — transient message string.
- Tweak values (`layout`, `mode3d`, `anim`, `glass`, `showNotes`, `ambientGlow`) are **prototype-only**; in production hard-code the locked configuration above and drop the tweak layer.

## Data
All drink data lives in `app/data.js` (`window.DRINKS`, `window.HISTORY`, `window.ICONS`). Port `DRINKS`/`HISTORY` to a typed module (e.g. `lib/drinks.ts`). Ring order: Cold Brew → Caramel Macchiato → Iced Latte → Mocha → Espresso → Cappuccino. Each drink: `id, name, tagline, score, temp ('hot'|'cold'), badge {icon,label}, desc, img, sizes [{label,price}], accent (hex), notes[], caffeine, kcal`.

## Design tokens (from `styles.css` `:root`)
**Surfaces:** surface `#1c110c`, low `#160c07`, container-low `#251913`, container `#291d17`, container-high `#342721`, container-highest `#40322c`, bright `#453630`.
**Text:** on-surface `#f5ded5`, on-surface-variant `#d8c2b4`, outline `#a08d80`, outline-variant `#534439`.
**Brand:** primary `#ffcca6`, primary-container `#f9a866`, primary-dim `#ffb77f`, on-primary `#4e2600`, tertiary `#ffcabc`, tertiary-container `#ffa38a`.
**Glass (subtle / locked):** blur `14px`, fill `rgba(41,29,23,0.40)`, fill-strong `rgba(52,39,33,0.58)`, stroke `rgba(245,222,213,0.08)`, plus `inset 0 1px 0 rgba(255,255,255,0.08)` and shadow `0 18px 40px -18px rgba(0,0,0,0.7)`. (The prototype also defines `medium` and `frosted` presets in `GLASS_PRESETS` — subtle is the locked one.)
**Accent:** per-drink, set on `--accent` at runtime (e.g. caramel `#d8a05f`, mocha `#a9633c`, cold-brew `#c98a52`).
**Radii:** sm .5rem, md .75rem, lg 1rem, xl 1.5rem, 2xl 2rem; pills `999px`.
**Type:** headings **Sora** (700/800), body **Be Vietnam Pro** (400–600). Load via `next/font/google`. Title sizes use `clamp()` (see `styles.css`).
**Easing:** out `cubic-bezier(0.16,1,0.3,1)`, spring `cubic-bezier(0.34,1.56,0.64,1)`.

## Assets
- Cup PNGs (transparent, user-provided) in `images/`: `cold-brew.png`, `caramel-macchiato.png`, `iced-latte.png`, `mocha.png`, `espresso.png`, `cappuccino.png` → move to `public/images/`.
- Inline SVG icon set in `app/data.js` `window.ICONS` (heart, cart, star, fire, ice, chevrons, plus/minus, trash, check, bolt, leaf, etc.) → port to an `Icon` component or individual SVG components. `fire.svg` / `ice.svg` also exist in `images/`.

## Files in this bundle
- `screenshots/` — reference renders of each screen at 1440×900: `01-menu.png` (the locked **editorial** selection screen with the 3D turntable cup + floating glass info card), `02-favourites.png`, `03-history.png`, `04-profile.png`, `05-cart.png`. Use these to match the look; the live prototype is the source of truth for motion.
- `Chap Coffee.html` — entry / script wiring.
- `styles.css` — full design system (tokens, glass, all screens, motion). **Primary styling reference.**
- `app/data.js` — drinks, history, icons.
- `app/Stage.jsx` — the 3D stage + all 4 mechanics (turntable is the locked one).
- `app/Selection.jsx` — the 3 selection layouts (editorial is the locked one).
- `app/Screens.jsx` — Favourites / History / Profile / Cart.
- `app/App.jsx` — state, nav, cart/fav logic, tweak wiring (drop the tweak layer in prod).

## Suggested Next.js mapping
- Routes: `/` (menu), `/favourites`, `/history`, `/profile`, `/cart`.
- Components: `<DrinkStage>` (client component — needs mouse/pointer events), `<DrinkInfoCard>`, `<SizeSelector>`, `<DrinkCard>`, `<Nav>`, `<Toast>`, `<AmbientBackground>`.
- State: lift cart + favourites to a context/store (e.g. Zustand or React context) so the nav badges and pages stay in sync; persist to `localStorage`.
- Mark anything using pointer/mouse/keyboard (`DrinkStage`, nav) as `"use client"`.
