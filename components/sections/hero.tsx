import Image from "next/image";
import { getTranslations } from "next-intl/server";

// Primera pantalla: ocupa el alto de la ventana menos el nav (82px) y su separación (gap).
export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="flex min-h-[calc(100svh-82px-var(--spacing-gap))] flex-col justify-center gap-gap rounded-md bg-surface px-gutter py-section-lg"
    >
      <Image
        src="/images/hero/hero-avatar-browser.webp"
        alt={t("imageAlt")}
        width={584}
        height={730}
        priority
        sizes="(min-width: 768px) 240px, 160px"
        className="intro-reveal mx-auto h-auto w-40 md:w-60"
      />

      <h1 id="hero-name" className="hero-name text-display-xl text-text">
        <span className="block md:inline">{t("firstName")}</span>{" "}
        <span className="block md:inline">{t("lastName")}</span>
      </h1>

      <div className="intro-reveal-text flex max-w-measure flex-col gap-gap-sm">
        <p className="text-label text-muted">{t("role")}</p>
        <p className="text-body-lg text-text">{t("proposal")}</p>
      </div>
    </section>
  );
}
