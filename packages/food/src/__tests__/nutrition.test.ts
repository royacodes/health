import { describe, expect, it } from "vitest";
import { addNutrition, createEmptyNutritionValues, scaleNutrition } from "../domain/nutrition";
import {
  DEFAULT_DAILY_VALUES,
  calculateNutrition,
  calculatePerServing,
  calculateRecipeNutrition,
  getDailyValuePercentage,
} from "../nutrition/calculator";

describe("Nutrition Calculator", () => {
  describe("createEmptyNutritionValues", () => {
    it("creates all zeros", () => {
      const values = createEmptyNutritionValues();
      expect(values.calories).toBe(0);
      expect(values.protein).toBe(0);
      expect(values.fat).toBe(0);
      expect(Object.keys(values)).toHaveLength(20);
    });
  });

  describe("scaleNutrition", () => {
    it("scales values by factor", () => {
      const input = createEmptyNutritionValues();
      input.calories = 100;
      input.protein = 20;

      const result = scaleNutrition(input, 2);
      expect(result.calories).toBe(200);
      expect(result.protein).toBe(40);
    });

    it("rounds to 2 decimal places", () => {
      const input = createEmptyNutritionValues();
      input.calories = 33.33;

      const result = scaleNutrition(input, 0.5);
      expect(result.calories).toBe(16.67);
    });
  });

  describe("addNutrition", () => {
    it("adds two nutrition values", () => {
      const a = createEmptyNutritionValues();
      a.calories = 100;
      a.protein = 10;

      const b = createEmptyNutritionValues();
      b.calories = 200;
      b.protein = 5;

      const result = addNutrition(a, b);
      expect(result.calories).toBe(300);
      expect(result.protein).toBe(15);
    });
  });

  describe("calculateNutrition", () => {
    it("calculates nutrition for 100g", () => {
      const per100g = createEmptyNutritionValues();
      per100g.calories = 100;
      per100g.protein = 20;

      const result = calculateNutrition({
        per100g,
        amount: 100,
        unitSlug: "g",
        conversionFactor: 1,
      });

      expect(result.nutrition.calories).toBe(100);
      expect(result.nutrition.protein).toBe(20);
      expect(result.weightInGrams).toBe(100);
    });

    it("calculates nutrition for 50g", () => {
      const per100g = createEmptyNutritionValues();
      per100g.calories = 200;
      per100g.protein = 30;

      const result = calculateNutrition({
        per100g,
        amount: 50,
        unitSlug: "g",
        conversionFactor: 1,
      });

      expect(result.nutrition.calories).toBe(100);
      expect(result.nutrition.protein).toBe(15);
      expect(result.weightInGrams).toBe(50);
    });

    it("calculates nutrition for kg", () => {
      const per100g = createEmptyNutritionValues();
      per100g.calories = 100;

      const result = calculateNutrition({
        per100g,
        amount: 1,
        unitSlug: "kg",
        conversionFactor: 1000,
      });

      expect(result.nutrition.calories).toBe(1000);
      expect(result.weightInGrams).toBe(1000);
    });
  });

  describe("calculateRecipeNutrition", () => {
    it("sums nutrition from multiple ingredients", () => {
      const per100g1 = createEmptyNutritionValues();
      per100g1.calories = 100;
      per100g1.protein = 10;

      const per100g2 = createEmptyNutritionValues();
      per100g2.calories = 50;
      per100g2.protein = 5;

      const result = calculateRecipeNutrition([
        { per100g: per100g1, amount: 100, unitSlug: "g", conversionFactor: 1 },
        { per100g: per100g2, amount: 200, unitSlug: "g", conversionFactor: 1 },
      ]);

      expect(result.calories).toBe(200);
      expect(result.protein).toBe(20);
    });
  });

  describe("calculatePerServing", () => {
    it("divides by number of servings", () => {
      const total = createEmptyNutritionValues();
      total.calories = 600;
      total.protein = 30;

      const result = calculatePerServing(total, 3);
      expect(result.calories).toBe(200);
      expect(result.protein).toBe(10);
    });

    it("handles zero servings gracefully", () => {
      const total = createEmptyNutritionValues();
      total.calories = 100;

      const result = calculatePerServing(total, 0);
      expect(result.calories).toBe(100);
    });
  });

  describe("getDailyValuePercentage", () => {
    it("calculates DV percentage", () => {
      const nutrition = createEmptyNutritionValues();
      nutrition.calories = 500;
      nutrition.protein = 25;

      const result = getDailyValuePercentage(nutrition, DEFAULT_DAILY_VALUES);
      expect(result.calories).toBe(25);
      expect(result.protein).toBe(50);
    });

    it("handles zero daily values", () => {
      const nutrition = createEmptyNutritionValues();
      nutrition.calories = 100;

      const result = getDailyValuePercentage(nutrition, createEmptyNutritionValues());
      expect(result.calories).toBe(0);
    });
  });
});
