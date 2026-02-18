import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const MediaType = pgEnum("mediaType", ["img", "vid"])

export const projectsTable = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 1024 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  finishDate: timestamp("finish_date").notNull(),
  order: integer().default(0).notNull(),
  featured: boolean("featured").notNull(),
})

export const projectsMediaTable = pgTable("projects_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  cloudinaryId: varchar("cloudinary_id", { length: 255 }).notNull(),
  type: MediaType("mediaType").default("img").notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  alt: varchar("alt_text", { length: 50 }).notNull(),
  order: integer().default(0).notNull(),
})

export const projectsTagsTable = pgTable("projects_tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: varchar("text", { length: 100 }).notNull(),
})

export const projectsTagsRelationTable = pgTable(
  "projects_tags_relation_table",
  {
    projectId: uuid("project_id")
      .references(() => projectsTable.id)
      .notNull(),
    tagId: uuid("tag_id")
      .references(() => projectsTagsTable.id)
      .notNull(),
  },
  //composite KEY
  (table) => {
    return {
      pk: primaryKey({ columns: [table.projectId, table.tagId] }),
    }
  }
)

//RELATIONS
export const projectsTableRelations = relations(projectsTable, ({ many }) => {
  return {
    media: many(projectsMediaTable),
    tags: many(projectsTagsRelationTable),
  }
})

export const projectsMediaTableRelations = relations(
  projectsMediaTable,
  ({ one }) => {
    return {
      projects: one(projectsTable, {
        fields: [projectsMediaTable.projectId],
        references: [projectsTable.id],
      }),
    }
  }
)

export const projectsTagTableRelations = relations(
  projectsTagsTable,
  ({ many }) => {
    return {
      projectsTagsRelation: many(projectsTagsRelationTable),
    }
  }
)

export const projectsTagRelationTableRelations = relations(
  projectsTagsRelationTable,
  ({ one }) => {
    return {
      project: one(projectsTable, {
        fields: [projectsTagsRelationTable.projectId],
        references: [projectsTable.id],
      }),
      tag: one(projectsTagsTable, {
        fields: [projectsTagsRelationTable.projectId],
        references: [projectsTagsTable.id],
      }),
    }
  }
)
