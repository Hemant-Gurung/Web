"use client";

import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import "./Sidebar.css";

export const Sidebar = () => {
  return (

    <Menu>
      <Link className="menu-item" href="/">
        Home
      </Link>
      <Link className="menu-item" href="/menu">
        Menu
      </Link>
      <Link className="menu-item" href="/about">
        About
      </Link>
      <Link className="menu-item" href="/contact">
        Contact
      </Link>
      <Link className="menu-item" href="/reservations">
        Reservations
      </Link>
    </Menu>
  );
};

export default Sidebar;