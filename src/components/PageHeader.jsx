import React from "react";

const PageHeader = ({ eyebrow, title, accent, subtitle }) => (
  <section style={{ background: "#0A0A0A", padding: "140px 40px 64px", borderBottom: "1px solid #1a1a1a" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ fontSize: 11, color: "#FF5500", letterSpacing: 3, marginBottom: 16 }}>{eyebrow}</div>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 9vw, 110px)", lineHeight: 0.92, margin: "0 0 24px", letterSpacing: 2 }}>
        {title} <span style={{ color: "#FF5500" }}>{accent}</span>
      </h1>
      <p style={{ color: "#777", fontSize: 15, lineHeight: 1.7, maxWidth: 620, margin: 0 }}>{subtitle}</p>
    </div>
  </section>
);

export default PageHeader;
