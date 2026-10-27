# Hero
Referencia: https://jsandrieu.com/ (ver moodboard) — primera pantalla minimalista: imagen pequeña, nombre gigante que sube al cargar, mucho espacio en blanco; debajo, media que se expande al hacer scroll.
Objetivo: Decir quién soy y qué hago en 5 segundos, con un look minimalista. El contacto queda en el CTA del nav.
Contenido:
1. Imagen pequeña: public/images/hero/hero-avatar-browser.webp
2. Nombre: "Montse Ortiz"
3. Rol: "Frontend / Full Stack Developer"
4. Propuesta en una frase (brief.md)
5. Media de proyectos (`#work`): debajo de la primera pantalla, el hero de cada proyecto (imagen desktop si existe, si no la móvil) con su nombre encima y link a su caso de estudio. Cada uno ocupa el 100% del alto de la ventana, se ve desde arriba y lleva el filtro `filter-editorial`. El nombre va abajo y centrado en `on-media` a la mitad de `display-xl`, sin subrayar, y tras `delay-learn-more` aparece debajo "Conocer más" en más pequeño. Entran uno tras otro con el scroll: el primero se expande y los demás lo tapan desde abajo hasta llegar al último. "Work" (nav) y "Selected work" (footer) llevan a esta sección
Primera pantalla: nav, imagen, nombre, rol y propuesta. Nada más.
Layout desktop: bloque dentro del `container` con fondo `surface` y `radius-md`, que empieza en el mismo punto que el nav (sin espacio entre ambos: el nav flota sobre su parte superior) y ocupa el resto del alto de la ventana. Imagen centrada horizontalmente, de ~240px de ancho, en proporción 4:5. Debajo, el nombre ocupa todo el ancho del bloque. Debajo del nombre, alineados a la izquierda: rol y propuesta (ancho máx. `measure`).
Media que se expande (desktop): bloque de proporción 16:9 debajo del hero, separado por `gap`. Empieza con el ancho de `container` y, conforme entra en pantalla con el scroll, crece hasta el ancho completo de la ventana. Se anima con clip-path (no con width). Nombre del proyecto centrado abajo, sobre `scrim`, en `heading` color `on-media`. Media `radius-none`.
Layout móvil: mismo orden apilado. Imagen de ~160px; nombre en dos líneas ("Montse" / "Ortiz"); rol y propuesta a todo el ancho. La media va después, a todo el ancho, en proporción 4:5 y sin expansión.
Tipografía: nombre en `display-xl`; rol en `label` color `muted`; propuesta en `body-lg`.
Espaciado: `gap` entre imagen y nombre y entre nombre y rol; `gap-sm` entre rol y propuesta.
Color: fondo `surface`; texto `text`. Imagen sin fondo ni borde (es transparente).
Interacción:
- El nombre es el `h1` de la página.
- La imagen lleva `alt` descriptivo y carga con prioridad (next/image `priority`).
- Cada proyecto es un link a su caso de estudio; solo el visible se puede enfocar (los demás van con `inert`); carga diferida (no `priority`), con póster si es video. Videos según CLAUDE.md.
Animación (secuencia al cargar, como en jsandrieu.com):
1. 0 ms: el nav baja con `intro-nav` y, al mismo tiempo, el nombre sube con `intro-name` (sin máscara). La opacidad inicial de 0.001 hace que el navegador cuente el nombre como visible desde el inicio, así no se afecta el LCP.
2. `intro-delay` después: la imagen aparece poco a poco con `intro-reveal`.
3. `intro-delay` + `stagger` × 2: el rol y la propuesta aparecen con `intro-reveal`.
Toda la secuencia de entrada usa el mismo mecanismo y el mismo punto de partida (el primer render), para que no se desfase: si una parte arranca con CSS y otra espera a que cargue el JavaScript, en conexiones lentas la imagen aparece antes que el nombre. Recomendado: CSS con keyframes, y el spring del nombre con la función `linear()` de CSS, para que todo empiece sin esperar al JavaScript.
La expansión de la media está ligada al scroll (Motion: useScroll + useTransform) y termina cuando el bloque llega al centro de la pantalla. Con `prefers-reduced-motion`: todo aparece sin movimiento y los proyectos se muestran apilados al ancho de `container`, sin sticky.
No incluir: botones de CTA, foto a pantalla completa como fondo, video en la primera pantalla, carrusel, texto rotativo, scroll bloqueado (scroll-jacking).
