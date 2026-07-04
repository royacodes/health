import { index, integer, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export interface RecipeStepTranslation {
  locale: string;
  title: string;
  description: string;
  tips: string;
}

export interface RecipeStepImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export const recipeSteps = pgTable(
  "recipe_steps",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    recipeId: varchar("recipe_id", { length: 36 }).notNull(),
    order: integer("order").notNull(),
    translations: jsonb("translations").$type<RecipeStepTranslation[]>().default([]).notNull(),
    image: jsonb("image").$type<RecipeStepImage>(),
    timerMinutes: integer("timer_minutes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("recipe_steps_recipe_idx").on(t.recipeId)],
);
