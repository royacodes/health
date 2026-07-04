"use client";

import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "next-intl";
import { getMessages } from "next-intl/server";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={getMessages()}>
      {children}
    </NextIntlClientProvider>
  );
}
