import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Database,
  FileCode,
  Layers,
  Palette,
  PenSquare,
  Plug,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CaseStudyMedia } from "@/components/sections/case-study-media";
import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";
import { caseStudies } from "@/content/projects/case-studies";
import { projects } from "@/content/projects";
import { projectMedia, type Shot } from "@/content/projects/media";
import type { Locale } from "@/i18n/routing";

// TODO: íconos de marca de cada tecnología; por ahora un ícono genérico por tipo.
const stackIcons: Record<string, LucideIcon> = {
  "Next.js": Layers,
  TypeScript: FileCode,
  "Tailwind CSS": Palette,
  Supabase: Database,
  "Open Library API": Plug,
  "Gemini API": Sparkles,
  WordPress: PenSquare,
  Elementor: Layers,
  "Yoast SEO": Search,
};

const SECONDARY_IMAGES = 6;

type Props = { slug: string; locale: Locale };

// Captura que llena su marco (el marco da la proporción).
function Screenshot({ shot, locale, sizes, priority, className, main }: { shot: Shot; locale: Locale; sizes: string; priority?: boolean; className: string; main?: boolean }) {
  return (
    <div data-main-media={main || undefined} className={`relative overflow-hidden ${className}`}>
      <Image src={shot.src} alt={shot.alt[locale]} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}

// Marcador de media pendiente (proyectos sin capturas todavía).
function Placeholder({ label, className }: { label: string; className: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center ${className}`}>
      <span className="text-label text-muted">{label}</span>
    </div>
  );
}

export async function CaseStudy({ slug, locale }: Props) {
  const t = await getTranslations("caseStudy");
  const tp = await getTranslations("projects");
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const copy = caseStudies[slug][locale];
  const media = projectMedia[slug];
  const name = tp(`items.${slug}.name`);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const linkClass = "inline-flex items-center gap-gap-sm underline underline-offset-4 hover:text-pop";
  const blocks = [
    { id: "problem", title: t("problem"), body: <p>{copy.problem}</p> },
    { id: "role", title: t("myRole"), body: <p>{copy.myRole}</p> },
    {
      id: "decisions",
      title: t("decisions"),
      body: (
        <ul className="flex flex-col gap-gap">
          {copy.decisions.map((decision) => (
            <li key={decision}>{decision}</li>
          ))}
        </ul>
      ),
    },
    { id: "result", title: t("result"), body: <p>{copy.result}</p> },
  ];

  return (
    <article className="flex flex-col gap-section">
      {/* Media principal: sin animación de entrada; imagen con prioridad para el LCP. */}
      {media ? (
        <Screenshot
          shot={media.hero}
          locale={locale}
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
          main
          className="aspect-[4/5] bg-surface md:aspect-video"
        />
      ) : (
        <div data-main-media>
          <Placeholder label={t("placeholder")} className="aspect-[4/5] bg-surface md:aspect-video" />
        </div>
      )}

      <header className="grid gap-gap md:grid-cols-12">
        <div className="flex max-w-measure flex-col gap-gap md:col-span-5">
          <h1 className="text-heading text-text">{name}</h1>
          {project.concept && (
            <span className="text-label text-on-accent-soft w-fit rounded-full border border-border bg-accent-soft px-gap-sm py-1">
              {t("concept")}
            </span>
          )}
          <p className="text-body-lg text-text">{copy.description}</p>
          <p className="text-small text-text">
            <span className="text-muted">{t("roleLabel")}: </span>
            {copy.role}
          </p>
          <div className="text-small flex flex-wrap items-center gap-gap">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {t("liveDemo")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only">
                : {name} ({t("newTab")})
              </span>
            </a>
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t("repo")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">
                  : {name} ({t("newTab")})
                </span>
              </a>
            )}
          </div>
        </div>
        {/* Bucle de al menos 6 imágenes; 10% menos alta que el 4:5 anterior (8:9). */}
        <CaseStudyMedia
          count={SECONDARY_IMAGES}
          images={media?.carousel.map((shot) => ({ src: shot.src, alt: shot.alt[locale], width: shot.width, height: shot.height }))}
          label={t("secondaryMedia")}
          placeholder={t("placeholder")}
          pause={t("pause")}
          play={t("play")}
        />
      </header>

      <div className="flex flex-col gap-section">
        {blocks.map((block, i) => (
          <div key={block.id} className="flex flex-col gap-section">
            <Reveal>
              <section aria-labelledby={`cs-${block.id}`} className="grid gap-gap md:grid-cols-12">
                <h2 id={`cs-${block.id}`} className="text-title text-text md:col-span-4">
                  {block.title}
                </h2>
                <div className="text-body text-text md:col-span-8">{block.body}</div>
              </section>
            </Reveal>
            {/* Media a todo el ancho entre bloques (capturas de escritorio sobre gingham). */}
            {i === 2 && (
              <Reveal>
                <div className="pattern-gingham p-gap md:p-section">
                  {media ? (
                    // Imagen completa del home: se recorre dentro del marco (altura máxima) sin recortarla.
                    <div
                      role="region"
                      tabIndex={0}
                      aria-label={t("fullPage")}
                      className="max-h-[80svh] overflow-y-auto bg-surface focus-visible:outline-2 focus-visible:outline-pop"
                    >
                      <Image
                        src={media.wide.src}
                        alt={media.wide.alt[locale]}
                        width={media.wide.width}
                        height={media.wide.height}
                        sizes="(min-width: 1280px) 1100px, 100vw"
                        className="h-auto w-full"
                      />
                    </div>
                  ) : (
                    <Placeholder label={t("placeholder")} className="aspect-video bg-surface" />
                  )}
                </div>
              </Reveal>
            )}
          </div>
        ))}
      </div>

      <Reveal>
        <section aria-labelledby="cs-stack" className="flex flex-col gap-gap">
          <h2 id="cs-stack" className="text-title text-text">
            {t("stack")}
          </h2>
          <ul className="grid grid-cols-3 border-t border-l border-border md:grid-cols-6">
            {project.stack.map((tech) => {
              const Icon = stackIcons[tech] ?? Layers;
              return (
                <li
                  key={tech}
                  className="text-small flex flex-col items-center gap-gap-sm border-r border-b border-border p-gap text-center"
                >
                  <Icon className="size-6" aria-hidden="true" />
                  {tech}
                </li>
              );
            })}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section
          aria-label={t("mobileScreens")}
          className="rounded-md bg-accent p-gap py-section dark:bg-surface md:px-section"
        >
          <ul className="flex items-start gap-gap overflow-x-auto [&>li:first-child]:ml-auto [&>li:last-child]:mr-auto">
            {(media?.mobile ?? [null, null, null, null]).map((shot, n) => (
              <li key={shot?.src ?? n} className="w-48 shrink-0">
                {shot ? (
                  // Completa y con su propia altura: sin recorte ni zoom.
                  <Image
                    src={shot.src}
                    alt={shot.alt[locale]}
                    width={shot.width}
                    height={shot.height}
                    sizes="192px"
                    className="h-auto w-full rounded-sm"
                  />
                ) : (
                  <Placeholder label={t("placeholder")} className="aspect-[9/19] rounded-sm bg-bg" />
                )}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <nav aria-label={t("pagination")} className="text-small flex items-center justify-between gap-gap">
        <Link href={`/projects/${prev.slug}`} className={linkClass}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("previous")}
          <span className="sr-only">: {tp(`items.${prev.slug}.name`)}</span>
        </Link>
        <Link href={`/projects/${next.slug}`} className={linkClass}>
          {t("next")}
          <ArrowRight className="size-4" aria-hidden="true" />
          <span className="sr-only">: {tp(`items.${next.slug}.name`)}</span>
        </Link>
      </nav>
    </article>
  );
}
