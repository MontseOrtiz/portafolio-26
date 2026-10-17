# Proyectos
Referencia: https://wschupfer.com/los-angeles/ (ver moodboard) — tira horizontal de imágenes de distintos tamaños y alturas escalonadas.
Objetivo: Probar que sé construir: el reclutador ve los 3 proyectos y entra a sus casos de estudio.
Ancla de la sección: `#work` (link "Work" del nav).
Contenido:
1. Encabezado: etiqueta "Selected work", título "Projects", contador "1 / 3" y flechas anterior/siguiente
2. Tres tarjetas (Book Diary, WOD Tracker, Destino China), cada una con:
   - Mockup (imagen o video corto) sobre `surface`
   - Nombre del proyecto
   - "Qué demuestra" en una línea
   - Stack como etiquetas
   - Links: "Case study" (página /projects/[slug]) y "Live demo" (externo, ↗)
   - Destino China lleva badge "Concept project"
Layout desktop: encabezado arriba (título a la izquierda, contador y flechas a la derecha). Tira con scroll horizontal y scroll-snap. Tarjetas de tres anchos que se alternan (480px, 360px, 420px) y alturas escalonadas: desplazamiento vertical de 0, 48px y 24px. La primera tarjeta siempre completa en pantalla y la siguiente asomándose.
Layout móvil: misma tira con swipe; cada tarjeta ocupa ~85% del ancho para que se vea la siguiente. Sin desplazamiento vertical. Contador visible; flechas ocultas.
Tipografía: título en `heading`; etiqueta y contador en `label`; nombre del proyecto en `title`; "qué demuestra" en `body`; stack y links en `small`.
Espaciado: padding `section`; `gap` entre tarjetas; `gap-sm` entre etiquetas del stack.
Color: mockup sobre `surface`, `radius-none`; etiquetas del stack con fondo `powder` y texto `on-powder`, `radius-full`; badge "Concept project" con fondo `accent-soft`, texto `on-accent-soft` y borde 1px `border`; links en `text` con subrayado.
Interacción:
- Toda la tarjeta es clicable hacia el caso de estudio; "Live demo" es un link aparte que abre en pestaña nueva.
- Hover: la imagen escala a `hover-scale` y el nombre cambia a `pop`.
- Teclado: las tarjetas reciben foco con Tab y la tira se desplaza para mostrarla; flechas con `aria-label` ("Previous project", "Next project"); el contador se actualiza con `aria-live="polite"`.
- La tira es una lista (`ul`) con `aria-label="Projects"`.
Animación: hover en `duration` y `easing`; tarjetas con `reveal` al entrar. Videos según CLAUDE.md (sin audio, loop, póster, carga diferida, solo póster con `prefers-reduced-motion`).
No incluir: autoplay del carrusel, filtros o categorías, más de 3 proyectos, Patitas Coquetas.
