import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const bioTable = pgTable("bio", {
  id: uuid("id").primaryKey().defaultRandom(),
  bio_picture_cloudinary_id: varchar("bio_picture_cloudinary_id", {
    length: 255,
  }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  name_subtext: varchar("name_subtext", { length: 100 }).notNull(),
  hero_description: text("hero_description").notNull(),
  email: varchar("email", {
    length: 100,
  }).notNull(),
  resume_pdf_cloudinary_id: varchar("resume_pdf_cloudinary_id", {
    length: 255,
  }).notNull(),
  instagram_url: varchar("instagram_url", {
    length: 255,
  }).notNull(),
  linked_in_url: varchar("linked_in_url", {
    length: 255,
  }).notNull(),
  github_url: varchar("github_url", {
    length: 255,
  }).notNull(),
});
