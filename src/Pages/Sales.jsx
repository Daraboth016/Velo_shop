import React, { useState } from "react";
import saleProducts from "../data/saleProducts";

const SalePage = ({ cartCount, setCartCount }) => {
  const [addedId, setAddedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
 
  const handleAdd = (id) => {
    setCartCount(c => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };
 
  const discountBrackets = ["All", "Up to 10%", "10–20%", "20%+"];
  const getDiscount = (p) => Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
 
  const filtered = saleProducts.filter(p => {
    if (activeFilter === "All") return true;
    const d = getDiscount(p);
    if (activeFilter === "Up to 10%") return d < 10;
    if (activeFilter === "10–20%") return d >= 10 && d < 20;
    if (activeFilter === "20%+") return d >= 20;
    return true;
  });
 
  const totalSavings = filtered.reduce((acc, p) => acc + (p.originalPrice - p.price), 0);
 
  return (
    <div>
      {/* Sale hero banner */}
      <div style={{ background: "#FF5500", padding: "140px 40px 60px", position: "relative", overflow: "hidden" }}>
        {[0.2, 0.5, 0.8].map((t, i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: `${t * 100}%`, width: "100%", height: 1, background: "rgba(0,0,0,0.1)" }} />
        ))}
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", letterSpacing: 3, marginBottom: 14 }}>LIMITED TIME OFFERS</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(64px, 9vw, 120px)", lineHeight: 0.9, margin: "0 0 24px", letterSpacing: 2, color: "#0A0A0A" }}>
            SALE.<br />
            <span style={{ color: "#fff" }}>NOW.</span>
          </h1>
          <p style={{ color: "rgba(0,0,0,0.6)", fontSize: 15, maxWidth: 440, lineHeight: 1.7, marginBottom: 32 }}>
            Up to 30% off premium components. Sale ends Sunday — don't sleep on it.
          </p>
          <div style={{ display: "flex", gap: 40 }}>
            {[
              [saleProducts.length, "Items on sale"],
              [`Up to ${Math.max(...saleProducts.map(getDiscount))}%`, "Max discount"],
              [`$${Math.min(...saleProducts.map(p => p.price))}`, "Starts from"],
            ].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#0A0A0A", letterSpacing: 1 }}>{val}</div>
                <div style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", letterSpacing: 2 }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px" }}>
        {/* Discount filter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {discountBrackets.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                background: activeFilter === f ? "#FF5500" : "transparent",
                color: activeFilter === f ? "#fff" : "#555",
                border: `1px solid ${activeFilter === f ? "#FF5500" : "#222"}`,
                padding: "7px 16px", fontSize: 11, fontWeight: 600, letterSpacing: 1, cursor: "pointer"
              }}>{f.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#444" }}>
            POTENTIAL SAVINGS: <span style={{ color: "#FF5500", fontWeight: 700 }}>${totalSavings.toLocaleString()}</span>
          </div>
        </div>
 
        {/* Sale grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
          {filtered.map(product => {
            const discount = getDiscount(product);
            const savings = product.originalPrice - product.price;
            return (
              <div key={product.id} style={{ background: "#0f0f0f", position: "relative", overflow: "hidden", transition: "transform .2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                {/* Discount ribbon */}
                <div style={{ position: "absolute", top: 16, right: -24, background: "#FF5500", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 32px", transform: "rotate(45deg)", letterSpacing: 1, zIndex: 2 }}>
                  -{discount}%
                </div>
                <div style={{ height: 180, background: `linear-gradient(135deg, ${product.color} 0%, #111 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 56 }}>{product.icon}</span>
                </div>
                <div style={{ padding: "16px 20px 20px" }}>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, marginBottom: 4 }}>{product.brand.toUpperCase()} · {product.category.toUpperCase()}</div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, margin: "0 0 12px", lineHeight: 1.4 }}>{product.name}</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 22, fontFamily: "'Bebas Neue', sans-serif", color: "#FF5500", letterSpacing: 1 }}>${product.price}</span>
                    <span style={{ fontSize: 14, color: "#444", textDecoration: "line-through" }}>${product.originalPrice}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#00d4aa", marginBottom: 14 }}>You save ${savings}</div>
                  <button onClick={() => handleAdd(product.id)} style={{
                    width: "100%", background: addedId === product.id ? "#00d4aa" : "#FF5500",
                    color: "#fff", border: "none", padding: "11px",
                    fontSize: 11, fontWeight: 700, letterSpacing: 2, cursor: "pointer", transition: "background .3s"
                  }}>
                    {addedId === product.id ? "✓ ADDED TO CART" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SalePage;