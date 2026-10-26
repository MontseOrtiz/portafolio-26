# Footer de cierre
Referencia: https://jsandrieu.com/ (ver moodboard) — bloque final con una frase gigante y abajo una fila de links.
Objetivo: Cerrar cada página con una invitación clara y los links de contacto.
Ancla: `#contact` (el CTA "Let's talk" del nav lleva aquí).
Contenido (la frase cambia según la página):
1. Home: "Let's work together" / "Trabajemos juntos", link `mailto:` al correo
2. /about: "Selected work →" / "Proyectos →", link a /#work
3. Casos de estudio: sin frase, solo la fila de links (va después de "Previous / Next")
4. Fila inferior: LinkedIn (izquierda), correo (centro), GitHub (derecha)
5. Debajo, en pequeño: "© 2026 Montse Ortiz · Made with ♥ in Querétaro" (año automático)
Layout desktop: bloque dentro del `container`, fondo `surface`, `radius-md`. Frase alineada abajo a la izquierda, a todo el ancho, con mucho aire arriba (padding superior `section-lg`). Fila inferior separada por divisor 1px `border`, con los tres links repartidos (izquierda, centro, derecha).
Layout móvil: frase en dos líneas; fila de links apilada a la izquierda.
Tipografía: frase en `display-xl` (en los casos de estudio y About va en una sola línea: se reduce para caber en su contenedor); links en `label`; copyright en `label` color `muted`.
Espaciado: padding `section`; `gap` entre la frase y la fila; padding vertical de 16px en la fila.
Color: fondo `surface`, texto `text`; patrón `pattern-awning` como franja superior del bloque en el home; corazón en `cherry` (`cherry` también se usa en la frase central de Tools).
Interacción:
- Hover en la frase y en los links: color `pop` (`duration-fast`).
- LinkedIn y GitHub abren en pestaña nueva con ↗ y texto accesible "(opens in a new tab)".
- El corazón lleva `aria-hidden`; el texto accesible dice "Made with love in Querétaro".
Animación: la frase entra con `reveal` al aparecer en pantalla. Sin animación con `prefers-reduced-motion`.
No incluir: formulario de contacto, teléfono, newsletter, mapa del sitio, Instagram.
