import { z } from "zod";

export const localeSchema = z.enum(["en", "fa"]);
export const foodStatusSchema = z.enum(["active", "draft", "archived"]);
export const foodVisibilitySchema = z.enum(["public", "private", "unlisted"]);
export const baseUnitSchema = z.enum(["g", "ml"]);
export const nutritionSourceSchema = z.enum(["lab", "database", "calculated", "estimated"]);

export const foodTranslationSchema = z.object({
  locale: localeSchema,
  name: z.string().min(1).max(255),
  description: z.string().max(2000).default(""),
  searchAliases: z.array(z.string().max(100)).default([]),
});

export const foodImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().max(255).default(""),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  isPrimary: z.boolean().default(false),
});

export const createFoodSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  scientificName: z.string().max(255).optional(),
  brand: z.string().max(255).optional(),
  barcode: z.string().max(50).optional(),
  categoryId: z.string().max(36).optional(),
  translations: z.array(foodTranslationSchema).min(1),
  images: z.array(foodImageSchema).default([]),
  isVerified: z.boolean().default(false),
  visibility: foodVisibilitySchema.default("public"),
  status: foodStatusSchema.default("active"),
});

export const updateFoodSchema = createFoodSchema.partial();

export const ingredientTranslationSchema = z.object({
  locale: localeSchema,
  name: z.string().min(1).max(255),
  description: z.string().max(2000).default(""),
  searchAliases: z.array(z.string().max(100)).default([]),
});

export const createIngredientSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  barcode: z.string().max(50).optional(),
  categoryId: z.string().max(36).optional(),
  brand: z.string().max(255).optional(),
  translations: z.array(ingredientTranslationSchema).min(1),
  status: z.enum(["active", "draft", "archived"]).default("active"),
  isVerified: z.boolean().default(false),
});

export const updateIngredientSchema = createIngredientSchema.partial();

export const nutritionValuesSchema = z.object({
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbohydrates: z.number().min(0),
  fat: z.number().min(0),
  fiber: z.number().min(0),
  sugar: z.number().min(0),
  sodium: z.number().min(0),
  potassium: z.number().min(0),
  calcium: z.number().min(0),
  iron: z.number().min(0),
  magnesium: z.number().min(0),
  vitaminA: z.number().min(0),
  vitaminB: z.number().min(0),
  vitaminC: z.number().min(0),
  vitaminD: z.number().min(0),
  vitaminE: z.number().min(0),
  vitaminK: z.number().min(0),
  cholesterol: z.number().min(0),
  caffeine: z.number().min(0),
  water: z.number().min(0),
});

export const createNutritionSchema = z.object({
  foodId: z.string().max(36),
  source: nutritionSourceSchema.default("database"),
  per100g: nutritionValuesSchema,
  servingSizeG: z.number().positive(),
  perServing: nutritionValuesSchema,
});

export const categoryTranslationSchema = z.object({
  locale: localeSchema,
  name: z.string().min(1).max(255),
  description: z.string().max(1000).default(""),
});

export const createCategorySchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  parentId: z.string().max(36).optional(),
  translations: z.array(categoryTranslationSchema).min(1),
  icon: z.string().max(100).optional(),
  color: z.string().max(20).optional(),
  sortOrder: z.number().int().default(0),
});

export const updateCategorySchema = createCategorySchema.partial();

export const tagTranslationSchema = z.object({
  locale: localeSchema,
  name: z.string().min(1).max(255),
});

export const createTagSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  translations: z.array(tagTranslationSchema).min(1),
  color: z.string().max(20).optional(),
});

export const servingUnitTranslationSchema = z.object({
  locale: localeSchema,
  name: z.string().min(1).max(100),
});

export const createServingUnitSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9_]+$/),
  translations: z.array(servingUnitTranslationSchema).min(1),
  baseUnit: baseUnitSchema,
  conversionFactor: z.number().positive(),
  isMetric: z.boolean().default(true),
  icon: z.string().max(100).optional(),
});

export const calculateNutritionSchema = z.object({
  per100g: nutritionValuesSchema,
  amount: z.number().positive(),
  unitSlug: z.string().min(1),
  conversionFactor: z.number().positive(),
});

export const searchSchema = z.object({
  query: z.string().max(200).optional(),
  locale: localeSchema.optional(),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  minCalories: z.number().min(0).optional(),
  maxCalories: z.number().min(0).optional(),
  minProtein: z.number().min(0).optional(),
  maxProtein: z.number().min(0).optional(),
  barcode: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["name", "calories", "protein", "createdAt", "popularity"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type CreateFoodInput = z.infer<typeof createFoodSchema>;
export type UpdateFoodInput = z.infer<typeof updateFoodSchema>;
export type CreateIngredientInput = z.infer<typeof createIngredientSchema>;
export type CreateNutritionInput = z.infer<typeof createNutritionSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type CreateServingUnitInput = z.infer<typeof createServingUnitSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
