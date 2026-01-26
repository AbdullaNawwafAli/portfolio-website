import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./src/server/db/drizzle/migrations",
  schema: "./src/server/db/drizzle/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_LOCAL!,
  },
  verbose: true,
  strict: true,
});
