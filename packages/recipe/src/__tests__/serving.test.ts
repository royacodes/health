import { describe, expect, it } from "vitest";
import type { RecipeIngredient } from "../domain/recipe-ingredient";
import {
  calculateServingScale,
  scaleCookingTime,
  scaleIngredientQuantity,
  scaleIngredients,
} from "../serving/calculator";

describe("Serving Calculator", () => {
  describe("calculateServingScale", () => {
    it("doubles servings", () => {
      expect(calculateServingScale(2, 4)).toBe(2);
    });

    it("halves servings", () => {
      expect(calculateServingScale(4, 2)).toBe(0.5);
    });

    it("returns 1 for same servings", () => {
      expect(calculateServingScale(4, 4)).toBe(1);
    });

    it("handles zero original servings", () => {
      expect(calculateServingScale(0, 4)).toBe(1);
    });

    it("handles zero target servings", () => {
      expect(calculateServingScale(4, 0)).toBe(1);
    });

    it("scales to fractional servings", () => {
      expect(calculateServingScale(4, 3)).toBe(0.75);
    });
  });

  describe("scaleIngredientQuantity", () => {
    it("doubles quantity", () => {
      expect(scaleIngredientQuantity(200, 2)).toBe(400);
    });

    it("halves quantity", () => {
      expect(scaleIngredientQuantity(200, 0.5)).toBe(100);
    });

    it("rounds to 2 decimals", () => {
      expect(scaleIngredientQuantity(100, 0.33)).toBe(33);
    });

    it("handles zero quantity", () => {
      expect(scaleIngredientQuantity(0, 2)).toBe(0);
    });
  });

  describe("scaleIngredients", () => {
    const mockIngredients: RecipeIngredient[] = [
      {
        id: "1",
        recipeId: "r1",
        ingredientId: "chicken",
        quantity: 200,
        unitId: "g",
        notes: [{ locale: "en", note: "diced", preparation: "cut into cubes" }],
        sortOrder: 0,
        isOptional: false,
        groupId: null,
        createdAt: new Date(),
      },
      {
        id: "2",
        recipeId: "r1",
        ingredientId: "oil",
        quantity: 2,
        unitId: "tbsp",
        notes: [],
        sortOrder: 1,
        isOptional: true,
        groupId: null,
        createdAt: new Date(),
      },
    ];

    it("scales all ingredients", () => {
      const result = scaleIngredients(mockIngredients, 2, 4);

      expect(result.originalServings).toBe(2);
      expect(result.targetServings).toBe(4);
      expect(result.scaleFactor).toBe(2);
      expect(result.scaledIngredients).toHaveLength(2);
      expect(result.scaledIngredients[0]?.scaledQuantity).toBe(400);
      expect(result.scaledIngredients[1]?.scaledQuantity).toBe(4);
    });

    it("preserves optional flag", () => {
      const result = scaleIngredients(mockIngredients, 2, 4);
      expect(result.scaledIngredients[1]?.isOptional).toBe(true);
    });

    it("preserves notes", () => {
      const result = scaleIngredients(mockIngredients, 2, 4);
      expect(result.scaledIngredients[0]?.notes).toHaveLength(1);
      expect(result.scaledIngredients[0]?.notes[0]?.note).toBe("diced");
    });

    it("calculates difference", () => {
      const result = scaleIngredients(mockIngredients, 2, 4);
      expect(result.scaledIngredients[0]?.quantityDifference).toBe(200);
      expect(result.scaledIngredients[1]?.quantityDifference).toBe(2);
    });
  });

  describe("scaleCookingTime", () => {
    it("doubles cooking time", () => {
      expect(scaleCookingTime(30, 2, 4)).toBe(60);
    });

    it("halves cooking time", () => {
      expect(scaleCookingTime(60, 4, 2)).toBe(30);
    });

    it("rounds to integer", () => {
      expect(scaleCookingTime(45, 3, 2)).toBe(30);
    });
  });
});
