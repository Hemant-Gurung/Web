import { ContactForm, MapEmbed } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";
import styles from "./contact.module.css";

export const metadata = {
  title: `Contact | ${restaurantConfig.name}`,
};

const { contact } = restaurantConfig;

export default function Contact() {
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Contact Us</h1>
        <div className={styles.divider} />
        <p className={styles.subtitle}>
          We&apos;d love to hear from you. Drop us a message and we&apos;ll get back to you shortly.
        </p>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>📍</span>
          <div><h3>Address</h3><p>{contact.address}</p></div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>📞</span>
          <div><h3>Phone</h3><p>{contact.phone}</p></div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>🕐</span>
          <div><h3>Hours</h3><p>{contact.hours}</p></div>
        </div>
      </div>

      <div className={styles.formMapRow}>
        <div className={styles.formCol}><ContactForm /></div>
        <div className={styles.mapCol}><MapEmbed src={contact.mapEmbedUrl} /></div>
      </div>
    </div>
  );
}
