import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Menu from "./pages/Menu.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Reservations from "./pages/Reservations.tsx";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
