import Link from "next/link";
import "./Hero.css";

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface HeroProps {
  heading: string;
  tagline?: string;
  subtext: string;
  features: FeatureCard[];
}

export function Hero({ heading, tagline, subtext, features }: HeroProps) {
  return (
    <section className="ui-hero-section">
      <div className="ui-hero-overlay">
        <h1 className="ui-hero-heading">{heading}</h1>
        {tagline && <p className="ui-hero-tagline">{tagline}</p>}
        <p className="ui-hero-subtext">{subtext}</p>
        <div className="ui-hero-cta-group">
          <Link href="/menu" className="ui-hero-btn ui-hero-btn-primary">
            View Menu
          </Link>
          <Link href="/reservations" className="ui-hero-btn ui-hero-btn-secondary">
            Book a Table
          </Link>
        </div>
      </div>

      <div className="ui-feature-grid">
        {features.map((f) => (
          <div key={f.title} className="ui-feature-card">
            <span className="ui-feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
