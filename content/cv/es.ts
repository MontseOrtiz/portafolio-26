import type { CvContent } from "./types";

// Transcrito tal cual de montse-ortiz-cv-es.pdf.
// TODO (fase 6, brief.md): alinear con el PDF en inglés y con el sitio (Library Diary → Book Diary,
// X Eleva → Xeleva) y llevar las mismas habilidades y logros a ambos idiomas.
export const cvEs: CvContent = {
  name: "Montserrat Ortiz",
  location: "Querétaro, México",
  summary:
    "Desarrolladora Frontend con más de 4 años construyendo interfaces en producción con React, Next.js, TypeScript y Tailwind CSS, integradas a APIs REST. Experiencia mejorando rendimiento, accesibilidad y SEO (Lighthouse móvil hasta 100/95/100) y trabajando en arquitecturas full stack. Me adapto rápido a nuevos stacks y entrego features de calidad en entornos ágiles.",
  labels: { experience: "Experiencia laboral", education: "Formación", skills: "Habilidades", languages: "Idiomas" },
  experience: [
    {
      dates: "2025 – actualidad",
      title: "Frontend Developer (Freelance)",
      company: "Independiente · Querétaro, México",
      bullets: [
        "Diseñé, construí y desplegué de principio a fin dos aplicaciones full stack en producción, Library Diary y WOD Tracker, con React, Next.js, TypeScript y Tailwind CSS, resolviendo problemas de forma autónoma en todas las capas del proyecto.",
        "Apliqué patrones de componentes reutilizables y buenas prácticas de arquitectura frontend.",
        "Optimicé WOD Tracker hasta obtener 100 en rendimiento, 95 en accesibilidad y 100 en SEO y buenas prácticas en Lighthouse para móvil.",
      ],
    },
    {
      dates: "2023 – 2025",
      title: "Desarrolladora Full Stack",
      company: "X Eleva · Querétaro, México",
      bullets: [
        "Desarrollé más de 10 aplicaciones full stack para clientes de distintos sectores con React y TypeScript, integrando APIs REST bajo metodología Scrum.",
        "Optimizé frontends en varios proyectos mediante componentes temáticos y frameworks de CSS, reduciendo en ~30% el tiempo de implementación de cambios visuales frecuentes.",
        "Colaboré en plataformas de múltiples capas como OxProx, combinando React, Node.js, Go, Python, MySQL y MongoDB, y entregué un MVP en WordPress en 1 semana aprendiendo la plataforma desde cero.",
      ],
    },
    {
      dates: "2021 – 2023",
      title: "Desarrolladora Full Stack e Instructora de Programación",
      company: "DEV.F · Querétaro, México",
      bullets: [
        "Desarrollé aplicaciones full stack con JavaScript moderno, React y Context API, llevando a código diseños de Figma con enfoque pixel perfect y cuidado del detalle en CSS.",
        "Escribí y actualicé pruebas unitarias con Jest para cada cambio, trabajando en un pipeline de CI/CD que bloqueaba merges con cobertura menor al 75%.",
        "Impartí clases de desarrollo web full stack y brindé mentoría técnica personalizada a más de 60 estudiantes, reforzando buenas prácticas de frontend y testing.",
      ],
    },
    {
      dates: "2019 – 2020",
      title: "Desarrolladora Frontend",
      company: "Soy Agencia · México",
      bullets: [
        "Desarrollé más de 20 landing pages responsivas principalmente con HTML y CSS, aplicando optimización de rendimiento (compresión de imágenes, carga diferida).",
        "Convertí diseños de Figma y Zeplin en implementaciones web fieles al diseño, trabajando bajo metodologías ágiles Scrum.",
      ],
    },
  ],
  education: [
    {
      dates: "2020 – 2021",
      title: "Máster en Desarrollo Web Full Stack",
      company: "DEV.F · México",
      bullets: [
        "Formación intensiva en desarrollo web full stack con JavaScript moderno, React, Node.js y bases de datos relacionales.",
        "Construcción de aplicaciones web desde cero, desde el diseño de componentes frontend hasta la creación y consumo de APIs REST.",
        "Práctica de control de versiones con Git/GitHub, trabajo colaborativo y despliegue de proyectos a producción.",
      ],
    },
    {
      dates: "2018 – 2020",
      title: "Maestría en Administración, Especialidad en Logística Internacional",
      company: "Universidad del Valle de México · México",
      bullets: [
        "Enfoque en logística internacional, gestión de cadenas de suministro y optimización de procesos.",
        "Desarrollo de proyectos orientados a eficiencia operativa, análisis de datos básicos y toma de decisiones basada en indicadores.",
        "Trabajo en equipo y presentaciones ejecutivas de propuestas de mejora de procesos logísticos.",
      ],
    },
    {
      dates: "2018 – 2019",
      title: "Bootcamp de Desarrollo Web",
      company: "Ironhack · México",
      bullets: [
        "Bootcamp intensivo de desarrollo web con stack MERN (MongoDB, Express, React, Node.js).",
        "Construcción de aplicaciones full stack, desde el diseño de interfaces en React hasta la creación de APIs con Node.js/Express y persistencia en MongoDB.",
        "Trabajo en equipo en sprints cortos, con enfoque en entrega de MVPs y presentación de proyectos finales a un panel técnico.",
      ],
    },
    {
      dates: "2013 – 2016",
      title: "Licenciatura en Negocios Internacionales",
      company: "Universidad del Valle de México · México",
      bullets: [
        "Formación en comercio exterior, negocios internacionales y gestión de operaciones entre distintos mercados.",
        "Desarrollo de proyectos enfocados en análisis de mercados, procesos de importación/exportación y optimización de costos.",
        "Trabajo en equipo multidisciplinario y presentaciones de propuestas de negocio a perfiles directivos.",
      ],
    },
  ],
  skills: [
    { label: "Frontend", items: ["React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS"] },
    { label: "Backend", items: ["Node.js", "Express", "Diseño e Integración de APIs REST"] },
    { label: "Bases de Datos", items: ["SQL", "MySQL", "Bases de Datos Relacionales"] },
    { label: "Contenedores", items: ["Docker"] },
    {
      label: "Trabajo Autónomo Full Stack",
      items: ["Resolución de Problemas en Frontend, Backend e Integración de Datos, Sin Supervisión Constante"],
    },
    { label: "Testing y CI/CD", items: ["Jest", "Pipelines de Integración Continua con Gates de Cobertura de Pruebas"] },
    { label: "IA Aplicada al Desarrollo", items: ["Claude Code", "ChatGPT", "GitHub Copilot"] },
  ],
  languages: [
    { name: "Español", level: "Lengua materna" },
    { name: "Inglés", level: "Elemental" },
  ],
};
