import type { Locale } from "../i18n/config";
import { defaultLocale, localeNames, locales } from "../i18n/config";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function normalizeLocale(locale: string | undefined): Locale {
  if (!locale) return defaultLocale;
  if (isValidLocale(locale)) return locale;
  return defaultLocale;
}

export function getLocaleName(locale: Locale): string {
  return localeNames[locale];
}

export function getAvailableLocales(): Locale[] {
  return [...locales];
}
