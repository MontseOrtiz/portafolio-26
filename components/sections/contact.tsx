import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CopyEmailButton } from "@/components/sections/copy-email-button";
import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";
import { cvContact } from "@/content/cv";
import type { Locale } from "@/i18n/routing";

const underline =
  "underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-(--duration-fast) ease-token hover:decoration-(--stroke)";

// Botones con borde 1px on-accent que invierten fondo y texto al pasar el cursor.
const outlineButton =
  "text-small inline-flex h-10 items-center justify-center gap-gap-sm rounded-full border border-on-accent px-gap transition-colors duration-(--duration-fast) ease-token hover:bg-on-accent hover:text-accent";
const primaryButton = `${outlineButton} bg-on-accent text-accent hover:bg-transparent hover:text-on-accent`;

function ExternalLink({ href, label, hint }: { href: string; label: string; hint: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-gap-sm ${underline}`}>
      {label}
      <ArrowUpRight className="size-4" aria-hidden="true" />
      <span className="sr-only">({hint})</span>
    </a>
  );
}

// TODO: título, invitación y correo finales en la fase 6 (brief.md, "Contenido final").
// El ancla #contact (CTA del nav) la lleva el footer de cierre.
export async function Contact({ locale }: { locale: Locale }) {
  const t = await getTranslations("contact");
  const hint = t("newTab");

  return (
    <section id="get-in-touch" aria-labelledby="contact-title" className="scroll-mt-24">
      <Reveal className="flex flex-col gap-gap rounded-md bg-accent px-gutter py-section text-on-accent md:py-section-lg">
        <div className="flex max-w-measure flex-col gap-gap-sm">
          <p className="text-label">{t("label")}</p>
          <h2 id="contact-title" className="text-heading">
            {t("title")}
          </h2>
          <p className="text-body-lg">{t("invite")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-gap">
          <a
            href={`mailto:${cvContact.email}`}
            aria-label={`${t("emailLabel")}: ${cvContact.email}`}
            className={`text-heading [overflow-wrap:anywhere] ${underline}`}
          >
            {cvContact.email}
          </a>
          <CopyEmailButton
            email={cvContact.email}
            label={t("copy")}
            copied={t("copied")}
            ariaLabel={t("copyAria")}
            className={outlineButton}
          />
        </div>

        <div className="flex flex-col gap-gap md:flex-row md:items-center md:justify-between">
          <ul aria-label={t("links")} className="text-small flex flex-wrap items-center gap-gap-sm md:gap-gap">
            <li>
              <ExternalLink href={cvContact.linkedin} label={t("linkedin")} hint={hint} />
            </li>
            <li>
              <ExternalLink href={cvContact.github} label={t("github")} hint={hint} />
            </li>
          </ul>

          <div className="flex flex-col gap-gap-sm md:flex-row">
            <a href={`/cv/montse-ortiz-cv-${locale}.pdf`} download className={`${primaryButton} w-full md:w-auto`}>
              {t("downloadPdf")}
            </a>
            <Link href="/about#cv" className={`${outlineButton} w-full md:w-auto`}>
              {t("viewCv")}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
