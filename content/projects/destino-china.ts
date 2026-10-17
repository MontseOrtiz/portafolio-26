import type { CaseStudy } from "./types";

// Borrador a partir de brief.md; se valida en la fase 6.
// TODO: resultado medible (score de Lighthouse/PageSpeed, tiempo de construcción, etc.).
export const destinoChina: CaseStudy = {
  en: {
    description:
      "A concept website for a travel agency focused on China. It is a practice project, not a real client.",
    role: "WordPress build, on-page SEO and copy (concept project)",
    problem:
      "Practice brief: a travel agency site that explains the services, shows itineraries and turns visitors into enquiries.",
    myRole: "I built the whole site in WordPress and Elementor, optimised it for SEO and wrote the copy.",
    decisions: [
      "WordPress and Elementor for five areas: home, services, itineraries, blog and contact.",
      "Yoast SEO for on-page SEO on every page.",
      "Copy written to lead visitors towards getting in touch.",
    ],
    result: "A complete concept site with home, services, itineraries, blog and contact pages.",
  },
  es: {
    description:
      "Un sitio conceptual para una agencia de viajes enfocada en China. Es un proyecto de práctica, no un cliente real.",
    role: "Construcción en WordPress, SEO on-page y copy (proyecto conceptual)",
    problem:
      "Brief de práctica: el sitio de una agencia de viajes que explique los servicios, muestre itinerarios y convierta visitas en consultas.",
    myRole: "Construí todo el sitio en WordPress y Elementor, lo optimicé para SEO y escribí el copy.",
    decisions: [
      "WordPress y Elementor para cinco áreas: inicio, servicios, itinerarios, blog y contacto.",
      "Yoast SEO para el SEO on-page de cada página.",
      "Copy escrito para llevar a las personas a ponerse en contacto.",
    ],
    result: "Un sitio conceptual completo con páginas de inicio, servicios, itinerarios, blog y contacto.",
  },
};
