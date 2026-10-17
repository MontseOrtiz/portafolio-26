import type { CaseStudy } from "./types";

// Borrador a partir de brief.md; se valida en la fase 6.
export const bookDiary: CaseStudy = {
  en: {
    description:
      "A reading diary where I log books, rate them and see my stats. I built it to practise a full-stack flow end to end: a data model, an external API and a stats page.",
    role: "Design and development (solo project)",
    problem:
      "I wanted one place to keep track of what I read, and a real project to practise a complete CRUD flow with a proper data model.",
    myRole: "I designed the interface, modelled the data in Supabase and built the app with Next.js and TypeScript.",
    decisions: [
      "Supabase (PostgreSQL) for the data model, so books and reading entries live in relational tables.",
      "Open Library API to search books and fill in covers and metadata instead of typing them by hand.",
      "A stats page that turns the reading log into numbers.",
    ],
    result: "A deployed app with full create, read, update and delete, external book search and reading statistics.",
  },
  es: {
    description:
      "Un diario de lectura donde registro libros, los califico y veo mis estadísticas. Lo construí para practicar un flujo full stack completo: modelo de datos, API externa y página de estadísticas.",
    role: "Diseño y desarrollo (proyecto propio)",
    problem:
      "Quería un solo lugar para llevar lo que leo y un proyecto real para practicar un CRUD completo con un modelo de datos bien pensado.",
    myRole: "Diseñé la interfaz, modelé los datos en Supabase y construí la app con Next.js y TypeScript.",
    decisions: [
      "Supabase (PostgreSQL) para el modelo de datos: libros y entradas de lectura viven en tablas relacionales.",
      "API de Open Library para buscar libros y completar portadas y metadatos sin escribirlos a mano.",
      "Una página de estadísticas que convierte el registro de lectura en números.",
    ],
    result: "Una app desplegada con crear, leer, actualizar y eliminar, búsqueda externa de libros y estadísticas de lectura.",
  },
};
