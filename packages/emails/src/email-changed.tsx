import { Container, Heading, Html, Text } from "@react-email/components";

interface EmailChangedProps {
  name: string;
  newEmail: string;
  locale?: string;
}

export function EmailChanged({ name, newEmail, locale = "en" }: EmailChangedProps) {
  const isFa = locale === "fa";

  return (
    <Html lang={locale} dir={isFa ? "rtl" : "ltr"}>
      <Container>
        <Heading>{isFa ? "تغییر ایمیل" : "Email Changed"}</Heading>
        <Text>{isFa ? `سلام ${name},` : `Hi ${name},`}</Text>
        <Text>
          {isFa
            ? `ایمیل شما به ${newEmail} تغییر کرد.`
            : `Your email has been changed to ${newEmail}.`}
        </Text>
        <Text>
          {isFa
            ? "اگر این تغییر را شما انجام نداده‌اید، فوراً با ما تماس بگیرید."
            : "If you didn't make this change, please contact us immediately."}
        </Text>
      </Container>
    </Html>
  );
}

export default EmailChanged;
