import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { About } from "@/components/sections/about";
import { Cv } from "@/components/sections/cv";
import type { Locale } from "@/i18n/routing";

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
      <div className="print:hidden">
        <About />
      </div>

      <Cv locale={locale as Locale} />

      {/* TODO: footer de cierre con "Selected work →" (sección 10, footer.md). */}
      <div id="contact" className="scroll-mt-24 print:hidden" />
    </>
  );
}
