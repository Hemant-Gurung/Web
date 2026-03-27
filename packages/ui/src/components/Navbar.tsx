"use client";

import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import "./Navbar.css";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  links: NavLink[];
}

export function Navbar({ links }: NavbarProps) {
  return (
    <div style={{ overflowX: "hidden" }}>
      <ul className="ui-nav-links">
        <Menu>
          {links.map(({ href, label }) => (
            <Link key={href} className="bm-item menu-item" href={href}>
              {label}
            </Link>
          ))}
        </Menu>
      </ul>
    </div>
  );
}
