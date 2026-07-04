import { describe, expect, it } from "vitest";
import {
  createCategorySchema,
  createFoodSchema,
  createIngredientSchema,
  createTagSchema,
  nutritionValuesSchema,
  searchSchema,
} from "../validation";

describe("Validation", () => {
  describe("createFoodSchema", () => {
    it("validates valid food", () => {
      const result = createFoodSchema.safeParse({
        slug: "chicken-breast",
        translations: [{ locale: "en", name: "Chicken Breast" }],
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid slug", () => {
      const result = createFoodSchema.safeParse({
        slug: "Invalid Slug!",
        translations: [{ locale: "en", name: "Chicken Breast" }],
      });
      expect(result.success).toBe(false);
    });

    it("rejects empty translations", () => {
      const result = createFoodSchema.safeParse({
        slug: "chicken-breast",
        translations: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe("createIngredientSchema", () => {
    it("validates valid ingredient", () => {
      const result = createIngredientSchema.safeParse({
        slug: "egg",
        translations: [{ locale: "en", name: "Egg" }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe("nutritionValuesSchema", () => {
    it("validates valid nutrition values", () => {
      const result = nutritionValuesSchema.safeParse({
        calories: 100,
        protein: 20,
        carbohydrates: 10,
        fat: 5,
        fiber: 2,
        sugar: 3,
        sodium: 100,
        potassium: 200,
        calcium: 50,
        iron: 2,
        magnesium: 30,
        vitaminA: 100,
        vitaminB: 1,
        vitaminC: 10,
        vitaminD: 5,
        vitaminE: 2,
        vitaminK: 10,
        cholesterol: 50,
        caffeine: 0,
        water: 60,
      });
      expect(result.success).toBe(true);
    });

    it("rejects negative values", () => {
      const result = nutritionValuesSchema.safeParse({
        calories: -1,
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
      });
      expect(result.success).toBe(false);
    });
  });

  describe("createCategorySchema", () => {
    it("validates valid category", () => {
      const result = createCategorySchema.safeParse({
        slug: "vegetables",
        translations: [{ locale: "en", name: "Vegetables" }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe("createTagSchema", () => {
    it("validates valid tag", () => {
      const result = createTagSchema.safeParse({
        slug: "high-protein",
        translations: [{ locale: "en", name: "High Protein" }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe("searchSchema", () => {
    it("validates with defaults", () => {
      const result = searchSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it("rejects invalid page", () => {
      const result = searchSchema.safeParse({ page: 0 });
      expect(result.success).toBe(false);
    });

    it("rejects limit over 100", () => {
      const result = searchSchema.safeParse({ limit: 101 });
      expect(result.success).toBe(false);
    });
  });
});
