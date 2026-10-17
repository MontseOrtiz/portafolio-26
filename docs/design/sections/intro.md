# Descripción corta
Referencia: https://jsandrieu.com/ (ver moodboard) — bloque debajo del hero con un párrafo centrado y un punto decorativo.
Objetivo: Contar en 15 segundos quién soy y qué he hecho, con un tono cercano.
Contenido:
1. Párrafo de 3–4 líneas en primera persona: qué hago, dónde he trabajado (startups, consultoría en Xeleva), qué me distingue (aprendizaje rápido, mentoría). Texto final en la fase 6
2. Punto decorativo debajo del párrafo
Layout desktop: bloque dentro del `container`, fondo `surface`, `radius-md`, padding `section-lg`. Párrafo centrado, ancho máx. `measure`. Punto centrado debajo, separado por `gap`.
Layout móvil: igual, con padding `section` y el párrafo a todo el ancho.
Tipografía: párrafo en `body-lg`, centrado.
Espaciado: separación `gap` con el hero y con la sección siguiente.
Color: fondo `surface`; texto `text`; punto de 8px en `pop`.
Interacción: ninguna; el punto lleva `aria-hidden`.
Animación: `reveal` del párrafo al entrar en pantalla. Sin animación con `prefers-reduced-motion`.
No incluir: links, botones, lista de clientes o logos, foto.
