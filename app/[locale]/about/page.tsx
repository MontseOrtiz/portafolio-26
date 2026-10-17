import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { About } from "@/components/sections/about";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("name")} — ${t("role")}` };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <About />

      {/* TODO: CV (sección 8, cv.md) y footer de cierre con "Selected work →" (sección 10). */}
      <div id="cv" className="scroll-mt-24" />
      <div id="contact" className="scroll-mt-24" />
    </>
  );
}
