import { setRequestLocale } from "next-intl/server";
import { VerifyEmailClient } from "./verify-email-client";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { token } = await searchParams;
  setRequestLocale(locale);
  return <VerifyEmailClient token={token} />;
}
