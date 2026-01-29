import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const MediaType = pgEnum("mediaType", ["img", "vid"]);

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1024 }).notNull(),
  createdDate: varchar({ length: 255 }).notNull(),
});

export const projectsMedia = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  cloudinaryId: varchar("cloudinary_id", { length: 255 }).notNull(),
  url: varchar({ length: 512 }).notNull(),
  type: MediaType("mediaType").default("img"),
  order: integer().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

//RELATIONS
export const projectsTableRelations = relations(projects, ({ many }) => {
  return {
    media: many(projectsMedia),
  };
});

export const projectsMediaTableRelations = relations(
  projectsMedia,
  ({ one }) => {
    return {
      projects: one(projects, {
        fields: [projectsMedia.projectId],
        references: [projects.id],
      }),
    };
  }
);
