import { MenuPageClient } from "@repo/ui";
import type { MenuCategory } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";

export const metadata = {
  title: `Menu | ${restaurantConfig.name}`,
};

// Revalidate every hour; menu data changes infrequently
export const revalidate = 3600;

const CMS_URL = process.env.CMS_URL ?? "http://localhost:3002";
const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID!;

interface CmsCategory {
  id: string;
  name: string;
}

interface CmsItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  available?: boolean;
  category: string | { id: string };
}

interface PayloadResponse<T> {
  docs: T[];
}

export default async function MenuPage() {
  try {
    const catsParams = new URLSearchParams({
      "where[restaurant][equals]": RESTAURANT_ID,
      sort: "order",
    });
    const itemsParams = new URLSearchParams({
      "where[restaurant][equals]": RESTAURANT_ID,
      sort: "order",
      limit: "200",
    });

const [catsRes, itemsRes] = await Promise.all([
      fetch(`${CMS_URL}/api/menu-categories?${catsParams}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${CMS_URL}/api/menu-items?${itemsParams}`, {
        next: { revalidate: 3600 },
      }),
    ]);
    
    if (!catsRes.ok || !itemsRes.ok) {
      const [catsBody, itemsBody] = await Promise.all([
        catsRes.ok ? null : catsRes.text(),
        itemsRes.ok ? null : itemsRes.text(),
      ]);
      console.error("[menu] CMS error:", {
        categories: { status: catsRes.status, body: catsBody },
        items: { status: itemsRes.status, body: itemsBody },
      });
      return <MenuUnavailable />;
    }

    const [catsJson, itemsJson]: [
      PayloadResponse<CmsCategory>,
      PayloadResponse<CmsItem>,
    ] = await Promise.all([catsRes.json(), itemsRes.json()]);

    const cats = catsJson.docs ?? [];
    const items = itemsJson.docs ?? [];

    const categoryMap = new Map<string, MenuCategory>();

    for (const cat of cats) {
      const catItems = items
        .filter((item) => {
          const catId =
            typeof item.category === "string"
              ? item.category
              : item.category?.id;
          return catId === cat.id && item.available !== false && item.name;
        })
        .map((item) => ({
          name: item.name,
          price: item.price ?? 0,
          description: item.description ?? "",
        }));

      const existing = categoryMap.get(cat.name);
      if (existing) {
        existing.items.push(...catItems);
      } else {
        categoryMap.set(cat.name, { category: cat.name, items: catItems });
      }
    }

    const categories: MenuCategory[] = Array.from(categoryMap.values());

    return <MenuPageClient categories={categories} />;
  } catch (err) {
    console.error("[menu] fetch failed:", err);
    return <MenuUnavailable />;
  }
}

function MenuUnavailable() {
  return (
    <div style={{ padding: "2rem", color: "#ccc" }}>
      Menu is temporarily unavailable. Please check back soon.
    </div>
  );
}
