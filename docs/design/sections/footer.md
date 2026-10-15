# Footer
Referencia: sin referencia propia; se diseña con el look del sitio base.
Objetivo: Cerrar el sitio con lo esencial y un detalle de personalidad.
Contenido:
1. Links: Projects, About, CV, GitHub, LinkedIn
2. "© 2026 Montse Ortiz" (el año se calcula solo)
3. Crédito: "Made with ♥ in Querétaro" (texto final en la fase 6)
4. Link "Back to top"
Layout desktop: una fila dentro del `container`, separada del contacto por un divisor 1px `border`: copyright y crédito a la izquierda, links al centro, "Back to top" a la derecha.
Layout móvil: apilado y alineado a la izquierda: links, luego copyright y crédito, luego "Back to top".
Tipografía: todo en `small`; copyright en `muted`.
Espaciado: padding vertical de 32px; `gap` entre links.
Color: fondo `bg`, texto `text`; el corazón en `cherry` (único uso de `cherry` en el sitio).
Interacción:
- Hover en links: `pop`.
- Links externos con ↗ y texto accesible "(opens in a new tab)".
- El corazón lleva `aria-hidden` y el texto accesible dice "Made with love in Querétaro".
- "Back to top" mueve el foco al inicio de la página.
Animación: ninguna aparte de los hovers.
No incluir: newsletter, mapa del sitio extenso, logos de herramientas, segundo CTA de contacto.
