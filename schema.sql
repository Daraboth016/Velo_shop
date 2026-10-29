CREATE TABLE IF NOT EXISTS payment_orders (
  transaction_id VARCHAR(20) PRIMARY KEY,
  email VARCHAR(254) NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  currency VARCHAR(3) NOT NULL CHECK (currency IN ('USD', 'KHR')),
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  shipping_amount NUMERIC(12, 2) NOT NULL CHECK (shipping_amount >= 0),
  status VARCHAR(32) NOT NULL,
  items JSONB NOT NULL,
  provider_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS payment_orders_email_idx ON payment_orders (email);
CREATE INDEX IF NOT EXISTS payment_orders_status_idx ON payment_orders (status);
