export interface ServingTranslation {
  locale: string;
  name: string;
}

export interface ServingUnit {
  id: string;
  slug: string;
  translations: ServingTranslation[];
  baseUnit: "g" | "ml";
  conversionFactor: number;
  isMetric: boolean;
  icon?: string;
  createdAt: Date;
}

export interface FoodServing {
  id: string;
  foodId: string;
  unitId: string;
  amount: number;
  weightInGrams: number;
  isDefault: boolean;
  createdAt: Date;
}

export interface CreateServingUnitInput {
  slug: string;
  translations: ServingTranslation[];
  baseUnit: "g" | "ml";
  conversionFactor: number;
  isMetric?: boolean;
  icon?: string;
}

export interface CreateFoodServingInput {
  foodId: string;
  unitId: string;
  amount: number;
  weightInGrams: number;
  isDefault?: boolean;
}
