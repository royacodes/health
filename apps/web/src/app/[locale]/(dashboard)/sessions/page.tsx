import { setRequestLocale } from "next-intl/server";
import { SessionsClient } from "./sessions-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SessionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SessionsClient />;
}
