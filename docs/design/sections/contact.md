# Contacto
Referencia: sin referencia propia; se diseña con el look del sitio base.
Objetivo: Convertir: que el reclutador me escriba o descargue mi CV.
Contenido:
1. Etiqueta "Contact"
2. Título: "Let's work together" (texto final en la fase 6)
3. Una línea de invitación (disponibilidad para trabajo remoto)
4. Correo como CTA grande con botón "Copy"
5. Links: LinkedIn, GitHub
6. CV: "Download PDF" (versión según el idioma) y "View CV" (lleva a /about#cv)
Layout desktop: bloque dentro del `container` con fondo `accent`, texto `on-accent` y `radius-md`, padding `section-lg`. Etiqueta, título e invitación arriba a la izquierda; correo en una fila propia; abajo, links a la izquierda y botones de CV a la derecha.
Layout móvil: todo apilado; el correo puede partir en dos líneas sin desbordar; botones de CV a todo el ancho.
Tipografía: etiqueta en `label`; título en `heading`; invitación en `body-lg`; correo en `heading` con subrayado; links y botones en `small`.
Espaciado: `gap` entre filas; `gap-sm` entre links y entre botones.
Color: fondo `accent`, texto `on-accent`. Botón "Copy" y botones de CV con borde 1px `on-accent`, `radius-full`; el principal ("Download PDF") con fondo `on-accent` y texto `accent`.
Ubicación: en el home, tras Proyectos; el ancla `#contact` la lleva el footer de cierre (footer.md); este bloque usa `#get-in-touch`.
Interacción:
- El correo es un link `mailto:`.
- "Copy" copia el correo y muestra "Copied!" durante 2 s, anunciado con `aria-live="polite"`.
- LinkedIn y GitHub abren en pestaña nueva, con ↗ y texto accesible "(opens in a new tab)".
- Hover: subrayado más grueso en links; los botones invierten fondo y texto.
Animación: `reveal` del bloque; cambios de hover en `duration-fast`. Sin animación con `prefers-reduced-motion`.
No incluir: formulario de contacto, número de teléfono, mapa, calendario para agendar.
