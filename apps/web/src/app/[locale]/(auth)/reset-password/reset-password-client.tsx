"use client";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth";
import { Button } from "@healthy/ui";
import { ArrowLeft, CheckCircle, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export function ResetPasswordClient({ token }: { token?: string }) {
  const t = useTranslations("auth.resetPassword");
  const locale = useLocale();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError(t("passwordMismatch"));
      setLoading(false);
      return;
    }

    if (!token) {
      setError(t("invalidToken"));
      setLoading(false);
      return;
    }

    try {
      await authClient.resetPassword({
        newPassword: password,
        token,
      });
      setSuccess(true);
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-warning-subtle">
          <Lock className="h-8 w-8 text-warning" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-fg">{t("title")}</h2>
          <p className="text-sm text-fg-muted">{t("invalidToken")}</p>
        </div>
        <Link
          href={`/${locale}/forgot-password`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("requestNewLink")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <Lock className="h-7 w-7 text-fg-muted" />
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
          id="password"
          type="password"
          label={t("newPassword")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />

        <Input
          id="confirmPassword"
          type="password"
          label={t("confirmPassword")}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? t("loading") : t("submit")}
        </Button>
      </form>
    </div>
  );
}
