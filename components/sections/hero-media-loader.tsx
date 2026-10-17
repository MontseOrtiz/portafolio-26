"use client";

import dynamic from "next/dynamic";

// La media usa Motion. Se carga después de la hidratación para que su JavaScript no compita
// con el hero en la carga inicial (el LCP es el nombre). Mientras tanto se reserva su espacio.
const HeroMedia = dynamic(() => import("@/components/sections/hero-media").then((m) => m.HeroMedia), {
  ssr: false,
  loading: () => (
    <div className="relative w-full">
      <div className="bg-powder relative aspect-[4/5] md:left-1/2 md:aspect-video md:w-screen md:-translate-x-1/2" />
    </div>
  ),
});

export function HeroMediaLoader() {
  return <HeroMedia />;
}
