import type { RestaurantConfig } from "../restaurant";

export const myRestaurantConfig: RestaurantConfig = {
  id: "my-restaurant",
  name: "My Restaurant",
  tagline: "Crafted with passion. Served with love.",
  description: "Delicious food, cozy atmosphere, unforgettable experience.",
  contact: {
    address: "123 Flavour Street, San Francisco, CA",
    phone: "(123) 456-7890",
    email: "reservations@myrestaurant.com",
    hours: "Mon–Sun: 12pm – 10pm",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086!2d-122.419!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064!2sSan+Francisco!5e0!3m2!1sen!2sus!4v1234567890",
    pageSubtitle: "We'd love to hear from you. Drop us a message and we'll get back to you shortly.",
  },
  features: {
    menu: true,
    about: true,
    contact: true,
    reservations: true,
    ordering: true,
  },
  orderType: "both",
  theme: {
    "--color-primary": "#d32f2f",
    "--color-primary-dark": "#b71c1c",
    "--color-primary-glow": "rgba(211, 47, 47, 0.40)",
    "--color-primary-glow-md": "rgba(211, 47, 47, 0.25)",
    "--color-primary-glow-sm": "rgba(211, 47, 47, 0.20)",
    "--color-primary-glow-xs": "rgba(211, 47, 47, 0.12)",
    "--color-primary-border": "rgba(211, 47, 47, 0.45)",
    "--color-surface": "rgba(255, 255, 255, 0.06)",
    "--color-surface-hover": "rgba(255, 255, 255, 0.10)",
    "--color-border": "rgba(255, 255, 255, 0.10)",
    "--color-footer-bg": "#180e0e",
    "--color-body-bg": "#444444",
  },
  hero: {
    logoSrc: "/my-restaurant/logo.png",
    backgroundMobileSrc: "/my-restaurant/background-fire.jpg",
    backgroundDesktopSrc: "/my-restaurant/background-fire-wide.jpg",
  },
  about: {
    establishedYear: 2004,
    story: [
      "Founded over two decades ago by the Rossi family, My Restaurant began as a small corner trattoria with a single goal — to bring the warmth of a home-cooked Italian meal to every guest who walked through our doors.",
      "Today we remain family-run, and that same spirit of hospitality drives everything we do — from sourcing seasonal ingredients at the local market each morning to crafting desserts that taste like grandmother's kitchen.",
    ],
    stats: [
      { value: "20+", label: "Years of Passion" },
      { value: "50+", label: "Menu Items" },
      { value: "10k+", label: "Happy Guests" },
      { value: "3", label: "Awards Won" },
    ],
    team: [
      { name: "Marco Rossi", role: "Head Chef", emoji: "👨‍🍳" },
      { name: "Sofia Laurent", role: "Pastry Chef", emoji: "🍰" },
      { name: "James Okafor", role: "Sommelier", emoji: "🍷" },
    ],
  },
  homeFeatures: [
    { icon: "🍽️", title: "Fresh Ingredients", description: "Locally sourced produce, delivered daily for peak flavour." },
    { icon: "🔥", title: "Chef's Specials", description: "Rotating seasonal dishes crafted by our award-winning chef." },
    { icon: "🍷", title: "Curated Wine List", description: "Hand-picked wines to pair perfectly with every course." },
    { icon: "🌿", title: "Cozy Atmosphere", description: "An intimate setting perfect for date nights and celebrations." },
  ],
};