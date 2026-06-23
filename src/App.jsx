import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import ShopPage from "./Pages/Shop";
import BrandsPage from "./Pages/Brand";
import SalePage from "./Pages/Sales";
import AboutPage from "./Pages/About";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0A0A0A", color: "#F0F0F0", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Navbar cartCount={cartCount} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage cartCount={cartCount} setCartCount={setCartCount} />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/sale" element={<SalePage cartCount={cartCount} setCartCount={setCartCount} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />
      <style>{`
        * { box-sizing: border-box; }
        button, select, input, textarea { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}

export default App;
