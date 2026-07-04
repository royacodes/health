export type IngredientStatus = "active" | "draft" | "archived";

export interface IngredientTranslation {
  locale: string;
  name: string;
  description: string;
  searchAliases: string[];
}

export interface Ingredient {
  id: string;
  slug: string;
  barcode?: string;
  categoryId?: string;
  brand?: string;
  translations: IngredientTranslation[];
  status: IngredientStatus;
  isVerified: boolean;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIngredientInput {
  slug: string;
  barcode?: string;
  categoryId?: string;
  brand?: string;
  translations: IngredientTranslation[];
  status?: IngredientStatus;
  isVerified?: boolean;
  createdBy?: string;
}

export interface UpdateIngredientInput {
  slug?: string;
  barcode?: string;
  categoryId?: string;
  brand?: string;
  translations?: IngredientTranslation[];
  status?: IngredientStatus;
  isVerified?: boolean;
}
