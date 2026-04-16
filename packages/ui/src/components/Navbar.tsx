"use client";

import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ overflowX: "hidden" }}>
      <ul className="ui-nav-links">
        <Menu
          isOpen={isOpen}
          onStateChange={(state: { isOpen: boolean }) => setIsOpen(state.isOpen)}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              className="bm-item menu-item"
              href={href}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </Menu>
      </ul>
    </div>
  );
}
