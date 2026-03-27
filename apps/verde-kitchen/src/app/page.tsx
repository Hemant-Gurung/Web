import { Hero } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";

const FEATURES = [
  { icon: "🌿", title: "Seasonal & Local", description: "Every dish starts with the best produce the season has to offer." },
  { icon: "🫒", title: "Mediterranean Soul", description: "Time-honoured recipes with a modern, lighter touch." },
  { icon: "🌱", title: "Plant-Forward", description: "Generous vegetarian and vegan options on every menu." },
  { icon: "☀️", title: "Walk-Ins Welcome", description: "No reservation needed — just come as you are." },
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
