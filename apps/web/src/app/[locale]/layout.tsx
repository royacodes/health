import { Providers } from "@/providers";
import { getMessages } from "next-intl/server";
import { HtmlAttributes } from "./html-attributes";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <>
      <HtmlAttributes locale={locale} />
      <Providers messages={messages} locale={locale}>
        {children}
      </Providers>
    </>
  );
}
