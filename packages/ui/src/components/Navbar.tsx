"use client";

import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import "./Navbar.css";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  links: NavLink[];
  locale?: string;
  languageSelector?: ReactNode;
  variant?: "drawer" | "topbar";
}

export function Navbar({ links, languageSelector, variant = "drawer" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function localizedHref(href: string) {
    return `/${locale}${href === "/" ? "" : href}`;
  }

  function isActive(href: string) {
    const lhref = localizedHref(href);
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(lhref);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    (e.currentTarget as HTMLElement).blur();
    setIsOpen(false);
    if (!isActive(href)) {
      // Small delay lets the burger menu close animation finish before navigating
      setTimeout(() => {
        router.push(localizedHref(href));
        window.scrollTo({ top: 0 });
      }, 80);
    }
  }

  if (variant === "topbar") {
    return (
      <nav className="ui-nav-topbar">
        <ul className="ui-nav-topbar-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                className={`ui-nav-topbar-item${isActive(href) ? " ui-nav-topbar-active" : ""}`}
                href={localizedHref(href)}
                onClick={(e) => handleClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        {languageSelector && <div className="ui-nav-lang">{languageSelector}</div>}
      </nav>
    );
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
            <a
              key={href}
              className={`bm-item menu-item${isActive(href) ? " bm-item-active" : ""}`}
              href={localizedHref(href)}
              onClick={(e) => handleClick(e, href)}
            >
              {label}
            </a>
          ))}
        </Menu>
      </ul>
    </div>
  );
}
