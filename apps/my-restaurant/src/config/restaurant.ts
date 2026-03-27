import type { RestaurantConfig } from "@repo/config";

export const restaurantConfig: RestaurantConfig = {
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
  },
  features: {
    menu: true,
    about: true,
    contact: true,
    reservations: true,
  },
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/reservations", label: "Reservations" },
];
