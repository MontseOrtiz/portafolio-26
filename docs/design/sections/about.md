# Sobre mí (/about, primera parte)
Referencia: https://www.kodonishimura.com/profile/ (ver moodboard) — bio a la izquierda, collage de imágenes inclinadas a la derecha, dos botones píldora abajo.
Objetivo: Generar confianza y mostrar mi personalidad para que se note cómo sería trabajar conmigo.
Página: /about. Orden: Sobre mí → CV (ver cv.md) → footer de cierre con "Selected work →" (ver footer.md).
Contenido:
1. Nombre y rol en negritas: "Montse Ortiz (Frontend / Full Stack Developer)" (`h1` de la página)
2. Bio en 3–5 párrafos cortos: cambio de carrera desde negocios internacionales, startups y consultoría, mentoría en Xeleva, aprendizaje rápido, CrossFit (origen de WOD Tracker)
3. Botones: "Contact" (relleno, lleva a /#contact) y "CV" (con borde, baja a #cv en la misma página)
4. Collage: public/images/about/about-avatar-laptop.webp + 1–2 imágenes más (captura de una app, pizarrón de CrossFit o libros) y 1–2 elementos decorativos con `pattern-gingham` o rayas en `powder`
Layout desktop: bloque dentro del `container`, fondo `bg`, borde 1px `border`, `radius-md`, padding `section-lg`. Dos columnas 7/5. Izquierda: contenido 1–3 con ancho máx. `measure`. Derecha: collage alineado arriba; imágenes encimadas con `tilt-sm` y `tilt-md` (una positiva, una negativa).
Layout móvil: una columna: nombre, bio, botones; collage al final, más pequeño y centrado.
Tipografía: nombre/rol en `body` peso 500; bio en `body`; botones en `label`.
Espaciado: párrafos separados por 16px; `gap` entre bio y botones; `gap-sm` entre botones.
Color: botón relleno con `accent` / `on-accent`; botón con borde 1px `text`; ambos `radius-full`. Imágenes con fondo transparente sobre una tarjeta `surface` o `powder` y `shadow-photo`, `radius-none`.
Interacción:
- Hover en botones: fondo `pop` y texto `on-pop` (el de borde: borde y texto `pop`).
- Hover en el collage: la imagen bajo el cursor sube al frente y rota a 0° (solo con puntero).
- Imágenes con `alt` descriptivo; elementos decorativos con `alt=""` y `aria-hidden`.
Animación: `reveal` para el texto; las imágenes del collage entran una tras otra con `stagger`. Sin animación con `prefers-reduced-motion`.
No incluir: barras o porcentajes de habilidades, línea de tiempo (va en el CV), stack en etiquetas (ya está en Tools del home), fotos de terceros sin permiso.
