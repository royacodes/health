"use client";

import { useTranslations } from "next-intl";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors.server");

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-danger-subtle text-danger">
        <span className="text-4xl font-bold">!</span>
      </div>
      <h1 className="mb-2 text-2xl font-bold text-fg">{t("title")}</h1>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-fg-muted">{t("description")}</p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-on-primary shadow-sm transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.97]"
      >
        {t("retry")}
      </button>
    </main>
  );
}
