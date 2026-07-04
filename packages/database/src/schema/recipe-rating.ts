import { index, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const recipeRatings = pgTable(
  "recipe_ratings",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    recipeId: varchar("recipe_id", { length: 36 }).notNull(),
    rating: integer("rating").notNull() /* 1-5 */,
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("recipe_ratings_user_idx").on(t.userId),
    index("recipe_ratings_recipe_idx").on(t.recipeId),
  ],
);
