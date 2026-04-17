export interface RestaurantContact {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
  /** Subtitle shown at the top of the contact page */
  pageSubtitle: string;
}

export interface AboutConfig {
  establishedYear: number;
  /** Each string is one paragraph */
  story: string[];
  stats: Array<{ value: string; label: string }>;
  team: Array<{ name: string; role: string; emoji: string }>;
}

export interface HomeFeature {
  icon: string;
  title: string;
  description: string;
}

export interface HeroConfig {
  logoSrc: string;
  backgroundMobileSrc: string;
  backgroundDesktopSrc: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface RestaurantConfig {
  /** Short slug, matches NEXT_PUBLIC_RESTAURANT_ID */
  id: string;
  name: string;
  tagline: string;
  description: string;
  contact: RestaurantContact;
  /** Pages this restaurant supports. Omitting a key or setting false disables that page. */
  features: {
    menu?: boolean;
    about?: boolean;
    contact?: boolean;
    reservations?: boolean;
    ordering?: boolean;
  };
  /** Whether the restaurant supports takeaway, eat-in, or both. Defaults to 'both'. */
  orderType?: "takeaway" | "eat-in" | "both";
  /**
   * CSS custom properties injected on <html> at runtime.
   * Keys must be valid CSS custom property names (start with --).
   */
  theme: Record<string, string>;
  /** Present = show hero header image strip. Absent = no hero. */
  hero?: HeroConfig;
  about: AboutConfig;
  homeFeatures: HomeFeature[];
}

/** Derives nav links from the config, respecting feature flags. */
export function getNavLinks(config: RestaurantConfig): NavLink[] {
  const links: NavLink[] = [{ href: "/", label: "Home" }];
  if (config.features.menu !== false) links.push({ href: "/menu", label: "Menu" });
  if (config.features.about !== false) links.push({ href: "/about", label: "About" });
  if (config.features.contact !== false) links.push({ href: "/contact", label: "Contact" });
  if (config.features.reservations) links.push({ href: "/reservations", label: "Reservations" });
  return links;
}
