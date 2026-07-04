import { boolean, index, jsonb, pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

export interface ServingTranslation {
  locale: string;
  name: string;
}

export const servingUnits = pgTable(
  "serving_units",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    translations: jsonb("translations").$type<ServingTranslation[]>().default([]).notNull(),
    baseUnit: varchar("base_unit", { length: 20 }).notNull() /* g or ml */,
    conversionFactor:
      real("conversion_factor").notNull() /* how many base units in 1 of this unit */,
    isMetric: boolean("is_metric").default(true).notNull(),
    icon: varchar("icon", { length: 100 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("serving_units_slug_idx").on(t.slug)],
);

export const foodServings = pgTable(
  "food_servings",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    foodId: varchar("food_id", { length: 36 }).notNull(),
    unitId: varchar("unit_id", { length: 36 }).notNull(),
    amount: real("amount").notNull(),
    weightInGrams: real("weight_in_grams").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("food_servings_food_idx").on(t.foodId),
    index("food_servings_unit_idx").on(t.unitId),
  ],
);
