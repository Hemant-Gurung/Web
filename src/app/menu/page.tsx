import menuData from "@/data/menu.json";
import type { MenuCategory } from "@/types";
import MenuPageClient from "@/components/MenuPageClient";

export const metadata = {
  title: "Menu | My Restaurant",
};

export default function MenuPage() {
  return <MenuPageClient categories={menuData as MenuCategory[]} />;
}
