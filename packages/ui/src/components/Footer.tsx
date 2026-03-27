import Link from "next/link";
import "./Footer.css";

interface FooterLink {
  href: string;
  label: string;
}

interface FooterProps {
  restaurantName: string;
  tagline?: string;
  links: FooterLink[];
}

export function Footer({
  restaurantName,
  tagline = "Crafted with passion. Served with love.",
  links,
}: FooterProps) {
  return (
    <footer className="ui-footer">
      <div className="ui-footer-inner">
        <div className="ui-footer-brand">
          <span className="ui-footer-logo">🍴 {restaurantName}</span>
          <p className="ui-footer-tagline">{tagline}</p>
        </div>

        <nav className="ui-footer-nav" aria-label="Footer navigation">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="ui-footer-link">
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="ui-footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {restaurantName}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
