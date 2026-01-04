import { Link } from "react-router-dom";
import "./Navbar.css";
import Sidebar from "./Sidebar";
import backgroundFire from "../assets/background-fire.jpg"
import logo from "../assets/logo.png"
import background from "../assets/background.jpg"

const Navbar = () => {
  return (
    // <nav className="navbar">
    <div style={{overflowX:'hidden'}}>
      <ul className="nav-links">
        <Sidebar />
      </ul>
    </div>
    // </nav>
  );
};

export default Navbar;
