import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// Imagen del collage: sube al frente y se endereza al pasar el cursor (solo con puntero).

// TODO: bio final y 1–2 imágenes más (captura de una app, pizarrón o libros) en la fase 6.
export async function About() {
  const t = await getTranslations("about");
  const bio = t.raw("bio") as string[];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="grid gap-section rounded-md border border-border bg-bg px-gutter py-section md:grid-cols-12 md:gap-gap md:py-section-lg"
    >
      <div className="flex max-w-measure flex-col gap-gap md:col-span-7">
        <Reveal>
          <h1 id="about-title" className="text-body font-medium text-text">
            {t("name")} ({t("role")})
          </h1>
        </Reveal>
        <Reveal className="flex flex-col gap-4">
          {bio.map((paragraph) => (
            <p key={paragraph} className="text-body text-text">
              {paragraph}
            </p>
          ))}
        </Reveal>
        <Reveal className="flex flex-wrap items-center gap-gap-sm">
          {/* text-label va en un span: tailwind-merge lo confundiría con un color y quitaría on-accent. */}
          <Link href="/#contact" className={buttonVariants()}>
            <span className="text-label">{t("contact")}</span>
          </Link>
          <a
            href="#cv"
            className={cn(buttonVariants({ variant: "outline" }), "hover:border-pop hover:bg-bg hover:text-pop")}
          >
            <span className="text-label">{t("cv")}</span>
          </a>
        </Reveal>
      </div>

      {/* Collage: imágenes encimadas con tilt-sm (+) y tilt-md (−); entran una tras otra con stagger. */}
      <div role="group" aria-label={t("collage")} className="relative mx-auto aspect-[4/5] w-full max-w-72 md:col-span-5 md:max-w-none">
        <Reveal className="absolute inset-x-0 top-0 h-1/2 md:inset-x-4" delay={200}>
          <div aria-hidden="true" className="pattern-gingham size-full rotate-(--rotate-tilt-md)" />
        </Reveal>
        <Reveal className="absolute top-8 right-0 z-10 w-3/4 md:top-12">
          <div className="rotate-(--rotate-tilt-sm) bg-surface p-gap-sm shadow-photo transition-[rotate] duration-(--duration) ease-token hover:z-30 hover:rotate-0">
            <Image
              src="/images/about/about-avatar-laptop.webp"
              alt={t("avatarAlt")}
              width={3626}
              height={2631}
              sizes="(min-width: 768px) 400px, 240px"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
