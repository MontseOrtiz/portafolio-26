# Caso de estudio (/projects/[slug])
Referencia: https://jsandrieu.com/04-nextprize (ver moodboard) — media grande arriba, texto + media en dos columnas, bloques de media a todo el ancho, franja oscura con pantallas móviles, "Previous / Next". De https://wearebou.com/cases/rovio: la cuadrícula de bordes finos.
Objetivo: Que un líder técnico entienda el problema, mis decisiones y el resultado en 2 minutos.
Contenido (de content/projects/[slug].mdx, en ambos idiomas):
1. Media principal: imagen del hero del proyecto en desktop; si no hay, la del móvil (video con transiciones más adelante)
2. Resumen: nombre del proyecto (`h1`), badge "Concept project" si aplica, 3–4 líneas de descripción, rol, links "Live demo" y "Repo"
3. Media secundaria a la derecha del resumen: bucle de 6 capturas de escritorio que llenan el marco (`object-cover`, sin ver el fondo); si el proyecto no tiene suficientes de escritorio, se completan con capturas móviles completas sobre su propio desenfoque. La primera se muestra completa; cada 4 s entra la siguiente encima de la anterior, alternando la dirección: izquierda → derecha, abajo → arriba, derecha → izquierda, arriba → abajo, y repite; tras la última vuelve a la primera. Botón de pausa/reanudar
4. Bloques: Problem, My role, Technical decisions, Result
5. Media a todo el ancho entre bloques: imagen completa del home del proyecto sobre `pattern-gingham`, con altura máxima y scroll interno (región enfocable con etiqueta)
6. Stack: cuadrícula con bordes finos, una celda por tecnología (ícono + nombre)
7. Franja oscura con todas las pantallas móviles del proyecto en fila, completas y sin recorte (cada una con su propia altura)
8. Navegación "← Previous" / "Next →" entre proyectos
9. Footer de cierre en su versión de casos de estudio (solo la fila de links, ver footer.md)
Layout desktop: todo dentro del `container`. Media principal 16:9, a todo el ancho del contenedor. Resumen en dos columnas 5/7: texto a la izquierda (ancho máx. `measure`), media secundaria a la derecha en proporción 4:3. Cada bloque en dos columnas 4/8: título a la izquierda, párrafo a la derecha. Cuadrícula del stack de 6 columnas con bordes 1px `border`. Franja oscura con `radius-md` y las pantallas móviles centradas con `gap`.
Layout móvil: una columna: media principal (4:5), resumen, media secundaria, bloques con título arriba del párrafo, cuadrícula del stack de 3 columnas, pantallas móviles con scroll horizontal, Previous / Next.
Tipografía: nombre en `heading`; títulos de bloque en `title`; resumen en `body-lg`; párrafos en `body`; rol, links, stack y Previous / Next en `small`; badge en `label`.
Espaciado: padding `section`; `section` entre bloques; `gap` entre columnas.
Color: fondo `bg`; media sobre `surface`, `radius-none`; franja de pantallas móviles en `accent` (light) y `surface` (dark); badge con `accent-soft` / `on-accent-soft` y borde `border`; links con subrayado.
Interacción:
- "Live demo" y "Repo" abren en pestaña nueva con ↗ y texto accesible; si falta el repo, el link no se muestra.
- Las capturas tienen `alt` que describe la pantalla, no "screenshot".
- Previous / Next: links al caso anterior y siguiente, en ciclo.
- Media secundaria: `role="group"` con nombre accesible; solo la imagen visible es accesible (las demás `aria-hidden`). El bucle automático se puede pausar con el botón (`aria-label` "Pause slideshow" / "Play slideshow").
- Videos según CLAUDE.md (sin audio, loop, póster, carga diferida, solo póster con `prefers-reduced-motion`); el video principal lleva póster con prioridad para no afectar el LCP.
Animación: la media secundaria entra con `duration-slow` y `easing`, sin pausa automática al pasar el cursor; `reveal` por bloque; la media principal sin animación de entrada. Con `prefers-reduced-motion` no hay animaciones: la media secundaria se queda en la primera imagen y no muestra el botón.
No incluir: logos de medios o clientes, índice flotante, testimonios inventados, métricas sin respaldo.
