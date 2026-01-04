import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

export const Sidebar = () => {
  return (

    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/menu">
        Menu
      </a>
      <a className="menu-item" href="/about">
        About
      </a>
      <a className="menu-item" href="/contact">
        Contact
      </a>
      <a className="menu-item" href="/reservations">
        Reservations
      </a>
    </Menu>
  );
};

export default Sidebar;