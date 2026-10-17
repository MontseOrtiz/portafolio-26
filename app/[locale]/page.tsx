import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Projects } from "@/components/sections/projects";
import { HeroMediaLoader } from "@/components/sections/hero-media-loader";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />

      <div className="mt-gap">
        <HeroMediaLoader />
      </div>

      <div className="mt-gap">
        <Intro />
      </div>

      <Projects />
      <div id="about" className="scroll-mt-24" />
      <div id="contact" className="scroll-mt-24" />
    </>
  );
}
