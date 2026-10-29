import { sql } from "../_lib/db.js";
import { refundTransaction } from "../_lib/payway.js";

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  const { transactionId, amount } = request.body || {};
  if (!/^[A-Z0-9]{1,20}$/.test(String(transactionId)) || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
    return response.status(400).json({ error: "Valid transaction ID and refund amount are required." });
  }
  try {
    const order = await sql`SELECT status, amount FROM payment_orders WHERE transaction_id = ${transactionId}`;
    if (!order.rows[0] || order.rows[0].status !== "paid") return response.status(409).json({ error: "Only paid orders can be refunded." });
    if (Number(amount) > Number(order.rows[0].amount)) return response.status(400).json({ error: "Refund exceeds the order amount." });
    const result = await refundTransaction(transactionId, Number(amount));
    await sql`UPDATE payment_orders SET status = 'refund_requested', provider_response = ${JSON.stringify(result)} WHERE transaction_id = ${transactionId}`;
    return response.status(200).json({ status: "refund_requested" });
  } catch (error) {
    console.error("Refund request failed:", error.message);
    return response.status(501).json({ error: error.message });
  }
}
