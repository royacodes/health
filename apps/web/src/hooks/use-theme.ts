"use client";

import { useTheme as useNextThemes } from "next-themes";

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextThemes();
  return { theme, setTheme, resolvedTheme, systemTheme };
}
