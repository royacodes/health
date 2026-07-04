"use client";

import type { Locale } from "@/lib/i18n/config";
import { useLocale as useNextIntlLocale } from "next-intl";

export function useLocale(): Locale {
  return useNextIntlLocale() as Locale;
}
