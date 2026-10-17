// Datos de los proyectos que no cambian por idioma. Los textos (nombre, "qué demuestra")
// viven en content/<locale>/ui.json bajo projects.items.<slug>.
// TODO: repos y mockups reales en la fase 6 (brief.md, "Contenido final").
export const projects = [
  {
    slug: "book-diary",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Open Library API"],
    demoUrl: "https://book-diary-flax.vercel.app/",
    concept: false,
    // Desplazamiento vertical en escritorio: 0, 48px, 24px.
    widthClass: "md:w-[480px]",
    offsetClass: "md:mt-0",
  },
  {
    slug: "wod-tracker",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Gemini API"],
    demoUrl: "https://wod-tracker-iota.vercel.app/",
    concept: false,
    widthClass: "md:w-[360px]",
    offsetClass: "md:mt-12",
  },
  {
    slug: "destino-china",
    stack: ["WordPress", "Elementor", "Yoast SEO"],
    demoUrl: "https://china.holasoymontse.com/",
    concept: true,
    widthClass: "md:w-[420px]",
    offsetClass: "md:mt-6",
  },
] as const;

export type Project = (typeof projects)[number];
