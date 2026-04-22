import { setRequestLocale, getTranslations } from "next-intl/server";
import { restaurantConfig } from "@/config/restaurant";
import { getSiteContent } from "@/lib/site-content";
import { LexicalContent } from "@/components/LexicalContent";
import styles from "../../about/about.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return { title: `About | ${restaurantConfig.name}` };
}

type Props = { params: Promise<{ locale: string }> };

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, cms] = await Promise.all([
    getTranslations({ locale, namespace: "About" }),
    getSiteContent(locale),
  ]);

  const { about } = restaurantConfig;
  const configStory = about.storyTranslations?.[locale] ?? about.story;

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{t("title")}</h1>
        <div className={styles.divider} />
      </div>

      <section className={styles.story}>
        <div className={styles.storyText}>
          <h2>{t("story")}</h2>
          {cms?.story
            ? <LexicalContent content={cms.story} />
            : configStory.map((paragraph, i) => <p key={i}>{paragraph}</p>)
          }
        </div>
        <div className={styles.storyBadge}>
          <span className={styles.badgeYear}>{t("est")}</span>
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
        <h2 className={styles.sectionTitle}>{t("team")}</h2>
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
