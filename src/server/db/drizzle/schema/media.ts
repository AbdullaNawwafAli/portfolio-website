import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  cloudinaryId: varchar("cloudinary_id", { length: 255 }).notNull(),
  url: varchar("url", { length: 512 }).notNull(),
  type: varchar("type", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});
