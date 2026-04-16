import { Hero } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";

export default function Home() {
  return (
    <Hero
      heading={`Welcome to ${restaurantConfig.name}`}
      subtext={restaurantConfig.description}
      features={restaurantConfig.homeFeatures}
    />
  );
}
