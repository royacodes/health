import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const recipeCategories = pgTable(
  "recipe_categories",
  {
    recipeId: varchar("recipe_id", { length: 36 }).notNull(),
    categoryId: varchar("category_id", { length: 36 }).notNull(),
    isPrimary: boolean("is_primary").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("recipe_categories_recipe_idx").on(t.recipeId),
    index("recipe_categories_category_idx").on(t.categoryId),
  ],
);

import { boolean } from "drizzle-orm/pg-core";
