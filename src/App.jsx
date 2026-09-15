import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import ShopPage from "./Pages/Shop";
import BrandsPage from "./Pages/Brand";
import SalePage from "./Pages/Sales";
import AboutPage from "./Pages/About";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import AccountPage from "./pages/Account";
import ContactPage from "./pages/Contact";
import FAQPage from "./pages/FAQ";
import TrackOrderPage from "./pages/TrackOrder";

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              background: "#0A0A0A",
              color: "#F0F0F0",
              minHeight: "100vh",
            }}
          >
            <link
              href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
              rel="stylesheet"
            />
            <Navbar />

            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/sale" element={<SalePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/track-order" element={<TrackOrderPage />} />
              </Routes>
            </main>

            <Footer />
            <style>{`
          * { box-sizing: border-box; }
          button, select, input, textarea { font-family: 'Inter', sans-serif; }
        `}</style>
          </div>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
