import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

// Placeholder: la página de CV se construye en su propia tarea.
export default async function CvPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("cv");

  return (
    <div className="flex flex-col gap-gap">
      <h1 className="text-heading">{t("title")}</h1>
      <p className="text-body text-muted">{t("placeholder")}</p>
      <Link href="/" className="text-small underline underline-offset-4 hover:text-pop">
        {t("back")}
      </Link>
    </div>
  );
}
