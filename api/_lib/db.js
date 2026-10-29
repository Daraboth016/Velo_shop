import { neon } from "@neondatabase/serverless";

export const sql = process.env.POSTGRES_URL
  ? neon(process.env.POSTGRES_URL)
  : () => {
    throw new Error("Missing database configuration: POSTGRES_URL");
  };
