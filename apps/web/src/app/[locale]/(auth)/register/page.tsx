import { setRequestLocale } from "next-intl/server";
import { RegisterPageClient } from "./register-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RegisterPageClient />;
}
