import { setRequestLocale } from "next-intl/server";
import { MenuPageClient } from "@repo/ui";
import type { MenuCategory } from "@repo/ui";
import type { PayloadMenuItem, PayloadMenuCategory, PayloadMedia } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return { title: `Menu | ${restaurantConfig.name}` };
}

const CMS_URL = process.env.CMS_URL ?? "http://localhost:3002";
const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID!;
const CMS_API_KEY = process.env.CMS_API_KEY;

interface PayloadResponse<T> { docs: T[] }

function resolveImageUrl(image: PayloadMenuItem["image"]): string | undefined {
  if (!image || typeof image !== "object") return undefined;
  const media = image as PayloadMedia;
  if (!media.url) return undefined;
  try {
    const u = new URL(media.url);
    u.hostname = new URL(CMS_URL).hostname;
    return u.toString();
  } catch {
    return media.url;
  }
}

type Props = { params: Promise<{ locale: string }> };

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  try {
    const catsParams = new URLSearchParams({ "where[restaurant][equals]": RESTAURANT_ID, sort: "order" });
    const itemsParams = new URLSearchParams({ "where[restaurant][equals]": RESTAURANT_ID, sort: "order", limit: "200", depth: "2" });
    const authHeaders: Record<string, string> = CMS_API_KEY ? { Authorization: `admins API-Key ${CMS_API_KEY}` } : {};

    const [catsRes, itemsRes, configRes] = await Promise.all([
      fetch(`${CMS_URL}/api/menu-categories?${catsParams}`, { headers: authHeaders, next: { revalidate: 3600 } }),
      fetch(`${CMS_URL}/api/menu-items?${itemsParams}`, { headers: authHeaders, next: { revalidate: 3600 } }),
      fetch(`${CMS_URL}/api/restaurant-config?restaurant=${RESTAURANT_ID}`, { next: { revalidate: 300 } }),
    ]);

    const orderingEnabled = configRes.ok ? (await configRes.json()).onlineOrdering === true : false;

    if (!catsRes.ok || !itemsRes.ok) {
      console.error("[menu] CMS error:", { cats: catsRes.status, items: itemsRes.status });
      return <MenuUnavailable />;
    }

    const [catsJson, itemsJson]: [PayloadResponse<PayloadMenuCategory>, PayloadResponse<PayloadMenuItem>] =
      await Promise.all([catsRes.json(), itemsRes.json()]);

    const cats = catsJson.docs ?? [];
    const items = itemsJson.docs ?? [];
    const categoryMap = new Map<string, MenuCategory>();

    for (const cat of cats) {
      const catItems = items
        .filter((item) => {
          const catId = typeof item.category === "number" ? item.category : (item.category as PayloadMenuCategory).id;
          return catId === cat.id && item.available !== false && item.name;
        })
        .map((item) => ({ name: item.name, price: item.price ?? 0, description: item.description ?? "", image: resolveImageUrl(item.image) }));

      const existing = categoryMap.get(cat.name);
      if (existing) existing.items.push(...catItems);
      else categoryMap.set(cat.name, { category: cat.name, items: catItems });
    }

    return <MenuPageClient categories={Array.from(categoryMap.values())} orderingEnabled={orderingEnabled} />;
  } catch (err) {
    console.error("[menu] fetch failed:", err);
    return <MenuUnavailable />;
  }
}

function MenuUnavailable() {
  return <div style={{ padding: "2rem", color: "#ccc" }}>Menu is temporarily unavailable. Please check back soon.</div>;
}
