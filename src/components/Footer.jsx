
const Footer = () => {
  return (
    <div>
      {/* FOOTER */}
      <footer className="site-footer">
        <div className="site-footer__grid">
          <div>
            <div className="site-footer__logo">
              <div className="site-footer__mark" />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2 }}>VELOSHOP</span>
            </div>
            <p className="site-footer__description">
              Your destination for professional bike components. Trusted by serious riders since 2010.
            </p>
          </div>
          {[
            ["Shop", ["Drivetrain", "Brakes", "Wheels", "Cockpit", "Pedals"]],
            ["Brands", ["Shimano", "SRAM", "Campagnolo", "FSA", "Maxxis"]],
            ["Support", ["Track Order", "Returns", "Warranty", "Contact", "FAQ"]],
          ].map(([heading, items]) => (
            <div key={heading}>
              <div className="site-footer__heading">{heading.toUpperCase()}</div>
              {items.map((item) => (
                <div key={item} className="site-footer__link">
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 VeloShop. All rights reserved.</span>
          <span>Shimano · SRAM · Campagnolo · FSA · Maxxis · RockShox</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
