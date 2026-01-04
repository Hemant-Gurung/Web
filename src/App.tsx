import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Menu from "./pages/Menu.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Reservations from "./pages/Reservations.tsx";
import backgroundFire from "./assets/background-fire.jpg"
import logo from "./assets/logo.png"
import background from "./assets/background.jpg"
import "./styles/App.css";

export function App() {
  return (
    <div className="app">
      <img
        className="hero-background"
        src={background}
        alt="Fire Background"
      />
      {/* Hero Section */}
      <header className="hero">
        
        <div className="hero-content">
          <img
            className="hero-logo"
            src={logo}
            alt="Fire Background"
          />
          <img
            className="hero-fire"
            src={backgroundFire}
            alt="Fire Background"
          />
        </div>
      </header>
      {/* App Layout */}
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