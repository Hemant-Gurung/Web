import { setRequestLocale, getTranslations } from "next-intl/server";
import { restaurantConfig } from "@/config/restaurant";
import styles from "../../../order/success/page.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return { title: `Order Confirmed | ${restaurantConfig.name}` };
}

type Props = { params: Promise<{ locale: string }> };

export default async function OrderSuccessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "OrderSuccess" });

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.message}>{t("message")}</p>
        <a href={`/${locale}/menu`} className={styles.btn}>{t("cta")}</a>
      </div>
    </div>
  );
}
