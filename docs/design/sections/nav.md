# Nav
Referencia: https://wearebou.com/ — barra contenida en una tarjeta con bordes redondeados, links al centro y botón de contacto con flecha a la derecha.
Objetivo: Moverse rápido por el sitio y tener el contacto siempre a un clic.
Contenido:
1. Nombre como logo: "Montse Ortiz" (link a inicio)
2. Links: Projects, About, Contact (anclas en la home) y CV (página /cv)
3. Toggle de idioma: EN / ES
4. Toggle de tema: ícono sol/luna
5. CTA: "Let's talk" con ícono de flecha (lleva a #contact)
Layout desktop: barra fija arriba con separación de 16px del borde, ancho de `container`. Fondo `surface`, borde 1px `border`, `radius-md`, padding 12px vertical y 24px horizontal. Tres zonas: nombre a la izquierda, links al centro, toggles + CTA a la derecha.
Layout móvil: nombre a la izquierda y botón de menú a la derecha. El menú abre un panel debajo de la barra (fondo `surface`, `radius-md`) con los links apilados, los dos toggles en una fila y el CTA a todo el ancho.
Tipografía: nombre en `title`; links, toggles y CTA en `small`.
Espaciado: `gap` entre links; `gap-sm` entre toggles; separación superior de 16px.
Color: texto `text`; CTA con fondo `accent`, texto `on-accent`, `radius-full`; ícono de flecha dentro de un círculo `on-accent`.
Interacción:
- Hover en links: color `pop` (`duration-fast`).
- Link de la sección visible marcado con subrayado de 2px en `pop` y `aria-current`.
- Toggles con `aria-label` ("Switch to Spanish", "Switch to dark mode"); el tema respeta `prefers-color-scheme` la primera vez y recuerda la elección.
- Menú móvil: botón con `aria-expanded`, cierra con Escape y al elegir un link; el foco queda atrapado dentro mientras está abierto.
- Enlace "Skip to content" antes del nav, visible al recibir foco.
- Foco visible con anillo `pop`.
Animación: panel móvil con fade + subida de 8px en `duration` y `easing`. Sin animación con `prefers-reduced-motion`.
No incluir: logo gráfico, menú con submenús, ocultar la barra al hacer scroll, links a redes (van en contacto y footer).
