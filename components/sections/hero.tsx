import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="flex flex-col gap-gap rounded-md bg-surface px-gutter py-section-lg"
    >
      <Image
        src="/images/hero/hero-avatar-browser.webp"
        alt={t("imageAlt")}
        width={584}
        height={730}
        priority
        sizes="(min-width: 768px) 240px, 160px"
        className="hero-rise mx-auto h-auto w-40 md:w-60"
      />

      <h1 id="hero-name" className="hero-fade hero-delay-1 text-display-xl text-text">
        <span className="block md:inline">{t("firstName")}</span>{" "}
        <span className="block md:inline">{t("lastName")}</span>
      </h1>

      <div className="hero-rise hero-delay-2 flex flex-col gap-gap md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-measure flex-col gap-gap-sm">
          <p className="text-label text-muted">{t("role")}</p>
          <p className="text-body-lg text-text">{t("proposal")}</p>
        </div>

        <div className="flex flex-wrap gap-gap-sm">
          <Link href="/#projects" className={buttonVariants()}>
            {t("seeProjects")}
          </Link>
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-transparent hover:border-pop hover:bg-transparent",
            )}
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
