"use client";

import { getDirection } from "@/lib/i18n/config";
import { useLocale } from "next-intl";

export function useDirection(): "ltr" | "rtl" {
  const locale = useLocale();
  return getDirection(locale as "en" | "fa");
}
