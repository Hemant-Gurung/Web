import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact | My Restaurant",
};

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
          <div>
            <h3>Address</h3>
            <p>123 Flavour Street, San Francisco, CA</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>📞</span>
          <div>
            <h3>Phone</h3>
            <p>(123) 456-7890</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>🕐</span>
          <div>
            <h3>Hours</h3>
            <p>Mon–Sun: 12pm – 10pm</p>
          </div>
        </div>
      </div>

      <div className={styles.formMapRow}>
        <div className={styles.formCol}>
          <ContactForm />
        </div>
        <div className={styles.mapCol}>
          <MapEmbed />
        </div>
      </div>
    </div>
  );
}
