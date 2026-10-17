import { Theater } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { tools, type Tool } from "@/content/tools";

// Posición (px, escala de 4px) de cada tarjeta en el escritorio (xl: el contenedor mide 1152 × 720).
// Tamaño de la tarjeta: 96, 128 o 160. Mismo orden que content/tools.ts.
const desktop: Record<string, { x: number; y: number; size: 96 | 128 | 160 }> = {
  React: { x: 16, y: 32, size: 96 },
  "Next.js": { x: 160, y: 80, size: 128 },
  TypeScript: { x: 592, y: 48, size: 160 },
  JavaScript: { x: 8, y: 216, size: 160 },
  "Node.js": { x: 936, y: 76, size: 128 },
  Express: { x: 176, y: 296, size: 96 },
  "Tailwind CSS": { x: 336, y: 16, size: 160 },
  Supabase: { x: 40, y: 412, size: 128 },
  PostgreSQL: { x: 200, y: 556, size: 160 },
  MongoDB: { x: 912, y: 232, size: 128 },
  MySQL: { x: 1052, y: 576, size: 96 },
  Docker: { x: 888, y: 400, size: 96 },
  Jest: { x: 392, y: 540, size: 96 },
  Playwright: { x: 40, y: 580, size: 128 },
  Git: { x: 800, y: 12, size: 96 },
  GitHub: { x: 900, y: 560, size: 128 },
  Vercel: { x: 1040, y: 332, size: 96 },
  WordPress: { x: 520, y: 580, size: 128 },
  "Claude Code": { x: 688, y: 548, size: 160 },
};

// tilt-3d: rotateX(8deg) rotateY(±16deg) rotateZ(±4deg), cuatro combinaciones que se alternan.
const tilts = [
  "rotateX(8deg) rotateY(16deg) rotateZ(4deg)",
  "rotateX(8deg) rotateY(-16deg) rotateZ(-4deg)",
  "rotateX(8deg) rotateY(16deg) rotateZ(-4deg)",
  "rotateX(8deg) rotateY(-16deg) rotateZ(4deg)",
];

// Fondos que se alternan, con su color de texto.
const tones = [
  "bg-surface text-text",
  "bg-powder text-on-powder",
  "bg-accent-soft text-on-accent-soft border border-border",
] as const;

// Móvil (bento de 3 columnas): filas que ocupa cada tarjeta, para que las alturas sean desiguales.
const mobileRows = [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1];
const MOBILE_PHRASE_AFTER = 9;
const STAGGER_MS = 100;

const iconSize = { 96: "size-8", 128: "size-10", 160: "size-12" } as const;

function Icon({ tool, className }: { tool: Tool; className: string }) {
  if (!tool.path) return <Theater className={className} aria-hidden="true" />;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={tool.path} />
    </svg>
  );
}

export async function Tools() {
  const t = await getTranslations("tools");

  return (
    <section
      id="tools"
      aria-labelledby="tools-title"
      className="overflow-hidden rounded-md border border-border bg-bg"
    >
      <div aria-hidden="true" className="pattern-awning" />

      <div className="px-gutter py-section md:py-section-lg">
        {/* Móvil: bento de 3 columnas. xl: tarjetas flotando alrededor de la frase. */}
        <div className="grid auto-rows-[88px] grid-flow-dense grid-cols-3 gap-gap xl:relative xl:block xl:h-[720px]">
          <ul role="list" aria-label={t("listLabel")} className="contents">
            {tools.map((tool, i) => {
              const place = desktop[tool.name];
              const size = place.size;
              return (
                <li
                  key={tool.name}
                  style={{ "--x": `${place.x}px`, "--y": `${place.y}px`, "--size": `${size}px` } as React.CSSProperties}
                  className={`${i < MOBILE_PHRASE_AFTER ? "order-1" : "order-3"} ${
                    mobileRows[i] === 2 ? "row-span-2" : ""
                  } xl:absolute xl:top-(--y) xl:left-(--x) xl:order-none xl:size-(--size)`}
                >
                  <Reveal className="size-full" delay={Math.min(i, 8) * STAGGER_MS}>
                    <div
                      style={{ "--tilt": tilts[i % tilts.length] } as React.CSSProperties}
                      className={`tool-card flex size-full flex-col items-center justify-center gap-gap-sm rounded-sm p-gap-sm text-center ${
                        tones[i % tones.length]
                      }`}
                    >
                      <Icon tool={tool} className={iconSize[size]} />
                      <span className="text-label break-words">{tool.name}</span>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <div className="order-2 col-span-2 row-span-3 flex flex-col items-center justify-center gap-gap rounded-sm bg-bg p-gap-sm text-center xl:absolute xl:top-1/2 xl:left-1/2 xl:max-w-measure xl:-translate-x-1/2 xl:-translate-y-1/2 xl:p-0">
            <Reveal className="flex flex-col items-center gap-gap-sm">
              <h2 id="tools-title" className="text-heading text-text">
                {t("title")}
              </h2>
              <p className="text-body text-text">{t("support")}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
