import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const skillTypeTable = pgTable("skill_type", {
  id: uuid("id").primaryKey().defaultRandom(),
  skill_type_name: varchar("skill_type_name", { length: 255 }).notNull(),
});

export const skillInfoTable = pgTable("skill_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  skill_type_id: uuid("skill_type_id")
    .references(() => skillTypeTable.id)
    .notNull(),
  skill_logo_cloudinary_id: varchar("skill_logo_cloudinary_id", {
    length: 255,
  }).notNull(),
  skill_name: varchar("skill_name", { length: 255 }).notNull(),
});

//Relations
export const skillTypeTableRelations = relations(skillTypeTable, ({ many }) => {
  return {
    skill_info: many(skillInfoTable),
  };
});

export const skillInfoTableRelations = relations(skillInfoTable, ({ one }) => {
  return {
    skill_type: one(skillTypeTable, {
      fields: [skillInfoTable.skill_type_id],
      references: [skillTypeTable.id],
    }),
  };
});
