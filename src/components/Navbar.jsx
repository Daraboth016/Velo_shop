import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiMoon, FiSearch, FiShoppingBag, FiSun, FiUser, FiX } from "react-icons/fi";
import SearchModal from "./SearchModal";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";
import { useTheme } from "../hooks/useTheme";

const links = [
  ["Shop", "/shop"],
  ["Brands", "/brands"],
  ["Sale", "/sale"],
  ["About", "/about"],
];

const Logo = () => (
  <span className="brand-logo">
    <span className="brand-logo__mark">V</span>
    <span>VELO<span>SHOP</span></span>
  </span>
);

const Navbar = () => {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner page-shell">
          <button type="button" className="mobile-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          <Link to="/" className="site-header__logo" onClick={closeMenu}><Logo /></Link>
          <nav className={`site-nav${menuOpen ? " is-open" : ""}`}>
            <NavLink end to="/" className="site-nav__home" onClick={closeMenu}>Home</NavLink>
            {links.map(([label, path]) => (
              <NavLink key={path} to={path} onClick={closeMenu}>{label}</NavLink>
            ))}
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </nav>
          <div className="site-header__actions">
            <button type="button" aria-label="Open search" onClick={() => setSearchOpen(true)}><FiSearch /></button>
            <button
              type="button"
              className="theme-toggle"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              <span className="theme-toggle__icon">{theme === "dark" ? <FiSun /> : <FiMoon />}</span>
            </button>
            <Link to="/account" aria-label="Open account"><FiUser /></Link>
            <button type="button" className="site-header__cart" aria-label="Open cart" onClick={() => setCartOpen(true)}>
              <FiShoppingBag />
              {cartCount > 0 && <span>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
