# Tools
Referencia: https://perspectivecards.framer.website/ (ver moodboard) — tarjetas inclinadas en perspectiva flotando alrededor de una frase central.
Objetivo: Mostrar de un vistazo las herramientas con las que trabajo, con personalidad.
Contenido:
1. Frase central: "Tools I build with" + una línea de apoyo (texto final en la fase 6)
2. Una tarjeta por herramienta, con su ícono y su nombre. Lista en content/ (solo lo que puedo respaldar en una entrevista): React, Next.js, TypeScript, JavaScript, Node.js, Express, Tailwind CSS, Supabase, PostgreSQL, MongoDB, MySQL, Docker, Jest, Playwright, Git, GitHub, Vercel, WordPress, Claude Code
3. Patrón `pattern-awning` como franja superior de la sección y, espejado, como franja inferior; las rayas van en `pop` sobre `bg` para distinguirse de las secciones vecinas
Layout desktop (≥ 1280px; por debajo se usa el bento del móvil, porque las posiciones fijas necesitan 1152px de ancho): bloque dentro del `container` con fondo `bg`, borde 1px `border` y `radius-md`, padding `section-lg`. Frase centrada (ancho máx. `measure`). Tarjetas distribuidas alrededor en posiciones fijas definidas en el componente (escala de 4px), de 3 tamaños (96, 128 y 160px de ancho), cada una con `tilt-3d` distinto y `perspective` (aplicada con la función `perspective()` en cada tarjeta, para que el 3D no dependa de la cadena de contenedores). Posiciones en `components/sections/tools.tsx`.
Layout móvil: bento grid desigual tipo Pinterest en 3 columnas (masonry), tarjetas de alturas distintas. La frase va en una tarjeta que ocupa 2 columnas en medio de la cuadrícula. Sin perspectiva.
Tipografía: frase en `heading`; línea de apoyo en `body`; nombre de cada herramienta en `label`. En móvil (bento) las tarjetas muestran solo el ícono; el nombre queda como texto solo para lectores de pantalla (`sr-only`).
Espaciado: `gap` entre tarjetas en móvil; `gap-sm` entre ícono y nombre.
Color: frase central y línea de apoyo en `cherry` (contraste 7.3 / 7.9 sobre `bg`); tarjetas alternando fondos `surface`, `powder` y `accent-soft` (con texto `text`, `on-powder` y `on-accent-soft`), `radius-sm`; íconos monocromos en el color de texto de su tarjeta.
Interacción:
- La lista de herramientas es un `ul` con `aria-label="Tools"`; los íconos llevan `aria-hidden` y el nombre es texto real.
- Hover (solo con puntero): la tarjeta rota a 0° y escala a `hover-scale`.
- Íconos SVG de Simple Icons (licencia CC0), en línea, sin peticiones externas.
Animación: las tarjetas entran con `reveal` y `stagger` al entrar la sección en pantalla; hover en `duration` y `easing`. Con `prefers-reduced-motion`: sin entrada ni rotación en hover.
No incluir: barras o porcentajes de nivel, logos en color de marca, herramientas que no pueda respaldar, carrusel.
