import { boolean, index, jsonb, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const ingredientStatusEnum = pgEnum("ingredient_status", ["active", "draft", "archived"]);

export interface IngredientTranslation {
  locale: string;
  name: string;
  description: string;
  searchAliases: string[];
}

export const ingredients = pgTable(
  "ingredients",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    barcode: varchar("barcode", { length: 50 }),
    categoryId: varchar("category_id", { length: 36 }),
    brand: varchar("brand", { length: 255 }),
    translations: jsonb("translations").$type<IngredientTranslation[]>().default([]).notNull(),
    status: ingredientStatusEnum("status").default("active").notNull(),
    isVerified: boolean("is_verified").default(false).notNull(),
    createdBy: varchar("created_by", { length: 36 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("ingredients_slug_idx").on(t.slug),
    index("ingredients_barcode_idx").on(t.barcode),
    index("ingredients_category_idx").on(t.categoryId),
  ],
);
