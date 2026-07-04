export type RecipeStatus = "active" | "draft" | "archived";
export type RecipeVisibility = "public" | "private" | "unlisted" | "premium";
export type RecipeDifficulty = "easy" | "medium" | "hard" | "expert";

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

export interface Recipe {
  id: string;
  slug: string;
  translations: RecipeTranslation[];
  coverImage: RecipeImage | null;
  gallery: RecipeImage[];
  difficulty: RecipeDifficulty;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  calories: number;
  visibility: RecipeVisibility;
  status: RecipeStatus;
  authorId: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRecipeInput {
  slug: string;
  translations: RecipeTranslation[];
  coverImage?: RecipeImage;
  gallery?: RecipeImage[];
  difficulty?: RecipeDifficulty;
  servings?: number;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  calories?: number;
  visibility?: RecipeVisibility;
  status?: RecipeStatus;
  authorId: string;
}

export interface UpdateRecipeInput {
  slug?: string;
  translations?: RecipeTranslation[];
  coverImage?: RecipeImage;
  gallery?: RecipeImage[];
  difficulty?: RecipeDifficulty;
  servings?: number;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  calories?: number;
  visibility?: RecipeVisibility;
  status?: RecipeStatus;
}
