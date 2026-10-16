"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const subscribe = () => () => {};

export function ThemeToggle() {
  const t = useTranslations("lab");
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";
  const nextLabel = t(next === "dark" ? "themeDark" : "themeLight");

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(next)}
      aria-label={t("themeToggle", { theme: nextLabel })}
    >
      {mounted ? (isDark ? t("themeLight") : t("themeDark")) : t("theme")}
    </Button>
  );
}
