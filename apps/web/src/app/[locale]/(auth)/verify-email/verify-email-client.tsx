"use client";

import { authClient } from "@/lib/auth";
import { Button } from "@healthy/ui";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export function VerifyEmailClient({ token }: { token?: string }) {
  const t = useTranslations("auth.verifyEmail");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify() {
    if (!token) return;
    setLoading(true);
    setError("");

    try {
      await authClient.verifyEmail({
        query: { token },
      });
      setVerified(true);
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  if (verified) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success-subtle">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-fg">{t("title")}</h2>
          <p className="text-sm text-fg-muted">{t("success")}</p>
        </div>
        <Link
          href={`/${locale}/login`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("goToLogin")}
        </Link>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Mail className="h-8 w-8 text-fg-muted" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-fg">{t("title")}</h2>
          <p className="text-sm text-fg-muted">{t("noToken")}</p>
        </div>
        <Link
          href={`/${locale}/login`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("goToLogin")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <Mail className="h-7 w-7 text-fg-muted" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-fg">{t("title")}</h2>
        <p className="mt-2 text-sm text-fg-muted">{t("subtitle")}</p>
      </div>

      {error && (
        <div
          className="rounded-xl bg-danger-subtle p-3.5 text-sm font-medium text-danger"
          role="alert"
        >
          {error}
        </div>
      )}

      <Button onClick={handleVerify} disabled={loading} className="w-full" size="lg">
        {loading ? t("loading") : t("verify")}
      </Button>
    </div>
  );
}
