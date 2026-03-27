import styles from "./about.module.css";
import { restaurantConfig } from "@/config/restaurant";

export const metadata = {
  title: `About | ${restaurantConfig.name}`,
};

const stats = [
  { value: "3", label: "Years Open" },
  { value: "40+", label: "Menu Items" },
  { value: "5k+", label: "Happy Guests" },
  { value: "100%", label: "Local Produce" },
];

const team = [
  { name: "Leila Amara", role: "Head Chef", emoji: "👩‍🍳" },
  { name: "Dario Soto", role: "Pastry Chef", emoji: "🍰" },
  { name: "Priya Nair", role: "Floor Manager", emoji: "🌟" },
];

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>About Us</h1>
        <div className={styles.divider} />
      </div>

      <section className={styles.story}>
        <div className={styles.storyText}>
          <h2>Our Story</h2>
          <p>
            Verde Kitchen was born out of a love for Mediterranean food and a belief
            that eating well shouldn&apos;t be complicated. We opened our doors in
            Portland with one mission: serve honest, nourishing food made from the
            best seasonal ingredients we can find.
          </p>
          <p>
            Everything is prepared fresh each morning — no freezers, no shortcuts.
            We work with local farms and fishers to bring you food that tastes the
            way it&apos;s supposed to taste.
          </p>
        </div>
        <div className={styles.storyBadge}>
          <span className={styles.badgeYear}>Est.</span>
          <span className={styles.badgeNumber}>2022</span>
        </div>
      </section>

      <section className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>Meet the Team</h2>
        <div className={styles.teamGrid}>
          {team.map((m) => (
            <div key={m.name} className={styles.teamCard}>
              <span className={styles.teamEmoji}>{m.emoji}</span>
              <h3 className={styles.teamName}>{m.name}</h3>
              <p className={styles.teamRole}>{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
