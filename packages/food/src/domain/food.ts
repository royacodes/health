export type FoodStatus = "active" | "draft" | "archived";
export type FoodVisibility = "public" | "private" | "unlisted";

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

export interface Food {
  id: string;
  slug: string;
  scientificName?: string;
  brand?: string;
  barcode?: string;
  categoryId?: string;
  translations: FoodTranslation[];
  images: FoodImage[];
  isVerified: boolean;
  visibility: FoodVisibility;
  status: FoodStatus;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFoodInput {
  slug: string;
  scientificName?: string;
  brand?: string;
  barcode?: string;
  categoryId?: string;
  translations: FoodTranslation[];
  images?: FoodImage[];
  isVerified?: boolean;
  visibility?: FoodVisibility;
  status?: FoodStatus;
  createdBy?: string;
}

export interface UpdateFoodInput {
  slug?: string;
  scientificName?: string;
  brand?: string;
  barcode?: string;
  categoryId?: string;
  translations?: FoodTranslation[];
  images?: FoodImage[];
  isVerified?: boolean;
  visibility?: FoodVisibility;
  status?: FoodStatus;
}
