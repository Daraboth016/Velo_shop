# VeloShop payment integration

VeloShop uses the ABA PayWay eCommerce Checkout API with the `abapay_khqr`
payment option. The browser only starts checkout and displays a status. It
never signs a PayWay request, receives card data, or decides that an order is
paid.

## Authoritative payment flow

1. `POST /api/payments/create` validates the cart against the server catalog,
   calculates the amount and shipping fee, creates an `initiated` order in
   Postgres, signs the PayWay Purchase request, and returns the hosted KHQR
   checkout URL.
2. The order changes to `pending` only after PayWay accepts the purchase.
3. PayWay sends its JSON callback to `/api/payments/callback`. The callback is
   treated as a notification only; its status is not trusted.
4. The callback handler calls PayWay's Check Transaction API from the server,
   verifies the provider status, amount, and currency against the stored order,
   and then records `paid`, `pending`, `declined`, `cancelled`, or `refunded`.
5. `/payment/result` polls `GET /api/payments/status`. This endpoint also calls
   Check Transaction server-to-server. A frontend redirect is never proof of
   payment.
6. `/api/payments/refund` is a server-only administrative operation. It uses
   PayWay's RSA-encrypted `merchant_auth` and HMAC-SHA512 request hash. PayWay
   supports full and partial refunds for eligible completed transactions;
   ABA Pay/KHQR refunds are documented as immediate.

The database schema is in [schema.sql](./schema.sql). Run it against the
Vercel Postgres/Neon database before enabling checkout.

## Sandbox onboarding

1. Register a sandbox merchant at
   [PayWay sandbox registration](https://sandbox.payway.com.kh/register-sandbox/).
2. Request/receive the sandbox merchant ID, API key, and RSA public key.
3. Add the callback domain and return/cancel URLs to the PayWay merchant
   profile allowlist. PayWay requires custom return URLs to be whitelisted.
4. Configure the environment variables below in Vercel Preview (or the local
   Vercel environment). Do not use `VITE_` prefixes.
5. Run `schema.sql`, then test a KHQR payment and inspect the sandbox
   transaction list and stored payment state.

For local testing, use `npm run dev:vercel` rather than `npm run dev`. The
standard Vite server does not execute the `/api/payments/*` serverless routes.

## Environment variables

```text
PAYWAY_ENV=sandbox
PAYWAY_BASE_URL=https://checkout-sandbox.payway.com.kh
PAYWAY_MERCHANT_ID=...
PAYWAY_API_KEY=...
PAYWAY_RSA_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----
PAYWAY_PUBLIC_URL=https://preview.example.com
POSTGRES_URL=...
```

`PAYWAY_API_KEY`, `PAYWAY_RSA_PUBLIC_KEY`, and `POSTGRES_URL` must only exist
in server-side Vercel environment variables. Never commit them or expose them
to the client bundle.

## Production cutover

1. Complete merchant onboarding with ABA PayWay and obtain production
   credentials; sandbox credentials are not production credentials.
2. Set `PAYWAY_ENV=production` and use the production merchant ID, API key,
   RSA public key, and `PAYWAY_PUBLIC_URL`.
3. Confirm the production callback and redirect domains are allowlisted.
4. Run the schema in the production database and verify database backups,
   access controls, and audit logging.
5. Test a real low-value transaction, callback retry, pending payment,
   declined payment, cancellation, and a refund before opening the shop.

## Official documentation used

- [PayWay developer overview](https://developer.payway.com.kh/overview-865678m0)
- [Purchase API](https://developer.payway.com.kh/purchase-14530820e0)
- [Check Transaction API](https://developer.payway.com.kh/check-transaction-14530826e0)
- [Refund API](https://developer.payway.com.kh/transaction-status-14530821e0)

The provider documents Purchase and Check Transaction request hashes as
Base64-encoded HMAC-SHA512 values. Purchase uses the documented concatenated
field order; Check Transaction uses `req_time + merchant_id + tran_id`.
Refund uses the documented RSA-encrypted JSON payload and
`request_time + merchant_id + merchant_auth` HMAC input.

## Current limitations

- This repository has no production database or PayWay credentials, so no live
  transaction has been claimed or tested.
- The server catalog is duplicated in `api/_lib/catalog.js` and must be kept in
  sync with the storefront catalog until products move to the database.
- Refund authorization is intentionally exposed as an API route for the
  server-side integration but still needs an authenticated admin caller before
  production use. Do not expose it directly to customer UI.
