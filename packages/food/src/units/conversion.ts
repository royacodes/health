export type BaseUnit = "g" | "ml";

export interface ConversionEntry {
  fromUnit: string;
  toUnit: string;
  factor: number;
}

const VOLUME_TO_ML: Record<string, number> = {
  ml: 1,
  l: 1000,
  tsp: 4.929,
  tbsp: 14.787,
  cup: 236.588,
  fl_oz: 29.574,
  pint: 473.176,
  quart: 946.353,
  gallon: 3785.41,
};

const WEIGHT_TO_G: Record<string, number> = {
  g: 1,
  kg: 1000,
  mg: 0.001,
  oz: 28.3495,
  lb: 453.592,
};

const PIECE_UNITS = new Set(["piece", "slice", "bottle", "can", "serving", "cup", "tbsp", "tsp"]);

export function convertToGrams(amount: number, unitSlug: string, conversionFactor: number): number {
  const slug = unitSlug.toLowerCase();

  if (WEIGHT_TO_G[slug] !== undefined) {
    return amount * WEIGHT_TO_G[slug];
  }

  if (VOLUME_TO_ML[slug] !== undefined) {
    return amount * VOLUME_TO_ML[slug];
  }

  return amount * conversionFactor;
}

export function convertToMl(amount: number, unitSlug: string, conversionFactor: number): number {
  const slug = unitSlug.toLowerCase();

  if (VOLUME_TO_ML[slug] !== undefined) {
    return amount * VOLUME_TO_ML[slug];
  }

  return amount * conversionFactor;
}

export function convertBetweenUnits(
  amount: number,
  fromUnitSlug: string,
  fromBaseUnit: BaseUnit,
  fromConversionFactor: number,
  toUnitSlug: string,
  toBaseUnit: BaseUnit,
  toConversionFactor: number,
): number {
  if (fromBaseUnit !== toBaseUnit) {
    throw new Error(`Cannot convert between ${fromBaseUnit} and ${toBaseUnit}`);
  }

  const baseAmount =
    fromBaseUnit === "g"
      ? convertToGrams(amount, fromUnitSlug, fromConversionFactor)
      : convertToMl(amount, fromUnitSlug, fromConversionFactor);

  return baseAmount / toConversionFactor;
}

export function getUnitType(slug: string): BaseUnit {
  const s = slug.toLowerCase();
  if (VOLUME_TO_ML[s] !== undefined) return "ml";
  return "g";
}

export function isVolumeUnit(slug: string): boolean {
  return VOLUME_TO_ML[slug.toLowerCase()] !== undefined;
}

export function isWeightUnit(slug: string): boolean {
  return WEIGHT_TO_G[slug.toLowerCase()] !== undefined;
}

export function isPieceUnit(slug: string): boolean {
  return PIECE_UNITS.has(slug.toLowerCase());
}

export const STANDARD_UNITS = [
  { slug: "g", name: "Gram", baseUnit: "g" as const, factor: 1, isMetric: true },
  { slug: "kg", name: "Kilogram", baseUnit: "g" as const, factor: 1000, isMetric: true },
  { slug: "mg", name: "Milligram", baseUnit: "g" as const, factor: 0.001, isMetric: true },
  { slug: "oz", name: "Ounce", baseUnit: "g" as const, factor: 28.3495, isMetric: false },
  { slug: "lb", name: "Pound", baseUnit: "g" as const, factor: 453.592, isMetric: false },
  { slug: "ml", name: "Milliliter", baseUnit: "ml" as const, factor: 1, isMetric: true },
  { slug: "l", name: "Liter", baseUnit: "ml" as const, factor: 1000, isMetric: true },
  { slug: "tsp", name: "Teaspoon", baseUnit: "ml" as const, factor: 4.929, isMetric: false },
  { slug: "tbsp", name: "Tablespoon", baseUnit: "ml" as const, factor: 14.787, isMetric: false },
  { slug: "cup", name: "Cup", baseUnit: "ml" as const, factor: 236.588, isMetric: false },
  { slug: "fl_oz", name: "Fluid Ounce", baseUnit: "ml" as const, factor: 29.574, isMetric: false },
  { slug: "piece", name: "Piece", baseUnit: "g" as const, factor: 1, isMetric: true },
  { slug: "slice", name: "Slice", baseUnit: "g" as const, factor: 1, isMetric: true },
  { slug: "bottle", name: "Bottle", baseUnit: "ml" as const, factor: 1, isMetric: true },
  { slug: "can", name: "Can", baseUnit: "ml" as const, factor: 1, isMetric: true },
  { slug: "serving", name: "Serving", baseUnit: "g" as const, factor: 1, isMetric: true },
];
