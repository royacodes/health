export interface RecipeStepTranslation {
  locale: string;
  title: string;
  description: string;
  tips: string;
}

export interface RecipeStepImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface RecipeStep {
  id: string;
  recipeId: string;
  order: number;
  translations: RecipeStepTranslation[];
  image: RecipeStepImage | null;
  timerMinutes: number | null;
  createdAt: Date;
}

export interface CreateRecipeStepInput {
  order: number;
  translations: RecipeStepTranslation[];
  image?: RecipeStepImage;
  timerMinutes?: number;
}

export interface UpdateRecipeStepInput {
  order?: number;
  translations?: RecipeStepTranslation[];
  image?: RecipeStepImage;
  timerMinutes?: number;
}
