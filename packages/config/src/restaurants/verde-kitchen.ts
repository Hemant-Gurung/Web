import type { RestaurantConfig } from "../restaurant";

export const verdeKitchenConfig: RestaurantConfig = {
  id: "verde-kitchen",
  name: "Verde Kitchen",
  tagline: "Fresh. Simple. Nourishing.",
  taglineTranslations: {
    nl: "Vers. Eenvoudig. Voedzaam.",
    fr: "Frais. Simple. Nourrissant.",
  },
  orderType: "takeaway",
  description: "Mediterranean-inspired dishes made from the freshest seasonal produce.",
  descriptionTranslations: {
    nl: "Mediterrane gerechten gemaakt van de meest verse seizoensproducten.",
    fr: "Des plats d'inspiration méditerranéenne préparés avec les produits de saison les plus frais.",
  },
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
  locales: ["en", "nl", "fr"],
  fontUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
  navbarVariant: "topbar",
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
    "--font-family": "'Plus Jakarta Sans', sans-serif",
  },
  // No hero — verde-kitchen has no image strip
  about: {
    establishedYear: 2022,
    story: [
      "Verde Kitchen was born out of a love for Mediterranean food and a belief that eating well shouldn't be complicated. We opened our doors in Portland with one mission: serve honest, nourishing food made from the best seasonal ingredients we can find.",
      "Everything is prepared fresh each morning — no freezers, no shortcuts. We work with local farms and fishers to bring you food that tastes the way it's supposed to taste.",
    ],
    storyTranslations: {
      nl: [
        "Verde Kitchen ontstond vanuit een liefde voor Mediterrane keuken en de overtuiging dat goed eten niet ingewikkeld hoeft te zijn. We openden onze deuren in Portland met één missie: eerlijk, voedzaam eten bereiden van de beste seizoensproducten die we kunnen vinden.",
        "Alles wordt elke ochtend vers bereid — geen vriezers, geen shortcuts. We werken samen met lokale boeren en vissers om u eten te brengen dat smaakt zoals het hoort te smaken.",
      ],
      fr: [
        "Verde Kitchen est née d'un amour pour la cuisine méditerranéenne et de la conviction que bien manger ne devrait pas être compliqué. Nous avons ouvert nos portes à Portland avec une seule mission : servir une nourriture honnête et nourrissante, préparée avec les meilleurs ingrédients de saison.",
        "Tout est préparé frais chaque matin — pas de congélateurs, pas de raccourcis. Nous travaillons avec des agriculteurs et des pêcheurs locaux pour vous apporter une cuisine qui a le goût qu'elle devrait avoir.",
      ],
    },
    stats: [
      // { value: "3", label: "Years Open" },
      // { value: "40+", label: "Menu Items" },
      // { value: "5k+", label: "Happy Guests" },
      // { value: "100%", label: "Local Produce" },
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