import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseStudy } from "@/components/sections/case-study";
import { routing, type Locale } from "@/i18n/routing";
import { caseStudies } from "@/content/projects/case-studies";
import { projects } from "@/content/projects";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!caseStudies[slug]) return {};
  const tp = await getTranslations({ locale, namespace: "projects" });
  return {
    title: tp(`items.${slug}.name`),
    description: caseStudies[slug][locale as Locale].description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!caseStudies[slug]) notFound();
  setRequestLocale(locale);

  return <CaseStudy slug={slug} locale={locale as Locale} />;
}
