"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { projectMedia } from "@/content/projects/media";

const COUNT = projects.length;

// Un proyecto a pantalla completa: imagen del hero del proyecto y su nombre sobre `scrim`.
function Slide({ slug, name, active }: { slug: string; name: string; active: boolean }) {
  const hero = projectMedia[slug].hero;
  return (
    <Link
      href={`/projects/${slug}`}
      prefetch={false}
      // Solo el proyecto visible se puede enfocar: los demás están tapados.
      inert={!active}
      className="group bg-powder relative block size-full overflow-hidden"
    >
      <Image src={hero.src} alt="" fill sizes="100vw" className="object-cover object-center" />
      <span aria-hidden="true" className="bg-scrim absolute inset-0" />
      <span className="text-heading text-on-media absolute inset-x-0 bottom-0 p-gap text-center underline-offset-4 group-hover:underline">
        {name}
      </span>
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
// 1) El primero crece desde el ancho de container hasta el de la ventana (clip-path, ver
//    .hero-media en globals.css; en móvil es 4:5 y no se expande).
// 2) Queda fijo y cada siguiente proyecto entra encima del anterior hasta llegar al último.
// Con prefers-reduced-motion se muestran apilados, sin sticky ni animación.
export function HeroMedia() {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress: grow } = useScroll({ target: wrapper, offset: ["start end", "start start"] });
  const { scrollYProgress: stack } = useScroll({ target: wrapper, offset: ["start start", "end end"] });

  useMotionValueEvent(stack, "change", (value) => setActive(Math.round(value * (COUNT - 1))));

  const names = projects.map((project) => ({ slug: project.slug, name: t(`items.${project.slug}.name`) }));

  if (reduce) {
    return (
      <div className="flex flex-col gap-gap">
        <h2 className="sr-only">{t("title")}</h2>
        {names.map(({ slug, name }) => (
          <div key={slug} className="relative aspect-[4/5] w-full md:aspect-video">
            <Slide slug={slug} name={name} active />
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
        className="hero-media sticky top-[max(calc((100svh-var(--media-h))/2),6rem)] aspect-[4/5] [--media-h:125vw] md:ml-[calc(50%-50vw)] md:aspect-video md:w-screen md:[--media-h:56.25vw]"
        style={{ "--reveal": grow } as MotionStyle}
      >
        {names.map(({ slug, name }, i) =>
          i === 0 ? (
            <div key={slug} className="absolute inset-0" style={{ zIndex: 0 }}>
              <Slide slug={slug} name={name} active={active === 0} />
            </div>
          ) : (
            <Layer key={slug} index={i} progress={stack}>
              <Slide slug={slug} name={name} active={active === i} />
            </Layer>
          ),
        )}
      </motion.div>
    </div>
  );
}
