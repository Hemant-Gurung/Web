import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm, MapEmbed } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";
import { getSiteContent } from "@/lib/site-content";
import styles from "../../contact/contact.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return { title: `Contact | ${restaurantConfig.name}` };
}

type Props = { params: Promise<{ locale: string }> };

const DAY_LABELS: Record<string, string> = {
  monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday",
  thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday",
};

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, cms] = await Promise.all([
    getTranslations({ locale, namespace: "Contact" }),
    getSiteContent(locale),
  ]);

  const { contact } = restaurantConfig;
  const phone   = cms?.contact?.phone   ?? contact.phone;
  const address = cms?.contact?.address ?? contact.address;

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{t("title")}</h1>
        <div className={styles.divider} />
        <p className={styles.subtitle}>{contact.pageSubtitle}</p>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>📍</span>
          <div><h3>{t("address")}</h3><p>{address}</p></div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>📞</span>
          <div><h3>{t("phone")}</h3><p>{phone}</p></div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>🕐</span>
          <div>
            <h3>{t("hours")}</h3>
            {cms?.openingHours?.length ? (
              <ul className={styles.hoursList}>
                {cms.openingHours.map(({ day, open, close, closed }) => (
                  <li key={day} className={styles.hoursRow}>
                    <span className={styles.hoursDay}>{DAY_LABELS[day] ?? day}</span>
                    <span className={styles.hoursTime}>
                      {closed ? "Closed" : `${open} – ${close}`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{contact.hours}</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.formMapRow}>
        <div className={styles.formCol}><ContactForm /></div>
        <div className={styles.mapCol}><MapEmbed src={contact.mapEmbedUrl} /></div>
      </div>
    </div>
  );
}
