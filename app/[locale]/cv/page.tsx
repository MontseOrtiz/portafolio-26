import { redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

// El CV vive en /about#cv; la ruta antigua /cv redirige ahí.
export default async function CvRedirect({ params }: Props) {
  const { locale } = await params;
  redirect({ href: "/about#cv", locale: locale as Locale });
}
