import { Button, Container, Heading, Html, Text } from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  locale?: string;
}

export function WelcomeEmail({ name, locale = "en" }: WelcomeEmailProps) {
  const isFa = locale === "fa";

  return (
    <Html lang={locale} dir={isFa ? "rtl" : "ltr"}>
      <Container>
        <Heading>{isFa ? "خوش آمدید!" : "Welcome!"}</Heading>
        <Text>{isFa ? `سلام ${name},` : `Hi ${name},`}</Text>
        <Text>
          {isFa
            ? "از پیوستن شما به پلتفرم غذای سالم خوشحالیم!"
            : "Thank you for joining Healthy Recipe Platform!"}
        </Text>
        <Button
          href={isFa ? "https://foodbyroy.ir" : "https://foodbyroy.com"}
          style={{ background: "#16a34a", color: "#fff", padding: "12px 24px" }}
        >
          {isFa ? "شروع کنید" : "Get Started"}
        </Button>
      </Container>
    </Html>
  );
}

export default WelcomeEmail;
