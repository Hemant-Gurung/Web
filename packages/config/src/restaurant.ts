export interface RestaurantContact {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
}

export interface RestaurantConfig {
  /** Short slug used in URLs / workspace names */
  id: string;
  name: string;
  tagline: string;
  description: string;
  contact: RestaurantContact;
  /** Pages this restaurant supports. Omitting a key disables that page. */
  features: {
    menu?: boolean;
    about?: boolean;
    contact?: boolean;
    reservations?: boolean;
  };
}
