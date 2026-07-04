import { boolean, index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const recipeReviews = pgTable(
  "recipe_reviews",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    recipeId: varchar("recipe_id", { length: 36 }).notNull(),
    content: text("content").notNull(),
    rating: integer("rating") /* optional, links to rating */,
    isVerified: boolean("is_verified").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("recipe_reviews_user_idx").on(t.userId),
    index("recipe_reviews_recipe_idx").on(t.recipeId),
  ],
);
