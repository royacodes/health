import { Button, Container, Heading, Html, Text } from "@react-email/components";

interface VerificationEmailProps {
  name: string;
  url: string;
  locale?: string;
}

export function VerificationEmail({ name, url, locale = "en" }: VerificationEmailProps) {
  const isFa = locale === "fa";

  return (
    <Html lang={locale} dir={isFa ? "rtl" : "ltr"}>
      <Container>
        <Heading>{isFa ? "تأیید ایمیل" : "Verify Your Email"}</Heading>
        <Text>{isFa ? `سلام ${name},` : `Hi ${name},`}</Text>
        <Text>
          {isFa
            ? "لطفاً ایمیل خود را با کلیک روی دکمه زیر تأیید کنید:"
            : "Please verify your email by clicking the button below:"}
        </Text>
        <Button href={url} style={{ background: "#16a34a", color: "#fff", padding: "12px 24px" }}>
          {isFa ? "تأیید ایمیل" : "Verify Email"}
        </Button>
        <Text>
          {isFa
            ? "اگر این درخواست را شما ارسال نکرده‌اید، این ایمیل را نادیده بگیرید."
            : "If you didn't request this, you can safely ignore this email."}
        </Text>
      </Container>
    </Html>
  );
}

export default VerificationEmail;
