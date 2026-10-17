import { cvEn } from "./en";
import { cvEs } from "./es";
import type { CvContent } from "./types";

export const cv: Record<"en" | "es", CvContent> = { en: cvEn, es: cvEs };

// Datos de contacto compartidos por ambos idiomas (el teléfono del PDF no se publica en la página).
// TODO: correo con dominio propio (brief.md, "Contenido final").
export const cvContact = {
  email: "montseortiz29@gmail.com",
  linkedin: "https://www.linkedin.com/in/montse-ortiz/",
  github: "https://github.com/MontseOrtiz",
  portfolio: "https://montse-ortiz.vercel.app",
};

// TODO: actualizar al cambiar los PDFs.
export const cvUpdated = { en: "October 2026", es: "Octubre 2026" };
