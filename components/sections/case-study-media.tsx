"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// `portrait`: captura vertical; se muestra completa sobre su propio desenfoque para que no se vea el fondo del marco.
export type CycleImage = { src: string; alt: string; portrait: boolean };

type Props = {
  count: number;
  images?: CycleImage[];
  label: string;
  placeholder: string;
  pause: string;
  play: string;
};

// Cada transición entra desde un lado distinto: izquierda, abajo, derecha, arriba y vuelve a empezar.
const DIRECTIONS = ["left", "bottom", "right", "top"] as const;
type Direction = (typeof DIRECTIONS)[number];

const HOLD_MS = 4000;
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

// Media secundaria del caso de estudio: bucle de imágenes (mínimo 6). La primera se muestra
// completa; cada siguiente entra encima de la anterior. Se pausa con el botón. Con
// prefers-reduced-motion se queda en la primera imagen y no hay botón.
export function CaseStudyMedia({ count, images, label, placeholder, pause, play }: Props) {
  const total = images?.length ?? count;
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [steps, setSteps] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY);
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const running = !reduced && !paused;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      setPrevious(current);
      setCurrent((value) => (value + 1) % total);
      setSteps((value) => value + 1);
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [running, current, total]);

  // La dirección de la transición en curso (steps ya incluye la actual).
  const direction: Direction = DIRECTIONS[(steps - 1 + DIRECTIONS.length) % DIRECTIONS.length];

  return (
    <div
      role="group"
      aria-label={label}
      data-current={current}
      className="relative aspect-[4/3] overflow-hidden bg-surface md:col-span-7"
    >
      {Array.from({ length: total }, (_, i) => {
        const isCurrent = i === current;
        const isPrevious = i === previous;
        const image = images?.[i];
        return (
          <div
            key={i}
            data-slide={i}
            aria-hidden={!isCurrent}
            className={`absolute inset-0 ${isCurrent ? "z-20" : isPrevious ? "z-10" : "invisible"} ${
              isCurrent && steps > 0 ? `cycle-in cycle-in-${direction}` : ""
            }`}
          >
            {image ? (
              image.portrait ? (
                <>
                  <Image src={image.src} alt="" aria-hidden="true" fill sizes="25vw" className="scale-110 object-cover blur-xl" />
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-contain" />
                </>
              ) : (
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-center" />
              )
            ) : (
              // Placeholder: se alternan surface y powder para que se note el cambio.
              <div
                aria-hidden="true"
                className={`flex size-full items-center justify-center ${i % 2 === 0 ? "bg-surface" : "bg-powder"}`}
              >
                <span className={`text-label ${i % 2 === 0 ? "text-muted" : "text-on-powder"}`}>
                  {placeholder} {i + 1} / {total}
                </span>
              </div>
            )}
          </div>
        );
      })}

      {!reduced && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? play : pause}
          className="absolute right-gap bottom-gap z-30 inline-flex size-10 items-center justify-center rounded-full bg-bg text-text hover:text-pop duration-(--duration-fast) ease-token transition-colors"
        >
          {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
