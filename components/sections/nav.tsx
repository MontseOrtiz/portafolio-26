"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitch } from "@/components/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link, usePathname } from "@/i18n/navigation";

const DESKTOP_QUERY = "(min-width: 768px)";

// Secciones que el nav marca como activas según cuál esté visible.
// Home observa #work; /about observa #cv (y marca About cuando #cv no está a la vista).
const observedIds = { "/": ["work"], "/about": ["cv"] } as const;

const linkClass = (active: boolean) =>
  [
    "text-small hover:text-pop transition-colors duration-(--duration-fast) ease-token underline-offset-4 [text-decoration-thickness:var(--stroke)]",
    active && "underline decoration-pop",
  ]
    .filter(Boolean)
    .join(" ");

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onAbout = pathname === "/about";

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  // Sobre la media de proyectos del home el nav va sin fondo ni borde, en blanco y negritas.
  const [mediaInView, setOverMedia] = useState(false);
  const overMedia = onHome && mediaInView;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mientras el menú móvil está abierto: Escape lo cierra y el Tab no sale del panel.
  useEffect(() => {
    if (!open) return;

    const getFocusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );

    getFocusable()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || window.matchMedia(DESKTOP_QUERY).matches) return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = panelRef.current?.contains(active) ?? false;

      if (event.shiftKey && (!inside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!inside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Marca la sección visible (Work en la home, CV en /about).
  useEffect(() => {
    const ids = onHome ? observedIds["/"] : onAbout ? observedIds["/about"] : [];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          setActiveId((prev) => (entry.isIntersecting ? id : prev === id ? null : prev));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, onAbout]);

  useEffect(() => {
    if (!onHome) return;
    const work = document.getElementById("work");
    if (!work) return;
    function update() {
      const rect = work!.getBoundingClientRect();
      setOverMedia(rect.top <= 24 && rect.bottom > 80);
    }
    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onHome]);

  const workActive = onHome && activeId === "work";
  const cvActive = onAbout && activeId === "cv";
  const aboutActive = onAbout && !cvActive;

  return (
    <header className="nav-enter fixed inset-x-0 top-4 z-40 print:hidden">
      <div className="mx-auto w-full max-w-page px-gutter">
        <div
          className={`relative flex items-center justify-between gap-gap rounded-md border px-6 py-3 transition-colors duration-(--duration-fast) ease-token ${
            overMedia ? "text-on-media border-transparent bg-transparent font-bold" : "border-border bg-bg"
          }`}
        >
          <div className="flex min-w-0 items-center gap-gap-sm md:flex-1">
            <Link href="/" className="text-small font-sans font-medium whitespace-nowrap">
              {t("name")}
            </Link>
          </div>

          <Button
            ref={buttonRef}
            variant="outline"
            size="icon"
            className={`md:hidden ${overMedia && !open ? "border-on-media text-on-media bg-transparent hover:bg-transparent" : ""}`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t("menuClose") : t("menuOpen")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>

          <div
            id="site-menu"
            ref={panelRef}
            className={`${open ? "nav-panel flex" : "hidden"} absolute inset-x-0 top-full mt-2 flex-col gap-gap rounded-md border border-border bg-bg p-gap max-md:text-text max-md:font-normal md:contents`}
          >
            <nav aria-label={t("main")} className="flex flex-col gap-gap md:flex-row md:justify-center">
              <Link
                href="/about"
                className={linkClass(aboutActive)}
                aria-current={aboutActive ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {t("about")}
              </Link>
              <Link
                href="/#work"
                className={linkClass(workActive)}
                aria-current={workActive ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {t("work")}
              </Link>
              <Link
                href="/about#cv"
                className={linkClass(cvActive)}
                aria-current={cvActive ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {t("cv")}
              </Link>
            </nav>

            <div className="flex w-full flex-wrap items-center gap-gap-sm md:w-auto md:flex-1 md:justify-end">
              <LanguageSwitch />
              <ThemeToggle />
              {/* En el home lleva al footer de cierre; en otras páginas, al footer de esa página. */}
              <Link
                href={onHome ? "/#contact" : { pathname, hash: "contact" }}
                onClick={() => setOpen(false)}
                className="text-small bg-accent text-on-accent hover:bg-pop hover:text-on-pop transition-colors duration-(--duration-fast) ease-token inline-flex h-10 w-full items-center justify-between gap-gap-sm rounded-full pr-1 pl-gap md:w-auto"
              >
                {t("cta")}
                <span className="bg-on-accent text-accent inline-flex size-6 items-center justify-center rounded-full">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
