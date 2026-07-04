import { Container, Heading, Html, Text } from "@react-email/components";

interface PasswordChangedProps {
  name: string;
  locale?: string;
}

export function PasswordChanged({ name, locale = "en" }: PasswordChangedProps) {
  const isFa = locale === "fa";

  return (
    <Html lang={locale} dir={isFa ? "rtl" : "ltr"}>
      <Container>
        <Heading>{isFa ? "تغییر رمز عبور" : "Password Changed"}</Heading>
        <Text>{isFa ? `سلام ${name},` : `Hi ${name},`}</Text>
        <Text>
          {isFa
            ? "رمز عبور شما با موفقیت تغییر کرد."
            : "Your password has been successfully changed."}
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

export default PasswordChanged;
