
const Footer = () => {
  return (
    <div>
      {/* FOOTER */}
      <footer style={{ background: "#080808", borderTop: "1px solid #1a1a1a", padding: "48px 40px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, background: "#FF5500", clipPath: "polygon(0 100%, 40% 0, 100% 0, 60% 100%)" }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2 }}>VELOSHOP</span>
            </div>
            <p style={{ color: "#444", fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>
              Your destination for professional bike components. Trusted by serious riders since 2010.
            </p>
          </div>
          {[
            ["Shop", ["Drivetrain", "Brakes", "Wheels", "Cockpit", "Pedals"]],
            ["Brands", ["Shimano", "SRAM", "Campagnolo", "FSA", "Maxxis"]],
            ["Support", ["Track Order", "Returns", "Warranty", "Contact", "FAQ"]],
          ].map(([heading, items]) => (
            <div key={heading}>
              <div style={{ fontSize: 11, color: "#FF5500", letterSpacing: 2, marginBottom: 20 }}>{heading.toUpperCase()}</div>
              {items.map((item) => (
                <div key={item} style={{ fontSize: 13, color: "#444", marginBottom: 10, cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = "#F0F0F0"}
                  onMouseLeave={e => e.target.style.color = "#444"}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #161616", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#333" }}>© 2026 VeloShop. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "#333" }}>Shimano · SRAM · Campagnolo · FSA · Maxxis · RockShox</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
