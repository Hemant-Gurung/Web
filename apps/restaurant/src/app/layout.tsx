import { getLocale } from "next-intl/server";
import { restaurantConfig } from "@/config/restaurant";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} style={restaurantConfig.theme as React.CSSProperties}>
      <body>{children}</body>
    </html>
  );
}
