# Caso de estudio (/projects/[slug])
Referencia: https://wearebou.com/cases/rovio — encabezado con línea divisoria, resumen con checks junto a media grande, bloques de título + párrafo.
Objetivo: Que un líder técnico entienda el problema, mis decisiones y el resultado en 2 minutos.
Contenido (de content/projects/[slug].mdx, en ambos idiomas):
1. Link "← All projects"
2. Encabezado: nombre del proyecto a la izquierda; ícono/logo de la app a la derecha; badge "Concept project" si aplica
3. Resumen (2–3 líneas), lista del stack con íconos de check, links "Live demo" y "Repo"
4. Media principal (mockup o video) a la derecha del resumen
5. Bloques: Problem, My role, Technical decisions, Result
6. Media a todo el ancho entre bloques
7. Cuadrícula de 3–4 capturas
8. Link al siguiente proyecto
Layout desktop: encabezado con divisor 1px `border` debajo. Fila de dos columnas 5/7: resumen + stack + links a la izquierda, media a la derecha. Cada bloque en dos columnas 4/8: título a la izquierda, párrafo a la derecha. Cuadrícula de 2 columnas con bordes 1px `border` entre celdas.
Layout móvil: todo en una columna: encabezado (ícono arriba del nombre), resumen, stack, links, media; bloques con título arriba del párrafo; cuadrícula de 1 columna.
Tipografía: nombre en `heading` (`h1`); títulos de bloque en `title`; resumen en `body-lg`; párrafos en `body`; stack, links y "All projects" en `small`; badge en `label`.
Espaciado: padding `section`; `gap` entre columnas; `section` entre bloques; checks del stack en 2 columnas con `gap-sm`.
Color: fondo `bg`; media sobre `surface`, `radius-none`; íconos de check en `pop`; badge con `accent-soft` / `on-accent-soft` y borde `border`; links con subrayado.
Interacción:
- "Live demo" y "Repo" abren en pestaña nueva con ↗ y texto accesible.
- Las capturas tienen `alt` que describe la pantalla, no "screenshot".
- Si falta el repo, el link no se muestra (sin links rotos).
Animación: `reveal` por bloque; media principal sin animación para no afectar el LCP. Videos según CLAUDE.md.
No incluir: índice flotante sobre la imagen, logos de medios, testimonios inventados, métricas sin respaldo.
