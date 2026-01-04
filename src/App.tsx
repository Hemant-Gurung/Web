import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Menu from "./pages/Menu.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Reservations from "./pages/Reservations.tsx";
import backgroundFire from "./assets/background-fire.jpg"
import backgroundFireDesktop from "./assets/background-fire-wide.jpg"

import logo from "./assets/logo.png"
import "./styles/App.css";
import { useEffect, useState } from "react";

export function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <img className="hero-logo" src={logo} alt="Logo" />
          <img
            className="hero-fire"
            src={isMobile ? backgroundFire : backgroundFireDesktop}
            alt="Fire Background"
          />
        </div>
      </header>

      <Router>
        <div className="layout">
          <Navbar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservations" element={<Reservations />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;