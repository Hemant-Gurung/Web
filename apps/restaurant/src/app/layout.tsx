import { getLocale } from "next-intl/server";
import { restaurantConfig } from "@/config/restaurant";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} style={restaurantConfig.theme as React.CSSProperties}>
      <head>
        {restaurantConfig.fontUrl && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={restaurantConfig.fontUrl} />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
