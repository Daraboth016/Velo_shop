import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import brandsData from "../data/brandsData";

const BrandsPage = () => {
  const [selected, setSelected] = useState(null);
  const brand = selected !== null ? brandsData[selected] : null;
 
  return (
    <div>
      <PageHeader eyebrow="OUR PARTNERS" title="THE" accent="BRANDS" subtitle="We carry only the best. Every brand on this list is here because it earns its place — on the road, on the trail, in the peloton." />
 
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 2 }}>
          {brandsData.map((b, i) => (
            <div key={b.name} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? "#161616" : "#0f0f0f", border: `1px solid ${selected === i ? b.accent : "#1a1a1a"}`, padding: "32px", cursor: "pointer", transition: "all .2s", position: "relative", overflow: "hidden" }}>
              {/* Background accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: b.accent, opacity: 0.05, borderRadius: "0 0 0 80px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: 3, color: selected === i ? b.accent : "#F0F0F0", transition: "color .2s" }}>{b.name}</div>
                  <div style={{ fontSize: 10, color: "#444", letterSpacing: 2, marginTop: 2 }}>EST. {b.founded} · {b.country.toUpperCase()}</div>
                </div>
                <div style={{ fontSize: 10, color: b.accent, letterSpacing: 1, opacity: 0.7 }}>{b.products}+ PRODUCTS</div>
              </div>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65, margin: "0 0 20px" }}>{b.description}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {b.categories.map(cat => (
                  <span key={cat} style={{ fontSize: 9, color: "#555", border: "1px solid #222", padding: "3px 8px", letterSpacing: 1 }}>{cat.toUpperCase()}</span>
                ))}
              </div>
              {selected === i && (
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: b.accent, letterSpacing: 1 }}>BROWSE {b.name.toUpperCase()} →</span>
                  <span style={{ fontSize: 10, color: "#333" }}>Click to collapse</span>
                </div>
              )}
            </div>
          ))}
        </div>
 
        {/* Brand trust bar */}
        <div style={{ marginTop: 80, padding: "48px", background: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 3 }}>WHY WE CARRY THESE BRANDS</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {[
              ["🏆", "Race-Proven", "Every brand we stock has WorldTour or World Cup presence. If pros trust it, you can too."],
              ["🔬", "Quality Audited", "Our technical team personally tests every product line before it hits our shelves."],
              ["🤝", "Direct Partnerships", "We buy direct from brands — no middlemen, better prices, faster stock."],
            ].map(([icon, title, text]) => (
              <div key={title} style={{ padding: "32px", background: "#111", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 2, marginBottom: 10 }}>{title.toUpperCase()}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BrandsPage;