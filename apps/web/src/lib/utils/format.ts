import type { Locale } from "../i18n/config";

const localeMap: Record<Locale, string> = {
  en: "en-US",
  fa: "fa-IR",
};

export function formatDate(
  date: Date | string | number,
  locale: Locale = "en",
  options: Intl.DateTimeFormatOptions = {},
): string {
  const d = new Date(date);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };
  return new Intl.DateTimeFormat(localeMap[locale], defaultOptions).format(d);
}

export function formatRelativeTime(date: Date | string | number, locale: Locale = "en"): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat(localeMap[locale], { numeric: "auto" });

  if (diffSec < 60) return rtf.format(-diffSec, "second");
  if (diffMin < 60) return rtf.format(-diffMin, "minute");
  if (diffHour < 24) return rtf.format(-diffHour, "hour");
  if (diffDay < 30) return rtf.format(-diffDay, "day");
  return formatDate(date, locale);
}

export function formatNumber(
  value: number,
  locale: Locale = "en",
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(localeMap[locale], options).format(value);
}

export function formatCalories(value: number, locale: Locale = "en"): string {
  return `${formatNumber(value, locale, { maximumFractionDigits: 0 })} kcal`;
}

export function formatWeight(
  value: number,
  locale: Locale = "en",
  unit: "g" | "kg" | "oz" | "lb" = "g",
): string {
  return new Intl.NumberFormat(localeMap[locale], {
    style: "unit",
    unit,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNutrition(value: number, unit: string, locale: Locale = "en"): string {
  return `${formatNumber(value, locale, { maximumFractionDigits: 1 })}${unit}`;
}

export function formatPercentage(value: number, locale: Locale = "en"): string {
  return new Intl.NumberFormat(localeMap[locale], {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function formatCompactNumber(value: number, locale: Locale = "en"): string {
  return new Intl.NumberFormat(localeMap[locale], {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}
