"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  total: number;
  label: string;
  title: string;
  listLabel: string;
  previous: string;
  next: string;
  children: ReactNode;
};

// Encabezado y tira con scroll horizontal y snap. El contador sigue a la tarjeta
// más cercana al borde izquierdo; las flechas (solo escritorio) mueven a la anterior/siguiente.
export function ProjectsStrip({ total, label, title, listLabel, previous, next, children }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    function update() {
      const cards = Array.from(list!.querySelectorAll<HTMLElement>("[data-project-card]"));
      const edge = list!.getBoundingClientRect().left;
      let nearest = 0;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.getBoundingClientRect().left - edge);
        if (distance < Math.abs(cards[nearest].getBoundingClientRect().left - edge)) nearest = i;
      });
      // Al final de la tira, la última tarjeta cuenta como actual aunque no llegue al borde.
      const atEnd = list!.scrollLeft + list!.clientWidth >= list!.scrollWidth - 1;
      setIndex(atEnd ? cards.length - 1 : nearest);
    }

    update();
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function go(target: number) {
    const cards = listRef.current?.querySelectorAll<HTMLElement>("[data-project-card]");
    const card = cards?.[Math.min(Math.max(target, 0), total - 1)];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <>
      <div className="flex items-end justify-between gap-gap">
        <div className="flex flex-col gap-gap-sm">
          <p className="text-label text-muted">{label}</p>
          <h2 id="work-title" className="text-heading text-text">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-gap">
          <p aria-live="polite" className="text-label text-muted">
            {index + 1} / {total}
          </p>
          <div className="hidden gap-gap-sm md:flex">
            <Button variant="outline" size="icon" aria-label={previous} disabled={index === 0} onClick={() => go(index - 1)}>
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon" aria-label={next} disabled={index === total - 1} onClick={() => go(index + 1)}>
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      <ul
        ref={listRef}
        aria-label={listLabel}
        // md:pr deja espacio tras la última tarjeta (420px) para que cada una pueda llegar al borde izquierdo.
        className="mt-gap flex md:pr-[calc(100%-420px)] snap-x snap-mandatory items-start gap-gap overflow-x-auto pb-gap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </>
  );
}
