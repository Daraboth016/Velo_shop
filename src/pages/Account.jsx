import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";

const panelStyle = {
  background: "#111",
  border: "1px solid #242424",
  padding: 28,
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
const buttonStyle = {
  background: "#FF5500",
  color: "#fff",
  border: "none",
  padding: "14px 18px",
  fontWeight: 700,
  letterSpacing: 1.5,
  cursor: "pointer",
};

const AccountPage = () => {
  const { user, login, register, updateUser, logout } = useAuth();
  const { getOrdersForUser } = useOrders();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setShowPassword(false);
  };

  const submitAuth = (event) => {
    event.preventDefault();
    if (mode === "register" && form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (mode === "register" && !form.terms) {
      setMessage("Please accept the VeloShop terms to continue.");
      return;
    }
    const result =
      mode === "login"
        ? login(form.email, form.password)
        : register(form.name, form.email, form.password);
    setMessage(
      result.error ||
        (rememberMe
          ? "Welcome back to VeloShop."
          : "Signed in for this session."),
    );
  };

  const addAddress = (event) => {
    event.preventDefault();
    if (!address.trim()) return;
    updateUser({ addresses: [...(user.addresses || []), address.trim()] });
    setAddress("");
    setMessage("Address saved.");
  };

  if (!user) {
    const isError =
      message.includes("incorrect") ||
      message.includes("match") ||
      message.includes("accept") ||
      message.includes("exists");
    return (
      <div>
        <PageHeader
          eyebrow="VELOSHOP ACCOUNT"
          title="RIDE WITH"
          accent="US"
          subtitle="Your parts, your builds, your next ride. Sign in to keep your VeloShop setup together."
        />
        <section
          className="account-auth"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "56px 40px 110px",
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: 2,
          }}
        >
          <div
            className="auth-story"
            style={{
              background: "#151515",
              padding: "42px 40px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -50,
                right: -30,
                width: 180,
                height: 300,
                background: "#FF5500",
                transform: "skew(-18deg)",
                opacity: 0.9,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  color: "#FF5500",
                  fontSize: 11,
                  letterSpacing: 3,
                  marginBottom: 50,
                }}
              >
                THE RIDER'S ACCOUNT
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 58,
                  lineHeight: 0.92,
                  letterSpacing: 2,
                  maxWidth: 240,
                }}
              >
                READY FOR
                <br />
                <span style={{ color: "#FF5500" }}>THE NEXT</span>
                <br />
                BUILD.
              </div>
              <p
                style={{
                  color: "#888",
                  fontSize: 13,
                  lineHeight: 1.7,
                  maxWidth: 260,
                  marginTop: 28,
                }}
              >
                Save your delivery details, revisit your orders, and get back to
                the components that move you.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  marginTop: 46,
                  maxWidth: 300,
                }}
              >
                {[
                  ["01", "SAVE BUILDS"],
                  ["02", "TRACK ORDERS"],
                  ["03", "FASTER CHECKOUT"],
                  ["04", "RIDER SUPPORT"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    style={{ background: "#101010", padding: "14px 12px" }}
                  >
                    <div
                      style={{
                        color: "#FF5500",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 22,
                      }}
                    >
                      {number}
                    </div>
                    <div
                      style={{
                        color: "#666",
                        fontSize: 9,
                        letterSpacing: 1.3,
                        marginTop: 4,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="auth-form-panel"
            style={{
              background: "#101010",
              border: "1px solid #242424",
              padding: "42px 40px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 20,
                marginBottom: 30,
              }}
            >
              <div>
                <div
                  style={{
                    color: "#FF5500",
                    fontSize: 11,
                    letterSpacing: 2,
                    marginBottom: 10,
                  }}
                >
                  {mode === "login" ? "WELCOME BACK" : "JOIN THE PELOTON"}
                </div>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 38,
                    letterSpacing: 1,
                    margin: 0,
                  }}
                >
                  {mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
                </h2>
              </div>
              <div style={{ color: "#555", fontSize: 11, textAlign: "right" }}>
                SECURE
                <br />
                CHECKOUT
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 24,
                borderBottom: "1px solid #252525",
                marginBottom: 24,
              }}
            >
              {["login", "register"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => switchMode(item)}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: `2px solid ${mode === item ? "#FF5500" : "transparent"}`,
                    color: mode === item ? "#FF5500" : "#666",
                    padding: "0 0 13px",
                    letterSpacing: 1.5,
                    cursor: "pointer",
                  }}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            <form onSubmit={submitAuth} style={{ display: "grid", gap: 13 }}>
              {mode === "register" && (
                <input
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />
              )}
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
              <div style={{ position: "relative" }}>
                <input
                  required
                  minLength={6}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (6+ characters)"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  style={{ ...inputStyle, paddingRight: 76 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    background: "none",
                    border: "none",
                    color: "#777",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              {mode === "register" && (
                <input
                  required
                  minLength={6}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  style={inputStyle}
                />
              )}
              {mode === "login" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 12,
                    color: "#777",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />{" "}
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setMessage(
                        "Password reset instructions would be sent to your email.",
                      )
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#FF5500",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              ) : (
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    color: "#777",
                    fontSize: 12,
                    lineHeight: 1.5,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(form.terms)}
                    onChange={(e) =>
                      setForm({ ...form, terms: e.target.checked })
                    }
                  />{" "}
                  I agree to the VeloShop terms and privacy policy.
                </label>
              )}
              {message && (
                <p
                  style={{
                    color: isError ? "#ff7b7b" : "#8acb88",
                    fontSize: 13,
                    margin: "2px 0",
                  }}
                >
                  {message}
                </p>
              )}
              <button
                type="submit"
                style={{ ...buttonStyle, width: "100%", marginTop: 4 }}
              >
                {mode === "login" ? "SIGN IN TO VELOSHOP" : "CREATE MY ACCOUNT"}
              </button>
            </form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#555",
                fontSize: 10,
                letterSpacing: 1.5,
                margin: "24px 0",
              }}
            >
              <span style={{ height: 1, background: "#282828", flex: 1 }} /> OR
              CONTINUE WITH{" "}
              <span style={{ height: 1, background: "#282828", flex: 1 }} />
            </div>
            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Social sign-in is ready to connect to your provider.",
                )
              }
              style={{
                width: "100%",
                background: "#181818",
                border: "1px solid #2c2c2c",
                color: "#bbb",
                padding: 13,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              G CONTINUE WITH GOOGLE
            </button>
            <div
              style={{
                color: "#555",
                fontSize: 11,
                lineHeight: 1.6,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              By continuing, you agree to our terms and acknowledge our privacy
              policy.
            </div>
          </div>
        </section>
        <style>{`@media (max-width: 760px) { .account-auth { grid-template-columns: 1fr !important; padding: 32px 20px 80px !important; } .auth-story { padding: 30px 24px !important; min-height: 360px; } .auth-form-panel { padding: 30px 24px !important; } }`}</style>
      </div>
    );
  }

  const orders = getOrdersForUser(user.email);
  return (
    <div>
      <PageHeader
        eyebrow="CUSTOMER AREA"
        title="WELCOME BACK,"
        accent={user.name.toUpperCase()}
        subtitle="Keep your delivery details close and every order easy to find."
      />
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 40px 100px",
          display: "grid",
          gridTemplateColumns: "minmax(280px, 360px) 1fr",
          gap: 24,
        }}
      >
        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <div style={panelStyle}>
            <div
              style={{
                color: "#FF5500",
                fontSize: 11,
                letterSpacing: 2,
                marginBottom: 10,
              }}
            >
              PROFILE
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 30,
                letterSpacing: 1,
                margin: "0 0 8px",
              }}
            >
              {user.name}
            </h2>
            <p style={{ color: "#777", fontSize: 13 }}>{user.email}</p>
            <button
              type="button"
              onClick={logout}
              style={{
                ...buttonStyle,
                background: "transparent",
                border: "1px solid #333",
                color: "#bbb",
                marginTop: 10,
              }}
            >
              SIGN OUT
            </button>
          </div>
          <div style={panelStyle}>
            <div
              style={{
                color: "#FF5500",
                fontSize: 11,
                letterSpacing: 2,
                marginBottom: 16,
              }}
            >
              SAVED ADDRESSES
            </div>
            {(user.addresses || []).map((item) => (
              <div
                key={item}
                style={{
                  color: "#bbb",
                  fontSize: 13,
                  borderBottom: "1px solid #222",
                  padding: "10px 0",
                }}
              >
                {item}
              </div>
            ))}
            <form
              onSubmit={addAddress}
              style={{ display: "flex", gap: 8, marginTop: 16 }}
            >
              <input
                required
                placeholder="Add delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ ...inputStyle, minWidth: 0 }}
              />
              <button
                type="submit"
                style={{ ...buttonStyle, padding: "12px 14px" }}
              >
                ADD
              </button>
            </form>
          </div>
          <div style={panelStyle}>
            <div
              style={{
                color: "#FF5500",
                fontSize: 11,
                letterSpacing: 2,
                marginBottom: 14,
              }}
            >
              SHIPPING ESTIMATOR
            </div>
            <select
              style={{ ...inputStyle, marginBottom: 12 }}
              defaultValue="standard"
            >
              <option value="standard">
                Standard delivery · 3-5 days · $8
              </option>
              <option value="express">Express delivery · 1-2 days · $18</option>
              <option value="free">Orders over $150 · Free delivery</option>
            </select>
            <div style={{ color: "#777", fontSize: 12 }}>
              Delivery estimates are calculated from Phnom Penh dispatch.
            </div>
          </div>
        </div>
        <div style={panelStyle}>
          <div
            style={{
              color: "#FF5500",
              fontSize: 11,
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            ORDER HISTORY
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 34,
              letterSpacing: 1,
              margin: "0 0 24px",
            }}
          >
            YOUR ORDERS
          </h2>
          {orders.length === 0 ? (
            <div style={{ color: "#666", padding: "30px 0" }}>
              No orders yet.{" "}
              <Link to="/shop" style={{ color: "#FF5500" }}>
                Browse the shop
              </Link>
              .
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                style={{
                  borderTop: "1px solid #252525",
                  padding: "18px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <strong style={{ color: "#F0F0F0" }}>{order.id}</strong>
                  <div style={{ color: "#666", fontSize: 12, marginTop: 6 }}>
                    {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                    {order.items.length} item(s)
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong style={{ color: "#FF5500" }}>
                    ${order.total.toFixed(2)}
                  </strong>
                  <div style={{ color: "#8acb88", fontSize: 12, marginTop: 6 }}>
                    {order.status}
                  </div>
                  <Link
                    to={`/track-order?id=${order.id}`}
                    style={{ color: "#888", fontSize: 12 }}
                  >
                    Track order
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
