import { index, pgEnum, pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

export const nutritionSourceEnum = pgEnum("nutrition_source", [
  "lab",
  "database",
  "calculated",
  "estimated",
]);

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  vitaminA: number;
  vitaminB: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  cholesterol: number;
  caffeine: number;
  water: number;
}

export const nutritionFacts = pgTable(
  "nutrition_facts",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    foodId: varchar("food_id", { length: 36 }).notNull(),
    source: nutritionSourceEnum("source").default("database").notNull(),

    /* Per 100g */
    per100gCalories: real("per_100g_calories").default(0).notNull(),
    per100gProtein: real("per_100g_protein").default(0).notNull(),
    per100gCarbohydrates: real("per_100g_carbohydrates").default(0).notNull(),
    per100gFat: real("per_100g_fat").default(0).notNull(),
    per100gFiber: real("per_100g_fiber").default(0).notNull(),
    per100gSugar: real("per_100g_sugar").default(0).notNull(),
    per100gSodium: real("per_100g_sodium").default(0).notNull(),
    per100gPotassium: real("per_100g_potassium").default(0).notNull(),
    per100gCalcium: real("per_100g_calcium").default(0).notNull(),
    per100gIron: real("per_100g_iron").default(0).notNull(),
    per100gMagnesium: real("per_100g_magnesium").default(0).notNull(),
    per100gVitaminA: real("per_100g_vitamin_a").default(0).notNull(),
    per100gVitaminB: real("per_100g_vitamin_b").default(0).notNull(),
    per100gVitaminC: real("per_100g_vitamin_c").default(0).notNull(),
    per100gVitaminD: real("per_100g_vitamin_d").default(0).notNull(),
    per100gVitaminE: real("per_100g_vitamin_e").default(0).notNull(),
    per100gVitaminK: real("per_100g_vitamin_k").default(0).notNull(),
    per100gCholesterol: real("per_100g_cholesterol").default(0).notNull(),
    per100gCaffeine: real("per_100g_caffeine").default(0).notNull(),
    per100gWater: real("per_100g_water").default(0).notNull(),

    /* Per serving */
    servingSizeG: real("serving_size_g").notNull(),
    perServingCalories: real("per_serving_calories").default(0).notNull(),
    perServingProtein: real("per_serving_protein").default(0).notNull(),
    perServingCarbohydrates: real("per_serving_carbohydrates").default(0).notNull(),
    perServingFat: real("per_serving_fat").default(0).notNull(),
    perServingFiber: real("per_serving_fiber").default(0).notNull(),
    perServingSugar: real("per_serving_sugar").default(0).notNull(),
    perServingSodium: real("per_serving_sodium").default(0).notNull(),
    perServingPotassium: real("per_serving_potassium").default(0).notNull(),
    perServingCalcium: real("per_serving_calcium").default(0).notNull(),
    perServingIron: real("per_serving_iron").default(0).notNull(),
    perServingMagnesium: real("per_serving_magnesium").default(0).notNull(),
    perServingVitaminA: real("per_serving_vitamin_a").default(0).notNull(),
    perServingVitaminB: real("per_serving_vitamin_b").default(0).notNull(),
    perServingVitaminC: real("per_serving_vitamin_c").default(0).notNull(),
    perServingVitaminD: real("per_serving_vitamin_d").default(0).notNull(),
    perServingVitaminE: real("per_serving_vitamin_e").default(0).notNull(),
    perServingVitaminK: real("per_serving_vitamin_k").default(0).notNull(),
    perServingCholesterol: real("per_serving_cholesterol").default(0).notNull(),
    perServingCaffeine: real("per_serving_caffeine").default(0).notNull(),
    perServingWater: real("per_serving_water").default(0).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("nutrition_facts_food_idx").on(t.foodId)],
);
