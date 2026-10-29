import { neon } from "@neondatabase/serverless";

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing database configuration: POSTGRES_URL");
}

export const sql = neon(process.env.POSTGRES_URL);
