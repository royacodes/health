export type Locale = "en" | "fa";

export const SUPPORTED_LOCALES: Locale[] = ["en", "fa"];
export const DEFAULT_LOCALE: Locale = "en";

export function getLocalizedField<T extends { locale: string }>(
  translations: T[],
  locale: Locale,
  field: keyof Omit<T, "locale">,
): string {
  const translation = translations.find((t) => t.locale === locale);
  if (translation) {
    const value = translation[field];
    return typeof value === "string" ? value : "";
  }

  const fallback = translations.find((t) => t.locale === DEFAULT_LOCALE);
  if (fallback) {
    const value = fallback[field];
    return typeof value === "string" ? value : "";
  }

  return "";
}

export function getLocalizedName(
  translations: { locale: string; name: string }[],
  locale: Locale,
): string {
  return getLocalizedField(translations, locale, "name");
}

export function getLocalizedDescription(
  translations: { locale: string; description: string }[],
  locale: Locale,
): string {
  return getLocalizedField(translations, locale, "description");
}

export function getSearchAliases(
  translations: { locale: string; searchAliases: string[] }[],
  locale: Locale,
): string[] {
  const translation = translations.find((t) => t.locale === locale);
  if (translation) return translation.searchAliases;

  const fallback = translations.find((t) => t.locale === DEFAULT_LOCALE);
  return fallback?.searchAliases ?? [];
}

export function addTranslation<T extends { locale: string }>(
  existing: T[],
  newTranslation: T,
): T[] {
  const index = existing.findIndex((t) => t.locale === newTranslation.locale);
  if (index >= 0) {
    const updated = [...existing];
    updated[index] = newTranslation;
    return updated;
  }
  return [...existing, newTranslation];
}

export function hasTranslation(translations: { locale: string }[], locale: Locale): boolean {
  return translations.some((t) => t.locale === locale);
}
