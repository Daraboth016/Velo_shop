import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useOrders } from "../context/OrderContext";
import { readJsonResponse } from "../utils/apiResponse";

const labels = {
  paid: ["Payment confirmed", "Your order is being prepared."],
  approved: ["Payment confirmed", "Your order is being prepared."],
  pending: ["Payment pending", "We are waiting for ABA PayWay to confirm the payment."],
  declined: ["Payment declined", "No order was confirmed. You can try again from your cart."],
  cancelled: ["Payment cancelled", "No payment was confirmed."],
  refunded: ["Payment refunded", "The payment has been refunded."],
};

const PaymentResult = () => {
  const [params] = useSearchParams();
  const transactionId = params.get("tran_id") || "";
  const initialStatus = params.get("status") || "pending";
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState("");
  const { updateOrderStatus } = useOrders();

  useEffect(() => {
    if (!transactionId || ["cancelled", "declined"].includes(initialStatus)) return undefined;
    let active = true;
    const verify = async () => {
      try {
        const response = await fetch(`/api/payments/status?tran_id=${encodeURIComponent(transactionId)}`);
        const result = await readJsonResponse(response);
        if (!response.ok) throw new Error(result.error || "Unable to verify payment.");
        if (active) {
          setStatus(result.status);
          updateOrderStatus(transactionId, result.status === "paid" ? "Confirmed" : result.status);
        }
      } catch (requestError) {
        if (active) setError(requestError.message);
      }
    };
    verify();
    const timer = setInterval(verify, 5000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [initialStatus, transactionId, updateOrderStatus]);

  const copy = labels[status] || labels.pending;
  return (
    <div>
      <PageHeader eyebrow="PAYMENT" title="PAYMENT" accent="STATUS" subtitle="Payment confirmation is based on server-side ABA PayWay verification." />
      <section className="payment-result page-shell">
        <p className="eyebrow">{transactionId ? `TRANSACTION ${transactionId}` : "PAYMENT UPDATE"}</p>
        <h2>{copy[0]}</h2>
        <p>{error || copy[1]}</p>
        {status === "pending" && <span className="payment-result__pulse">Checking securely with ABA PayWay...</span>}
        <Link className="button button--primary" to="/shop">Continue shopping</Link>
      </section>
    </div>
  );
};

export default PaymentResult;
