"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitch() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className="text-small flex items-center gap-gap-sm">
      {routing.locales.map((l) =>
        l === locale ? (
          <span key={l} aria-current="true" className="underline underline-offset-4 [text-decoration-thickness:var(--stroke)]">
            {l.toUpperCase()}
          </span>
        ) : (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            aria-label={t(l === "en" ? "toEn" : "toEs")}
            className="hover:text-pop transition-colors duration-(--duration-fast) ease-token"
          >
            {l.toUpperCase()}
          </Link>
        ),
      )}
    </nav>
  );
}
