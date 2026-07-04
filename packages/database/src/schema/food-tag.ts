import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const foodTags = pgTable(
  "food_tags",
  {
    foodId: varchar("food_id", { length: 36 }).notNull(),
    tagId: varchar("tag_id", { length: 36 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("food_tags_food_idx").on(t.foodId), index("food_tags_tag_idx").on(t.tagId)],
);
