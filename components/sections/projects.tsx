import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { ProjectsStrip } from "@/components/sections/projects-strip";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { projectMedia } from "@/content/projects/media";
import type { Locale } from "@/i18n/routing";

export async function Projects() {
  const t = await getTranslations("projects");
  const locale = (await getLocale()) as Locale;

  const cards = projects.map((project) => {
    const name = t(`items.${project.slug}.name`);
    const card = projectMedia[project.slug]?.hero;
    return (
      <li
        key={project.slug}
        data-project-card
        className={`w-[85%] shrink-0 snap-start ${project.widthClass} ${project.offsetClass}`}
      >
        <Reveal className="h-full">
          <article className="group relative flex h-full flex-col gap-gap">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              <div data-card-media className="duration-(--duration) ease-token group-hover:scale-hover absolute inset-0 transition-transform">
                {card ? (
                  <Image
                    src={card.src}
                    alt={card.alt[locale]}
                    fill
                    sizes="(min-width: 768px) 480px, 85vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div aria-hidden="true" className="flex size-full items-center justify-center">
                    <span className="text-label text-muted">{t("placeholder")}</span>
                  </div>
                )}
              </div>
              {project.concept && (
                <span className="text-small text-on-accent-soft absolute top-gap left-gap rounded-full border border-border bg-accent-soft px-gap-sm">
                  {t("concept")}
                </span>
              )}
            </div>

            <h3 className="text-title text-text duration-(--duration-fast) ease-token group-hover:text-pop transition-colors">
              {name}
            </h3>
            <p className="text-body text-text">{t(`items.${project.slug}.demonstrates`)}</p>

            <ul aria-label={t("stack")} className="flex flex-wrap gap-gap-sm">
              {project.stack.map((tech) => (
                <li key={tech} className="text-small bg-powder text-on-powder rounded-full px-gap-sm">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="text-small mt-auto flex flex-wrap items-center gap-gap">
              {/* Enlace extendido: el ::after cubre toda la tarjeta. */}
              <Link
                href={`/projects/${project.slug}`}
                className="text-text underline underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:text-pop"
              >
                {t("caseStudy")}
                <span className="sr-only">: {name}</span>
              </Link>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text relative z-10 inline-flex items-center gap-gap-sm underline underline-offset-4 hover:text-pop"
              >
                {t("liveDemo")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">
                  : {name} ({t("newTab")})
                </span>
              </a>
            </div>
          </article>
        </Reveal>
      </li>
    );
  });

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 py-section">
      <ProjectsStrip
        total={projects.length}
        label={t("label")}
        title={t("title")}
        listLabel={t("listLabel")}
        previous={t("previous")}
        next={t("next")}
      >
        {cards}
      </ProjectsStrip>
    </section>
  );
}
