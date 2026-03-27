"use client";

import { useState, useEffect } from "react";
import "@/styles/App.css";

export default function HeroHeader() {
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
        <img className="hero-logo" src="/logo.png" alt="Restaurant logo" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-fire"
          src={isMobile ? "/background-fire.jpg" : "/background-fire-wide.jpg"}
          alt="Fire background"
        />
      </div>
    </header>
  );
}
