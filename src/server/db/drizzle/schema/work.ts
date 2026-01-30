import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const workTable = pgTable("work", {
  id: uuid("id").defaultRandom(),
  company_name: varchar("company_name", { length: 255 }).notNull(),
  job_title: varchar("job_title", { length: 255 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  finishDate: timestamp("finish_date").notNull(),
  responsibilities: text(" responsibilities")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
});
