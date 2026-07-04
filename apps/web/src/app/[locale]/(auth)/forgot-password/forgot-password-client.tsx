"use client";

import { Input } from "@/components/ui/input";
import { type AuthClient, authClient } from "@/lib/auth";
import { Button } from "@healthy/ui";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";

const client = authClient as AuthClient & {
  forgetPassword: (args: { email: string; redirectTo: string }) => Promise<unknown>;
};

export function ForgotPasswordClient() {
  const t = useTranslations("auth.forgotPassword");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await client.forgetPassword({
        email,
        redirectTo: `/${locale}/reset-password`,
      });
      setSent(true);
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success-subtle">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-fg">{t("title")}</h2>
          <p className="text-sm text-fg-muted">{t("sent")}</p>
        </div>
        <Link
          href={`/${locale}/login`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToLogin")}
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div
            className="rounded-xl bg-danger-subtle p-3.5 text-sm font-medium text-danger"
            role="alert"
          >
            {error}
          </div>
        )}

        <Input
          id="email"
          type="email"
          label={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? t("loading") : t("submit")}
        </Button>
      </form>

      <div className="text-center">
        <Link
          href={`/${locale}/login`}
          className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted hover:text-fg transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToLogin")}
        </Link>
      </div>
    </div>
  );
}
