import type { CaseStudy } from "./types";

// Borrador a partir de brief.md; se valida en la fase 6.
export const wodTracker: CaseStudy = {
  en: {
    description:
      "A mobile-first app to log CrossFit workouts. Gemini reads a photo of the gym whiteboard and turns it into structured data.",
    role: "Design and development (solo project)",
    problem:
      "I train CrossFit and the workout of the day lives on a whiteboard. Typing it into an app after class was friction I wanted to remove.",
    myRole: "I designed the flow, built the app with Next.js and TypeScript and integrated Gemini and Supabase.",
    decisions: [
      "Gemini API to extract the workout from a photo of the whiteboard, so logging takes a picture instead of typing.",
      "Mobile first, because the app is used at the gym, on a phone.",
      "Supabase to store workouts, deployed on Vercel with performance and accessibility in mind.",
    ],
    result: "In production on Vercel, with mobile Lighthouse scores of 100 / 95 / 100 (performance, accessibility, SEO).",
  },
  es: {
    description:
      "Una app mobile first para registrar entrenamientos de CrossFit. Gemini lee la foto del pizarrón del gimnasio y la convierte en datos.",
    role: "Diseño y desarrollo (proyecto propio)",
    problem:
      "Hago CrossFit y el entrenamiento del día vive en un pizarrón. Pasarlo a mano a una app después de la clase era una fricción que quería quitar.",
    myRole: "Diseñé el flujo, construí la app con Next.js y TypeScript e integré Gemini y Supabase.",
    decisions: [
      "API de Gemini para extraer el entrenamiento de la foto del pizarrón: registrar es tomar una foto, no escribir.",
      "Mobile first, porque la app se usa en el gimnasio, desde el celular.",
      "Supabase para guardar los entrenamientos y despliegue en Vercel cuidando rendimiento y accesibilidad.",
    ],
    result:
      "En producción en Vercel, con Lighthouse móvil de 100 / 95 / 100 (rendimiento, accesibilidad, SEO).",
  },
};
