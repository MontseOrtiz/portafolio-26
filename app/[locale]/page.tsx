import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />

      <div id="projects" className="scroll-mt-24" />
      <div id="about" className="scroll-mt-24" />
      <div id="contact" className="scroll-mt-24" />
    </>
  );
}
