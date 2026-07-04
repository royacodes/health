"use client";

import { cn } from "@healthy/ui";
import { useTheme } from "next-themes";

const themes = [
  { id: "light", label: "Light", color: "#fafaf7" },
  { id: "dark", label: "Dark", color: "#141413" },
  { id: "soft", label: "Soft", color: "#f8f6f4" },
  { id: "ocean", label: "Ocean", color: "#f4f7fa" },
  { id: "mint", label: "Mint", color: "#f3f9f6" },
  { id: "lavender", label: "Lavender", color: "#f6f4fa" },
  { id: "sunrise", label: "Sunset", color: "#faf6f0" },
];

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="text-sm font-medium text-fg">Theme</p>
      <div className="flex flex-wrap gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTheme(t.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
              theme === t.id
                ? "bg-primary-subtle text-primary ring-2 ring-primary/30"
                : "bg-muted text-fg-muted hover:bg-muted-subtle hover:text-fg",
            )}
            aria-label={`${t.label} theme`}
          >
            <span
              className="h-4 w-4 rounded-full border border-border-strong"
              style={{ backgroundColor: t.color }}
            />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
