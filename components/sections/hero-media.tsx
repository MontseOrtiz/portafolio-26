"use client";

import { motion, useReducedMotion, useScroll, type MotionStyle } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { projectMedia } from "@/content/projects/media";

// Media debajo del hero. En escritorio crece con el scroll hasta el ancho de la ventana
// (clip-path, ver .hero-media en globals.css); en móvil es 4:5 y no se expande.
// Capturas decorativas (alt vacío): el nombre del proyecto es el texto del enlace. Muestra capturas de WOD Tracker: tres en escritorio, una en móvil.
export function HeroMedia() {
  const t = useTranslations("hero");
  const screens = projectMedia["wod-tracker"].mobile.slice(0, 3);
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
          <span className="absolute inset-0 flex items-start justify-center gap-gap pt-gap">
            {screens.map((shot, n) => (
              <span key={shot.src} className={`relative h-[78%] aspect-[9/19.5] ${n === 0 ? "" : "hidden md:block"}`}>
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 60vw"
                  className="object-contain object-top"
                />
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="bg-scrim absolute inset-0" />
          <span className="text-heading text-on-media absolute inset-x-0 bottom-0 p-gap text-center underline-offset-4 group-hover:underline">
            {t("mediaTitle")}
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
