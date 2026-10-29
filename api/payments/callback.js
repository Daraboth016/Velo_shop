import { sql } from "../_lib/db.js";
import { checkTransaction } from "../_lib/payway.js";

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  const callback = request.body || {};
  const transactionId = String(callback.tran_id || "");
  if (!/^[A-Z0-9]{1,20}$/.test(transactionId)) return response.status(400).json({ error: "Invalid callback." });
  try {
    const orderResult = await sql`SELECT transaction_id, amount, currency FROM payment_orders WHERE transaction_id = ${transactionId}`;
    const order = orderResult.rows[0];
    if (!order) return response.status(404).json({ error: "Payment not found." });

    // The callback is only a trigger. The provider status and amount are re-checked server-to-server.
    const verified = await checkTransaction(transactionId);
    const data = verified.data || {};
    const amountMatches = Number(data.total_amount) === Number(order.amount);
    const currencyMatches = data.payment_currency === order.currency;
    const nextStatus = data.payment_status === "APPROVED" && amountMatches && currencyMatches
      ? "paid"
      : String(data.payment_status || "PENDING").toLowerCase();
    await sql`
      UPDATE payment_orders
      SET status = ${nextStatus}, provider_response = ${JSON.stringify({ callback, verified })}
      WHERE transaction_id = ${transactionId}
    `;
    return response.status(200).json({ received: true });
  } catch (error) {
    console.error("Payment callback verification failed:", error.message);
    return response.status(502).json({ error: "Callback verification failed." });
  }
}
