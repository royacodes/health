"use client";

import { Input } from "@/components/ui/input";
import { useTelegram } from "@/hooks";
import { track } from "@/lib/analytics";
import { signIn } from "@/lib/auth";
import { Button } from "@healthy/ui";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export function LoginPageClient() {
  const t = useTranslations("auth.login");
  const locale = useLocale();
  const { isTelegram } = useTelegram();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: `/${locale}`,
      });

      if (result.error) {
        setError(t("error"));
        return;
      }

      track({ name: "user_logged_in", properties: { method: "email" } });
      window.location.href = `/${locale}`;
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: `/${locale}`,
      });
    } catch {
      setError(t("error"));
    }
  }

  async function handleTelegramLogin() {
    try {
      const result = await signIn.social({
        provider: "telegram",
        callbackURL: `/${locale}`,
      });
      if (result.error) {
        setError(t("error"));
        return;
      }
      track({ name: "user_logged_in", properties: { method: "telegram" } });
    } catch {
      setError(t("error"));
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
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

        <Input
          id="password"
          type="password"
          label={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-end">
          <Link
            href={`/${locale}/forgot-password`}
            className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? t("loading") : t("submit")}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-subtle" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface px-3 text-fg-muted font-medium">or</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.05z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={handleTelegramLogin}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
              fill="#0088cc"
            />
          </svg>
          {isTelegram ? "Continue with Telegram" : "Continue with Telegram"}
        </Button>
      </div>

      <p className="text-center text-sm text-fg-muted">
        {t("noAccount")}{" "}
        <Link
          href={`/${locale}/register`}
          className="font-medium text-primary hover:text-primary-hover transition-colors"
        >
          {t("signUp")}
        </Link>
      </p>
    </div>
  );
}
