import { setRequestLocale } from "next-intl/server";
import { Hero } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";
import { getSiteContent } from "@/lib/site-content";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cms = await getSiteContent(locale);

  const tagline =
    cms?.tagline ??
    restaurantConfig.taglineTranslations?.[locale] ??
    restaurantConfig.tagline;

  const description =
    cms?.description ??
    restaurantConfig.descriptionTranslations?.[locale] ??
    restaurantConfig.description;

  return (
    <Hero
      heading={`Welcome to ${restaurantConfig.name}`}
      tagline={tagline}
      subtext={description}
      features={restaurantConfig.homeFeatures}
    />
  );
}
