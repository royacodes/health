"use client";

import { ArrowRight, Heart, Leaf, Utensils } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function HomeContent() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-subtle px-4 py-1.5 text-sm font-medium text-primary">
          <Leaf className="h-4 w-4" />
          Healthy Living
        </div>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-fg sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>

        <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg-muted">{t("subtitle")}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/register`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-medium text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
          >
            {t("getStarted")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/${locale}/login`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-transparent px-7 text-sm font-medium text-fg transition-all duration-200 hover:bg-muted hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border-subtle bg-surface px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Utensils,
                title: "Track Meals",
                desc: "Log every meal with detailed nutrition breakdowns and smart suggestions.",
              },
              {
                icon: Heart,
                title: "Health Goals",
                desc: "Set personalized goals and track your progress toward a healthier lifestyle.",
              },
              {
                icon: Leaf,
                title: "Clean Eating",
                desc: "Discover recipes that are nutritious, delicious, and easy to prepare.",
              },
            ].map((feature) => (
              <div key={feature.title} className="surface-elevated p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-fg">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
