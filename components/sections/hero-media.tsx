"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { projectMedia } from "@/content/projects/media";

const COUNT = projects.length;

// Un proyecto a pantalla completa: su hero con look editorial oscuro, el nombre al centro y, pasados
// unos segundos, "Conocer más" debajo (ver .learn-more en globals.css).
function Slide({
  slug,
  name,
  active,
  played = active,
  index,
  progress,
}: {
  slug: string;
  name: string;
  active: boolean;
  // Cuándo empieza a contar la aparición de "Conocer más" (el primer proyecto, al quedar a pantalla completa).
  played?: boolean;
  index: number;
  progress?: MotionValue<number>;
}) {
  const t = useTranslations("projects");
  const hero = projectMedia[slug].hero;
  // El texto se desvanece cuando otro proyecto lo está tapando, para que no se encimen los nombres.
  const fallback = useMotionValue(0);
  const opacity = useTransform(progress ?? fallback, (value) =>
    progress ? Math.min(1, Math.max(0, 1 - (Math.abs(value * (COUNT - 1) - index) - 0.15) / 0.3)) : 1,
  );
  return (
    <Link
      href={`/projects/${slug}`}
      prefetch={false}
      data-active={played}
      // Solo el proyecto visible se puede enfocar: los demás están tapados.
      inert={!active}
      className="group bg-text relative block size-full overflow-hidden"
    >
      <Image src={hero.src} alt="" fill sizes="100vw" className="filter-editorial object-cover object-top" />
      <span aria-hidden="true" className="bg-scrim absolute inset-0" />
      <motion.span style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center gap-gap px-gutter text-center">
        <span className="text-display-xl text-on-media">{name}</span>
        <span className="learn-more text-body-lg text-on-media inline-flex items-center gap-gap-sm">
          {t("learnMore")}
          <ArrowRight className="size-5" aria-hidden="true" />
        </span>
      </motion.span>
    </Link>
  );
}

// Cada proyecto después del primero entra desde abajo, tapando al anterior.
function Layer({ index, progress, children }: { index: number; progress: MotionValue<number>; children: React.ReactNode }) {
  const clipPath = useTransform(
    progress,
    [(index - 1) / (COUNT - 1), index / (COUNT - 1)],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
  );
  return (
    <motion.div className="absolute inset-0" style={{ clipPath, zIndex: index }}>
      {children}
    </motion.div>
  );
}

// Media debajo del hero: todos los proyectos, uno tras otro, mientras se hace scroll.
// Cada proyecto ocupa el 100% del alto de la ventana y se ve desde arriba (sin recortar la parte superior).
// 1) El primero crece desde el ancho de container hasta el de la ventana (clip-path, ver
//    .hero-media en globals.css; en móvil ya es de borde a borde).
// 2) Queda fijo y cada siguiente proyecto entra encima del anterior hasta llegar al último.
// Con prefers-reduced-motion se muestran apilados, sin sticky ni animación.
export function HeroMedia() {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [grown, setGrown] = useState(false);

  const { scrollYProgress: grow } = useScroll({ target: wrapper, offset: ["start end", "start start"] });
  const { scrollYProgress: stack } = useScroll({ target: wrapper, offset: ["start start", "end end"] });

  useMotionValueEvent(stack, "change", (value) => setActive(Math.round(value * (COUNT - 1))));
  useMotionValueEvent(grow, "change", (value) => setGrown(value > 0.95));

  const names = projects.map((project) => ({ slug: project.slug, name: t(`items.${project.slug}.name`) }));

  if (reduce) {
    return (
      <div className="flex flex-col gap-gap">
        <h2 className="sr-only">{t("title")}</h2>
        {names.map(({ slug, name }) => (
          <div key={slug} className="relative h-svh w-screen ml-[calc(50%-50vw)]">
            <Slide slug={slug} name={name} active index={0} />
          </div>
        ))}
      </div>
    );
  }

  return (
    // El alto de este bloque es el recorrido del scroll: una pantalla por proyecto.
    <div ref={wrapper} className="relative w-full" style={{ height: `${COUNT * 100}svh` }}>
      <h2 className="sr-only">{t("title")}</h2>
      <motion.div
        className="hero-media sticky top-0 ml-[calc(50%-50vw)] h-svh w-screen"
        style={{ "--reveal": grow } as MotionStyle}
      >
        {names.map(({ slug, name }, i) =>
          i === 0 ? (
            <div key={slug} className="absolute inset-0" style={{ zIndex: 0 }}>
              <Slide slug={slug} name={name} active={active === 0} played={active === 0 && grown} index={0} progress={stack} />
            </div>
          ) : (
            <Layer key={slug} index={i} progress={stack}>
              <Slide slug={slug} name={name} active={active === i} index={i} progress={stack} />
            </Layer>
          ),
        )}
      </motion.div>
    </div>
  );
}
