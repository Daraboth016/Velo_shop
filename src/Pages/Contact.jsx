import { useState } from "react";
import PageHeader from "../components/PageHeader";

const inputStyle = {
  width: "100%",
  background: "#171717",
  border: "1px solid #2a2a2a",
  color: "#F0F0F0",
  padding: "13px 14px",
  fontSize: 14,
  outline: "none",
};

const ContactPage = () => {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHeader
        eyebrow="SUPPORT"
        title="LET'S TALK"
        accent="BIKES"
        subtitle="Need build advice, help with an order, or a recommendation? Our riders are listening."
      />
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "56px 40px 100px",
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: 24,
        }}
      >
        <div style={{ background: "#111", padding: 28 }}>
          <div
            style={{
              color: "#FF5500",
              fontSize: 11,
              letterSpacing: 2,
              marginBottom: 18,
            }}
          >
            CONTACT DETAILS
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 38,
              letterSpacing: 1,
              margin: "0 0 24px",
            }}
          >
            RIDER SUPPORT
          </h2>
          {[
            ["EMAIL", "shop@veloshop.com"],
            ["PHONE", "+855 23 000 000"],
            ["HOURS", "Mon-Sat · 08:00-18:00"],
            ["WORKSHOP", "Phnom Penh, Cambodia"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{ borderTop: "1px solid #242424", padding: "16px 0" }}
            >
              <div style={{ color: "#555", fontSize: 10, letterSpacing: 2 }}>
                {label}
              </div>
              <div style={{ color: "#ccc", marginTop: 6, fontSize: 14 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          style={{ background: "#111", padding: 28, display: "grid", gap: 14 }}
        >
          <div style={{ color: "#FF5500", fontSize: 11, letterSpacing: 2 }}>
            SEND A MESSAGE
          </div>
          <input required placeholder="Your name" style={inputStyle} />
          <input
            required
            type="email"
            placeholder="Email address"
            style={inputStyle}
          />
          <select style={inputStyle} defaultValue="order">
            <option value="order">Order support</option>
            <option value="fit">Product fit advice</option>
            <option value="trade">Trade account</option>
            <option value="other">Something else</option>
          </select>
          <textarea
            required
            placeholder="How can we help?"
            rows="6"
            style={{ ...inputStyle, resize: "vertical" }}
          />
          {sent && (
            <div style={{ color: "#8acb88", fontSize: 13 }}>
              Message received. We will get back to you shortly.
            </div>
          )}
          <button
            type="submit"
            style={{
              background: "#FF5500",
              color: "#fff",
              border: "none",
              padding: 14,
              fontWeight: 700,
              letterSpacing: 2,
              cursor: "pointer",
            }}
          >
            SEND MESSAGE
          </button>
        </form>
      </section>
    </div>
  );
};
export default ContactPage;
