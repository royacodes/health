import { index, integer, jsonb, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const recipeStatusEnum = pgEnum("recipe_status", ["active", "draft", "archived"]);
export const recipeVisibilityEnum = pgEnum("recipe_visibility", [
  "public",
  "private",
  "unlisted",
  "premium",
]);
export const recipeDifficultyEnum = pgEnum("recipe_difficulty", [
  "easy",
  "medium",
  "hard",
  "expert",
]);

export interface RecipeTranslation {
  locale: string;
  title: string;
  description: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  searchAliases: string[];
}

export interface RecipeImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

export const recipes = pgTable(
  "recipes",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    translations: jsonb("translations").$type<RecipeTranslation[]>().default([]).notNull(),
    coverImage: jsonb("cover_image").$type<RecipeImage>(),
    gallery: jsonb("gallery").$type<RecipeImage[]>().default([]).notNull(),
    difficulty: recipeDifficultyEnum("difficulty").default("easy").notNull(),
    servings: integer("servings").default(4).notNull(),
    prepTimeMinutes: integer("prep_time_minutes").default(0).notNull(),
    cookTimeMinutes: integer("cook_time_minutes").default(0).notNull(),
    totalTimeMinutes: integer("total_time_minutes").default(0).notNull(),
    calories: integer("calories").default(0).notNull(),
    visibility: recipeVisibilityEnum("visibility").default("public").notNull(),
    status: recipeStatusEnum("status").default("active").notNull(),
    authorId: varchar("author_id", { length: 36 }).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("recipes_slug_idx").on(t.slug),
    index("recipes_author_idx").on(t.authorId),
    index("recipes_status_idx").on(t.status),
    index("recipes_visibility_idx").on(t.visibility),
  ],
);
