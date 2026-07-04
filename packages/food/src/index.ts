/* Domain */
export type {
  Food,
  FoodStatus,
  FoodVisibility,
  FoodTranslation,
  FoodImage,
  CreateFoodInput,
  UpdateFoodInput,
} from "./domain/food";

export type {
  Ingredient,
  IngredientStatus,
  IngredientTranslation,
  CreateIngredientInput,
  UpdateIngredientInput,
} from "./domain/ingredient";

export type {
  NutritionFacts,
  NutritionValues,
  NutritionSource,
} from "./domain/nutrition";

export {
  createEmptyNutritionValues,
  scaleNutrition,
  addNutrition,
} from "./domain/nutrition";

export type {
  Category,
  CategoryTranslation,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./domain/category";

export type {
  Tag,
  TagTranslation,
  CreateTagInput,
} from "./domain/tag";

export type {
  ServingUnit,
  FoodServing,
  ServingTranslation,
  CreateServingUnitInput,
  CreateFoodServingInput,
} from "./domain/serving";

/* Units */
export {
  convertToGrams,
  convertToMl,
  convertBetweenUnits,
  getUnitType,
  isVolumeUnit,
  isWeightUnit,
  isPieceUnit,
  STANDARD_UNITS,
} from "./units/conversion";

export type { BaseUnit } from "./units/conversion";

/* Nutrition Calculator */
export {
  calculateNutrition,
  calculateRecipeNutrition,
  calculatePerServing,
  getDailyValuePercentage,
  DEFAULT_DAILY_VALUES,
  NUTRITION_LABELS,
} from "./nutrition/calculator";

export type { CalculateInput, CalculateResult } from "./nutrition/calculator";

/* Search */
export {
  buildSearchQuery,
  tokenizeSearch,
  fuzzyMatch,
  calculateRelevance,
} from "./search";

export type { SearchFilters, SearchOptions, SearchResult } from "./search";

/* Localization */
export {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  getLocalizedField,
  getLocalizedName,
  getLocalizedDescription,
  getSearchAliases,
  addTranslation,
  hasTranslation,
} from "./localization";

export type { Locale } from "./localization";

/* Validation */
export {
  createFoodSchema,
  updateFoodSchema,
  createIngredientSchema,
  updateIngredientSchema,
  createNutritionSchema,
  createCategorySchema,
  updateCategorySchema,
  createTagSchema,
  createServingUnitSchema,
  calculateNutritionSchema,
  searchSchema,
  localeSchema,
  foodStatusSchema,
  foodVisibilitySchema,
  baseUnitSchema,
  nutritionSourceSchema,
} from "./validation";

export type {
  CreateFoodInput as CreateFoodDTO,
  UpdateFoodInput as UpdateFoodDTO,
  CreateIngredientInput as CreateIngredientDTO,
  CreateNutritionInput as CreateNutritionDTO,
  CreateCategoryInput as CreateCategoryDTO,
  CreateTagInput as CreateTagDTO,
  CreateServingUnitInput as CreateServingUnitDTO,
  SearchInput as SearchDTO,
} from "./validation";
