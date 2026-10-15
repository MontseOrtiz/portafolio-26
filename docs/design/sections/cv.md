# CV (/cv)
Referencia: https://cv.iamrob.in/en — la hoja como folder sobre fondo oscuro, pestañas laterales de idioma, layout en columnas con etiqueta de sección a la izquierda.
Objetivo: Mostrar el CV de forma divertida y fácil de leer, con el mismo contenido que el PDF.
Contenido (de content/cv, en ambos idiomas; igual que el PDF):
1. Pestañas de idioma: "English" y "Español"
2. Encabezado: nombre; datos en columnas (Location: Querétaro, México · Remote; Contact: correo; Digital: LinkedIn, GitHub, portafolio)
3. Resumen en 2–3 líneas
4. Botón "Download PDF" (versión del idioma activo)
5. Experience: cada empleo con puesto, empresa, fechas y logros
6. Education
7. Skills: grupos (Frontend, Backend, Databases, Testing, Tools) en listas con flechas
8. Languages
Layout desktop: fondo de página oscuro y, encima, la hoja centrada (ancho de `container` menos 2 `gutter`), con `radius-md` arriba a la izquierda y abajo. Pestañas pegadas al borde derecho de la hoja, en vertical, como separadores de folder. Dentro de la hoja, cada sección en tres columnas 2/3/7: etiqueta de sección | puesto + empresa + fechas | descripción. Encabezado: nombre a la izquierda y tres columnas de datos a la derecha; resumen y botón debajo. Divisores 1px `border` entre secciones.
Layout móvil: pestañas en horizontal arriba de la hoja. Todo en una columna: etiqueta de sección, luego puesto/empresa/fechas, luego descripción. Datos de contacto apilados. Botón "Download PDF" a todo el ancho.
Tipografía: nombre en `title`; etiquetas de sección y pestañas en `label`; puesto en `body` peso 500; empresa, fechas, descripciones y listas en `small` (Geist Mono, como en la referencia); fechas en `muted`.
Espaciado: padding interior de la hoja 64px (32px móvil); `section` entre secciones; `gap` entre columnas; `gap-sm` entre elementos de lista.
Color: fondo de página `accent` en light y `bg` en dark; hoja en `surface`; pestaña activa del mismo color que la hoja y pestaña inactiva en `powder` con texto `on-powder`; flechas de listas en `pop`; cifras de los logros en `sand` (guiño al pizarrón de WOD); botón "Download PDF" con `accent` / `on-accent` y `radius-full`.
Interacción:
- Las pestañas son links a /en/cv y /es/cv (cambian de idioma igual que el toggle del nav), con `aria-current="page"` en la activa.
- Links externos con ↗ y texto accesible "(opens in a new tab)".
- La página se puede imprimir: estilos de impresión sin fondo de página ni pestañas.
- Encabezados en orden (`h1` nombre, `h2` secciones, `h3` puestos).
Animación: al cargar, la hoja aparece con `reveal`; cambio de pestaña sin animación (es cambio de página). Sin animación con `prefers-reduced-motion`.
No incluir: fuente de tiza ni efectos de pizarrón, foto con clip, pestañas por sección, barras o porcentajes de habilidades, contenido distinto al del PDF.
