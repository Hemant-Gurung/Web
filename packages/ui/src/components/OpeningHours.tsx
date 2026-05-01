import styles from "./OpeningHours.module.css";
import { Clock } from "lucide-react";

const DAY_LABELS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export interface OpeningHoursEntry {
  day: string;
  open?: string | null;
  close?: string | null;
  closed?: boolean | null;
}

interface Props {
  hours: OpeningHoursEntry[];
  title?: string;
  fallback?: string;
}

export function OpeningHours({ hours, title = "Opening Hours", fallback }: Props) {
  if (!hours.length && !fallback) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <Clock size={16} style={{marginRight: "0.4rem", verticalAlign: "middle"}} />
        {title}
      </h2>
      {hours.length > 0 ? (
        <ul className={styles.list}>
          {hours.map(({ day, open, close, closed }) => (
            <li key={day} className={styles.row}>
              <span className={styles.day}>{DAY_LABELS[day] ?? day}</span>
              <span className={closed ? styles.closed : styles.time}>
                {closed ? "Closed" : `${open} – ${close}`}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.fallback}>{fallback}</p>
      )}
    </section>
  );
}
