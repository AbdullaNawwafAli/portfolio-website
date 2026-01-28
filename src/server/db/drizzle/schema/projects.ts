import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1024 }).notNull(),
  createdDate: varchar({ length: 255 }).notNull(),
  imgUrl: varchar({ length: 512 }).notNull(),
});
