import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroHeader from "@/components/HeroHeader";
import "@/styles/App.css";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "My Restaurant",
  description: "Delicious food, cozy atmosphere, unforgettable experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <HeroHeader />
          <div className="layout">
            <Navbar />
            <main className="main">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
