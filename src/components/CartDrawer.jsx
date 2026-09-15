import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

const initialForm = {
  fullName: "",
  email: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};
const inputStyle = {
  width: "100%",
  background: "#171717",
  border: "1px solid #2a2a2a",
  color: "#F0F0F0",
  padding: "13px 14px",
  fontSize: 13,
  boxSizing: "border-box",
  outline: "none",
};
const orangeButton = {
  background: "#FF5500",
  color: "#fff",
  border: "none",
  padding: "14px 18px",
  fontWeight: 700,
  letterSpacing: 1.5,
  cursor: "pointer",
};

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQty, removeFromCart, clearCart, cartTotal } =
    useCart();
  const { addOrder } = useOrders();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState(initialForm);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingCost =
    shippingMethod === "express" ? 18 : cartTotal >= 150 ? 0 : 8;
  const orderTotal = cartTotal + shippingCost;

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
    setError("");
    setPaymentForm(initialForm);
    setShippingMethod("standard");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanCard = paymentForm.cardNumber.replace(/\s+/g, "");
    const cleanExpiry = paymentForm.expiry.trim();
    if (
      !paymentForm.fullName ||
      !paymentForm.email ||
      !cleanCard ||
      !cleanExpiry ||
      !paymentForm.cvv
    ) {
      setError("Please complete all payment fields.");
      return;
    }
    if (cleanCard.length < 15) {
      setError("Please enter a valid card number.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(cleanExpiry)) {
      setError("Use expiry format MM/YY.");
      return;
    }
    if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
      setError("Please enter a valid CVV.");
      return;
    }

    const generatedOrderId = `VELO-${Date.now().toString().slice(-6)}`;
    addOrder({
      id: generatedOrderId,
      email: paymentForm.email.trim().toLowerCase(),
      items: cartItems,
      total: orderTotal,
      createdAt: new Date().toISOString(),
      status: "Processing",
      shipping:
        shippingMethod === "express" ? "Express delivery" : "Standard delivery",
    });
    setOrderId(generatedOrderId);
    clearCart();
    setError("");
    setCheckoutOpen(false);
    setOrderSuccess(true);
    setPaymentForm(initialForm);
  };

  const handleDone = () => {
    setOrderSuccess(false);
    setOrderId("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 150,
        }}
      />
      <aside
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: checkoutOpen ? "min(780px, 100%)" : "min(420px, 100%)",
          height: "100vh",
          background: "#0d0d0d",
          borderLeft: "1px solid #252525",
          boxShadow: "-30px 0 60px rgba(0,0,0,0.45)",
          zIndex: 151,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {checkoutOpen ? (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <header
              style={{
                padding: "22px 28px 18px",
                borderBottom: "1px solid #222",
                background: "#101010",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <button
                  type="button"
                  onClick={handleCloseCheckout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#888",
                    cursor: "pointer",
                    fontSize: 12,
                    letterSpacing: 1,
                  }}
                >
                  ← BACK TO CART
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#aaa",
                    fontSize: 25,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginTop: 22,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 34,
                    letterSpacing: 2,
                  }}
                >
                  CHECKOUT
                </div>
                <span style={{ color: "#555", fontSize: 11 }}>
                  SECURE ORDER
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginTop: 18,
                }}
              >
                <div style={{ height: 3, flex: 1, background: "#FF5500" }} />
                <div style={{ height: 3, flex: 1, background: "#FF5500" }} />
                <div style={{ height: 3, flex: 1, background: "#333" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#777",
                  fontSize: 10,
                  letterSpacing: 1,
                  marginTop: 8,
                }}
              >
                <span style={{ color: "#FF5500" }}>CONTACT</span>
                <span style={{ color: "#FF5500" }}>DELIVERY & PAYMENT</span>
                <span>CONFIRMATION</span>
              </div>
            </header>
            <div
              className="checkout-body"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "26px 28px",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) 235px",
                gap: 24,
              }}
            >
              <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
                <section>
                  <div style={sectionLabel}>01 / CONTACT DETAILS</div>
                  <div style={{ display: "grid", gap: 10 }}>
                    <input
                      required
                      name="fullName"
                      value={paymentForm.fullName}
                      onChange={handleChange}
                      placeholder="Full name"
                      style={inputStyle}
                    />
                    <input
                      required
                      name="email"
                      type="email"
                      value={paymentForm.email}
                      onChange={handleChange}
                      placeholder="Email address for receipt"
                      style={inputStyle}
                    />
                  </div>
                </section>
                <section>
                  <div style={sectionLabel}>02 / DELIVERY METHOD</div>
                  <div style={{ display: "grid", gap: 8 }}>
                    <ShippingOption
                      active={shippingMethod === "standard"}
                      onClick={() => setShippingMethod("standard")}
                      title="Standard delivery"
                      detail={
                        cartTotal >= 150
                          ? "3-5 business days · FREE"
                          : "3-5 business days · $8.00"
                      }
                    />
                    <ShippingOption
                      active={shippingMethod === "express"}
                      onClick={() => setShippingMethod("express")}
                      title="Express delivery"
                      detail="1-2 business days · $18.00"
                    />
                  </div>
                </section>
                <section>
                  <div style={sectionLabel}>03 / PAYMENT DETAILS</div>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #252525, #111)",
                      border: "1px solid #3b3b3b",
                      padding: 18,
                      marginBottom: 12,
                      position: "relative",
                      minHeight: 115,
                    }}
                  >
                    <div
                      style={{ color: "#aaa", fontSize: 10, letterSpacing: 2 }}
                    >
                      VELOSHOP PAYMENTS
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: 3,
                        fontSize: 17,
                        marginTop: 22,
                        color: "#eee",
                      }}
                    >
                      {paymentForm.cardNumber
                        ? paymentForm.cardNumber.replace(/\d(?=\d{4})/g, "•")
                        : "••••  ••••  ••••  ••••"}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#777",
                        fontSize: 9,
                        marginTop: 15,
                        letterSpacing: 1,
                      }}
                    >
                      <span>{paymentForm.fullName || "CARDHOLDER NAME"}</span>
                      <span>{paymentForm.expiry || "MM/YY"}</span>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: 18,
                        right: 18,
                        color: "#FF5500",
                        fontWeight: 800,
                        fontSize: 13,
                      }}
                    >
                      V
                    </div>
                  </div>
                  <input
                    required
                    name="cardNumber"
                    value={paymentForm.cardNumber}
                    onChange={handleChange}
                    placeholder="Card number"
                    maxLength={19}
                    style={inputStyle}
                  />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      marginTop: 10,
                    }}
                  >
                    <input
                      required
                      name="expiry"
                      value={paymentForm.expiry}
                      onChange={handleChange}
                      placeholder="Expiry · MM/YY"
                      maxLength={5}
                      style={inputStyle}
                    />
                    <input
                      required
                      name="cvv"
                      value={paymentForm.cvv}
                      onChange={handleChange}
                      placeholder="Security code"
                      maxLength={4}
                      style={inputStyle}
                    />
                  </div>
                </section>
                {error && (
                  <div
                    style={{
                      color: "#ff7b7b",
                      fontSize: 12,
                      background: "rgba(255,80,80,0.08)",
                      border: "1px solid rgba(255,80,80,0.2)",
                      padding: "11px 13px",
                    }}
                  >
                    {error}
                  </div>
                )}
              </div>
              <aside
                style={{
                  background: "#141414",
                  border: "1px solid #252525",
                  padding: 18,
                  alignSelf: "start",
                }}
              >
                <div style={sectionLabel}>ORDER SUMMARY</div>
                <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{ display: "flex", gap: 9, alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          background: item.color || "#222",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            style={{
                              maxWidth: "90%",
                              maxHeight: "90%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: 11 }}>{item.icon}</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#ccc",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{ fontSize: 10, color: "#666", marginTop: 3 }}
                        >
                          QTY {item.qty}
                        </div>
                      </div>
                      <span style={{ color: "#bbb", fontSize: 11 }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    borderTop: "1px solid #292929",
                    paddingTop: 14,
                    display: "grid",
                    gap: 9,
                    fontSize: 12,
                  }}
                >
                  <SummaryRow
                    label="Subtotal"
                    value={`$${cartTotal.toFixed(2)}`}
                  />
                  <SummaryRow
                    label="Shipping"
                    value={
                      shippingCost === 0
                        ? "FREE"
                        : `$${shippingCost.toFixed(2)}`
                    }
                    accent={shippingCost === 0}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid #292929",
                      paddingTop: 14,
                      marginTop: 4,
                    }}
                  >
                    <span style={{ color: "#fff", fontWeight: 700 }}>
                      TOTAL
                    </span>
                    <strong
                      style={{
                        color: "#FF5500",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 25,
                      }}
                    >
                      ${orderTotal.toFixed(2)}
                    </strong>
                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    ...orangeButton,
                    width: "100%",
                    marginTop: 18,
                    fontSize: 11,
                  }}
                >
                  PAY ${orderTotal.toFixed(2)}
                </button>
                <div
                  style={{
                    color: "#666",
                    fontSize: 10,
                    lineHeight: 1.6,
                    textAlign: "center",
                    marginTop: 14,
                  }}
                >
                  🔒 Encrypted checkout
                  <br />
                  30-day return protection
                </div>
              </aside>
            </div>
          </form>
        ) : orderSuccess ? (
          <div
            style={{
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "rgba(0,212,170,0.12)",
                color: "#00d4aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                margin: "0 auto 22px",
              }}
            >
              ✓
            </div>
            <div style={{ color: "#888", fontSize: 11, letterSpacing: 2 }}>
              PAYMENT RECEIVED
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 38,
                letterSpacing: 2,
                margin: "8px 0 14px",
              }}
            >
              ORDER CONFIRMED
            </div>
            <div style={{ color: "#bbb", marginBottom: 10 }}>
              Order <strong style={{ color: "#FF5500" }}>{orderId}</strong> is
              being prepared.
            </div>
            <div style={{ color: "#777", fontSize: 13, marginBottom: 26 }}>
              Your confirmation and tracking details are ready in your account.
            </div>
            <button type="button" onClick={handleDone} style={orangeButton}>
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                padding: "20px 20px 16px",
                borderBottom: "1px solid #1d1d1d",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 11, letterSpacing: 2, color: "#888" }}
                  >
                    YOUR CART
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 30,
                      letterSpacing: 2,
                    }}
                  >
                    CART
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#d0d0d0",
                    fontSize: 28,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
              {cartItems.length > 0 && (
                <div
                  style={{
                    marginTop: 16,
                    background: "#171717",
                    padding: "10px 12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: cartTotal >= 150 ? "#00d4aa" : "#888",
                      fontSize: 11,
                      marginBottom: 7,
                    }}
                  >
                    <span>
                      {cartTotal >= 150
                        ? "FREE SHIPPING UNLOCKED"
                        : `ADD $${(150 - cartTotal).toFixed(2)} FOR FREE SHIPPING`}
                    </span>
                    <span>
                      {Math.min(100, Math.round((cartTotal / 150) * 100))}%
                    </span>
                  </div>
                  <div style={{ height: 3, background: "#2b2b2b" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(100, (cartTotal / 150) * 100)}%`,
                        background: cartTotal >= 150 ? "#00d4aa" : "#FF5500",
                        transition: "width .25s ease",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              {cartItems.length === 0 ? (
                <div
                  style={{ color: "#666", textAlign: "center", paddingTop: 60 }}
                >
                  <div style={{ fontSize: 44, marginBottom: 8 }}>🛒</div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 28,
                      letterSpacing: 2,
                    }}
                  >
                    YOUR CART IS EMPTY
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "14px 0",
                      borderBottom: "1px solid #1b1b1b",
                    }}
                  >
                    <div
                      style={{
                        width: 70,
                        height: 70,
                        background: `linear-gradient(135deg, ${item.color || "#1f1f1f"} 0%, #101010 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            maxWidth: "88%",
                            maxHeight: "88%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <span style={{ color: "#fff", fontSize: 18 }}>
                          {item.icon || "•"}
                        </span>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#777",
                          letterSpacing: 1.5,
                        }}
                      >
                        {item.brand.toUpperCase()}
                      </div>
                      <div
                        style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          color: "#FF5500",
                          marginTop: 8,
                          fontWeight: 700,
                        }}
                      >
                        ${item.price}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginTop: 8,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          style={qtyButton}
                        >
                          -
                        </button>
                        <span style={{ minWidth: 16, textAlign: "center" }}>
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          style={qtyButton}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            marginLeft: "auto",
                            background: "transparent",
                            border: "none",
                            color: "#999",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div style={{ borderTop: "1px solid #1d1d1d", padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{ color: "#777", letterSpacing: 1.5, fontSize: 11 }}
                  >
                    SUBTOTAL
                  </span>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 32,
                      color: "#FF5500",
                    }}
                  >
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(true)}
                  style={{ ...orangeButton, width: "100%", marginBottom: 10 }}
                >
                  SECURE CHECKOUT
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  style={{
                    width: "100%",
                    background: "transparent",
                    color: "#ddd",
                    border: "1px solid #333",
                    padding: "12px 0",
                    cursor: "pointer",
                  }}
                >
                  CLEAR CART
                </button>
              </div>
            )}
          </>
        )}
      </aside>
      <style>{`@media (max-width: 640px) { .checkout-body { display: block !important; padding: 20px !important; } .checkout-body > aside { margin-top: 24px; } }`}</style>
    </>
  );
};

const sectionLabel = {
  color: "#FF5500",
  fontSize: 10,
  letterSpacing: 2,
  marginBottom: 12,
};
const qtyButton = {
  background: "#1a1a1a",
  color: "#fff",
  border: "1px solid #333",
  width: 28,
  height: 28,
  cursor: "pointer",
};

const ShippingOption = ({ active, onClick, title, detail }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      background: active ? "rgba(255,85,0,0.08)" : "#151515",
      border: `1px solid ${active ? "#FF5500" : "#292929"}`,
      color: "#fff",
      padding: "13px 14px",
      textAlign: "left",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <span>
      <span style={{ display: "block", fontSize: 13, fontWeight: 600 }}>
        {title}
      </span>
      <span
        style={{ display: "block", color: "#777", fontSize: 11, marginTop: 4 }}
      >
        {detail}
      </span>
    </span>
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: `1px solid ${active ? "#FF5500" : "#555"}`,
        background: active ? "#FF5500" : "transparent",
        boxShadow: active ? "inset 0 0 0 4px #151515" : "none",
      }}
    />
  </button>
);
const SummaryRow = ({ label, value, accent }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      color: accent ? "#00d4aa" : "#777",
    }}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default CartDrawer;
