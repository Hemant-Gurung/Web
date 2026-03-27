import menuData from "@/data/menu.json";
import { MenuPageClient } from "@repo/ui";
import type { MenuCategory } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";

export const metadata = {
  title: `Menu | ${restaurantConfig.name}`,
};

export default function MenuPage() {
  return <MenuPageClient categories={menuData as MenuCategory[]} />;
}
