# references.md — Portafolio 26

Máximo 6 sitios: una base para el look global y el resto para secciones concretas. Las referencias por sección aportan layout e interacción; los colores, fuentes y medidas siempre salen de tokens.md (es decir, del sitio base).

Moodboard: docs/design/moodboard.png (collage de las referencias armado por Montse).

| Rol | Sitio (URL) | Qué tomamos | Qué NO tomamos |
| --- | --- | --- | --- |
| **Base (look global)** | https://palette.supply/ | Estructura de color (fondo, superficies para mockups, texto, un color de acción), combinación de títulos grotescos con texto y etiquetas en monoespaciada, etiquetas pequeñas en mayúsculas, tarjetas con mockup sobre una superficie de color, botones discretos con radio pequeño, espaciados amplios, transiciones cortas | Su paleta (se usa una propia, ver tokens.md), textos, imágenes, logo, fuentes de pago (se sustituyen por Google Fonts parecidas), hero con foto de ambiente a pantalla completa, banner de promoción, elementos de tienda (carrito, precios, licencias) |
| Nav | https://wearebou.com/ | Barra contenida en una tarjeta con bordes redondeados: logo a la izquierda, links al centro, botón "Contact" con ícono de flecha a la derecha | Sus colores, fuentes y logo |
| Hero | https://jsandrieu.com/ | Nombre gigante a todo el ancho, una imagen pequeña arriba del nombre, fondo gris claro, mucho espacio en blanco; opcional: bloque de media que se expande al hacer scroll | Sus fotos y fuentes; el hero conserva rol, propuesta y 2 botones además del nombre |
| Sobre mí | https://www.kodonishimura.com/profile/ | Dos columnas: bio en párrafos cortos a la izquierda con nombre/rol en negritas arriba; a la derecha un collage de imágenes inclinadas y encimadas con pequeños elementos decorativos; abajo dos botones tipo píldora (uno relleno, uno con borde) | Sus fotos, colores, fuentes y contenido |
| Proyectos | https://wschupfer.com/los-angeles/ | Tira horizontal de imágenes de distintos tamaños y alturas escalonadas, con scroll o arrastre lateral e indicador para seguir bajando | Sus fotos, el contenido de agencia, el formulario |
| Caso de estudio (/projects/[slug]) | https://wearebou.com/cases/rovio | Encabezado con nombre del proyecto a la izquierda y logo/ícono a la derecha, separados por una línea; dos columnas: resumen + lista con íconos de check (para el stack) a la izquierda y media grande a la derecha; media a todo el ancho entre bloques; bloques de dos columnas con título a la izquierda y párrafo a la derecha; cuadrícula con bordes finos | Sus colores y fuentes, la sección de logos de medios, el índice de navegación sobre la imagen |
| CV (/cv) | https://cv.iamrob.in/en | La hoja como folder sobre fondo oscuro, con pestañas laterales tipo separador (en el ejemplo, para cambiar de idioma); layout en columnas: etiqueta de sección a la izquierda, puesto/empresa/fechas en medio, descripción a la derecha; divisores finos entre secciones; listas con flechas; datos de contacto en columnas arriba | Sus colores, la foto con clip (opcional), su contenido |

(Nav y caso de estudio vienen del mismo sitio, así que son 6 sitios en total.)

## Notas de las referencias por sección

- Imágenes personales: el hero (imagen pequeña) y el collage de Sobre mí no tienen que ser fotos de Montse. Pueden ser capturas de sus apps, el pizarrón de CrossFit, libros, su espacio de trabajo o una ilustración/avatar.
- Hero: si se usa la media que se expande al hacer scroll, lleva póster optimizado para no afectar el LCP; con prefers-reduced-motion se muestra fija.
- Proyectos: con 3 proyectos la tira puede verse vacía; se puede alternar el mockup principal con 1–2 capturas por proyecto. Cada imagen lleva nombre y stack (estilo de etiqueta del sitio base) y abre su caso de estudio. Debe poder recorrerse con teclado y en móvil con swipe.
- Caso de estudio: la lista con checks se usa para el stack; la cuadrícula con bordes puede servir para resultados o capturas.
- CV: se toma tal cual el concepto del ejemplo: pestañas de idioma y todo el CV en una sola hoja que se lee con scroll (ver sections/cv.md).
- Bordes redondeados: el moodboard mezcla esquinas rectas (base) y redondeadas (nav de Bou, botones píldora). El radio final se define en tokens.md.

## Notas del sitio base

Valores observados en palette.supply (escritorio, octubre 2026). Tipografía, forma, espaciado y motion son el punto de partida para tokens.md; los colores se reemplazaron por una paleta propia.

- Colores: texto negro #000000, fondo blanco #FFFFFF, grises de superficie #F4F4F4 y #E3E3E3, texto secundario #757575, acento azul #3651A2 (banner) y #1D53E9 (detalles).
- Tipografía de títulos: ES Build (de pago), peso 500, tracking negativo de -2%. Escalas vistas: 38px / 49.4px para títulos de sección, 22.4px y 19px para subtítulos y nombres de tarjeta.
- Tipografía de texto: PP Supply Mono (de pago), peso 300 para texto y 400 para links y botones. Escalas vistas: 16px / 24px para texto, 12px y 14px para texto pequeño, 10px y 14px en mayúsculas para etiquetas y botones.
- Forma: radio de 5px en botones; tarjetas sin radio.
- Espaciado: secciones con 48–64px de padding vertical, márgenes laterales de 32px, gaps de 4 a 32px.
- Motion: transiciones de 0.1s a 0.5s en color, borde y transform.
- No tiene modo oscuro: el de este sitio está definido en tokens.md.

## Por qué encaja

- Las tarjetas de producto ya están pensadas para mostrar mockups, igual que las tarjetas de proyectos.
- La fuente monoespaciada da un toque "dev" sin parecer una terminal, y el layout limpio deja que los proyectos sean los protagonistas.
- Es minimalista y sencillo, en línea con el concepto del folder para /cv.
