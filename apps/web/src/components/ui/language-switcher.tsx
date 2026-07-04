"use client";

import { type Locale, localeNames, locales } from "@/lib/i18n/config";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { cn } from "@healthy/ui";
import { useLocale } from "next-intl";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="text-sm font-medium text-fg">Language</p>
      <div className="flex gap-2">
        {locales.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              locale === loc
                ? "bg-primary-subtle text-primary ring-2 ring-primary/30"
                : "bg-muted text-fg-muted hover:bg-muted-subtle hover:text-fg",
            )}
          >
            {localeNames[loc]}
          </button>
        ))}
      </div>
    </div>
  );
}
