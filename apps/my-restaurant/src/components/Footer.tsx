import Link from "next/link";
import "./Footer.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/reservations", label: "Reservations" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🍴 My Restaurant</span>
          <p className="footer-tagline">Crafted with passion. Served with love.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="footer-link">
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} My Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
