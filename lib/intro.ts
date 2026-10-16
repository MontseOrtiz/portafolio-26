// Valores de la intro de la página. Vienen de docs/design/tokens.md (intro-name).
// Los de CSS (intro-nav, intro-delay) están en app/globals.css.

export const introName = {
  // Sube desde 150px con opacidad 0.001 (no 0: así el navegador lo cuenta como visible para el LCP).
  initial: { y: 150, opacity: 0.001 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", duration: 1.4, bounce: 0.2 },
} as const;
