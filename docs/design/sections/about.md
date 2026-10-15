# Sobre mí
Referencia: https://www.kodonishimura.com/profile/ (ver moodboard) — bio a la izquierda, collage de imágenes inclinadas a la derecha, dos botones píldora abajo.
Objetivo: Generar confianza y mostrar mi personalidad para que se note cómo sería trabajar conmigo.
Contenido:
1. Etiqueta "About"
2. Nombre y rol en una línea en negritas: "Montse Ortiz (Frontend / Full Stack Developer)"
3. Bio en 3–4 párrafos cortos: cambio de carrera desde negocios internacionales, startups y consultoría, mentoría en Xeleva, aprendizaje rápido, CrossFit (origen de WOD Tracker)
4. Stack: etiquetas con las tecnologías de "Stack a destacar" (brief.md)
5. Experiencia resumida: empresa, rol y años (3–4 líneas), con link "Full CV" a /cv
6. Botones: "Contact" (relleno) y "CV" (con borde)
7. Collage: 2–3 imágenes encimadas y 1–2 elementos decorativos (cuadro de gingham o rayas en `powder`)
Layout desktop: dos columnas 7/5 dentro del `container`. Izquierda: contenido 1–6 con ancho máx. `measure`. Derecha: collage alineado arriba; imágenes encimadas con rotación `tilt-sm` y `tilt-md` (una positiva, una negativa).
Layout móvil: una columna: etiqueta, nombre, bio, stack, experiencia, botones; collage al final, más pequeño y centrado.
Tipografía: etiqueta en `label`; nombre/rol en `body` peso 500; bio en `body`; stack en `small`; experiencia en `small` con fechas en `muted`; botones en `small`.
Espaciado: padding `section`; `gap` entre bloques; párrafos separados por 16px; `gap-sm` entre etiquetas.
Color: fondo `bg`; etiquetas del stack con fondo `accent-soft`, texto `on-accent-soft` y borde 1px `border`; botón relleno con `accent` / `on-accent`; botón con borde 1px `text`. Imágenes con `shadow-photo`, `radius-none`.
Interacción:
- Hover en botones: igual que en el hero.
- Hover en el collage: la imagen bajo el cursor sube al frente y rota a 0° (solo con puntero; no es necesario para entender la sección).
- Imágenes con `alt` descriptivo; los elementos decorativos con `alt=""` y `aria-hidden`.
Animación: `reveal` para el texto; las imágenes del collage entran una tras otra con `stagger` de diferencia. Sin animación con `prefers-reduced-motion`.
No incluir: barras o porcentajes de habilidades, línea de tiempo larga (va en /cv), fotos de terceros sin permiso.
