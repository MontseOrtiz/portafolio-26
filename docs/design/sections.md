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

## Secciones del portafolio

| Archivo | Objetivo | Contenido mínimo |
| --- | --- | --- |
| `nav.md` | Moverse rápido | Nombre/logo, links a secciones, link a /cv, toggle de idioma, toggle de tema, CTA |
| `hero.md` | Decir quién eres en 5 segundos | Nombre, rol, propuesta en una frase, 2 botones (Proyectos / Contacto) |
| `projects.md` | Probar que sabes construir | 3 tarjetas: mockup (imagen o video corto), nombre, qué demuestra, stack, link al proyecto; cada una abre su caso de estudio |
| `about.md` | Generar confianza y mostrar personalidad | Historia corta (cambio de carrera, startups, mentoría), stack, experiencia |
| `contact.md` | Convertir | CTA grande (correo), LinkedIn, GitHub, CV (descargar PDF + ver /cv) |
| `footer.md` | Cerrar | Links, año, crédito mínimo |

## Páginas extra

| Archivo | Objetivo | Contenido mínimo |
| --- | --- | --- |
| `case-study.md` | Plantilla de cada proyecto | Problema, rol, decisiones técnicas, resultado, mockups (imagen o video), stack, link al proyecto |
| `cv.md` | Mostrar el CV de forma divertida | Mismo contenido que el PDF (experiencia, stack, educación, idiomas), concepto interactivo, botón de descarga del PDF |
