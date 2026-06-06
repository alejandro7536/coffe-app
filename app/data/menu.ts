export interface Coffee {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  sizes: { label: string; ml: string; priceModifier: number }[];
  extras: { label: string; price: number }[];
  tags: string[];
}

export const coffeeMenu: Coffee[] = [
  {
    id: "iced-latte",
    name: "Iced Latte",
    tagline: "Smooth & Refreshing",
    description:
      "A smooth and creamy espresso-based drink served over ice with cold milk. Our signature blend creates the perfect balance of bold espresso and velvety milk.",
    price: 5.49,
    rating: 4.8,
    reviews: 234,
    image: "/images/iced-latte.png",
    category: "Iced",
    sizes: [
      { label: "S", ml: "250ml", priceModifier: 0 },
      { label: "M", ml: "350ml", priceModifier: 0.8 },
      { label: "L", ml: "450ml", priceModifier: 1.5 },
    ],
    extras: [
      { label: "Extra Shot", price: 0.75 },
      { label: "Oat Milk", price: 0.5 },
      { label: "Vanilla Syrup", price: 0.6 },
      { label: "Caramel Drizzle", price: 0.6 },
    ],
    tags: ["Popular", "Iced"],
  },
  {
    id: "mocha",
    name: "Mocha",
    tagline: "Rich & Indulgent",
    description:
      "Rich espresso meets premium dark chocolate, topped with whipped cream and a chocolate drizzle. An indulgent treat for chocolate lovers.",
    price: 6.29,
    rating: 4.9,
    reviews: 312,
    image: "/images/mocha.png",
    category: "Hot",
    sizes: [
      { label: "S", ml: "250ml", priceModifier: 0 },
      { label: "M", ml: "350ml", priceModifier: 0.8 },
      { label: "L", ml: "450ml", priceModifier: 1.5 },
    ],
    extras: [
      { label: "Extra Shot", price: 0.75 },
      { label: "Whipped Cream", price: 0.5 },
      { label: "Hazelnut Syrup", price: 0.6 },
    ],
    tags: ["Best Seller", "Hot"],
  },
  {
    id: "espresso",
    name: "Espresso",
    tagline: "Strong & Bold",
    description:
      "A concentrated shot of our finest single-origin beans. Bold, intense, and rich with a golden crema on top. The purest coffee experience.",
    price: 3.99,
    rating: 4.7,
    reviews: 189,
    image: "/images/espresso.png",
    category: "Hot",
    sizes: [
      { label: "Single", ml: "30ml", priceModifier: 0 },
      { label: "Double", ml: "60ml", priceModifier: 1.0 },
    ],
    extras: [
      { label: "Extra Shot", price: 0.75 },
      { label: "Sugar", price: 0 },
    ],
    tags: ["Classic", "Hot"],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    tagline: "Creamy & Classic",
    description:
      "Equal parts espresso, steamed milk, and velvety foam dusted with cinnamon. A timeless Italian classic perfected by our baristas.",
    price: 5.29,
    rating: 4.8,
    reviews: 276,
    image: "/images/cappuccino.png",
    category: "Hot",
    sizes: [
      { label: "S", ml: "200ml", priceModifier: 0 },
      { label: "M", ml: "300ml", priceModifier: 0.8 },
      { label: "L", ml: "400ml", priceModifier: 1.5 },
    ],
    extras: [
      { label: "Extra Shot", price: 0.75 },
      { label: "Oat Milk", price: 0.5 },
      { label: "Cinnamon", price: 0 },
    ],
    tags: ["Classic", "Hot"],
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    tagline: "Slow & Smooth",
    description:
      "Slow-steeped for 18 hours, our cold brew delivers a remarkably smooth, naturally sweet flavor profile with low acidity. Served over ice with cold foam.",
    price: 5.99,
    rating: 4.6,
    reviews: 198,
    image: "/images/cold-brew.png",
    category: "Iced",
    sizes: [
      { label: "S", ml: "300ml", priceModifier: 0 },
      { label: "M", ml: "450ml", priceModifier: 1.0 },
      { label: "L", ml: "550ml", priceModifier: 1.8 },
    ],
    extras: [
      { label: "Vanilla Cold Foam", price: 0.8 },
      { label: "Caramel Syrup", price: 0.6 },
      { label: "Oat Milk", price: 0.5 },
    ],
    tags: ["Trending", "Iced"],
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    tagline: "Sweet & Layered",
    description:
      "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and topped with buttery caramel drizzle. A sweet, layered masterpiece.",
    price: 6.49,
    rating: 4.9,
    reviews: 341,
    image: "/images/Caramel Macchiato.png",
    category: "Hot",
    sizes: [
      { label: "S", ml: "250ml", priceModifier: 0 },
      { label: "M", ml: "350ml", priceModifier: 0.8 },
      { label: "L", ml: "450ml", priceModifier: 1.5 },
    ],
    extras: [
      { label: "Extra Caramel", price: 0.5 },
      { label: "Extra Shot", price: 0.75 },
      { label: "Oat Milk", price: 0.5 },
    ],
    tags: ["Fan Favorite", "Hot"],
  },
];

export const categories = ["All", "Hot", "Iced"];

export interface CartItem {
  cartId: string;
  coffee: Coffee;
  size: { label: string; ml: string; priceModifier: number };
  extras: { label: string; price: number }[];
  quantity: number;
  unitPrice: number;
}
