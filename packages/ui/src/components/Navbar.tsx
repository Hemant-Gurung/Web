"use client";

import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { LocaleLink } from "./LocaleLink";
import "./Navbar.css";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  links: NavLink[];
  locale?: string;
  languageSelector?: ReactNode;
}

export function Navbar({ links, languageSelector }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();

  function isActive(href: string) {
    const localizedHref = `/${locale}${href === "/" ? "" : href}`;
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(localizedHref);
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      {languageSelector && (
        <div className="ui-nav-lang">{languageSelector}</div>
      )}
      <ul className="ui-nav-links">
        <Menu
          isOpen={isOpen}
          onStateChange={(state: { isOpen: boolean }) => setIsOpen(state.isOpen)}
        >
          {links.map(({ href, label }) => (
            <LocaleLink
              key={href}
              className={`bm-item menu-item${isActive(href) ? " bm-item-active" : ""}`}
              href={href}
              onClick={(e) => { (e.currentTarget as HTMLElement).blur(); setIsOpen(false); }}
            >
              {label}
            </LocaleLink>
          ))}
        </Menu>
      </ul>
    </div>
  );
}
