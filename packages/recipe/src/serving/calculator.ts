import type { RecipeIngredient } from "../domain/recipe-ingredient";

export interface ScaledIngredient {
  ingredientId: string;
  unitId: string;
  originalQuantity: number;
  scaledQuantity: number;
  quantityDifference: number;
  isOptional: boolean;
  notes: { locale: string; note: string; preparation: string }[];
}

export interface ServingCalculationResult {
  originalServings: number;
  targetServings: number;
  scaleFactor: number;
  scaledIngredients: ScaledIngredient[];
}

export function calculateServingScale(originalServings: number, targetServings: number): number {
  if (originalServings <= 0 || targetServings <= 0) return 1;
  return Math.round((targetServings / originalServings) * 100) / 100;
}

export function scaleIngredientQuantity(quantity: number, scaleFactor: number): number {
  const scaled = Math.round(quantity * scaleFactor * 100) / 100;
  return scaled;
}

export function scaleIngredients(
  ingredients: RecipeIngredient[],
  originalServings: number,
  targetServings: number,
): ServingCalculationResult {
  const scaleFactor = calculateServingScale(originalServings, targetServings);

  const scaledIngredients: ScaledIngredient[] = ingredients.map((ingredient) => {
    const scaledQuantity = scaleIngredientQuantity(ingredient.quantity, scaleFactor);
    return {
      ingredientId: ingredient.ingredientId,
      unitId: ingredient.unitId,
      originalQuantity: ingredient.quantity,
      scaledQuantity,
      quantityDifference: Math.round((scaledQuantity - ingredient.quantity) * 100) / 100,
      isOptional: ingredient.isOptional,
      notes: ingredient.notes,
    };
  });

  return {
    originalServings,
    targetServings,
    scaleFactor,
    scaledIngredients,
  };
}

export function scaleCookingTime(
  originalTimeMinutes: number,
  originalServings: number,
  targetServings: number,
): number {
  const scaleFactor = calculateServingScale(originalServings, targetServings);
  return Math.round(originalTimeMinutes * scaleFactor);
}
