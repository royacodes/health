"use client";

import { Card, CardContent } from "@/components/ui/card";
import { track } from "@/lib/analytics";
import { useRouter } from "@/lib/i18n/navigation";
import { Button } from "@healthy/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useState } from "react";

interface OnboardingData {
  language?: string;
  gender?: string;
  birthDate?: string;
  height?: number;
  weight?: number;
  activityLevel?: string;
  goal?: string;
  dietType?: string;
  allergies?: string[];
  measurementSystem?: string;
  [key: string]: unknown;
}

const TOTAL_STEPS = 6;

export function OnboardingClient() {
  const t = useTranslations("auth.onboarding");
  const router = useRouter();
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    language: locale,
    measurementSystem: "metric",
  });

  function updateData(partial: Partial<OnboardingData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      track({ name: "onboarding_completed", properties: data });
      router.push(`/${locale}`);
    }
  }

  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }

  function handleSkip() {
    track({ name: "onboarding_completed", properties: { ...data, skipped: true } });
    router.push(`/${locale}`);
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-fg">{t("title")}</h2>
        <p className="mt-2 text-sm text-fg-muted">{t("subtitle")}</p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={`step-${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              i + 1 <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-fg">{t("step1")}</h3>
              <p className="text-sm text-fg-muted">Choose your preferred language</p>
              <div className="flex gap-3">
                {(["en", "fa"] as const).map((lang) => (
                  <Button
                    key={lang}
                    variant={data.language === lang ? "default" : "outline"}
                    onClick={() => updateData({ language: lang })}
                    className="flex-1"
                  >
                    {lang === "en" ? "English" : "فارسی"}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-fg">{t("step2")}</h3>
              <p className="text-sm text-fg-muted">Tell us about yourself</p>
              <div className="space-y-3">
                <div>
                  <p className="mb-2 text-sm font-medium text-fg">{t("gender")}</p>
                  <div className="flex gap-3">
                    {(["male", "female", "other"] as const).map((g) => (
                      <Button
                        key={g}
                        variant={data.gender === g ? "default" : "outline"}
                        onClick={() => updateData({ gender: g })}
                        className="flex-1"
                      >
                        {g}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-fg">{t("step3")}</h3>
              <p className="text-sm text-fg-muted">What do you want to achieve?</p>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    "lose_weight",
                    "maintain_weight",
                    "gain_weight",
                    "build_muscle",
                    "improve_health",
                  ] as const
                ).map((g) => (
                  <Button
                    key={g}
                    variant={data.goal === g ? "default" : "outline"}
                    onClick={() => updateData({ goal: g })}
                    className="h-auto py-3 text-sm"
                  >
                    {g.replace(/_/g, " ")}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-fg">{t("step4")}</h3>
              <p className="text-sm text-fg-muted">Any dietary preferences?</p>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    "none",
                    "vegetarian",
                    "vegan",
                    "keto",
                    "paleo",
                    "mediterranean",
                    "gluten_free",
                  ] as const
                ).map((d) => (
                  <Button
                    key={d}
                    variant={data.dietType === d ? "default" : "outline"}
                    onClick={() => updateData({ dietType: d })}
                    className="h-auto py-3 text-sm"
                  >
                    {d.replace(/_/g, " ")}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-fg">{t("step5")}</h3>
              <p className="text-sm text-fg-muted">Select any allergies you have</p>
              <div className="grid grid-cols-2 gap-3">
                {(["nuts", "dairy", "gluten", "soy", "eggs", "shellfish", "none"] as const).map(
                  (a) => (
                    <Button
                      key={a}
                      variant={data.allergies?.includes(a) ? "default" : "outline"}
                      onClick={() => {
                        const current = data.allergies || [];
                        if (a === "none") {
                          updateData({ allergies: [] });
                        } else {
                          updateData({
                            allergies: current.includes(a)
                              ? current.filter((x) => x !== a)
                              : [...current, a],
                          });
                        }
                      }}
                      className="h-auto py-3 text-sm"
                    >
                      {a}
                    </Button>
                  ),
                )}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-fg">{t("step6")}</h3>
              <p className="text-sm text-fg-muted">Choose your measurement system</p>
              <div className="flex gap-3">
                {(["metric", "imperial"] as const).map((m) => (
                  <Button
                    key={m}
                    variant={data.measurementSystem === m ? "default" : "outline"}
                    onClick={() => updateData({ measurementSystem: m })}
                    className="flex-1"
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {step > 1 ? (
          <Button variant="ghost" onClick={handlePrevious} className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            {t("previous")}
          </Button>
        ) : (
          <Button variant="ghost" onClick={handleSkip}>
            {t("skip")}
          </Button>
        )}

        <Button onClick={handleNext} className="gap-1">
          {step === TOTAL_STEPS ? t("finish") : t("next")}
          {step < TOTAL_STEPS && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
