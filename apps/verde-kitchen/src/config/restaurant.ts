import type { RestaurantConfig } from "@repo/config";

export const restaurantConfig: RestaurantConfig = {
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
  },
  features: {
    menu: true,
    about: true,
    contact: true,
    reservations: false, // walk-ins only
  },
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
