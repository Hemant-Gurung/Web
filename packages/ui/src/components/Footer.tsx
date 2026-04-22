"use client";

import { LocaleLink } from "./LocaleLink";
import "./Footer.css";

interface FooterLink {
  href: string;
  label: string;
}

interface SocialLink {
  platform: "instagram" | "facebook" | "tiktok" | "twitter";
  url: string;
}

interface FooterProps {
  restaurantName: string;
  tagline?: string;
  links: FooterLink[];
  socialLinks?: SocialLink[];
  locale?: string;
}

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  twitter: "Twitter / X",
};

export function Footer({
  restaurantName,
  tagline = "Crafted with passion. Served with love.",
  links,
  socialLinks,
}: FooterProps) {
  return (
    <footer className="ui-footer">
      <div className="ui-footer-inner">
        <div className="ui-footer-brand">
          <span className="ui-footer-logo">🍴 {restaurantName}</span>
          <p className="ui-footer-tagline">{tagline}</p>
          {socialLinks && socialLinks.length > 0 && (
            <div className="ui-footer-social">
              {socialLinks.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-footer-social-link"
                >
                  {SOCIAL_LABELS[platform] ?? platform}
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="ui-footer-nav" aria-label="Footer navigation">
          {links.map(({ href, label }) => (
            <LocaleLink key={href} href={href} className="ui-footer-link">
              {label}
            </LocaleLink>
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
