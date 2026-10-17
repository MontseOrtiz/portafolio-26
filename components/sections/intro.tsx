import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

// TODO: texto final del párrafo en la fase 6 (brief.md, "Contenido final").
export async function Intro() {
  const t = await getTranslations("intro");

  return (
    <section
      id="intro"
      className="rounded-md bg-surface px-gutter py-section md:py-section-lg"
    >
      <Reveal className="mx-auto max-w-measure text-center">
        <p className="text-body-lg text-text">{t("text")}</p>
      </Reveal>
      <span aria-hidden="true" className="mx-auto mt-gap block size-2 rounded-full bg-pop" />
    </section>
  );
}
