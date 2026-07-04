export interface RecipeIngredientNote {
  locale: string;
  note: string;
  preparation: string;
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientId: string;
  quantity: number;
  unitId: string;
  notes: RecipeIngredientNote[];
  sortOrder: number;
  isOptional: boolean;
  groupId: string | null;
  createdAt: Date;
}

export interface CreateRecipeIngredientInput {
  ingredientId: string;
  quantity: number;
  unitId: string;
  notes?: RecipeIngredientNote[];
  sortOrder?: number;
  isOptional?: boolean;
  groupId?: string;
}

export interface UpdateRecipeIngredientInput {
  ingredientId?: string;
  quantity?: number;
  unitId?: string;
  notes?: RecipeIngredientNote[];
  sortOrder?: number;
  isOptional?: boolean;
  groupId?: string;
}
