import ReservationForm from "@/components/ReservationForm";
import styles from "./reservations.module.css";

export const metadata = {
  title: "Reservations | My Restaurant",
};

export default function Reservations() {
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Book a Table</h1>
        <div className={styles.divider} />
        <p className={styles.subtitle}>
          Reserve your spot and we&apos;ll have everything ready for you.
        </p>
      </div>
      <ReservationForm />
    </div>
  );
}
