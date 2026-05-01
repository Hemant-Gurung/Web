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
  /** Default story paragraphs (English). */
  story: string[];
  /** Locale-specific story overrides, e.g. { nl: ["...", "..."], fr: ["...", "..."] } */
  storyTranslations?: Partial<Record<string, string[]>>;
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
  /** Locale-specific tagline overrides, e.g. { nl: "...", fr: "..." } */
  taglineTranslations?: Partial<Record<string, string>>;
  description: string;
  /** Locale-specific description overrides */
  descriptionTranslations?: Partial<Record<string, string>>;
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
  /** Supported locale codes — shown in the language selector. First entry is the default. */
  locales: string[];
  /**
   * CSS custom properties injected on <html> at runtime.
   * Keys must be valid CSS custom property names (start with --).
   */
  theme: Record<string, string>;
  /** Google Fonts or other external font URL to inject as <link> in <head> */
  fontUrl?: string;
  /** Navbar layout variant. "drawer" = burger menu (default). "topbar" = horizontal fixed bar. */
  navbarVariant?: "drawer" | "topbar";
  /** Present = show hero header image strip. Absent = no hero. */
  hero?: HeroConfig;
  about: AboutConfig;
  homeFeatures: HomeFeature[];
}

/** Derives nav links from the config, respecting feature flags. Labels are translation keys from the Nav namespace. */
export function getNavLinks(config: RestaurantConfig): NavLink[] {
  const links: NavLink[] = [{ href: "/", label: "home" }];
  if (config.features.menu !== false) links.push({ href: "/menu", label: "menu" });
  if (config.features.about !== false) links.push({ href: "/about", label: "about" });
  if (config.features.contact !== false) links.push({ href: "/contact", label: "contact" });
  if (config.features.reservations) links.push({ href: "/reservations", label: "reservations" });
  return links;
}
