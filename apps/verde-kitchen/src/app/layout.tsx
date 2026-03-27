import type { Metadata } from "next";
import { Navbar, Footer } from "@repo/ui";
import { restaurantConfig, NAV_LINKS } from "@/config/restaurant";
import "@/styles/App.css";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: restaurantConfig.name,
  description: restaurantConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <div className="layout">
            <Navbar links={NAV_LINKS} />
            <main className="main">{children}</main>
            <Footer
              restaurantName={restaurantConfig.name}
              tagline={restaurantConfig.tagline}
              links={NAV_LINKS}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
