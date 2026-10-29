import { sql } from "../_lib/db.js";
import { createPurchase } from "../_lib/payway.js";
import { priceCart } from "../_lib/catalog.js";

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  try {
    const { fullName, email, phone, items, shippingMethod, currency = "USD" } = request.body || {};
    if (typeof fullName !== "string" || typeof email !== "string" || !fullName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({ error: "Valid customer details are required." });
    }
    if (!["USD", "KHR"].includes(currency)) return response.status(400).json({ error: "Unsupported currency." });
    const cart = priceCart(items, shippingMethod);
    const transactionId = `VS${Date.now().toString(36).toUpperCase()}`.slice(0, 20);
    const [firstName, ...lastParts] = fullName.trim().split(/\s+/);
    const lastName = lastParts.join(" ") || firstName;
    await sql`
      INSERT INTO payment_orders
        (transaction_id, email, customer_name, currency, amount, shipping_amount, status, items)
      VALUES
        (${transactionId}, ${email.trim().toLowerCase()}, ${fullName.trim()}, ${currency},
         ${cart.total}, ${cart.shipping}, 'initiated', ${JSON.stringify(cart.lineItems)})
    `;
    const purchase = await createPurchase({
      transactionId, firstName, lastName, email: email.trim().toLowerCase(), phone,
      items: cart.lineItems, shipping: cart.shipping, amount: cart.total, currency,
    });
    if (!purchase.checkout_qr_url) {
      throw new Error("PayWay did not return a checkout URL.");
    }
    await sql`UPDATE payment_orders SET status = 'pending', provider_response = ${JSON.stringify(purchase)} WHERE transaction_id = ${transactionId}`;
    return response.status(200).json({
      transactionId,
      status: "pending",
      checkoutUrl: purchase.checkout_qr_url || null,
      qrString: purchase.qr_string || null,
      deeplink: purchase.abapay_deeplink || null,
      checkoutHtml: purchase.checkoutHtml || null,
    });
  } catch (error) {
    console.error("Payment initiation failed:", error.message);
    const errorMessage = error.message === "PayWay did not return a checkout URL."
      ? "ABA PayWay did not return a checkout URL. Verify the sandbox credentials and merchant setup."
      : "Unable to initiate payment.";
    return response.status(502).json({ error: errorMessage });
  }
}
