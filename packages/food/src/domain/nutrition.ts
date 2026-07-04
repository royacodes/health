export type NutritionSource = "lab" | "database" | "calculated" | "estimated";

export interface NutritionValues {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  vitaminA: number;
  vitaminB: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  cholesterol: number;
  caffeine: number;
  water: number;
}

export interface NutritionFacts {
  id: string;
  foodId: string;
  source: NutritionSource;
  per100g: NutritionValues;
  servingSizeG: number;
  perServing: NutritionValues;
  createdAt: Date;
  updatedAt: Date;
}

export function createEmptyNutritionValues(): NutritionValues {
  return {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    vitaminA: 0,
    vitaminB: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0,
    vitaminK: 0,
    cholesterol: 0,
    caffeine: 0,
    water: 0,
  };
}

export function scaleNutrition(values: NutritionValues, factor: number): NutritionValues {
  const result: NutritionValues = { ...values };
  for (const key of Object.keys(result) as (keyof NutritionValues)[]) {
    result[key] = Math.round(values[key] * factor * 100) / 100;
  }
  return result;
}

export function addNutrition(a: NutritionValues, b: NutritionValues): NutritionValues {
  const result: NutritionValues = { ...a };
  for (const key of Object.keys(result) as (keyof NutritionValues)[]) {
    result[key] = Math.round((a[key] + b[key]) * 100) / 100;
  }
  return result;
}
