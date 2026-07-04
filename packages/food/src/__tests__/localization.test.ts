import { describe, expect, it } from "vitest";
import {
  type Locale,
  addTranslation,
  getLocalizedDescription,
  getLocalizedName,
  getSearchAliases,
  hasTranslation,
} from "../localization";

describe("Localization", () => {
  const translations = [
    {
      locale: "en" as Locale,
      name: "Chicken Breast",
      description: "Fresh chicken",
      searchAliases: ["poultry"],
    },
    { locale: "fa" as Locale, name: "سینه مرغ", description: "مرغ تازه", searchAliases: ["مرغ"] },
  ];

  describe("getLocalizedName", () => {
    it("returns name for given locale", () => {
      expect(getLocalizedName(translations, "en")).toBe("Chicken Breast");
      expect(getLocalizedName(translations, "fa")).toBe("سینه مرغ");
    });

    it("falls back to default locale", () => {
      const incomplete = [{ locale: "en" as Locale, name: "Test" }];
      expect(getLocalizedName(incomplete, "fa")).toBe("Test");
    });

    it("returns empty string if no translations", () => {
      expect(getLocalizedName([], "en")).toBe("");
    });
  });

  describe("getLocalizedDescription", () => {
    it("returns description for given locale", () => {
      expect(getLocalizedDescription(translations, "en")).toBe("Fresh chicken");
      expect(getLocalizedDescription(translations, "fa")).toBe("مرغ تازه");
    });
  });

  describe("getSearchAliases", () => {
    it("returns aliases for given locale", () => {
      expect(getSearchAliases(translations, "en")).toEqual(["poultry"]);
      expect(getSearchAliases(translations, "fa")).toEqual(["مرغ"]);
    });

    it("falls back to default locale", () => {
      expect(getSearchAliases(translations, "en")).toEqual(["poultry"]);
    });
  });

  describe("addTranslation", () => {
    it("adds new translation", () => {
      const existing = [
        { locale: "en" as Locale, name: "Test", description: "", searchAliases: [] },
      ];
      const result = addTranslation(existing, {
        locale: "fa" as Locale,
        name: "تست",
        description: "",
        searchAliases: [],
      });
      expect(result).toHaveLength(2);
    });

    it("updates existing translation", () => {
      const existing = [
        { locale: "en" as Locale, name: "Old", description: "", searchAliases: [] },
      ];
      const result = addTranslation(existing, {
        locale: "en" as Locale,
        name: "New",
        description: "",
        searchAliases: [],
      });
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe("New");
    });
  });

  describe("hasTranslation", () => {
    it("returns true if translation exists", () => {
      expect(hasTranslation(translations, "en")).toBe(true);
      expect(hasTranslation(translations, "fa")).toBe(true);
    });

    it("returns false if translation missing", () => {
      const emptyTranslations: { locale: Locale; name: string }[] = [];
      expect(hasTranslation(emptyTranslations, "en")).toBe(false);
    });
  });
});
