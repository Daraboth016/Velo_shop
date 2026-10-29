import { sql } from "../_lib/db.js";
import { checkTransaction } from "../_lib/payway.js";

export default async function handler(request, response) {
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed." });
  const transactionId = String(request.query?.tran_id || "");
  if (!/^[A-Z0-9]{1,20}$/.test(transactionId)) return response.status(400).json({ error: "Invalid transaction ID." });
  try {
    const order = await sql`SELECT transaction_id, amount, currency, status FROM payment_orders WHERE transaction_id = ${transactionId}`;
    if (!order.rows[0]) return response.status(404).json({ error: "Payment not found." });
    const provider = await checkTransaction(transactionId);
    const paymentStatus = provider.data?.payment_status || "PENDING";
    await sql`UPDATE payment_orders SET status = ${paymentStatus.toLowerCase()}, provider_response = ${JSON.stringify(provider)} WHERE transaction_id = ${transactionId}`;
    return response.status(200).json({ transactionId, status: paymentStatus.toLowerCase() });
  } catch (error) {
    console.error("Payment status verification failed:", error.message);
    return response.status(502).json({ error: "Unable to verify payment status." });
  }
}
