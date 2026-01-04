import "./Navbar.css";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <div style={{overflowX:'hidden'}}>
      <ul className="nav-links">
        <Sidebar />
      </ul>
    </div>
  );
};

export default Navbar;
