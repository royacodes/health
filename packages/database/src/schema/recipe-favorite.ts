import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const recipeFavorites = pgTable(
  "recipe_favorites",
  {
    userId: varchar("user_id", { length: 36 }).notNull(),
    recipeId: varchar("recipe_id", { length: 36 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("recipe_favorites_user_idx").on(t.userId),
    index("recipe_favorites_recipe_idx").on(t.recipeId),
  ],
);
