# design/sections — Portafolio 26

Un archivo por sección, todos con los mismos campos. Cada uno cabe en unas 30 líneas y solo usa valores de tokens.md.

## Plantilla común

```markdown
# [Sección]
Referencia: [url + qué parte]
Objetivo: [qué debe lograr en una frase]
Contenido: [elementos en orden]
Layout desktop: [columnas, alineación, proporciones]
Layout móvil: [cómo se apila]
Tipografía: [tokens usados]
Espaciado: [tokens usados]
Color: [tokens usados]
Interacción: [hover, clics, estados]
Animación: [tokens de motion]
No incluir: [lo que descartamos]
```

## Home (/)

| Archivo | Objetivo | Contenido mínimo |
| --- | --- | --- |
| `nav.md` | Moverse rápido (en todas las páginas) | Nombre + rol, links (About, Work, CV), toggle de idioma, toggle de tema, CTA "Let's talk" |
| `hero.md` | Decir quién eres en 5 segundos | Imagen, nombre, rol, propuesta en una frase; debajo, media que se expande al hacer scroll |
| `intro.md` | Contar quién soy en 15 segundos | Párrafo corto centrado |
| `tools.md` | Mostrar mis herramientas | Tarjetas con íconos en perspectiva alrededor de una frase; bento grid en móvil |
| `projects.md` | Probar que sabes construir | 3 tarjetas: mockup (imagen o video corto), nombre, qué demuestra, stack, link al proyecto; cada una abre su caso de estudio |
| `footer.md` | Cerrar e invitar a contactar (en todas las páginas) | Frase gigante según la página, LinkedIn, correo, GitHub, crédito |

## Página Sobre mí (/about)

| Archivo | Objetivo | Contenido mínimo |
| --- | --- | --- |
| `about.md` | Generar confianza y mostrar personalidad | Bio, botones Contact y CV, collage |
| `cv.md` | Mostrar el CV de forma divertida | Mismo contenido que el PDF, hoja tipo folder con pestañas de idioma, botón de descarga del PDF |

## Casos de estudio (/projects/[slug])

| Archivo | Objetivo | Contenido mínimo |
| --- | --- | --- |
| `case-study.md` | Plantilla de cada proyecto | Video de capturas, resumen, problema, rol, decisiones técnicas, resultado, stack, pantallas móviles, Previous / Next |
