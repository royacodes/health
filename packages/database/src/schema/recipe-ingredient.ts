import { index, integer, jsonb, pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

export interface RecipeIngredientNote {
  locale: string;
  note: string;
  preparation: string;
}

export const recipeIngredients = pgTable(
  "recipe_ingredients",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    recipeId: varchar("recipe_id", { length: 36 }).notNull(),
    ingredientId: varchar("ingredient_id", { length: 36 }).notNull(),
    quantity: real("quantity").notNull(),
    unitId: varchar("unit_id", { length: 36 }).notNull(),
    notes: jsonb("notes").$type<RecipeIngredientNote[]>().default([]).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    isOptional: boolean("is_optional").default(false).notNull(),
    groupId: varchar("group_id", { length: 36 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("recipe_ingredients_recipe_idx").on(t.recipeId),
    index("recipe_ingredients_ingredient_idx").on(t.ingredientId),
  ],
);

import { boolean } from "drizzle-orm/pg-core";
