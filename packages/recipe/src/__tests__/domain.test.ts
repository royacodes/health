import { describe, expect, it } from "vitest";
import type { CreateRecipeInput, RecipeImage, RecipeTranslation } from "../domain/recipe";
import type { CreateRecipeStepInput } from "../domain/recipe-step";

describe("Recipe Domain", () => {
  describe("Recipe Translation", () => {
    it("can create translation", () => {
      const translation: RecipeTranslation = {
        locale: "en",
        title: "Grilled Chicken",
        description: "A delicious grilled chicken recipe",
        summary: "Quick and healthy",
        seoTitle: "Grilled Chicken Recipe",
        seoDescription: "Learn how to make grilled chicken",
        searchAliases: ["chicken", "grill"],
      };
      expect(translation.title).toBe("Grilled Chicken");
      expect(translation.locale).toBe("en");
    });
  });

  describe("Recipe Image", () => {
    it("can create image", () => {
      const image: RecipeImage = {
        url: "https://example.com/chicken.jpg",
        alt: "Grilled chicken",
        width: 800,
        height: 600,
        isPrimary: true,
      };
      expect(image.isPrimary).toBe(true);
    });
  });

  describe("CreateRecipeInput", () => {
    it("can create recipe input", () => {
      const input: CreateRecipeInput = {
        slug: "grilled-chicken",
        translations: [
          {
            locale: "en",
            title: "Grilled Chicken",
            description: "Delicious",
            summary: "Quick",
            seoTitle: "Chicken",
            seoDescription: "Recipe",
            searchAliases: [],
          },
        ],
        authorId: "user-123",
      };
      expect(input.slug).toBe("grilled-chicken");
      expect(input.authorId).toBe("user-123");
    });
  });

  describe("Recipe Step", () => {
    it("can create step with timer", () => {
      const step: CreateRecipeStepInput = {
        order: 0,
        translations: [
          { locale: "en", title: "Prep", description: "Cut chicken", tips: "Use sharp knife" },
        ],
        timerMinutes: 10,
      };
      expect(step.timerMinutes).toBe(10);
      expect(step.order).toBe(0);
    });

    it("can create step with image", () => {
      const step: CreateRecipeStepInput = {
        order: 1,
        translations: [
          { locale: "en", title: "Cook", description: "Grill for 15 minutes", tips: "" },
        ],
        image: {
          url: "https://example.com/step1.jpg",
          alt: "Cooking step",
          width: 800,
          height: 600,
        },
      };
      expect(step.image).toBeDefined();
      expect(step.image?.url).toContain("step1.jpg");
    });
  });

  describe("Recipe Difficulty", () => {
    it("supports all difficulty levels", () => {
      const difficulties = ["easy", "medium", "hard", "expert"] as const;
      for (const d of difficulties) {
        expect(["easy", "medium", "hard", "expert"]).toContain(d);
      }
    });
  });

  describe("Recipe Visibility", () => {
    it("supports all visibility levels", () => {
      const visibilities = ["public", "private", "unlisted", "premium"] as const;
      for (const v of visibilities) {
        expect(["public", "private", "unlisted", "premium"]).toContain(v);
      }
    });
  });
});
