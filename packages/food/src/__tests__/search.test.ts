import { describe, expect, it } from "vitest";
import { buildSearchQuery, calculateRelevance, fuzzyMatch, tokenizeSearch } from "../search";

describe("Search", () => {
  describe("tokenizeSearch", () => {
    it("splits query into tokens", () => {
      expect(tokenizeSearch("chicken breast")).toEqual(["chicken", "breast"]);
    });

    it("filters short tokens", () => {
      expect(tokenizeSearch("a bc def")).toEqual(["bc", "def"]);
    });

    it("lowercases tokens", () => {
      expect(tokenizeSearch("CHICKEN BREAST")).toEqual(["chicken", "breast"]);
    });
  });

  describe("fuzzyMatch", () => {
    it("matches exact", () => {
      expect(fuzzyMatch("chicken breast", "chicken breast")).toBe(true);
    });

    it("matches partial", () => {
      expect(fuzzyMatch("chicken breast", "chicken")).toBe(true);
    });

    it("matches case insensitive", () => {
      expect(fuzzyMatch("Chicken Breast", "chicken")).toBe(true);
    });

    it("matches fuzzy", () => {
      expect(fuzzyMatch("chicken breast", "ckbr")).toBe(true);
    });

    it("does not match completely different", () => {
      expect(fuzzyMatch("chicken breast", "xyz")).toBe(false);
    });
  });

  describe("calculateRelevance", () => {
    it("returns 100 for exact match", () => {
      expect(calculateRelevance("chicken breast", "chicken breast")).toBe(100);
    });

    it("returns 90 for prefix match", () => {
      expect(calculateRelevance("chicken breast", "chicken")).toBe(90);
    });

    it("returns 70 for contains match", () => {
      expect(calculateRelevance("grilled chicken breast", "chicken")).toBe(70);
    });

    it("returns lower score for fuzzy", () => {
      const score = calculateRelevance("chicken breast", "chkn");
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThan(70);
    });

    it("returns 0 for no match", () => {
      expect(calculateRelevance("chicken breast", "xyz")).toBe(0);
    });
  });

  describe("buildSearchQuery", () => {
    it("builds query from filters", () => {
      const query = buildSearchQuery({ query: "chicken", barcode: "12345" });
      expect(query).toBe("chicken 12345");
    });

    it("handles empty query", () => {
      const query = buildSearchQuery({});
      expect(query).toBe("");
    });

    it("trims whitespace", () => {
      const query = buildSearchQuery({ query: "  chicken  " });
      expect(query).toBe("chicken");
    });
  });
});
