import { Link, NavLink } from 'react-router-dom'

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ width: 28, height: 28, background: "#FF5500", clipPath: "polygon(0 100%, 40% 0, 100% 0, 60% 100%)" }} />
    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, color: "#F0F0F0" }}>VELOSHOP</span>
  </div>
);

const Navbar = ({ cartCount = 0 }) => (
  <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1e1e1e", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
    
    <style>{`
      .nav-logo:hover span {
        color: #FF5500 !important;
        transition: color 0.2s ease;
      }
      .nav-logo:hover div {
        transform: rotate(10deg) scale(1.1);
        transition: transform 0.2s ease;
      }
      .nav-logo > div {
        transition: transform 0.2s ease;
      }

      .nav-link {
        position: relative;
        cursor: pointer;
        text-decoration: none;
        padding-bottom: 4px;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 1px;
        transition: color 0.2s ease;
      }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 1px;
        background: #FF5500;
        transition: width 0.25s ease;
      }
      .nav-link:hover {
        color: #FF5500 !important;
      }
      .nav-link:hover::after {
        width: 100%;
      }
      .nav-link.active::after {
        width: 100%;
      }

      .nav-icon {
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.2s ease, transform 0.2s ease;
        display: flex;
        align-items: center;
      }
      .nav-icon:hover {
        opacity: 1;
        transform: scale(1.15);
      }
      .nav-icon:hover svg circle,
      .nav-icon:hover svg path,
      .nav-icon:hover svg line {
        stroke: #FF5500;
        transition: stroke 0.2s ease;
      }

      .nav-cart {
        cursor: pointer;
        transition: transform 0.2s ease;
        display: flex;
        align-items: center;
        position: relative;
      }
      .nav-cart:hover {
        transform: scale(1.15);
      }
      .nav-cart:hover svg path,
      .nav-cart:hover svg line {
        stroke: #FF5500;
        transition: stroke 0.2s ease;
      }
    `}</style>

    {/* Logo with hover */}
    <Link to="/" style={{ textDecoration: "none" }} className="nav-logo">
      <Logo />
    </Link>

    {/* Nav links with animated underline */}
    <div style={{ display: "flex", gap: 32 }}>
      {[
        ["HOME",   "/"],
        ["SHOP",   "/shop"],
        ["BRANDS", "/brands"],
        ["SALE",   "/sale"],
        ["ABOUT",  "/about"],
      ].map(([label, path]) => (
        <NavLink
          key={label}
          to={path}
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          style={({ isActive }) => ({
            color: isActive ? "#FF5500" : "#888",
          })}
        >
          {label}
        </NavLink>
      ))}
    </div>

    {/* Icons */}
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>

      {/* Search icon */}
      <div className="nav-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {/* Cart icon */}
      <div className="nav-cart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0F0F0" strokeWidth="2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        {cartCount > 0 && (
          <span style={{
            position: "absolute", top: -8, right: -8,
            background: "#FF5500", color: "#fff",
            fontSize: 10, fontWeight: 700,
            width: 18, height: 18, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            {cartCount}
          </span>
        )}
      </div>

    </div>
  </nav>
);

export default Navbar;