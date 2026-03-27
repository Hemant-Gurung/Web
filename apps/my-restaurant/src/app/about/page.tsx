import styles from "./about.module.css";

export const metadata = {
  title: "About | My Restaurant",
};

const stats = [
  { value: "20+", label: "Years of Passion" },
  { value: "50+", label: "Menu Items" },
  { value: "10k+", label: "Happy Guests" },
  { value: "3", label: "Awards Won" },
];

const team = [
  { name: "Marco Rossi", role: "Head Chef", emoji: "👨‍🍳" },
  { name: "Sofia Laurent", role: "Pastry Chef", emoji: "🍰" },
  { name: "James Okafor", role: "Sommelier", emoji: "🍷" },
];

export default function About() {
  return (
    <div className={styles.page}>
      {/* Heading */}
      <div className={styles.heading}>
        <h1 className={styles.title}>About Us</h1>
        <div className={styles.divider} />
      </div>

      {/* Story */}
      <section className={styles.story}>
        <div className={styles.storyText}>
          <h2>Our Story</h2>
          <p>
            Founded over two decades ago by the Rossi family, My Restaurant began as a
            small corner trattoria with a single goal — to bring the warmth of a home-cooked
            Italian meal to every guest who walked through our doors.
          </p>
          <p>
            Today we remain family-run, and that same spirit of hospitality drives everything
            we do — from sourcing seasonal ingredients at the local market each morning to
            crafting desserts that taste like grandmother&apos;s kitchen.
          </p>
        </div>
        <div className={styles.storyBadge}>
          <span className={styles.badgeYear}>Est.</span>
          <span className={styles.badgeNumber}>2004</span>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>Meet the Team</h2>
        <div className={styles.teamGrid}>
          {team.map((member) => (
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
