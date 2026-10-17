import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";
import { cvContact } from "@/content/cv";

type Variant = "home" | "about" | "case-study";

const linkClass =
  "text-label inline-flex items-center gap-gap-sm transition-colors duration-(--duration-fast) ease-token hover:text-pop";
const phraseClass =
  "text-display-xl text-text transition-colors duration-(--duration-fast) ease-token hover:text-pop";

// Footer de cierre. La frase cambia según la página; en los casos de estudio solo va la fila de links.
// Lleva el ancla #contact (el CTA "Let's talk" del nav).
// TODO: correo con dominio propio (brief.md, "Contenido final").
export async function Footer({ variant }: { variant: Variant }) {
  const t = await getTranslations("footer");
  const hint = t("newTab");
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-24 overflow-hidden rounded-md bg-surface print:hidden">
      {variant === "home" && <div aria-hidden="true" className="pattern-awning" />}

      <div className="px-gutter py-section">
        {variant !== "case-study" && (
          <Reveal className="pt-section-lg pb-gap">
            {variant === "home" ? (
              <h2 className="text-display-xl">
                <a href={`mailto:${cvContact.email}`} className={phraseClass}>
                  {t("homePhrase")}
                </a>
              </h2>
            ) : (
              <h2 className="text-display-xl">
                <Link href="/#work" className={phraseClass}>
                  {t("aboutPhrase")} <span aria-hidden="true">→</span>
                </Link>
              </h2>
            )}
          </Reveal>
        )}

        <nav
          aria-label={t("links")}
          className="flex flex-col items-start gap-gap-sm border-t border-border py-4 md:flex-row md:items-center md:justify-between"
        >
          <a href={cvContact.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {t("linkedin")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">({hint})</span>
          </a>
          <a href={`mailto:${cvContact.email}`} className={linkClass}>
            {cvContact.email}
          </a>
          <a href={cvContact.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {t("github")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">({hint})</span>
          </a>
        </nav>

        <p className="text-label pt-4 text-muted">
          {t("rights", { year })} ·{" "}
          {t.rich("credit", {
            heart: () => (
              <>
                <span aria-hidden="true" className="text-cherry">
                  ♥
                </span>
                <span className="sr-only">{t("love")}</span>
              </>
            ),
          })}
        </p>
      </div>
    </footer>
  );
}
