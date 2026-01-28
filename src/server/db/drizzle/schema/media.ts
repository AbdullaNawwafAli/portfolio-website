import { pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { projectsTable } from "./projects";

export const mediaTable = pgTable("media", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  cloudinaryId: varchar("cloudinary_id", { length: 255 }).notNull(),
  url: varchar({ length: 512 }).notNull(),
  type: varchar({ length: 50 }).notNull(), // 'image' or 'video'
  order: integer().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
