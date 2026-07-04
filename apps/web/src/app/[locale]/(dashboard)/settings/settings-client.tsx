"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useTranslations } from "next-intl";

export function SettingsClient() {
  const t = useTranslations("settings");

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold tracking-tight text-fg">{t("title")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("appearance")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
