import { describe, expect, it } from "vitest";
import {
  createCollectionSchema,
  createRecipeIngredientSchema,
  createRecipeSchema,
  createRecipeStepSchema,
  ratingSchema,
  recipeSearchSchema,
  reviewSchema,
} from "../validation";

describe("Recipe Validation", () => {
  describe("createRecipeSchema", () => {
    it("validates valid recipe", () => {
      const result = createRecipeSchema.safeParse({
        slug: "grilled-chicken",
        translations: [{ locale: "en", title: "Grilled Chicken" }],
        authorId: "user-123",
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid slug", () => {
      const result = createRecipeSchema.safeParse({
        slug: "Invalid Recipe!",
        translations: [{ locale: "en", title: "Test" }],
        authorId: "user-123",
      });
      expect(result.success).toBe(false);
    });

    it("rejects empty translations", () => {
      const result = createRecipeSchema.safeParse({
        slug: "test",
        translations: [],
        authorId: "user-123",
      });
      expect(result.success).toBe(false);
    });

    it("rejects missing authorId", () => {
      const result = createRecipeSchema.safeParse({
        slug: "test",
        translations: [{ locale: "en", title: "Test" }],
      });
      expect(result.success).toBe(false);
    });

    it("uses defaults for optional fields", () => {
      const result = createRecipeSchema.safeParse({
        slug: "test",
        translations: [{ locale: "en", title: "Test" }],
        authorId: "user-123",
      });
      if (result.success) {
        expect(result.data.difficulty).toBe("easy");
        expect(result.data.servings).toBe(4);
        expect(result.data.visibility).toBe("public");
      }
    });
  });

  describe("createRecipeIngredientSchema", () => {
    it("validates valid ingredient", () => {
      const result = createRecipeIngredientSchema.safeParse({
        ingredientId: "chicken-123",
        quantity: 200,
        unitId: "g",
      });
      expect(result.success).toBe(true);
    });

    it("rejects zero quantity", () => {
      const result = createRecipeIngredientSchema.safeParse({
        ingredientId: "chicken-123",
        quantity: 0,
        unitId: "g",
      });
      expect(result.success).toBe(false);
    });

    it("rejects negative quantity", () => {
      const result = createRecipeIngredientSchema.safeParse({
        ingredientId: "chicken-123",
        quantity: -100,
        unitId: "g",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("createRecipeStepSchema", () => {
    it("validates valid step", () => {
      const result = createRecipeStepSchema.safeParse({
        order: 0,
        translations: [{ locale: "en", title: "Prep", description: "Cut the chicken" }],
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty translations", () => {
      const result = createRecipeStepSchema.safeParse({
        order: 0,
        translations: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe("createCollectionSchema", () => {
    it("validates valid collection", () => {
      const result = createCollectionSchema.safeParse({
        translations: [{ locale: "en", name: "My Favorites" }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe("ratingSchema", () => {
    it("validates 1-5 rating", () => {
      expect(ratingSchema.safeParse({ rating: 3 }).success).toBe(true);
      expect(ratingSchema.safeParse({ rating: 0 }).success).toBe(false);
      expect(ratingSchema.safeParse({ rating: 6 }).success).toBe(false);
    });
  });

  describe("reviewSchema", () => {
    it("validates valid review", () => {
      const result = reviewSchema.safeParse({ content: "Great recipe!" });
      expect(result.success).toBe(true);
    });

    it("rejects empty content", () => {
      const result = reviewSchema.safeParse({ content: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("recipeSearchSchema", () => {
    it("validates with defaults", () => {
      const result = recipeSearchSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
        expect(result.data.sortBy).toBe("createdAt");
      }
    });

    it("rejects invalid page", () => {
      const result = recipeSearchSchema.safeParse({ page: 0 });
      expect(result.success).toBe(false);
    });
  });
});
