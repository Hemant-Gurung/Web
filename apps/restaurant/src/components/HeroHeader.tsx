"use client";

import { useState, useEffect } from "react";
import type { HeroConfig } from "@repo/config";

export default function HeroHeader({ config }: { config: HeroConfig }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="hero">
      <div className="hero-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-logo" src={config.logoSrc} alt="Restaurant logo" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-fire"
          src={isMobile ? config.backgroundMobileSrc : config.backgroundDesktopSrc}
          alt="Restaurant hero"
        />
      </div>
    </header>
  );
}
