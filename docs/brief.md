# brief.md — Portafolio 26

El portafolio tiene dos objetivos: conseguir entrevistas para un puesto remoto de Frontend / Full Stack y mostrar mis habilidades. El sitio mismo es una prueba de lo que sé hacer: su diseño, rendimiento, accesibilidad y código forman parte del portafolio.

Prioridad: lo que el reclutador necesita entender en 30 segundos va primero. Los detalles para lucirse (animaciones, videos, la página de CV) nunca estorban eso ni bajan Lighthouse de 90.

| Campo | Contenido |
| --- | --- |
| Rol objetivo | Frontend / Full Stack Developer (Junior/Mid), remoto |
| Público | Reclutadores (escanean 30 s) y líderes técnicos (revisan proyectos y código) |
| Propuesta en una frase | EN: I build fast, clear interfaces with React and Next.js — and I learn whatever the project needs, fast. / ES: Construyo interfaces rápidas y claras con React y Next.js, y aprendo rápido lo que el proyecto necesite. |
| Stack a destacar | React, Next.js, TypeScript, Node.js, PostgreSQL (Supabase), MongoDB |
| Diferenciadores | Aprendizaje rápido (sitio WordPress a medida en una semana), mentoría de juniors en Xeleva, SEO, desarrollo con agentes de IA |
| CTA principal | Enviar correo |
| CTA secundario | CV: descargar PDF (una versión por idioma) y verlo en /about#cv |
| Idiomas del sitio | Inglés (principal) y español. Toda la copy existe en ambos idiomas; el inglés se escribe primero |
| Tono | Casual y amable, cercano y profesional. Deja ver mi personalidad para que se note cómo sería trabajar conmigo |

## Tono en la práctica

- Sí: primera persona, frases cortas, humor ligero, anécdotas concretas (cambio de carrera, startups, CrossFit).
- No: jerga de relleno ("passionate", "ninja", "guru"), chistes internos, sarcasmo, exceso de emojis.

## CV en el sitio (/about#cv)

Versión divertida e interactiva de mi CV que muestra personalidad y habilidad técnica. Convive con el PDF: el PDF es el que pasa filtros ATS y se descarga; la página es para que la disfruten. Mismo contenido que el PDF, en ambos idiomas, accesible y usable en móvil.

CV de origen: Montserrat_Ortiz_-_CV_2026-09-30.pdf (ES) y Softteck_EN_Montserrat_Ortiz-CV.pdf (EN), en los archivos del Proyecto.

### Ajustes para alinear el CV con el portafolio

- Una sola versión de contenido: hoy el CV en inglés no es traducción del español (logros distintos) y está adaptado a una vacante. Para el portafolio se usa una versión general, igual en ambos idiomas.
- Nombres iguales en todos lados: "Library Diary" (CV ES) → "Book Diary"; "X Eleva" → "Xeleva"; "Independiente" → "Independent" en el CV EN.
- Bases de datos: agregar PostgreSQL (Supabase) y MongoDB a habilidades, como en "Stack a destacar".
- Diferenciadores visibles en ambos idiomas: el sitio WordPress en una semana (falta en EN) y la mentoría en Xeleva (no aparece en ninguno).
- Habilidades: listar solo lo que se puede respaldar en una entrevista técnica (revisar JWT, OAuth 2.0, Redux, Material UI, Ant Design, React Testing Library en el CV EN).

Concepto: el CV como un folder minimalista (referencia: cv.iamrob.in).

- Una sola hoja con todo el CV, que se lee con scroll, sobre un fondo oscuro.
- Pestañas laterales tipo separador para cambiar de idioma (English / Español).
- Layout en columnas: etiqueta de sección, puesto/empresa/fechas y descripción.
- Guiño al pizarrón de WOD solo en los detalles: las cifras de los logros resaltadas como repeticiones. Sin fuente de tiza.
- Botón visible para descargar el PDF.

## Proyectos destacados

Cada tarjeta muestra: mockup (imagen o video corto), nombre, qué demuestra, stack y link al proyecto.

| Proyecto | Tipo | Qué demuestra | Stack | Links |
| --- | --- | --- | --- | --- |
| Book Diary | App propia | CRUD completo con modelo de datos en Supabase, integración con API externa (Open Library), página de estadísticas | Next.js, TypeScript, Tailwind CSS, Supabase, Open Library API | Demo: https://book-diary-flax.vercel.app/ · Repo: [pendiente] |
| WOD Tracker | App propia | Integración de IA (Gemini convierte la foto del pizarrón en datos), mobile first, Lighthouse móvil 100/95/100 (rendimiento, accesibilidad, SEO), en producción en Vercel, resuelve un problema propio real | Next.js, TypeScript, Tailwind CSS, Supabase, Gemini API | Demo: https://wod-tracker-iota.vercel.app/ · Repo: [pendiente] |
| Destino China | Proyecto de práctica (sitio conceptual para una agencia de viajes) | Sitio completo en WordPress/Elementor (inicio, servicios, itinerarios, blog, contacto), SEO on-page con Yoast, copy orientado a conversión, [resultado medible] | WordPress, Elementor, Yoast SEO | Sitio: https://china.holasoymontse.com/ |

Los proyectos de práctica se presentan como tales ("concept project"); nunca como cliente real.

Cada proyecto tendrá un caso de estudio corto en ambos idiomas: problema, rol, decisiones técnicas, resultado, mockups.

## El portafolio como proyecto

- Repo público con README claro: stack, decisiones técnicas y cómo correr las pruebas.
- Pruebas de Playwright en móvil y escritorio, visibles en el repo como señal técnica.
- Lighthouse ≥ 90 en Performance, Accessibility y SEO.

## Notas

- Stack vs. evidencia: PostgreSQL (Supabase) se respalda con Book Diary y WOD Tracker; MongoDB, con la experiencia laboral.
- Correo de contacto: preferir uno con el dominio propio (holasoymontse.com).
- Patitas Coquetas (https://mascotas.holasoymontse.com/) no entra al portafolio: es un proyecto de práctica hecho con un builder no-code.
- Los proyectos se muestran tal como están hoy. Pulirlos es un trabajo aparte que empieza al terminar el portafolio (ver abajo).
- Los demos deben verse bien sin explicación: un reclutador que encuentra un error o datos de relleno cierra la pestaña.
- Videos de mockup: cortos, sin audio, en loop, comprimidos, con imagen de póster y carga diferida. Con prefers-reduced-motion se muestra solo la imagen.

## Pendientes

Base (decisiones que definen la estructura del sitio):

- [x] Escribir la propuesta en una frase
- [x] Decidir el CTA principal
- [x] Decidir idioma(s)
- [x] Definir el tono
- [x] Decidir la base de datos en el stack
- [x] Definir el concepto de la página /cv
- [x] Links de demo de cada proyecto
- [x] Decidir si Patitas Coquetas entra al portafolio (no entra)
- [x] Decidir el alcance de los proyectos (se muestran como están; se pulen después)
- [x] CV en PDF en inglés y español

Contenido final (se llena al final; mientras tanto el sitio usa los textos actuales o placeholders):

- [ ] Validar "Qué demuestra" de cada proyecto
- [ ] Links de repo de cada proyecto (¿públicos con README?)
- [ ] Conseguir un resultado medible de Destino China (score de Lighthouse/PageSpeed, tiempo de construcción o número de páginas optimizadas)
- [ ] Hacer mockups por proyecto (imagen o video) y 3–4 capturas para el caso de estudio
- [ ] Definir el correo de contacto
- [ ] Alinear el CV con el portafolio (ver "Ajustes" en la sección de /cv)

## Después del portafolio: pulir proyectos

No bloquea el portafolio. Única excepción: antes del lanzamiento, todos los demos deben cargar sin errores.

- [ ] Book Diary: la página principal muestra "Error al cargar tus libros: TypeError: fetch failed" (probable pausa del proyecto gratuito de Supabase). Reactivarlo y evitar que se vuelva a pausar
- [ ] Book Diary y WOD Tracker: modo demo para reclutadores (hoy no tienen login y cualquier visitante puede modificar los datos). Opción preferida: inicio de sesión anónimo de Supabase con botón "Try the demo" y RLS
- [ ] Destino China: quitar datos de relleno (teléfono 123456789 en el footer)
- [ ] Al pulir, actualizar "Qué demuestra" de cada proyecto (ej. agregar auth)
