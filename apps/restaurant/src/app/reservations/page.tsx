import { notFound } from "next/navigation";
import { ReservationForm } from "@repo/ui";
import { restaurantConfig } from "@/config/restaurant";
import { submitReservation } from "./actions";
import styles from "./reservations.module.css";

export const metadata = {
  title: `Reservations | ${restaurantConfig.name}`,
};

export default function Reservations() {
  if (!restaurantConfig.features.reservations) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Book a Table</h1>
        <div className={styles.divider} />
        <p className={styles.subtitle}>
          Reserve your spot and we&apos;ll have everything ready for you.
        </p>
      </div>
      <ReservationForm onSubmit={submitReservation} />
    </div>
  );
}
