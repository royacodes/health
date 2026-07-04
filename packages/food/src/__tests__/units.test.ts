import { describe, expect, it } from "vitest";
import {
  convertBetweenUnits,
  convertToGrams,
  convertToMl,
  getUnitType,
  isPieceUnit,
  isVolumeUnit,
  isWeightUnit,
} from "../units/conversion";

describe("Unit Conversion", () => {
  describe("convertToGrams", () => {
    it("converts grams", () => {
      expect(convertToGrams(100, "g", 1)).toBe(100);
    });

    it("converts kilograms", () => {
      expect(convertToGrams(1, "kg", 1000)).toBe(1000);
    });

    it("converts ounces", () => {
      const result = convertToGrams(1, "oz", 28.3495);
      expect(result).toBeCloseTo(28.3495, 2);
    });

    it("converts pounds", () => {
      const result = convertToGrams(1, "lb", 453.592);
      expect(result).toBeCloseTo(453.592, 2);
    });
  });

  describe("convertToMl", () => {
    it("converts milliliters", () => {
      expect(convertToMl(100, "ml", 1)).toBe(100);
    });

    it("converts liters", () => {
      expect(convertToMl(1, "l", 1000)).toBe(1000);
    });

    it("converts cups", () => {
      const result = convertToMl(1, "cup", 236.588);
      expect(result).toBeCloseTo(236.588, 2);
    });

    it("converts tablespoons", () => {
      const result = convertToMl(2, "tbsp", 14.787);
      expect(result).toBeCloseTo(29.574, 2);
    });
  });

  describe("convertBetweenUnits", () => {
    it("converts within weight units", () => {
      const result = convertBetweenUnits(1, "kg", "g", 1000, "g", "g", 1);
      expect(result).toBe(1000);
    });

    it("converts within volume units", () => {
      const result = convertBetweenUnits(1, "l", "ml", 1000, "ml", "ml", 1);
      expect(result).toBe(1000);
    });

    it("throws for incompatible base units", () => {
      expect(() => convertBetweenUnits(1, "kg", "g", 1000, "l", "ml", 1000)).toThrow(
        "Cannot convert between g and ml",
      );
    });
  });

  describe("getUnitType", () => {
    it("returns ml for volume units", () => {
      expect(getUnitType("cup")).toBe("ml");
      expect(getUnitType("l")).toBe("ml");
      expect(getUnitType("tsp")).toBe("ml");
    });

    it("returns g for weight units", () => {
      expect(getUnitType("g")).toBe("g");
      expect(getUnitType("kg")).toBe("g");
      expect(getUnitType("lb")).toBe("g");
    });

    it("returns g for piece units", () => {
      expect(getUnitType("piece")).toBe("g");
      expect(getUnitType("slice")).toBe("g");
    });
  });

  describe("isVolumeUnit", () => {
    it("identifies volume units", () => {
      expect(isVolumeUnit("ml")).toBe(true);
      expect(isVolumeUnit("l")).toBe(true);
      expect(isVolumeUnit("cup")).toBe(true);
      expect(isVolumeUnit("tbsp")).toBe(true);
      expect(isVolumeUnit("g")).toBe(false);
      expect(isVolumeUnit("kg")).toBe(false);
    });
  });

  describe("isWeightUnit", () => {
    it("identifies weight units", () => {
      expect(isWeightUnit("g")).toBe(true);
      expect(isWeightUnit("kg")).toBe(true);
      expect(isWeightUnit("oz")).toBe(true);
      expect(isWeightUnit("lb")).toBe(true);
      expect(isWeightUnit("ml")).toBe(false);
      expect(isWeightUnit("cup")).toBe(false);
    });
  });

  describe("isPieceUnit", () => {
    it("identifies piece units", () => {
      expect(isPieceUnit("piece")).toBe(true);
      expect(isPieceUnit("slice")).toBe(true);
      expect(isPieceUnit("bottle")).toBe(true);
      expect(isPieceUnit("can")).toBe(true);
      expect(isPieceUnit("serving")).toBe(true);
      expect(isPieceUnit("g")).toBe(false);
    });
  });
});
