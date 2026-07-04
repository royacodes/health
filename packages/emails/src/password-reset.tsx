import { Button, Container, Heading, Html, Text } from "@react-email/components";

interface PasswordResetProps {
  name: string;
  url: string;
  locale?: string;
}

export function PasswordReset({ name, url, locale = "en" }: PasswordResetProps) {
  const isFa = locale === "fa";

  return (
    <Html lang={locale} dir={isFa ? "rtl" : "ltr"}>
      <Container>
        <Heading>{isFa ? "بازیابی رمز عبور" : "Reset Your Password"}</Heading>
        <Text>{isFa ? `سلام ${name},` : `Hi ${name},`}</Text>
        <Text>
          {isFa
            ? "درخواست بازیابی رمز عبور دریافت کردیم. روی دکمه زیر کلیک کنید:"
            : "We received a request to reset your password. Click the button below:"}
        </Text>
        <Button href={url} style={{ background: "#16a34a", color: "#fff", padding: "12px 24px" }}>
          {isFa ? "بازیابی رمز عبور" : "Reset Password"}
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

export default PasswordReset;
