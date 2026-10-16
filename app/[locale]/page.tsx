import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { routing } from "@/i18n/routing";

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

export default async function LabPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("lab");

  return (
    <main className="bg-bg text-text mx-auto flex min-h-screen w-full max-w-page flex-col gap-section px-gutter py-section">
      <header className="flex flex-wrap items-center justify-between gap-gap">
        <p className="text-label text-muted">{t("title")}</p>
        <div className="flex items-center gap-gap-sm">
          <nav aria-label={t("language")} className="text-small flex items-center gap-gap-sm">
            {routing.locales.map((l) => (
              <Link
                key={l}
                href="/"
                locale={l}
                className="underline underline-offset-4 hover:text-pop"
                aria-current={l === locale ? "page" : undefined}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <section aria-labelledby="colors-title" className="flex flex-col gap-gap">
        <h2 id="colors-title" className="text-heading">
          {t("colors")}
        </h2>
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
            <li key={s.name} className="flex flex-col gap-gap-sm border-border border-t pt-gap-sm">
              <span className="text-label text-muted">{s.name}</span>
              <p className={s.className}>{t("sample")}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
