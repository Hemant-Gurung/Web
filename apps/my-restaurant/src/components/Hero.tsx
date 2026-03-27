import Link from "next/link";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <h1 className="hero-heading">Welcome to My Restaurant</h1>
        <p className="hero-subtext">
          Delicious food, cozy atmosphere, unforgettable experience.
        </p>
        <div className="hero-cta-group">
          <Link href="/menu" className="hero-btn hero-btn-primary">
            View Menu
          </Link>
          <Link href="/reservations" className="hero-btn hero-btn-secondary">
            Book a Table
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div className="feature-grid">
        <div className="feature-card">
          <span className="feature-icon">🍽️</span>
          <h3>Fresh Ingredients</h3>
          <p>Locally sourced produce, delivered daily for peak flavour.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔥</span>
          <h3>Chef's Specials</h3>
          <p>Rotating seasonal dishes crafted by our award-winning chef.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🍷</span>
          <h3>Curated Wine List</h3>
          <p>Hand-picked wines to pair perfectly with every course.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🌿</span>
          <h3>Cozy Atmosphere</h3>
          <p>An intimate setting perfect for date nights and celebrations.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
