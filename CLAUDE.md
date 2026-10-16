# Portafolio 26

## Contexto
Portafolio de Montse, Frontend/Full Stack. Objetivos: conseguir entrevistas remotas y mostrar sus habilidades (el sitio mismo es parte del portafolio).
Siempre leer: docs/brief.md y docs/design/tokens.md.
Al trabajar una sección: leer docs/design/sections/<seccion>.md.

## Stack
- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS con los tokens de tokens.md como variables CSS
- shadcn/ui para componentes base accesibles
- Motion para animaciones sutiles
- MDX para casos de estudio (content/projects/*.mdx)
- next/font para tipografías, next/image para imágenes
- Playwright para pruebas y capturas en móvil y escritorio
- Lighthouse para verificación
- Deploy en Vercel
- next-intl para internacionalización: en (principal) y es, con rutas /en y /es
- next-themes para light/dark (respeta prefers-color-scheme y recuerda la elección)

## Estructura
- app/ → rutas (/, /projects/[slug], /cv), en ambos idiomas
- components/sections/ → una sección por archivo
- components/ui/ → componentes base
- content/ → textos y MDX por idioma (nunca hardcodear copy en componentes)


## Archivos de media
- Imágenes en public/images/<sección>/; proyectos en public/images/projects/<slug>/ (mismo slug que el MDX).
- Nombres: inglés, minúsculas, kebab-case, sin espacios, acentos, "final", "v2" ni "copy". Patrón: <sección o slug>-<contenido>[-desktop|-mobile].<ext>
- Formatos: WebP para imágenes (con transparencia si hace falta), MP4 para videos con su póster <nombre>-poster.webp.
- CVs en public/cv/: montse-ortiz-cv-en.pdf y montse-ortiz-cv-es.pdf.

## Reglas
- Solo valores de tokens.md; nada de colores o tamaños sueltos.
- Mobile first; probar en 375px y 1440px.
- Accesibilidad: HTML semántico, contraste AA, foco visible, alt en imágenes.
- Light y dark mode.
- Videos: sin audio, en loop, comprimidos, con póster y carga diferida; con prefers-reduced-motion se muestra solo el póster.
- Una sección por tarea; no tocar otras secciones.
- Commit al terminar cada sección.

## Terminado =
- npm run build, lint y typecheck sin errores
- Capturas de Playwright en móvil y desktop revisadas contra la spec
- Lighthouse ≥ 90 en Performance, Accessibility, SEO
