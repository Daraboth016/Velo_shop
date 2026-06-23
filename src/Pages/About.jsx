import React from "react";
import PageHeader from "../components/PageHeader";

const teamMembers = [
  { name: "Dara Vann", role: "Founder", icon: "DV", bio: "Builds fast road bikes and keeps the shop focused on parts that earn their shelf space." },
  { name: "Sophea Kim", role: "Fit Specialist", icon: "SK", bio: "Helps riders choose cockpit, drivetrain, and contact points that feel right on long days." },
  { name: "Rithy Chan", role: "Mechanic", icon: "RC", bio: "Tests components, handles technical checks, and knows exactly which small part saves a ride." },
  { name: "Lina Sok", role: "Support", icon: "LS", bio: "Tracks orders, answers build questions, and makes sure customers get clear help quickly." },
];

const AboutPage = () => {
  const milestones = [
    { year: "2010", event: "VeloShop founded in a Phnom Penh garage with 12 Shimano SKUs." },
    { year: "2013", event: "First official SRAM distribution partnership in Southeast Asia." },
    { year: "2016", event: "Launched e-commerce. 10,000 orders in year one." },
    { year: "2019", event: "Added Campagnolo, FSA, Maxxis — full catalog reaches 1,500+ SKUs." },
    { year: "2022", event: "Opened flagship warehouse. Same-day dispatch goes live." },
    { year: "2026", event: "2,400+ products. 48 brands. Shipping across Southeast Asia." },
  ];
 
  return (
    <div>
      <PageHeader eyebrow="OUR STORY" title="BUILT FOR" accent="RIDERS" subtitle="VeloShop started because we couldn't find the parts we needed. So we became the place that had them." />
 
      {/* Mission */}
      <section style={{ padding: "80px 40px", background: "#0d0d0d" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "#FF5500", letterSpacing: 3, marginBottom: 20 }}>WHAT WE BELIEVE</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, margin: "0 0 24px", letterSpacing: 2, lineHeight: 1 }}>
              NO COMPROMISES.<br />
              <span style={{ color: "#FF5500" }}>EVER.</span>
            </h2>
            <p style={{ color: "#666", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
              We believe every cyclist deserves access to the same components that win races. Not last year's spec. Not the "value alternative." The real thing.
            </p>
            <p style={{ color: "#666", fontSize: 15, lineHeight: 1.8 }}>
              That's why we go direct to brands, cut out the middlemen, and pass the savings on to you. If it's not good enough to race on, it's not on our shelves.
            </p>
          </div>
          {/* Visual stats block */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {[
              ["2,400+", "SKUs stocked"],
              ["48", "Brands carried"],
              ["16 yrs", "In the industry"],
              ["4.9★", "Average rating"],
            ].map(([val, label]) => (
              <div key={label} style={{ background: "#111", padding: "32px 24px" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: "#FF5500", letterSpacing: 2, lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginTop: 8 }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Timeline */}
      <section style={{ padding: "80px 40px", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#FF5500", letterSpacing: 3, marginBottom: 16 }}>SINCE 2010</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, margin: "0 0 56px", letterSpacing: 2 }}>HOW WE GOT HERE</h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 64, top: 0, bottom: 0, width: 1, background: "#1e1e1e" }} />
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: "flex", gap: 32, marginBottom: 40, alignItems: "flex-start" }}>
                <div style={{ width: 80, flexShrink: 0, textAlign: "right" }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: i === milestones.length - 1 ? "#FF5500" : "#333", letterSpacing: 1 }}>{m.year}</span>
                </div>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: i === milestones.length - 1 ? "#FF5500" : "#222", border: `2px solid ${i === milestones.length - 1 ? "#FF5500" : "#333"}`, flexShrink: 0, marginTop: 4, position: "relative", zIndex: 1 }} />
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, margin: 0, paddingTop: 2 }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Team */}
      <section style={{ padding: "80px 40px", background: "#0d0d0d" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#FF5500", letterSpacing: 3, marginBottom: 16 }}>THE PEOPLE</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, margin: "0 0 48px", letterSpacing: 2 }}>WHO RUNS THIS SHOP</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
            {teamMembers.map(member => (
              <div key={member.name} style={{ background: "#111", padding: "32px 24px" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{member.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontSize: 10, color: "#FF5500", letterSpacing: 2, marginBottom: 14 }}>{member.role.toUpperCase()}</div>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Contact CTA */}
      <section style={{ padding: "80px 40px", background: "#0A0A0A", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#FF5500", letterSpacing: 3, marginBottom: 16 }}>GET IN TOUCH</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, margin: "0 0 20px", letterSpacing: 2 }}>WE RIDE TOO.</h2>
          <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, marginBottom: 40 }}>Questions about parts, build advice, or trade accounts — we're riders first. We know what you're asking about.</p>
          <div style={{ display: "flex", gap: 2, justifyContent: "center" }}>
            {[["📧", "shop@veloshop.com"], ["📍", "Phnom Penh, Cambodia"], ["📞", "+855 23 000 000"]].map(([icon, text]) => (
              <div key={text} style={{ background: "#111", padding: "20px 24px", flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 11, color: "#555", letterSpacing: 0.5 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;
