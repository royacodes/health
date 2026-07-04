import { index, integer, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export interface CategoryTranslation {
  locale: string;
  name: string;
  description: string;
}

export const categories = pgTable(
  "categories",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    parentId: varchar("parent_id", { length: 36 }),
    translations: jsonb("translations").$type<CategoryTranslation[]>().default([]).notNull(),
    icon: varchar("icon", { length: 100 }),
    color: varchar("color", { length: 20 }),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("categories_slug_idx").on(t.slug), index("categories_parent_idx").on(t.parentId)],
);
