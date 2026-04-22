import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReservationForm } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";
import { submitReservation } from "../../reservations/actions";
import styles from "../../reservations/reservations.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return { title: `Reservations | ${restaurantConfig.name}` };
}

type Props = { params: Promise<{ locale: string }> };

export default async function Reservations({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!restaurantConfig.features.reservations) notFound();

  const t = await getTranslations({ locale, namespace: "Reservations" });

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{t("title")}</h1>
        <div className={styles.divider} />
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </div>
      <ReservationForm onSubmit={submitReservation} />
    </div>
  );
}
