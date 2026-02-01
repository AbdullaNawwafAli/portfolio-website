import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const educationTable = pgTable("education", {
  id: uuid("id").primaryKey().defaultRandom(),
  institute: varchar("institute", { length: 255 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  finishDate: timestamp("finish_date").notNull(),
});
