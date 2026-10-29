import crypto from "node:crypto";

const SANDBOX_URL = "https://checkout-sandbox.payway.com.kh";
const PRODUCTION_URL = "https://checkout.payway.com.kh";

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing payment configuration: ${name}`);
  return value;
};

export const getPayWayConfig = () => ({
  baseUrl: process.env.PAYWAY_BASE_URL ||
    (process.env.PAYWAY_ENV === "production" ? PRODUCTION_URL : SANDBOX_URL),
  merchantId: required("PAYWAY_MERCHANT_ID"),
  apiKey: required("PAYWAY_API_KEY"),
  publicUrl: required("PAYWAY_PUBLIC_URL"),
});

export const utcTimestamp = () => {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
};

export const payWayHash = (value, apiKey) =>
  crypto.createHmac("sha512", apiKey).update(value).digest("base64");

const postJson = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`PayWay request failed with HTTP ${response.status}`);
  return result;
};

export const createPurchase = async ({
  transactionId,
  firstName,
  lastName,
  email,
  phone,
  items,
  shipping,
  amount,
  currency,
}) => {
  const config = getPayWayConfig();
  const requestTime = utcTimestamp();
  const paymentOption = "abapay_khqr";
  const type = "purchase";
  const returnUrl = Buffer.from(`${config.publicUrl}/api/payments/callback`).toString("base64");
  const cancelUrl = `${config.publicUrl}/payment/result?status=cancelled&tran_id=${encodeURIComponent(transactionId)}`;
  const continueSuccessUrl = `${config.publicUrl}/payment/result?tran_id=${encodeURIComponent(transactionId)}`;
  const values = [
    requestTime, config.merchantId, transactionId, amount,
    Buffer.from(JSON.stringify(items)).toString("base64"), shipping,
    firstName, lastName, email, phone, type, paymentOption, returnUrl,
    cancelUrl, continueSuccessUrl, "", currency, "", "", "", "30", "", "", 0,
  ];
  const form = new FormData();
  form.set("req_time", requestTime);
  form.set("merchant_id", config.merchantId);
  form.set("tran_id", transactionId);
  form.set("firstname", firstName);
  form.set("lastname", lastName);
  form.set("email", email);
  form.set("phone", phone || "");
  form.set("type", type);
  form.set("payment_option", paymentOption);
  form.set("items", values[4]);
  form.set("shipping", String(shipping));
  form.set("amount", String(amount));
  form.set("currency", currency);
  form.set("return_url", returnUrl);
  form.set("cancel_url", cancelUrl);
  form.set("continue_success_url", continueSuccessUrl);
  form.set("lifetime", "30");
  form.set("hash", payWayHash(values.join(""), config.apiKey));

  const response = await fetch(`${config.baseUrl}/api/payment-gateway/v1/payments/purchase`, {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(15000),
  });
  const contentType = response.headers.get("content-type") || "";
  const result = contentType.includes("application/json")
    ? await response.json()
    : { checkoutHtml: await response.text() };
  if (!response.ok) throw new Error(`PayWay purchase failed with HTTP ${response.status}`);
  return result;
};

export const checkTransaction = async (transactionId) => {
  const config = getPayWayConfig();
  const reqTime = utcTimestamp();
  return postJson(`${config.baseUrl}/api/payment-gateway/v1/payments/check-transaction-2`, {
    req_time: reqTime,
    merchant_id: config.merchantId,
    tran_id: transactionId,
    hash: payWayHash(`${reqTime}${config.merchantId}${transactionId}`, config.apiKey),
  });
};

export const refundTransaction = async (transactionId, amount) => {
  const config = getPayWayConfig();
  const requestTime = utcTimestamp();
  const authPayload = JSON.stringify({
    mc_id: config.merchantId,
    tran_id: transactionId,
    refund_amount: amount,
  });
  const publicKey = required("PAYWAY_RSA_PUBLIC_KEY").replace(/\\n/g, "\n");
  const chunks = [];
  for (let offset = 0; offset < Buffer.byteLength(authPayload); offset += 117) {
    const chunk = Buffer.from(authPayload).subarray(offset, offset + 117);
    chunks.push(crypto.publicEncrypt(
      { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
      chunk,
    ));
  }
  const merchantAuth = Buffer.concat(chunks).toString("base64");
  const hash = payWayHash(`${requestTime}${config.merchantId}${merchantAuth}`, config.apiKey);
  return postJson(`${config.baseUrl}/api/merchant-portal/merchant-access/online-transaction/refund`, {
    request_time: requestTime,
    merchant_id: config.merchantId,
    merchant_auth: merchantAuth,
    hash,
  });
};
