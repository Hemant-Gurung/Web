import { Hero } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";

const FEATURES = [
  { icon: "🍽️", title: "Fresh Ingredients", description: "Locally sourced produce, delivered daily for peak flavour." },
  { icon: "🔥", title: "Chef's Specials", description: "Rotating seasonal dishes crafted by our award-winning chef." },
  { icon: "🍷", title: "Curated Wine List", description: "Hand-picked wines to pair perfectly with every course." },
  { icon: "🌿", title: "Cozy Atmosphere", description: "An intimate setting perfect for date nights and celebrations." },
];

export default function Home() {
  return (
    <Hero
      heading={`Welcome to ${restaurantConfig.name}`}
      subtext={restaurantConfig.description}
      features={FEATURES}
    />
  );
}
