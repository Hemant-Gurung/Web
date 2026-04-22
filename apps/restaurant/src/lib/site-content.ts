import type { SiteContent } from "@repo/ui";

export async function getSiteContent(locale: string): Promise<SiteContent | null> {
  const CMS_URL = (process.env.CMS_URL ?? "http://localhost:3002").replace(/\/$/, "");
  const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID!;
  const API_KEY = process.env.CMS_API_KEY!;
  const isDev = process.env.NODE_ENV === "development";

  try {
    const res = await fetch(
      `${CMS_URL}/api/site-content?where[restaurant][equals]=${RESTAURANT_ID}&locale=${locale}&fallback-locale=en&limit=1&depth=1`,
      {
        headers: { Authorization: `admins API-Key ${API_KEY}` },
        next: { revalidate: isDev ? 0 : 3600 },
      }
    );
    if (!res.ok) return null;
    const { docs } = await res.json();
    return (docs[0] as SiteContent) ?? null;
  } catch {
    return null;
  }
}
