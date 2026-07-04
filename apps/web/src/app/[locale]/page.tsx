import HomeContent from "./page-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  void locale;
  return <HomeContent />;
}
