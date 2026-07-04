"use client";

import { NextIntlClientProvider } from "next-intl";
import { AnalyticsProvider } from "./analytics-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

interface ProvidersProps {
  children: React.ReactNode;
  messages: Record<string, unknown>;
  locale: string;
}

export function Providers({ children, messages, locale }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <AnalyticsProvider>
          <QueryProvider>
            <ToastProvider>{children}</ToastProvider>
          </QueryProvider>
        </AnalyticsProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
