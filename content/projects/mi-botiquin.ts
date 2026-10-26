import type { CaseStudy } from "./types";

export const miBotiquin: CaseStudy = {
  en: {
    description:
      "An offline-first PWA to know what is in the home medicine cabinet without opening a single drawer. It reads a Google Sheet, keeps a local copy and flags expiry dates.",
    role: "Design, development and deployment (solo project)",
    problem:
      "At home we kept buying medicines we already had. Nobody knew what was there, how much was left or what had expired, and the answer usually came at the pharmacy. I wanted a tool that answers three questions from a phone, with or without internet: do I already have it, how much is left and is it still valid?",
    myRole:
      "I did the whole project: I defined the problem and user stories in a SPEC, designed the architecture and the visual system, built the app and deployed it.",
    decisions: [
      "Google Sheets instead of a backend: the sheet is published as CSV and the app only reads it. No login, server or write API, so less to maintain and a smaller risk surface.",
      "Offline-first without corrupting data: the app shows the last copy saved in IndexedDB (Dexie) and then refreshes it. A snapshot is saved only if the whole CSV passes validation; if the network or the format fails, it keeps the last valid copy and shows the error instead of an empty list.",
      "Data kept apart from the shell: the service worker caches only the interface and assets, so a cache never serves an old inventory.",
      "Expiry dates as calendar days (YYYY-MM-DD) compared in local time, so a medicine never expires a day early or late. Badges are red (expired), yellow (expires within 30 days) and green, and always include text and date, not just color.",
      "Instant, tolerant search by brand and generic name that ignores case and accents, plus a native CSV parser instead of a library to keep the app light.",
    ],
    result:
      "A working PWA in production on Vercel: installable, usable offline and mobile first from 375 px. Portfolio screenshots are reproducible with Playwright and synthetic data, so my real inventory is never exposed.",
  },
  es: {
    description:
      "Una PWA offline-first para saber qué hay en el botiquín de casa sin abrir un solo cajón. Lee una hoja de Google Sheets, guarda una copia local y marca los vencimientos.",
    role: "Diseño, desarrollo y despliegue (proyecto propio)",
    problem:
      "En casa comprábamos medicamentos que ya teníamos. Nadie sabía qué había, cuánto quedaba ni qué estaba caducado, y la respuesta solía llegar en la farmacia. Quería una herramienta que respondiera tres preguntas desde el celular, con o sin internet: ¿ya lo tengo?, ¿cuánto me queda? y ¿sigue vigente?",
    myRole:
      "Hice todo el proyecto: definí el problema y las historias de usuario en un SPEC, diseñé la arquitectura y el sistema visual, desarrollé la app y la desplegué.",
    decisions: [
      "Google Sheets en lugar de un backend: la hoja se publica como CSV y la app solo lee. Sin login, servidor ni API de escritura: menos mantenimiento y menos superficie de riesgo.",
      "Offline-first sin corromper datos: la app muestra la última copia guardada en IndexedDB (Dexie) y luego la actualiza. Solo guarda un snapshot si el CSV completo pasa la validación; si falla la red o el formato, conserva la última copia válida y avisa del error en lugar de mostrar una lista vacía.",
      "Datos separados del shell: el service worker guarda solo la interfaz y los assets, para que una caché nunca muestre un inventario viejo.",
      "Vencimientos como fechas de calendario (AAAA-MM-DD) comparadas en hora local, para que un medicamento no venza un día antes o después. Los badges son rojo (vencido), amarillo (vence en 30 días o menos) y verde, y siempre llevan texto y fecha, no solo color.",
      "Búsqueda instantánea y tolerante por nombre comercial y genérico, que ignora mayúsculas y acentos, y un parser CSV nativo en lugar de una librería para mantener la app ligera.",
    ],
    result:
      "Una PWA funcionando en producción en Vercel: instalable, usable sin conexión y mobile first desde 375 px. Las capturas del portafolio son reproducibles con Playwright y datos sintéticos, para no exponer mi inventario real.",
  },
};
