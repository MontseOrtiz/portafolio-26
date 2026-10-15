# Hero
Referencia: https://jsandrieu.com/ (ver moodboard) — nombre gigante a todo el ancho con una imagen pequeña arriba, mucho espacio en blanco.
Objetivo: Decir quién soy, qué hago y cómo contactarme en 5 segundos.
Contenido:
1. Imagen pequeña (no necesariamente foto personal: espacio de trabajo, pizarrón de CrossFit o captura de una app)
2. Nombre: "Montse Ortiz"
3. Rol: "Frontend / Full Stack Developer"
4. Propuesta en una frase (brief.md)
5. Botones: "See projects" (lleva a #projects) y "Contact" (lleva a #contact)
Layout desktop: bloque dentro del `container` con fondo `surface` y `radius-md`, padding `section-lg`. Imagen centrada horizontalmente, de ~240px de ancho, en proporción 4:5. Debajo, el nombre ocupa todo el ancho del bloque. Debajo del nombre, una fila: rol + propuesta a la izquierda (ancho máx. `measure`) y botones a la derecha.
Layout móvil: mismo orden apilado. Imagen de ~160px; nombre en dos líneas ("Montse" / "Ortiz"); rol, propuesta y botones a todo el ancho, uno debajo del otro.
Tipografía: nombre en `display-xl`; rol en `label` color `muted`; propuesta en `body-lg`; botones en `small`.
Espaciado: `gap` entre imagen y nombre y entre nombre y la fila inferior; `gap-sm` entre botones.
Color: fondo `surface`; texto `text`. "See projects" con fondo `accent`, texto `on-accent`; "Contact" con borde 1px `text` y fondo transparente. Ambos `radius-full`. Imagen `radius-none`.
Interacción:
- Hover en botones: fondo `pop` y texto `on-pop` (el de borde cambia a borde `pop` y texto `pop`).
- El nombre es el `h1` de la página.
- La imagen lleva `alt` descriptivo y carga con prioridad (next/image `priority`).
Animación: al cargar, `reveal` escalonado (imagen, nombre, fila inferior) con `stagger` entre cada uno. El nombre debe ser visible de inmediato para no afectar el LCP: solo se anima su opacidad desde 0.01, no su posición. Sin animación con `prefers-reduced-motion`.
No incluir: foto a pantalla completa, video, media que se expande al hacer scroll (queda como mejora opcional después del lanzamiento), carrusel, texto rotativo.
