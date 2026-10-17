import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { cv, cvContact, cvUpdated } from "@/content/cv";
import type { CvEntry } from "@/content/cv/types";
import type { Locale } from "@/i18n/routing";

// Las cifras de los logros se resaltan como repeticiones del pizarrón de WOD (color sand).
function highlightFigures(text: string): ReactNode[] {
  return text.split(/(~?\d+(?:[.,/]\d+)*%?)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-sand">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

const rowClass = "grid gap-gap md:grid-cols-10";

function ExternalLink({ href, label, hint }: { href: string; label: string; hint: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-gap-sm underline underline-offset-4 hover:text-pop"
    >
      {label}
      <ArrowUpRight className="size-4" aria-hidden="true" />
      <span className="sr-only">({hint})</span>
    </a>
  );
}

function Entries({ entries }: { entries: CvEntry[] }) {
  return (
    <div className="flex flex-col gap-section">
      {entries.map((entry) => (
        <article key={`${entry.dates}-${entry.title}`} className={rowClass}>
          <div className="flex flex-col gap-gap-sm md:col-span-3">
            <h4 className="text-body font-medium text-text">{entry.title}</h4>
            <p className="text-small text-text">{entry.company}</p>
            <p className="text-small text-muted">{entry.dates}</p>
          </div>
          <ul className="text-small flex flex-col gap-gap-sm text-text md:col-span-7">
            {entry.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-gap-sm">
                <span aria-hidden="true" className="text-pop">
                  →
                </span>
                <span>{highlightFigures(bullet)}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

// Una sección de la hoja: etiqueta | contenido, con divisor de 1px arriba.
function Section({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-gap border-t border-border pt-section md:grid-cols-12"
    >
      <h3 id={id} className="text-label text-muted md:col-span-2">
        {label}
      </h3>
      <div className="md:col-span-10">{children}</div>
    </section>
  );
}

export async function Cv({ locale }: { locale: Locale }) {
  const t = await getTranslations("cv");
  const content = cv[locale];
  const pdf = `/cv/montse-ortiz-cv-${locale}.pdf`;
  const hint = t("newTab");

  const tabs = [
    { locale: "en", label: t("english") },
    { locale: "es", label: t("spanish") },
  ] as const;

  const download = (className: string) => (
    <a href={pdf} download className={className}>
      {t("download")}
      <ArrowDown className="size-4" aria-hidden="true" />
    </a>
  );

  return (
    <section
      id="cv"
      aria-labelledby="cv-title"
      className="mt-gap scroll-mt-24 rounded-md bg-accent px-gutter py-section dark:bg-surface print:mt-0 print:rounded-none print:bg-transparent print:p-0"
    >
      <div className="flex flex-col md:flex-row md:items-start">
        {/* Pestañas de idioma: verticales y pegadas a la hoja en escritorio, horizontales arriba en móvil. */}
        <nav
          aria-label={t("tabs")}
          className="order-first flex gap-gap-sm md:order-last md:flex-col print:hidden"
        >
          {tabs.map((tab) => {
            const active = tab.locale === locale;
            return (
              <Link
                key={tab.locale}
                href="/about#cv"
                locale={tab.locale}
                hrefLang={tab.locale}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-label rounded-t-md px-gap py-gap-sm md:rounded-t-none md:rounded-r-md md:px-gap-sm md:py-gap md:[writing-mode:vertical-rl]",
                  active
                    ? "bg-surface text-text dark:border dark:border-l-0 dark:border-border"
                    : "bg-powder text-on-powder hover:text-pop",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <Reveal className="min-w-0 flex-1">
          <div className="flex flex-col gap-section rounded-b-md bg-surface p-8 text-text md:rounded-l-md md:rounded-br-none md:p-16 dark:border dark:border-border print:p-0">
            <header className="flex flex-col gap-gap">
              <div className="grid gap-gap md:grid-cols-12">
                <h2 id="cv-title" className="text-title text-text md:col-span-5">
                  {content.name}
                </h2>
                <dl className="text-small grid gap-gap md:col-span-7 md:grid-cols-[1fr_1.5fr_1fr]">
                  <div className="flex flex-col gap-gap-sm">
                    <dt className="text-label text-muted">{t("location")}</dt>
                    <dd>{content.location}</dd>
                  </div>
                  <div className="flex flex-col gap-gap-sm">
                    <dt className="text-label text-muted">{t("contact")}</dt>
                    <dd>
                      <a href={`mailto:${cvContact.email}`} className="break-words underline underline-offset-4 hover:text-pop">
                        {cvContact.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col gap-gap-sm">
                    <dt className="text-label text-muted">{t("digital")}</dt>
                    <dd className="flex flex-col gap-gap-sm">
                      <ExternalLink href={cvContact.linkedin} label={t("linkedin")} hint={hint} />
                      <ExternalLink href={cvContact.github} label={t("github")} hint={hint} />
                      <ExternalLink href={cvContact.portfolio} label={t("portfolio")} hint={hint} />
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="text-small max-w-measure text-text md:col-span-12">{content.summary}</p>
              {download(cn(buttonVariants(), "text-small w-full md:w-fit print:hidden"))}
            </header>

            <Section id="cv-experience" label={content.labels.experience}>
              <Entries entries={content.experience} />
            </Section>

            <Section id="cv-education" label={content.labels.education}>
              <Entries entries={content.education} />
            </Section>

            <Section id="cv-skills" label={content.labels.skills}>
              <div className="flex flex-col gap-gap">
                {content.skills.map((group) => (
                  <div key={group.label} className={rowClass}>
                    <h4 className="text-body font-medium text-text md:col-span-3">{group.label}</h4>
                    <ul className="text-small flex flex-wrap gap-x-gap gap-y-gap-sm text-text md:col-span-7">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-gap-sm">
                          <span aria-hidden="true" className="text-pop">
                            →
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="cv-languages" label={content.labels.languages}>
              <ul className="flex flex-col gap-gap-sm">
                {content.languages.map((language) => (
                  <li key={language.name} className={cn(rowClass, "text-small")}>
                    <span className="text-body font-medium text-text md:col-span-3">{language.name}</span>
                    <span className="text-muted md:col-span-7">{language.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </Reveal>
      </div>

      <div className="text-label mt-gap flex items-center justify-between gap-gap text-on-accent dark:text-muted print:hidden">
        <p>
          {t("updated")}: {cvUpdated[locale]}
        </p>
        {download("inline-flex items-center gap-gap-sm underline underline-offset-4 hover:text-pop")}
      </div>
    </section>
  );
}
