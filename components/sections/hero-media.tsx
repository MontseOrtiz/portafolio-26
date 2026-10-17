"use client";

import { motion, useReducedMotion, useScroll, type MotionStyle } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

// Media debajo del hero. En escritorio crece con el scroll hasta el ancho de la ventana
// (clip-path, ver .hero-media en globals.css); en móvil es 4:5 y no se expande.
// Placeholder hasta que llegue el mockup real (fase 6).
export function HeroMedia() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 cuando el bloque entra por abajo, 1 cuando su centro llega al centro de la pantalla.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  // Con movimiento reducido se queda fija al ancho de container.
  const reveal = reduce ? 0 : scrollYProgress;

  return (
    <div className="relative w-full">
      <motion.div
        ref={ref}
        className="hero-media relative aspect-[4/5] md:left-1/2 md:aspect-video md:w-screen md:-translate-x-1/2"
        style={{ "--reveal": reveal } as MotionStyle}
      >
        <Link
          href="/projects/wod-tracker"
          prefetch={false}
          className="group bg-powder relative block size-full overflow-hidden"
        >
          <span className="text-label text-on-powder absolute top-gap left-gap">{t("mediaPlaceholder")}</span>
          <span aria-hidden="true" className="bg-scrim absolute inset-0" />
          <span className="text-heading text-on-media absolute inset-x-0 bottom-0 p-gap text-center underline-offset-4 group-hover:underline">
            {t("mediaTitle")}
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
