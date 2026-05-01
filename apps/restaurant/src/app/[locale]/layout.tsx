import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Navbar, Footer, LanguageSelector, PromotionPopup, TopBar, OpeningHours } from "@repo/ui";
import HeroHeader from "@/components/HeroHeader";
import { HomeOnly } from "@/components/HomeOnly";
import { CartShell } from "@/components/CartShell";
import { restaurantConfig } from "@/config/restaurant";
import { routing } from "@/i18n/routing";
import { getSiteContent } from "@/lib/site-content";
import "@/styles/App.css";
import "@/styles/global.css";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function getOnlineOrdering(): Promise<boolean> {
  const CMS_URL = process.env.CMS_URL ?? "http://localhost:3002";
  const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID!;
  try {
    const res = await fetch(
      `${CMS_URL}/api/restaurant-config?restaurant=${RESTAURANT_ID}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return false;
    const data = await res.json();
    return data.onlineOrdering === true;
  } catch {
    return false;
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as string[]).includes(locale)) notFound();

  setRequestLocale(locale);

  const [messages, orderingEnabled, t, cms] = await Promise.all([
    getMessages(),
    getOnlineOrdering(),
    getTranslations({ locale, namespace: "Nav" }),
    getSiteContent(locale),
  ]);

  const navLinks = [
    { href: "/", label: t("home") },
    ...(restaurantConfig.features.menu !== false ? [{ href: "/menu", label: t("menu") }] : []),
    ...(restaurantConfig.features.about !== false ? [{ href: "/about", label: t("about") }] : []),
    ...(restaurantConfig.features.contact !== false ? [{ href: "/contact", label: t("contact") }] : []),
    ...(restaurantConfig.features.reservations ? [{ href: "/reservations", label: t("reservations") }] : []),
  ];

  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3002";

  return (
    <NextIntlClientProvider messages={messages}>
      <PromotionPopup
        restaurantId={restaurantConfig.id}
        locale={locale}
        cmsUrl={cmsUrl}
      />
      <TopBar />
      <div className="app">
        {restaurantConfig.hero && <HeroHeader config={restaurantConfig.hero} />}
        <CartShell orderingEnabled={orderingEnabled}>
          <div className="layout">
            <Navbar links={navLinks} locale={locale} variant={restaurantConfig.navbarVariant ?? "drawer"} languageSelector={
              <LanguageSelector locales={restaurantConfig.locales} currentLocale={locale} />
            } />
            <main className="main">{children}</main>
            <HomeOnly>
              <OpeningHours
                hours={cms?.openingHours ?? []}
                fallback={restaurantConfig.contact.hours}
              />
            </HomeOnly>
            <Footer
              restaurantName={restaurantConfig.name}
              tagline={
                cms?.tagline ??
                restaurantConfig.taglineTranslations?.[locale] ??
                restaurantConfig.tagline
              }
              links={navLinks}
              socialLinks={cms?.socialLinks ?? undefined}
              locale={locale}
            />
          </div>
        </CartShell>
      </div>
    </NextIntlClientProvider>
  );
}
