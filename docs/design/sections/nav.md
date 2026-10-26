# Nav
Referencia: https://wearebou.com/ (barra contenida en una tarjeta redondeada, CTA con flecha) + https://jsandrieu.com/ (nombre y rol juntos a la izquierda).
Objetivo: Moverse rápido por el sitio y tener el contacto siempre a un clic.
Contenido:
1. Izquierda: "Montse Ortiz" (link a inicio) + separador "|" + ""
2. Centro: About (página /about), Work (/#work) y CV (/about#cv)
3. Derecha: toggle de idioma EN / ES, toggle de tema (ícono sol/luna) y CTA "Let's talk" / "Hablemos" con ícono de flecha (lleva al footer de cierre: /#contact en el home; en otras páginas, al footer de esa página)
Layout desktop: barra fija arriba con separación de 16px del borde, ancho de `container`. Tarjeta separada del hero: fondo `bg`, borde 1px `border`, `radius-md`, padding 12px vertical y 24px horizontal. Tres zonas: nombre + rol a la izquierda, links al centro, toggles + CTA a la derecha. El contenido de la página empieza debajo del nav con `gap` de separación.
Layout móvil: solo el nombre a la izquierda (el rol se oculta) y botón de menú a la derecha. El menú abre un panel debajo de la barra (fondo `bg`, borde 1px `border`, `radius-md`) con los links apilados, los dos toggles en una fila y el CTA a todo el ancho.
Tipografía: nombre en `small` peso 500 con Geist (sans); separador y rol en `small` color `muted`; links, toggles y CTA en `small`.
Espaciado: `gap` entre links; `gap-sm` entre nombre, separador y rol, y entre toggles; separación superior de 16px.
Color: texto `text`; CTA con fondo `accent`, texto `on-accent`, `radius-full`; ícono de flecha dentro de un círculo `on-accent`.
Interacción:
- Hover en links: color `pop` (`duration-fast`).
- Link de la sección visible marcado con subrayado de 2px en `pop` y `aria-current`.
- Toggles con `aria-label` ("Switch to Spanish", "Switch to dark mode"); el tema respeta `prefers-color-scheme` la primera vez y recuerda la elección.
- El separador "|" lleva `aria-hidden`.
- Menú móvil: botón con `aria-expanded`, cierra con Escape y al elegir un link; el foco queda atrapado dentro mientras está abierto.
- Enlace "Skip to content" antes del nav, visible al recibir foco.
- Foco visible con anillo `pop`.
Animación: al cargar la página, la tarjeta del nav baja desde arriba con `intro-nav`, al mismo tiempo que el nombre del hero (ver hero.md). Panel móvil con fade + subida de 8px en `duration`. Sin animación con `prefers-reduced-motion`.
No incluir: logo gráfico, link "Contact" en el centro (lo cubre el CTA), menú con submenús, ocultar la barra al hacer scroll, links a redes (van en contacto y footer).

A la izquierda solo va el nombre (sin rol).
