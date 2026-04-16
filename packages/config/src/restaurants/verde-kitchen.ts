import type { RestaurantConfig } from "../restaurant";

export const verdeKitchenConfig: RestaurantConfig = {
  id: "verde-kitchen",
  name: "Verde Kitchen",
  tagline: "Fresh. Simple. Nourishing.",
  description: "Mediterranean-inspired dishes made from the freshest seasonal produce.",
  contact: {
    address: "88 Grove Lane, Portland, OR",
    phone: "(503) 222-0088",
    email: "hello@verdekitchen.com",
    hours: "Tue–Sun: 11am – 9pm",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.0!2d-122.676!3d45.5231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549509!2sPortland!5e0!3m2!1sen!2sus!4v1234567890",
    pageSubtitle: "Stop by or send us a message — we'd love to hear from you.",
  },
  features: {
    menu: true,
    about: true,
    contact: true,
    reservations: false, // walk-ins only
  },
  theme: {
    "--color-primary": "#2e7d32",
    "--color-primary-dark": "#1b5e20",
    "--color-primary-glow": "rgba(46, 125, 50, 0.40)",
    "--color-primary-glow-md": "rgba(46, 125, 50, 0.25)",
    "--color-primary-glow-sm": "rgba(46, 125, 50, 0.20)",
    "--color-primary-glow-xs": "rgba(46, 125, 50, 0.12)",
    "--color-primary-border": "rgba(46, 125, 50, 0.45)",
    "--color-surface": "rgba(255, 255, 255, 0.06)",
    "--color-surface-hover": "rgba(255, 255, 255, 0.10)",
    "--color-border": "rgba(255, 255, 255, 0.10)",
    "--color-footer-bg": "#0d1a0f",
    "--color-body-bg": "#3d3530",
  },
  // No hero — verde-kitchen has no image strip
  about: {
    establishedYear: 2022,
    story: [
      "Verde Kitchen was born out of a love for Mediterranean food and a belief that eating well shouldn't be complicated. We opened our doors in Portland with one mission: serve honest, nourishing food made from the best seasonal ingredients we can find.",
      "Everything is prepared fresh each morning — no freezers, no shortcuts. We work with local farms and fishers to bring you food that tastes the way it's supposed to taste.",
    ],
    stats: [
      { value: "3", label: "Years Open" },
      { value: "40+", label: "Menu Items" },
      { value: "5k+", label: "Happy Guests" },
      { value: "100%", label: "Local Produce" },
    ],
    team: [
      { name: "Leila Amara", role: "Head Chef", emoji: "👩‍🍳" },
      { name: "Dario Soto", role: "Pastry Chef", emoji: "🍰" },
      { name: "Priya Nair", role: "Floor Manager", emoji: "🌟" },
    ],
  },
  homeFeatures: [
    { icon: "🌿", title: "Seasonal & Local", description: "Every dish starts with the best produce the season has to offer." },
    { icon: "🫒", title: "Mediterranean Soul", description: "Time-honoured recipes with a modern, lighter touch." },
    { icon: "🌱", title: "Plant-Forward", description: "Generous vegetarian and vegan options on every menu." },
    { icon: "☀️", title: "Walk-Ins Welcome", description: "No reservation needed — just come as you are." },
  ],
};