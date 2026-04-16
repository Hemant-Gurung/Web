"use client";

import "./Navbar.css";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <div style={{overflowX:'hidden',y:-10}}>
      <ul className="nav-links">
        <Sidebar />
      </ul>
    </div>
  );
};

export default Navbar;
