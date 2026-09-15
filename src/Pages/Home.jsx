import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import shimanoXtImg from "../assets/Shimano XT M8100 Groupset.png";
import sramCodeRscImg from "../assets/SRAM Code RSC Brake Set.png";
import shimanoSpdImg from "../assets/Shimano SPD-SL PD-R9100 Pedals.png";
import sramXx1Img from "../assets/SRAM XX1 Eagle 12-Speed Cassette.png";
import shimanoWheelsetImg from "../assets/Shimano WH-R9200 Dura-Ace Wheelset.png";
import sramRedAxsImg from "../assets/SRAM Red AXS Power Meter Crankset.png";

const products = [
  {
    id: 1,
    brand: "Shimano",
    category: "Drivetrain",
    name: "Shimano XT M8100 Groupset",
    price: 489,
    originalPrice: 589,
    badge: "Best Seller",
    rating: 4.9,
    reviews: 312,
    color: "#2a2a2a",
    image: shimanoXtImg,
  },
  {
    id: 2,
    brand: "SRAM",
    category: "Brakes",
    name: "SRAM Code RSC Brake Set",
    price: 329,
    originalPrice: null,
    badge: "New",
    rating: 4.8,
    reviews: 145,
    color: "#1a1a2e",
    image: sramCodeRscImg,
  },
  {
    id: 3,
    brand: "Shimano",
    category: "Pedals",
    name: "Shimano SPD-SL PD-R9100 Pedals",
    price: 219,
    originalPrice: 259,
    badge: "Sale",
    rating: 4.7,
    reviews: 203,
    color: "#0f2027",
    image: shimanoSpdImg,
  },
  {
    id: 4,
    brand: "SRAM",
    category: "Cassette",
    name: "SRAM XX1 Eagle 12-Speed Cassette",
    price: 399,
    originalPrice: null,
    badge: null,
    rating: 4.9,
    reviews: 87,
    color: "#16213e",
    image: sramXx1Img,
  },
  {
    id: 5,
    brand: "Shimano",
    category: "Wheels",
    name: "Shimano WH-R9200 Dura-Ace Wheelset",
    price: 1299,
    originalPrice: 1499,
    badge: "Premium",
    rating: 5.0,
    reviews: 54,
    color: "#1a0a00",
    image: shimanoWheelsetImg,
  },
  {
    id: 6,
    brand: "SRAM",
    category: "Crankset",
    name: "SRAM Red AXS Power Meter Crankset",
    price: 779,
    originalPrice: null,
    badge: "Pro",
    rating: 4.8,
    reviews: 66,
    color: "#0a1628",
    image: sramRedAxsImg,
  },
];

const brands = [
  { name: "Shimano", founded: "1921", tagline: "Precision Engineered" },
  { name: "SRAM", founded: "1987", tagline: "Innovation First" },
  { name: "Campagnolo", founded: "1933", tagline: "Italian Excellence" },
  { name: "FSA", founded: "1988", tagline: "Full Speed Ahead" },
  { name: "Maxxis", founded: "1972", tagline: "Tire Specialists" },
  { name: "RockShox", founded: "1989", tagline: "Suspension Masters" },
];

const categories = [
  "All",
  "Drivetrain",
  "Brakes",
  "Pedals",
  "Cassette",
  "Wheels",
  "Crankset",
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#0A0A0A",
        color: "#F0F0F0",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          paddingTop: 64,
        }}
      >
        {/* Background diagonal slash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #0A0A0A 55%, #1a1a1a 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "45%",
            height: "100%",
            background: "#111",
            clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,85,0,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Speed lines */}
        {[0.15, 0.35, 0.55, 0.72, 0.88].map((t, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: `${t * 100}%`,
              width: `${30 + i * 8}%`,
              height: 1,
              background: `rgba(255,85,0,${0.06 + i * 0.02})`,
            }}
          />
        ))}

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 40px",
            maxWidth: 1200,
            width: "100%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,85,0,0.12)",
                border: "1px solid rgba(255,85,0,0.3)",
                borderRadius: 2,
                padding: "6px 14px",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FF5500",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#FF5500",
                  letterSpacing: 2,
                  fontWeight: 600,
                }}
              >
                FREE SHIPPING OVER $150
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(64px, 8vw, 108px)",
                lineHeight: 0.92,
                margin: "0 0 24px",
                letterSpacing: 2,
              }}
            >
              <span style={{ display: "block" }}>RIDE</span>
              <span style={{ display: "block", color: "#FF5500" }}>
                FASTER.
              </span>
              <span style={{ display: "block" }}>RIDE HARD.</span>
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#888",
                lineHeight: 1.7,
                maxWidth: 420,
                marginBottom: 40,
              }}
            >
              Professional-grade components from Shimano, SRAM, and the world's
              top cycling brands. Built for riders who don't compromise.
            </p>
            {/* Add this style tag once in your component */}
            <style>{`
              .btn-primary {
                background: #FF5500;
                color: #fff;
                border: none;
                padding: 16px 36px;
                fontSize: 13px;
                font-weight: 700;
                letter-spacing: 2px;
                cursor: pointer;
                clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 12px 100%);
                transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
                font-family: 'Inter', sans-serif;
              }
              .btn-primary:hover {
                background: #cc4400;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 85, 0, 0.4);
              }
              .btn-primary:active {
                transform: translateY(0px);
                background: #aa3300;
              }

              .btn-secondary {
                background: transparent;
                color: #F0F0F0;
                border: 1px solid #333;
                padding: 16px 36px;
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 2px;
                cursor: pointer;
                transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
                font-family: 'Inter', sans-serif;
              }
              .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.06);
                border-color: #F0F0F0;
                color: #fff;
                transform: translateY(-2px);
              }
              .btn-secondary:active {
                transform: translateY(0px);
                background: rgba(255, 255, 255, 0.1);
              }
            `}</style>

            <div style={{ display: "flex", gap: 16 }}>
              <Link to="/shop">
                <button className="btn-primary">SHOP NOW</button>
              </Link>
              <Link to="/brands">
                <button className="btn-secondary">VIEW BRANDS</button>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                gap: 40,
                marginTop: 56,
                marginBottom: 10,
              }}
            >
              {[
                ["2,400+", "Components"],
                ["48", "Brands"],
                ["4.9★", "Rating"],
              ].map(([val, label]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 36,
                      color: "#FF5500",
                      letterSpacing: 1,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#555",
                      letterSpacing: 2,
                      marginTop: 2,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual: animated wheel */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", width: 380, height: 380 }}>
              <style>{`
                .wheel-spin { transform-origin: 190px 190px; animation: spin 9s linear infinite; }
                .wheel-spin-slow { transform-origin: 190px 190px; animation: spin 18s linear infinite; }
                .dot-orbit-r { transform-origin: 190px 190px; animation: spinR 6s linear infinite; }
                .hub-breathe { transform-origin: 190px 190px; animation: hubBreathe 2.5s ease-in-out infinite; }
                .badge-pulse { animation: badgePulse 2.4s ease-in-out infinite; }
                .badge-pulse2 { animation: badgePulse 2.4s ease-in-out 1.2s infinite; }
                .glow-breathe { animation: glowPulse 3s ease-in-out infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes spinR { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
                @keyframes badgePulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.85; transform:scale(1.04); } }
                @keyframes hubBreathe { 0%,100% { transform:scale(1); } 50% { transform:scale(1.08); } }
                @keyframes glowPulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
              `}</style>
              <svg
                viewBox="0 0 380 380"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%" }}
              >
                <defs>
                  <radialGradient id="rimGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="70%" stopColor="#FF5500" stopOpacity="0" />
                    <stop
                      offset="100%"
                      stopColor="#FF5500"
                      stopOpacity="0.18"
                    />
                  </radialGradient>
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF5500" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
                  </radialGradient>
                  <filter id="softBlur">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                </defs>

                {/* Ambient glow */}
                <circle
                  cx="190"
                  cy="190"
                  r="165"
                  fill="url(#rimGlow)"
                  filter="url(#softBlur)"
                  className="glow-breathe"
                />

                {/* Tyre track (slow spin) */}
                <g className="wheel-spin-slow">
                  <circle
                    cx="190"
                    cy="190"
                    r="168"
                    fill="none"
                    stroke="#1e1e1e"
                    strokeWidth="14"
                    strokeDasharray="6 10"
                  />
                </g>

                {/* Tyre & rim rings */}
                <circle
                  cx="190"
                  cy="190"
                  r="161"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="5"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="158"
                  fill="none"
                  stroke="#FF5500"
                  strokeWidth="1"
                  strokeOpacity="0.25"
                  strokeDasharray="4 8"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="140"
                  fill="none"
                  stroke="#222"
                  strokeWidth="1.5"
                />

                {/* Spokes (fast spin) */}
                <g className="wheel-spin">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                      <line
                        key={deg}
                        x1="190"
                        y1="190"
                        x2={190 + 140 * Math.sin(rad)}
                        y2={190 - 140 * Math.cos(rad)}
                        stroke="#FF5500"
                        strokeWidth="1.2"
                        strokeOpacity="0.35"
                      />
                    );
                  })}
                  {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
                    (deg) => {
                      const rad = (deg * Math.PI) / 180;
                      return (
                        <line
                          key={deg}
                          x1="190"
                          y1="190"
                          x2={190 + 140 * Math.sin(rad)}
                          y2={190 - 140 * Math.cos(rad)}
                          stroke="#333"
                          strokeWidth="0.8"
                          strokeOpacity="0.5"
                        />
                      );
                    },
                  )}
                  {[0, 90, 180, 270].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    return (
                      <circle
                        key={deg}
                        cx={190 + 140 * Math.sin(rad)}
                        cy={190 - 140 * Math.cos(rad)}
                        r="3"
                        fill="#FF5500"
                        fillOpacity="0.6"
                      />
                    );
                  })}
                </g>

                {/* Counter-orbiting dots */}
                <g className="dot-orbit-r">
                  <circle
                    cx="190"
                    cy="30"
                    r="4"
                    fill="#FF5500"
                    fillOpacity="0.9"
                  />
                  <circle
                    cx="190"
                    cy="350"
                    r="4"
                    fill="#FF5500"
                    fillOpacity="0.9"
                  />
                  <circle
                    cx="30"
                    cy="190"
                    r="3"
                    fill="#FF5500"
                    fillOpacity="0.5"
                  />
                  <circle
                    cx="350"
                    cy="190"
                    r="3"
                    fill="#FF5500"
                    fillOpacity="0.5"
                  />
                </g>

                {/* Hub */}
                <circle
                  cx="190"
                  cy="190"
                  r="52"
                  fill="url(#hubGlow)"
                  className="glow-breathe"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="44"
                  fill="#111"
                  stroke="#FF5500"
                  strokeWidth="2"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="36"
                  fill="#151515"
                  stroke="#2a2a2a"
                  strokeWidth="1"
                />
                <g className="hub-breathe">
                  <circle cx="190" cy="190" r="22" fill="#FF5500" />
                  <circle cx="190" cy="190" r="10" fill="#0A0A0A" />
                  <circle cx="190" cy="190" r="4" fill="#FF5500" />
                </g>

                {/* Brand text */}
                <text
                  x="240"
                  y="118"
                  fontFamily="'Bebas Neue', sans-serif"
                  fontSize="11"
                  letterSpacing="2"
                  fill="#444"
                  textAnchor="middle"
                >
                  SHIMANO
                </text>
                <text
                  x="140"
                  y="270"
                  fontFamily="'Bebas Neue', sans-serif"
                  fontSize="11"
                  letterSpacing="2"
                  fill="#444"
                  textAnchor="middle"
                >
                  SRAM
                </text>
                <text
                  x="248"
                  y="240"
                  fontFamily="'Bebas Neue', sans-serif"
                  fontSize="10"
                  letterSpacing="2"
                  fill="#333"
                  textAnchor="middle"
                >
                  XT
                </text>
                <text
                  x="134"
                  y="148"
                  fontFamily="'Bebas Neue', sans-serif"
                  fontSize="10"
                  letterSpacing="2"
                  fill="#333"
                  textAnchor="middle"
                >
                  EAGLE
                </text>

                {/* Badges */}
                <g className="badge-pulse">
                  <rect
                    x="270"
                    y="10"
                    width="78"
                    height="28"
                    fill="#FF5500"
                    rx="2"
                  />
                  <text
                    x="309"
                    y="29"
                    fontFamily="'Inter', sans-serif"
                    fontSize="11"
                    fontWeight="700"
                    fill="white"
                    textAnchor="middle"
                    letterSpacing="1"
                  >
                    12-SPD
                  </text>
                </g>
                <line
                  x1="270"
                  y1="36"
                  x2="255"
                  y2="60"
                  stroke="#FF5500"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                  strokeDasharray="4 3"
                />

                <g className="badge-pulse2">
                  <rect
                    x="10"
                    y="310"
                    width="90"
                    height="28"
                    fill="#1C1C1E"
                    stroke="#444"
                    strokeWidth="1"
                    rx="2"
                  />
                  <text
                    x="55"
                    y="329"
                    fontFamily="'Inter', sans-serif"
                    fontSize="11"
                    fontWeight="600"
                    fill="#F0F0F0"
                    textAnchor="middle"
                    letterSpacing="1"
                  >
                    Di2 READY
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "#444",
          }}
        >
          <span style={{ fontSize: 10, letterSpacing: 3 }}>SCROLL</span>
          <div
            style={{
              width: 1,
              height: 48,
              background: "linear-gradient(to bottom, #444, transparent)",
            }}
          />
        </div>
      </section>

      {/* BRAND STRIP */}
      <section
        style={{
          background: "#FF5500",
          padding: "16px 0", // ← remove horizontal padding, use 0
          overflow: "hidden",
          width: "100%", // ← ensure full width
        }}
      >
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            gap: 0;
            animation: marquee 35s linear infinite;
            width: max-content;
            will-change: transform;   /* smoother GPU animation */
          }
        `}</style>

        <div className="marquee-track">
          {/* Repeat 4x so it never shows a gap on any screen width */}
          {[...brands, ...brands, ...brands, ...brands].map((b, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22,
                letterSpacing: 3,
                color: "rgba(0,0,0,0.3)",
                flexShrink: 0,
                padding: "0 48px", // ← spacing between items
                display: "inline-block",
              }}
            >
              {b.name}
              {/* Optional dot separator */}
              <span style={{ marginLeft: 30, color: "rgba(0,0,0,0.2)" }}>
                ·
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "#FF5500",
                letterSpacing: 3,
                marginBottom: 12,
              }}
            >
              FEATURED COMPONENTS
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 56,
                margin: 0,
                letterSpacing: 2,
              }}
            >
              TOP PICKS
            </h2>
          </div>
          <span
            style={{
              fontSize: 13,
              color: "#FF5500",
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            VIEW ALL →
          </span>
        </div>

        {/* Category filter */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? "#FF5500" : "transparent",
                color: activeCategory === cat ? "#fff" : "#555",
                border: `1px solid ${activeCategory === cat ? "#FF5500" : "#222"}`,
                padding: "8px 20px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.5,
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 2,
          }}
        >
          {filtered.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#0f0f0f",
                position: "relative",
                overflow: "hidden",
                transition: "transform .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {/* Product image area */}
              <div
                style={{
                  height: 220,
                  background: `linear-gradient(135deg, ${product.color} 0%, #111 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {product.image ? (
                  // ✅ Real image
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      // If image fails to load, hide it and show fallback
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // keeps aspect ratio, no cropping
                      padding: "20px",
                      transition: "transform .3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                ) : null}

                {/* Fallback shown when no image or image fails */}
                <div
                  style={{
                    display: product.image ? "none" : "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 48,
                      color: "#333",
                      letterSpacing: 3,
                    }}
                  >
                    {product.brand.slice(0, 2).toUpperCase()}
                  </div>
                  <div
                    style={{ fontSize: 10, color: "#2a2a2a", letterSpacing: 3 }}
                  >
                    {product.category.toUpperCase()}
                  </div>
                </div>

                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    display: "flex",
                    gap: 8,
                  }}
                >
                  {product.badge && (
                    <span
                      style={{
                        background:
                          product.badge === "Sale"
                            ? "#FF5500"
                            : product.badge === "New"
                              ? "#00d4aa"
                              : "#333",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "4px 10px",
                        letterSpacing: 1,
                      }}
                    >
                      {product.badge.toUpperCase()}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontSize: 10,
                    color: "#444",
                    letterSpacing: 1,
                  }}
                >
                  {product.brand.toUpperCase()}
                </span>
              </div>

              {/* Product info */}
              <div style={{ padding: "20px 24px 24px" }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "#444",
                    letterSpacing: 2,
                    marginBottom: 6,
                  }}
                >
                  {product.category.toUpperCase()}
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    margin: "0 0 12px",
                    lineHeight: 1.4,
                  }}
                >
                  {product.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 16,
                  }}
                >
                  <span style={{ color: "#FF5500", fontSize: 12 }}>
                    {"★".repeat(Math.floor(product.rating))}
                  </span>
                  <span style={{ fontSize: 11, color: "#555" }}>
                    ({product.reviews})
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 22,
                        fontFamily: "'Bebas Neue', sans-serif",
                        color: "#F0F0F0",
                        letterSpacing: 1,
                      }}
                    >
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span
                        style={{
                          fontSize: 13,
                          color: "#444",
                          textDecoration: "line-through",
                          marginLeft: 8,
                        }}
                      >
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAdd(product)}
                    style={{
                      background:
                        addedId === product.id ? "#00d4aa" : "#FF5500",
                      color: "#fff",
                      border: "none",
                      padding: "10px 18px",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      cursor: "pointer",
                      transition: "background .3s",
                      clipPath:
                        "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)",
                    }}
                  >
                    {addedId === product.id ? "ADDED ✓" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section style={{ background: "#0d0d0d", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              style={{
                fontSize: 11,
                color: "#FF5500",
                letterSpacing: 3,
                marginBottom: 12,
              }}
            >
              TRUSTED BY PROS
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 56,
                margin: 0,
                letterSpacing: 2,
              }}
            >
              OUR BRANDS
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 2,
            }}
          >
            {brands.map((brand) => (
              <div
                key={brand.name}
                style={{
                  background: "#111",
                  padding: "32px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  borderBottom: "2px solid transparent",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = "#FF5500";
                  e.currentTarget.style.background = "#161616";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "transparent";
                  e.currentTarget.style.background = "#111";
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 28,
                    letterSpacing: 3,
                    marginBottom: 6,
                  }}
                >
                  {brand.name}
                </div>
                <div style={{ fontSize: 10, color: "#444", letterSpacing: 2 }}>
                  EST. {brand.founded}
                </div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 8 }}>
                  {brand.tagline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        style={{
          position: "relative",
          padding: "100px 40px",
          overflow: "hidden",
          background: "#0A0A0A",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(255,85,0,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#FF5500",
              letterSpacing: 3,
              marginBottom: 20,
            }}
          >
            LIMITED TIME
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 7vw, 80px)",
              margin: "0 0 24px",
              letterSpacing: 2,
              lineHeight: 1,
            }}
          >
            UP TO 30% OFF
            <br />
            <span style={{ color: "#FF5500" }}>SHIMANO & SRAM</span>
          </h2>
          <p
            style={{
              color: "#666",
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Upgrade your build with premium components. Sale ends Sunday — don't
            miss it.
          </p>
          <Link to="/shop">
            <button
              style={{
                background: "#FF5500",
                color: "#fff",
                border: "none",
                padding: "18px 48px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 2,
                cursor: "pointer",
                clipPath:
                  "polygon(0 0, calc(100% - 14px) 0, 100% 100%, 14px 100%)",
              }}
            >
              SHOP THE SALE
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
