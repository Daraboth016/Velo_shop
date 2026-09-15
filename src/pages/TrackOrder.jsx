import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useOrders } from "../context/OrderContext";

const TrackOrderPage = () => {
  const [params] = useSearchParams();
  const [orderId, setOrderId] = useState(params.get("id") || "");
  const [result, setResult] = useState(null);
  const { orders } = useOrders();
  const findOrder = (event) => {
    event.preventDefault();
    setResult(
      orders.find(
        (order) => order.id.toLowerCase() === orderId.trim().toLowerCase(),
      ) || false,
    );
  };
  return (
    <div>
      <PageHeader
        eyebrow="DELIVERY"
        title="TRACK YOUR"
        accent="ORDER"
        subtitle="Enter the order number from your confirmation email to see its latest status."
      />
      <section
        style={{ maxWidth: 620, margin: "0 auto", padding: "56px 24px 100px" }}
      >
        <form
          onSubmit={findOrder}
          style={{ display: "flex", gap: 10, marginBottom: 28 }}
        >
          <input
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Example: VELO-123456"
            style={{
              flex: 1,
              background: "#171717",
              border: "1px solid #2a2a2a",
              color: "#fff",
              padding: 14,
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#FF5500",
              color: "#fff",
              border: "none",
              padding: "0 20px",
              fontWeight: 700,
              letterSpacing: 1,
              cursor: "pointer",
            }}
          >
            TRACK
          </button>
        </form>
        {result && (
          <div
            style={{
              background: "#111",
              border: "1px solid #252525",
              padding: 28,
            }}
          >
            <div style={{ color: "#FF5500", fontSize: 11, letterSpacing: 2 }}>
              ORDER {result.id}
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 34,
                margin: "12px 0",
              }}
            >
              {result.status.toUpperCase()}
            </h2>
            <p style={{ color: "#777", fontSize: 13 }}>
              Placed {new Date(result.createdAt).toLocaleDateString()} ·{" "}
              {result.shipping}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 4,
                marginTop: 28,
              }}
            >
              {["CONFIRMED", "PROCESSING", "DELIVERED"].map((step, index) => (
                <div
                  key={step}
                  style={{
                    background: index < 2 ? "#FF5500" : "#242424",
                    padding: "12px 8px",
                    textAlign: "center",
                    color: index < 2 ? "#fff" : "#666",
                    fontSize: 10,
                    letterSpacing: 1,
                  }}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}
        {result === false && (
          <div style={{ color: "#ff7b7b", textAlign: "center", fontSize: 13 }}>
            We could not find that order number. Check the confirmation email
            and try again.
          </div>
        )}
      </section>
    </div>
  );
};
export default TrackOrderPage;
