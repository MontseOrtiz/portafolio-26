# Plan paso a paso — Portafolio 26

Las fases 1 a 3 son solo documentos; el código empieza en la fase 4 con todo decidido. Primero se construye la base; los textos finales se integran al final (fase 6).

## Fase 1: Contenido base
- [x] Completar brief.md (propuesta, CTA, idioma, tono, stack)
- [x] Definir el concepto de la página /cv
- [x] Reunir links de demo de los proyectos
- [x] CV en PDF en inglés y español

## Fase 2: Referencias
- [x] Elegir el sitio base
- [x] Elegir hasta 4 referencias por sección y llenar references.md

## Fase 3: Diseño destilado
- [x] Llenar tokens.md desde el sitio base
- [x] Llenar un archivo por sección y página con la plantilla (incluye cv.md)
- [x] Revisar que ninguna sección use valores fuera de tokens.md

## Fase 4: Scaffold
- [x] Crear el repo con el stack de CLAUDE.md
- [x] Copiar docs/ y CLAUDE.md al repo
- [x] Configurar idiomas (en principal, es)
- [x] Configurar tokens en Tailwind, fuentes y tema light/dark
- [x] Layout base y nav
- [x] Configurar Playwright y deploy de preview en Vercel (https://montse-ortiz.vercel.app)

## Fase 5: Secciones (una por tarea)
- [x] Hero
- [ ] Descripción corta
- [ ] Tools
- [ ] Proyectos
- [ ] Footer de cierre (las tres versiones)
- [ ] Página /about: Sobre mí + CV
- [ ] Plantilla de caso de estudio + 3 casos en MDX

Cada sección: el agente construye (incluida la animación del campo "Animación" de su spec, con Motion y los tokens de motion), saca capturas, compara con la spec, corrige; se aprueba y se hace commit. Donde falte contenido final se usan los textos actuales o placeholders marcados.

## Fase 6: Contenido final
- [ ] Completar los pendientes de "Contenido final" de brief.md (repos, qué demuestra, resultado de Destino China, mockups y capturas, correo)
- [ ] Alinear el CV (PDF en ambos idiomas) y reflejarlo en la página /cv
- [ ] Reemplazar todos los placeholders del sitio

## Fase 7: Pulido y lanzamiento
- [ ] SEO: metadata, Open Graph, sitemap, robots (en ambos idiomas)
- [ ] Lighthouse ≥ 90 y revisión de accesibilidad
- [ ] Verificar que los demos de los 3 proyectos cargan sin errores
- [ ] README del repo: stack, decisiones técnicas, cómo correr las pruebas
- [ ] Dominio y deploy a producción
- [ ] Actualizar CV y LinkedIn con el link
