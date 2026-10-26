"use client";

import dynamic from "next/dynamic";
import { projects } from "@/content/projects";

// La media usa Motion. Se carga después de la hidratación para que su JavaScript no compita
// con el hero en la carga inicial (el LCP es el nombre). Mientras tanto se reserva su espacio.
const HeroMedia = dynamic(() => import("@/components/sections/hero-media").then((m) => m.HeroMedia), {
  ssr: false,
  loading: () => (
    // Reserva el mismo alto que el bloque real para no mover la página: una pantalla por proyecto
    // con movimiento, o los proyectos apilados con prefers-reduced-motion.
    <>
      <div className="relative w-full motion-reduce:hidden" style={{ height: `${projects.length * 100}svh` }}>
        <div className="bg-text sticky top-0 ml-[calc(50%-50vw)] h-svh w-screen" />
      </div>
      <div className="hidden flex-col gap-gap motion-reduce:flex">
        {projects.map((project) => (
          <div key={project.slug} className="bg-text ml-[calc(50%-50vw)] h-svh w-screen" />
        ))}
      </div>
    </>
  ),
});

export function HeroMediaLoader() {
  return <HeroMedia />;
}
