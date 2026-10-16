import { getTranslations, setRequestLocale } from "next-intl/server";

const tokenSwatches = [
  { key: "bg", swatch: "bg-bg", label: "text-text" },
  { key: "surface", swatch: "bg-surface", label: "text-text" },
  { key: "text", swatch: "bg-text", label: "text-bg" },
  { key: "muted", swatch: "bg-muted", label: "text-bg" },
  { key: "border", swatch: "bg-border", label: "text-text" },
  { key: "accent", swatch: "bg-accent", label: "text-on-accent" },
  { key: "on-accent", swatch: "bg-on-accent", label: "text-accent" },
  { key: "accent-soft", swatch: "bg-accent-soft", label: "text-on-accent-soft" },
  { key: "on-accent-soft", swatch: "bg-on-accent-soft", label: "text-accent-soft" },
  { key: "pop", swatch: "bg-pop", label: "text-on-pop" },
  { key: "on-pop", swatch: "bg-on-pop", label: "text-pop" },
  { key: "powder", swatch: "bg-powder", label: "text-on-powder" },
  { key: "on-powder", swatch: "bg-on-powder", label: "text-powder" },
  { key: "sand", swatch: "bg-sand", label: "text-bg" },
  { key: "cherry", swatch: "bg-cherry", label: "text-bg" },
] as const;

const typeScale = [
  { name: "display-xl", className: "text-display-xl" },
  { name: "heading", className: "text-heading" },
  { name: "title", className: "text-title" },
  { name: "body-lg", className: "text-body-lg" },
  { name: "body", className: "text-body" },
  { name: "small", className: "text-small" },
  { name: "label", className: "text-label" },
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

// Temporal: muestra los tokens mientras no hay secciones. Se quita al llegar el hero.
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("lab");

  return (
    <>
      <div className="flex flex-col gap-section">
        <section aria-labelledby="colors-title" className="flex flex-col gap-gap">
          <h1 id="colors-title" className="text-heading">
            {t("colors")}
          </h1>
          <ul className="grid grid-cols-2 gap-gap-sm md:grid-cols-3 md:gap-gap">
            {tokenSwatches.map((s) => (
              <li
                key={s.key}
                className={`${s.swatch} ${s.label} border-border flex min-h-24 flex-col justify-between border p-gap-sm`}
              >
                <span className="text-label">{s.key}</span>
                <span className="text-small">{t(`tokens.${s.key}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="type-title" className="flex flex-col gap-gap">
          <h2 id="type-title" className="text-heading">
            {t("typography")}
          </h2>
          <ul className="flex flex-col gap-gap">
            {typeScale.map((s) => (
              <li key={s.name} className="border-border flex flex-col gap-gap-sm border-t pt-gap-sm">
                <span className="text-label text-muted">{s.name}</span>
                <p className={s.className}>{t("sample")}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div id="projects" className="scroll-mt-24" />
      <div id="about" className="scroll-mt-24" />
      <div id="contact" className="scroll-mt-24" />
    </>
  );
}
