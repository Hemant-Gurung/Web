import { restaurantConfig } from "@/config/restaurant";
import styles from "./about.module.css";

export const metadata = {
  title: `About | ${restaurantConfig.name}`,
};

const { about } = restaurantConfig;

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
          {about.story.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.storyBadge}>
          <span className={styles.badgeYear}>Est.</span>
          <span className={styles.badgeNumber}>{about.establishedYear}</span>
        </div>
      </section>

      <section className={styles.statsGrid}>
        {about.stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>Meet the Team</h2>
        <div className={styles.teamGrid}>
          {about.team.map((member) => (
            <div key={member.name} className={styles.teamCard}>
              <span className={styles.teamEmoji}>{member.emoji}</span>
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
