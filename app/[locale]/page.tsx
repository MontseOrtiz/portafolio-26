import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Footer } from "@/components/sections/footer";
import { Tools } from "@/components/sections/tools";
import { HeroMediaLoader } from "@/components/sections/hero-media-loader";
// import { Projects } from "@/components/sections/projects";
// import { Contact } from "@/components/sections/contact";
// import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />

      {/* #work: todos los proyectos, uno tras otro, al hacer scroll. "Work" y "Selected work" llegan aquí. */}
      <section id="work" className="mt-gap">
        <HeroMediaLoader />
      </section>

      <div className="mt-gap">
        <Intro />
      </div>

      <div className="mt-gap">
        <Tools />
      </div>

      {/* <Projects /> */}
      <div id="about" className="scroll-mt-24" />
      {/* <div className="mt-gap">
        <Contact locale={locale as Locale} />
      </div> */}

      <div className="mt-gap">
        <Footer variant="home" />
      </div>
    </>
  );
}
