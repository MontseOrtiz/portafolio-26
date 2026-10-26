"use client";

import dynamic from "next/dynamic";
import { projects } from "@/content/projects";

// La media usa Motion. Se carga después de la hidratación para que su JavaScript no compita
// con el hero en la carga inicial (el LCP es el nombre). Mientras tanto se reserva su espacio.
const HeroMedia = dynamic(() => import("@/components/sections/hero-media").then((m) => m.HeroMedia), {
  ssr: false,
  loading: () => (
    // Reserva el mismo alto que el bloque real (una pantalla por proyecto) para no mover la página.
    <div className="relative w-full" style={{ height: `${projects.length * 100}svh` }}>
      <div className="bg-powder sticky top-24 aspect-[4/5] md:ml-[calc(50%-50vw)] md:aspect-video md:w-screen" />
    </div>
  ),
});

export function HeroMediaLoader() {
  return <HeroMedia />;
}
