import { index, jsonb, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const collectionVisibilityEnum = pgEnum("collection_visibility", [
  "private",
  "public",
  "shared",
]);

export interface CollectionTranslation {
  locale: string;
  name: string;
  description: string;
}

export const collections = pgTable(
  "collections",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    translations: jsonb("translations").$type<CollectionTranslation[]>().default([]).notNull(),
    visibility: collectionVisibilityEnum("visibility").default("private").notNull(),
    coverImage: text("cover_image"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("collections_user_idx").on(t.userId)],
);

export const collectionRecipes = pgTable(
  "collection_recipes",
  {
    collectionId: varchar("collection_id", { length: 36 }).notNull(),
    recipeId: varchar("recipe_id", { length: 36 }).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("collection_recipes_collection_idx").on(t.collectionId),
    index("collection_recipes_recipe_idx").on(t.recipeId),
  ],
);

import { integer } from "drizzle-orm/pg-core";
