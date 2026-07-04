import { index, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export interface TagTranslation {
  locale: string;
  name: string;
}

export const tags = pgTable(
  "tags",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    translations: jsonb("translations").$type<TagTranslation[]>().default([]).notNull(),
    color: varchar("color", { length: 20 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("tags_slug_idx").on(t.slug)],
);
