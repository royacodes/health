"use client";

import { getDirection } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { useEffect } from "react";

export function HtmlAttributes({ locale }: { locale: string }) {
  useEffect(() => {
    const dir = getDirection(locale as Locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  return null;
}
