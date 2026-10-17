// Contenido de un caso de estudio en un idioma.
// TODO: pasar a MDX (content/projects/<slug>.mdx) cuando se pueda instalar @next/mdx.
export type CaseStudyCopy = {
  description: string;
  role: string;
  problem: string;
  myRole: string;
  decisions: string[];
  result: string;
};

export type CaseStudy = { en: CaseStudyCopy; es: CaseStudyCopy };
