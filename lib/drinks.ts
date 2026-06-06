// ===== Chap Coffee — data layer =====
// Carousel ring order: Cold Brew -> Caramel Macchiato -> Iced Latte ->
// Mocha -> Espresso -> Cappuccino -> (loop)

export interface DrinkSize {
  label: string;
  price: number;
}

export interface DrinkBadge {
  /** key into the Icon set */
  icon: string;
  label: string;
}

export interface Drink {
  id: string;
  name: string;
  tagline: string;
  score: number;
  temp: "hot" | "cold";
  badge: DrinkBadge;
  desc: string;
  img: string;
  sizes: DrinkSize[];
  /** per-drink accent, applied to --accent at runtime */
  accent: string;
  notes: string[];
  caffeine: number;
  kcal: number;
}

export interface HistoryEntry {
  id: string;
  date: string;
  size: string;
  price: number;
  status: "Ready" | "Picked up";
}

export const DRINKS: Drink[] = [
  {
    id: "cold-brew",
    name: "Cold Brew",
    tagline: "Slow & Smooth",
    score: 4.6,
    temp: "cold",
    badge: { icon: "rising", label: "Rising" },
    desc: "Slow-steeped for 18 hours, our cold brew delivers a remarkably smooth, naturally sweet flavor profile with low acidity. Served over ice with cold foam.",
    img: "/images/cold-brew.png",
    sizes: [
      { label: "S", price: 5.99 },
      { label: "M", price: 6.49 },
      { label: "L", price: 6.99 },
    ],
    accent: "#c98a52",
    notes: ["18h Steep", "Low Acidity", "Cold Foam"],
    caffeine: 205,
    kcal: 25,
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    tagline: "Sweet & Layered",
    score: 4.9,
    temp: "hot",
    badge: { icon: "heart", label: "Fan Fav" },
    desc: "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and topped with buttery caramel drizzle. A sweet, layered masterpiece.",
    img: "/images/caramel-macchiato.png",
    sizes: [
      { label: "S", price: 6.49 },
      { label: "M", price: 6.99 },
      { label: "L", price: 7.49 },
    ],
    accent: "#d8a05f",
    notes: ["Vanilla", "Caramel", "Espresso"],
    caffeine: 150,
    kcal: 250,
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    tagline: "Crisp & Refreshing",
    score: 4.5,
    temp: "cold",
    badge: { icon: "rising", label: "Rising" },
    desc: "Bold espresso poured over ice and fresh milk, finished with a silky swirl of cold foam. Cool, balanced and endlessly refreshing for any time of day.",
    img: "/images/iced-latte.png",
    sizes: [
      { label: "S", price: 5.49 },
      { label: "M", price: 5.99 },
      { label: "L", price: 6.49 },
    ],
    accent: "#bd8a5c",
    notes: ["Over Ice", "Silky", "Balanced"],
    caffeine: 165,
    kcal: 130,
  },
  {
    id: "mocha",
    name: "Mocha",
    tagline: "Rich & Indulgent",
    score: 4.9,
    temp: "hot",
    badge: { icon: "trending", label: "Trending" },
    desc: "Rich espresso meets premium dark chocolate, topped with whipped cream and a chocolate drizzle. An indulgent treat for chocolate lovers.",
    img: "/images/mocha.png",
    sizes: [
      { label: "S", price: 6.29 },
      { label: "M", price: 6.79 },
      { label: "L", price: 7.29 },
    ],
    accent: "#a9633c",
    notes: ["Dark Cocoa", "Whipped", "Drizzle"],
    caffeine: 175,
    kcal: 360,
  },
  {
    id: "espresso",
    name: "Espresso",
    tagline: "Strong & Bold",
    score: 4.7,
    temp: "hot",
    badge: { icon: "classic", label: "Classic" },
    desc: "A concentrated shot of our finest single-origin beans. Bold, intense, and rich with a golden crema on top. The purest coffee experience.",
    img: "/images/espresso.png",
    sizes: [
      { label: "Single", price: 3.99 },
      { label: "Double", price: 4.99 },
    ],
    accent: "#c4783f",
    notes: ["Single Origin", "Golden Crema", "Intense"],
    caffeine: 127,
    kcal: 5,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    tagline: "Balanced & Foamy",
    score: 4.8,
    temp: "hot",
    badge: { icon: "classic", label: "Classic" },
    desc: "Equal parts rich espresso, steamed milk and a thick crown of velvety microfoam, dusted with cocoa. A timeless balance of strength and softness.",
    img: "/images/cappuccino.png",
    sizes: [
      { label: "S", price: 4.99 },
      { label: "M", price: 5.49 },
      { label: "L", price: 5.99 },
    ],
    accent: "#cf935c",
    notes: ["Microfoam", "Latte Art", "Timeless"],
    caffeine: 173,
    kcal: 120,
  },
];

// History (recent orders) — fabricated but plausible
export const HISTORY: HistoryEntry[] = [
  { id: "mocha", date: "Today · 8:24 AM", size: "M", price: 6.79, status: "Ready" },
  { id: "caramel-macchiato", date: "Yesterday · 9:10 AM", size: "L", price: 7.49, status: "Picked up" },
  { id: "espresso", date: "Mon · 7:45 AM", size: "Double", price: 4.99, status: "Picked up" },
  { id: "cold-brew", date: "Sun · 2:30 PM", size: "S", price: 5.99, status: "Picked up" },
  { id: "cappuccino", date: "Fri · 8:05 AM", size: "M", price: 5.49, status: "Picked up" },
];

export const DRINKS_BY_ID: Record<string, Drink> = Object.fromEntries(
  DRINKS.map((d) => [d.id, d]),
);
