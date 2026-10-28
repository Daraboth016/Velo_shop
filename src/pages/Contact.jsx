import { useState } from "react";
import PageHeader from "../components/PageHeader";

const initialForm = {
  name: "",
  email: "",
  topic: "question",
  orderNumber: "",
  subject: "",
  message: "",
};

const inputStyle = {
  width: "100%",
  background: "#171717",
  border: "1px solid #2a2a2a",
  color: "#F0F0F0",
  padding: "13px 14px",
  fontSize: 14,
  outline: "none",
};

const labelStyle = {
  display: "grid",
  gap: 7,
  color: "#888",
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: 1.5,
};

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const responseText = await response.text();
      let result;

      try {
        result = responseText ? JSON.parse(responseText) : null;
      } catch {
        result = null;
      }

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "The contact service is unavailable. If running locally, start the app with `npx vercel dev`.",
        );
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus(error.message || "Unable to send your message.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setStatus("");
  };

  return (
    <div>
      <style>{`
        @media (max-width: 720px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .contact-fields {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <PageHeader
        eyebrow="SUPPORT CENTRE"
        title="LET'S"
        accent="TALK"
        subtitle="Have a question, want to share feedback, or need help choosing a component? Send us a message and our riders will get back to you."
      />

      <section
        className="contact-layout"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "56px 40px 100px",
          display: "grid",
          gridTemplateColumns: "minmax(240px, 0.8fr) minmax(0, 1.4fr)",
          gap: 24,
        }}
      >
        <aside
          style={{
            background: "#111",
            border: "1px solid #1e1e1e",
            padding: 30,
            alignSelf: "start",
          }}
        >
          <div
            className="contact-fields"
            style={{
              color: "#FF5500",
              fontSize: 11,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            HOW CAN WE HELP?
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 42,
              letterSpacing: 1,
              lineHeight: 1,
              margin: "0 0 18px",
            }}
          >
            RIDE WITH
            <br />
            CONFIDENCE.
          </h2>
          <p
            style={{
              color: "#777",
              fontSize: 13,
              lineHeight: 1.7,
              margin: "0 0 28px",
            }}
          >
            Tell us what is on your mind. We can help with orders, product
            compatibility, returns, or anything else related to your ride.
          </p>
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
        </aside>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#111",
            border: "1px solid #1e1e1e",
            padding: 30,
            display: "grid",
            gap: 18,
          }}
        >
          <div>
            <div style={{ color: "#FF5500", fontSize: 11, letterSpacing: 2 }}>
              SEND A MESSAGE
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 32,
                letterSpacing: 1,
                margin: "8px 0 0",
              }}
            >
              WE'RE LISTENING
            </h2>
          </div>

          <div
            className="contact-fields"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            <label style={labelStyle}>
              YOUR NAME
              <input
                required
                maxLength={100}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                style={inputStyle}
              />
            </label>
            <label style={labelStyle}>
              EMAIL ADDRESS
              <input
                required
                type="email"
                maxLength={254}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </label>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            <label style={labelStyle}>
              WHAT CAN WE HELP WITH?
              <select
                name="topic"
                value={form.topic}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="question">General question</option>
                <option value="feedback">Website or service feedback</option>
                <option value="product">Product or fit advice</option>
                <option value="order">Order support</option>
                <option value="return">Returns and exchanges</option>
              </select>
            </label>
            <label style={labelStyle}>
              ORDER NUMBER <span style={{ color: "#555" }}>(OPTIONAL)</span>
              <input
                name="orderNumber"
                maxLength={100}
                value={form.orderNumber}
                onChange={handleChange}
                placeholder="e.g. VELO-123456"
                style={inputStyle}
              />
            </label>
          </div>

          <label style={labelStyle}>
            SUBJECT
            <input
              required
              maxLength={200}
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What is your message about?"
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            YOUR MESSAGE
            <textarea
              required
              maxLength={3000}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us how we can help..."
              rows="7"
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
            />
          </label>

          {status === "success" && (
            <div
              role="status"
              style={{
                color: "#8acb88",
                background: "rgba(138, 203, 136, 0.08)",
                border: "1px solid rgba(138, 203, 136, 0.25)",
                padding: "12px 14px",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              Message sent successfully. Thanks for getting in touch — our
              riders will reply shortly.
            </div>
          )}
          {status && status !== "success" && (
            <div
              role="alert"
              style={{
                color: "#ff9b7a",
                background: "rgba(255, 85, 0, 0.08)",
                border: "1px solid rgba(255, 85, 0, 0.3)",
                padding: "12px 14px",
                fontSize: 13,
              }}
            >
              {status}
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: "#555", fontSize: 11 }}>
              We usually reply within one business day.
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              {status === "success" && (
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: "transparent",
                    color: "#888",
                    border: "1px solid #333",
                    padding: "14px 18px",
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    cursor: "pointer",
                  }}
                >
                  SEND ANOTHER
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#FF5500",
                  color: "#fff",
                  border: "none",
                  padding: "14px 22px",
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  cursor: "pointer",
                  opacity: loading ? 0.65 : 1,
                }}
              >
                {loading ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
