export type Theme = "light" | "dark" | "system";

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove("light", "dark");

  const resolved = theme === "system" ? getSystemTheme() : theme;
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("theme") as Theme) ?? "system";
}

export function setStoredTheme(theme: Theme): void {
  localStorage.setItem("theme", theme);
}
