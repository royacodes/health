import { boolean, index, jsonb, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const foodStatusEnum = pgEnum("food_status", ["active", "draft", "archived"]);
export const foodVisibilityEnum = pgEnum("food_visibility", ["public", "private", "unlisted"]);

export interface FoodTranslation {
  locale: string;
  name: string;
  description: string;
  searchAliases: string[];
}

export interface FoodImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

export const foods = pgTable(
  "foods",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    scientificName: varchar("scientific_name", { length: 255 }),
    brand: varchar("brand", { length: 255 }),
    barcode: varchar("barcode", { length: 50 }),
    categoryId: varchar("category_id", { length: 36 }),
    translations: jsonb("translations").$type<FoodTranslation[]>().default([]).notNull(),
    images: jsonb("images").$type<FoodImage[]>().default([]).notNull(),
    isVerified: boolean("is_verified").default(false).notNull(),
    visibility: foodVisibilityEnum("visibility").default("public").notNull(),
    status: foodStatusEnum("status").default("active").notNull(),
    createdBy: varchar("created_by", { length: 36 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("foods_slug_idx").on(t.slug),
    index("foods_barcode_idx").on(t.barcode),
    index("foods_category_idx").on(t.categoryId),
    index("foods_status_idx").on(t.status),
  ],
);
