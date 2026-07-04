import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const recipeTags = pgTable(
  "recipe_tags",
  {
    recipeId: varchar("recipe_id", { length: 36 }).notNull(),
    tagId: varchar("tag_id", { length: 36 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("recipe_tags_recipe_idx").on(t.recipeId), index("recipe_tags_tag_idx").on(t.tagId)],
);
