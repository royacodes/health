import {
  type NutritionValues,
  addNutrition,
  createEmptyNutritionValues,
  scaleNutrition,
} from "../domain/nutrition";
import { convertToGrams } from "../units/conversion";

export interface CalculateInput {
  per100g: NutritionValues;
  amount: number;
  unitSlug: string;
  conversionFactor: number;
}

export interface CalculateResult {
  nutrition: NutritionValues;
  weightInGrams: number;
}

export function calculateNutrition(input: CalculateInput): CalculateResult {
  const weightInGrams = convertToGrams(input.amount, input.unitSlug, input.conversionFactor);
  const factor = weightInGrams / 100;
  const nutrition = scaleNutrition(input.per100g, factor);

  return { nutrition, weightInGrams };
}

export function calculateRecipeNutrition(
  ingredients: Array<{
    per100g: NutritionValues;
    amount: number;
    unitSlug: string;
    conversionFactor: number;
  }>,
): NutritionValues {
  let total = createEmptyNutritionValues();

  for (const ingredient of ingredients) {
    const { nutrition } = calculateNutrition(ingredient);
    total = addNutrition(total, nutrition);
  }

  return total;
}

export function calculatePerServing(
  totalNutrition: NutritionValues,
  numberOfServings: number,
): NutritionValues {
  if (numberOfServings <= 0) return totalNutrition;
  return scaleNutrition(totalNutrition, 1 / numberOfServings);
}

export function getDailyValuePercentage(
  nutrition: NutritionValues,
  dailyValues: NutritionValues,
): NutritionValues {
  const result = createEmptyNutritionValues();
  const keys = Object.keys(result) as (keyof NutritionValues)[];

  for (const key of keys) {
    if (dailyValues[key] > 0) {
      result[key] = Math.round((nutrition[key] / dailyValues[key]) * 100 * 10) / 10;
    }
  }

  return result;
}

export const DEFAULT_DAILY_VALUES: NutritionValues = {
  calories: 2000,
  protein: 50,
  carbohydrates: 275,
  fat: 78,
  fiber: 28,
  sugar: 50,
  sodium: 2300,
  potassium: 4700,
  calcium: 1300,
  iron: 18,
  magnesium: 420,
  vitaminA: 900,
  vitaminB: 1.2,
  vitaminC: 90,
  vitaminD: 20,
  vitaminE: 15,
  vitaminK: 120,
  cholesterol: 300,
  caffeine: 400,
  water: 3700,
};

export const NUTRITION_LABELS: Record<keyof NutritionValues, { name: string; unit: string }> = {
  calories: { name: "Calories", unit: "kcal" },
  protein: { name: "Protein", unit: "g" },
  carbohydrates: { name: "Carbohydrates", unit: "g" },
  fat: { name: "Fat", unit: "g" },
  fiber: { name: "Fiber", unit: "g" },
  sugar: { name: "Sugar", unit: "g" },
  sodium: { name: "Sodium", unit: "mg" },
  potassium: { name: "Potassium", unit: "mg" },
  calcium: { name: "Calcium", unit: "mg" },
  iron: { name: "Iron", unit: "mg" },
  magnesium: { name: "Magnesium", unit: "mg" },
  vitaminA: { name: "Vitamin A", unit: "mcg" },
  vitaminB: { name: "Vitamin B", unit: "mg" },
  vitaminC: { name: "Vitamin C", unit: "mg" },
  vitaminD: { name: "Vitamin D", unit: "mcg" },
  vitaminE: { name: "Vitamin E", unit: "mg" },
  vitaminK: { name: "Vitamin K", unit: "mcg" },
  cholesterol: { name: "Cholesterol", unit: "mg" },
  caffeine: { name: "Caffeine", unit: "mg" },
  water: { name: "Water", unit: "g" },
};
