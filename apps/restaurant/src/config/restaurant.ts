import {
  myRestaurantConfig,
  verdeKitchenConfig,
  getNavLinks,
} from "@repo/config";
import type { RestaurantConfig } from "@repo/config";

const configs: Record<string, RestaurantConfig> = {
  "my-restaurant": myRestaurantConfig,
  "verde-kitchen": verdeKitchenConfig,
};

export const restaurantConfig: RestaurantConfig =
  configs[process.env.NEXT_PUBLIC_RESTAURANT_ID ?? "my-restaurant"] ??
  myRestaurantConfig;

export const NAV_LINKS = getNavLinks(restaurantConfig);
