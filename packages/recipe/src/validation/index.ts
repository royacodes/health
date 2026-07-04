import { z } from "zod";

export const localeSchema = z.enum(["en", "fa"]);
export const recipeStatusSchema = z.enum(["active", "draft", "archived"]);
export const recipeVisibilitySchema = z.enum(["public", "private", "unlisted", "premium"]);
export const recipeDifficultySchema = z.enum(["easy", "medium", "hard", "expert"]);

export const recipeTranslationSchema = z.object({
  locale: localeSchema,
  title: z.string().min(1).max(500),
  description: z.string().max(5000).default(""),
  summary: z.string().max(1000).default(""),
  seoTitle: z.string().max(200).default(""),
  seoDescription: z.string().max(300).default(""),
  searchAliases: z.array(z.string().max(100)).default([]),
});

export const recipeImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().max(255).default(""),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  isPrimary: z.boolean().default(false),
});

export const createRecipeSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  translations: z.array(recipeTranslationSchema).min(1),
  coverImage: recipeImageSchema.optional(),
  gallery: z.array(recipeImageSchema).default([]),
  difficulty: recipeDifficultySchema.default("easy"),
  servings: z.number().int().min(1).max(100).default(4),
  prepTimeMinutes: z.number().int().min(0).default(0),
  cookTimeMinutes: z.number().int().min(0).default(0),
  calories: z.number().int().min(0).default(0),
  visibility: recipeVisibilitySchema.default("public"),
  status: recipeStatusSchema.default("active"),
  authorId: z.string().min(1).max(36),
});

export const updateRecipeSchema = createRecipeSchema.partial().omit({ authorId: true });

export const recipeIngredientNoteSchema = z.object({
  locale: localeSchema,
  note: z.string().max(500).default(""),
  preparation: z.string().max(500).default(""),
});

export const createRecipeIngredientSchema = z.object({
  ingredientId: z.string().min(1).max(36),
  quantity: z.number().positive(),
  unitId: z.string().min(1).max(36),
  notes: z.array(recipeIngredientNoteSchema).default([]),
  sortOrder: z.number().int().default(0),
  isOptional: z.boolean().default(false),
  groupId: z.string().max(36).optional(),
});

export const updateRecipeIngredientSchema = createRecipeIngredientSchema.partial();

export const recipeStepTranslationSchema = z.object({
  locale: localeSchema,
  title: z.string().max(255).default(""),
  description: z.string().max(5000).default(""),
  tips: z.string().max(2000).default(""),
});

export const recipeStepImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().max(255).default(""),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const createRecipeStepSchema = z.object({
  order: z.number().int().min(0),
  translations: z.array(recipeStepTranslationSchema).min(1),
  image: recipeStepImageSchema.optional(),
  timerMinutes: z.number().int().min(0).optional(),
});

export const updateRecipeStepSchema = createRecipeStepSchema.partial();

export const collectionTranslationSchema = z.object({
  locale: localeSchema,
  name: z.string().min(1).max(255),
  description: z.string().max(2000).default(""),
});

export const createCollectionSchema = z.object({
  translations: z.array(collectionTranslationSchema).min(1),
  visibility: z.enum(["private", "public", "shared"]).default("private"),
  coverImage: z.string().url().optional(),
});

export const updateCollectionSchema = createCollectionSchema.partial();

export const ratingSchema = z.object({
  rating: z.number().int().min(1).max(5),
});

export const reviewSchema = z.object({
  content: z.string().min(1).max(5000),
  rating: z.number().int().min(1).max(5).optional(),
});

export const recipeSearchSchema = z.object({
  query: z.string().max(200).optional(),
  locale: localeSchema.optional(),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  difficulty: recipeDifficultySchema.optional(),
  minPrepTime: z.number().int().min(0).optional(),
  maxPrepTime: z.number().int().min(0).optional(),
  minCookTime: z.number().int().min(0).optional(),
  maxCookTime: z.number().int().min(0).optional(),
  minCalories: z.number().int().min(0).optional(),
  maxCalories: z.number().int().min(0).optional(),
  minProtein: z.number().min(0).optional(),
  maxProtein: z.number().min(0).optional(),
  authorId: z.string().optional(),
  visibility: recipeVisibilitySchema.optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z
    .enum(["title", "createdAt", "rating", "favorites", "calories", "popularity"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const reorderStepsSchema = z.object({
  stepIds: z.array(z.string().min(1).max(36)).min(1),
});

export const scaleServingsSchema = z.object({
  targetServings: z.number().int().min(1).max(100),
});

export type CreateRecipeDTO = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeDTO = z.infer<typeof updateRecipeSchema>;
export type CreateRecipeIngredientDTO = z.infer<typeof createRecipeIngredientSchema>;
export type CreateRecipeStepDTO = z.infer<typeof createRecipeStepSchema>;
export type CreateCollectionDTO = z.infer<typeof createCollectionSchema>;
export type RecipeSearchDTO = z.infer<typeof recipeSearchSchema>;
export type ScaleServingsDTO = z.infer<typeof scaleServingsSchema>;
