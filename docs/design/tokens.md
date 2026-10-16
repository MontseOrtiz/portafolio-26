# design/tokens.md — Portafolio 26

Todos los tokens salen del sitio base (palette.supply, ver references.md) y se cargan como variables CSS y en el tema de Tailwind. Ninguna sección inventa valores fuera de esta lista.

## Color

Paleta propia: amarillo mantequilla y azul Yale, con acentos puntuales. Del sitio base se toma la estructura (fondo, superficies para mockups, texto, un color de acción), no sus colores. Todas las combinaciones de texto cumplen contraste AA (≥ 4.5:1).

| Token | Light | Dark | Uso |
| --- | --- | --- | --- |
| `bg` | #FFFCF2 | #0B1A2E | Fondo de página |
| `surface` | #FAF0CA | #122640 | Tarjetas, mockups, nav, hoja del CV |
| `text` | #173B64 | #FBF4DA | Texto principal |
| `muted` | #566780 | #A6B4C7 | Texto secundario, fechas, etiquetas |
| `border` | #E8DDB8 | #26405F | Bordes y divisores (decorativos) |
| `accent` | #173B64 | #B7CDE8 | Botón principal, links, detalles |
| `on-accent` | #FFFCF2 | #0B1A2E | Texto sobre `accent` |
| `accent-soft` | #FFF3B4 | #FFF3B4 | Badges, highlights, tags de skills |
| `on-accent-soft` | #173B64 | #173B64 | Texto sobre `accent-soft` |
| `pop` | #2B50D6 | #7D98FF | Pop cobalto: hover, foco, detalles |
| `on-pop` | #FFFCF2 | #0B1A2E | Texto sobre `pop` |
| `powder` | #B7CDE8 | #33547F | Rayas, gingham, badges secundarios |
| `on-powder` | #173B64 | #FBF4DA | Texto sobre `powder` |
| `sand` | #76623F | #D2BE92 | Números, detalles cálidos |
| `cherry` | #9B2C33 | #F0959B | Micro-detalle (corazón del footer); usar muy poco |

Contraste medido (light / dark):

| Combinación | Light | Dark |
| --- | --- | --- |
| `text` sobre `bg` / `surface` | 11.1 / 10.0 | 15.9 / 13.8 |
| `muted` sobre `bg` / `surface` | 5.6 / 5.0 | 8.3 / 7.2 |
| `on-accent` sobre `accent` | 11.1 | 10.8 |
| `on-accent-soft` sobre `accent-soft` | 10.2 | 10.2 |
| `pop` sobre `bg` / `surface` | 6.4 / 5.7 | 6.5 / 5.7 |
| `on-pop` sobre `pop` | 6.4 | 6.5 |
| `on-powder` sobre `powder` | 7.0 | 7.0 |
| `sand` sobre `bg` / `surface` | 5.7 / 5.1 | 9.6 / 8.4 |
| `cherry` sobre `bg` | 7.3 | 7.9 |

Reglas de uso:

- En light, `accent` es igual a `text`: los links dentro de párrafos llevan subrayado para no depender solo del color, y en hover cambian a `pop`.
- El anillo de foco usa `pop` (2px, con separación de 2px) en ambos temas.
- `border` es decorativo (contraste bajo): los botones con borde usan `text` como color de borde para que se distingan.
- En light, `accent-soft` casi no se distingue de `bg` (1.1:1): los badges sobre `bg` llevan borde de 1px en `border` o van sobre `surface`.
- `pop`, `powder`, `sand` y `cherry` son acentos de apoyo: nunca para bloques grandes de texto ni fondos de sección.

## Tipografía

Dos familias de Google Fonts, cargadas con next/font (variables, sin peticiones externas):

- **Geist** (sans) sustituye a ES Build: títulos, párrafos y nombres de tarjeta. Fallback: `system-ui, -apple-system, "Segoe UI", sans-serif`.
- **Geist Mono** sustituye a PP Supply Mono: etiquetas, botones, nav, metadatos (stack, fechas) y la hoja del CV. Fallback: `ui-monospace, "SFMono-Regular", Menlo, monospace`.

Los párrafos largos van en Geist (sans) para que se lean bien; la mono queda para textos cortos y da el toque "dev".

| Token | Fuente | Tamaño desktop / móvil | Peso | Interlineado | Tracking | Uso |
| --- | --- | --- | --- | --- | --- | --- |
| `display-xl` | Geist | 176px / 64px | 500 | 0.9 | -0.04em | Nombre gigante del hero |
| `heading` | Geist | 38px / 28px | 500 | 1.3 | -0.02em | Títulos de sección |
| `title` | Geist | 22px / 19px | 500 | 1.3 | -0.02em | Nombres de proyecto, subtítulos |
| `body-lg` | Geist | 19px / 17px | 400 | 1.5 | 0 | Propuesta del hero, intro de bloques |
| `body` | Geist | 16px / 16px | 400 | 1.5 | 0 | Párrafos |
| `small` | Geist Mono | 14px / 14px | 400 | 1.5 | 0 | Links, botones, metadatos, texto del CV |
| `label` | Geist Mono | 12px / 12px | 400 | 1.2 | 0.08em, mayúsculas | Etiquetas de sección, stack, fechas |

`display-xl` escala de forma fluida entre ambos tamaños (clamp). Tamaño mínimo de texto: 12px.

## Espaciado, forma y profundidad

Escala base de 4px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.

| Token | Valor | Uso |
| --- | --- | --- |
| `container` | 1280px máx. | Ancho del contenido |
| `measure` | 560px máx. | Ancho máximo de bloques de texto |
| `gutter` | 32px / 20px móvil | Márgenes laterales |
| `section` | 64px / 48px móvil | Padding vertical de secciones |
| `section-lg` | 128px / 80px móvil | Hero y secciones con mucho aire |
| `gap` | 24px / 16px móvil | Separación en grids |
| `gap-sm` | 8px | Separación entre elementos pequeños (etiquetas, íconos) |
| `radius-none` | 0 | Tarjetas, imágenes, mockups |
| `radius-md` | 16px | Contenedores: nav, hoja del CV |
| `radius-full` | 9999px | Botones y etiquetas tipo píldora |
| `shadow` | ninguna | Tarjetas |
| `shadow-photo` | 0 8px 24px rgba(0,0,0,0.12) | Solo imágenes del collage de Sobre mí |
| `tilt-sm` | 3deg | Rotación ligera (collage) |
| `tilt-md` | -6deg | Rotación marcada (collage) |
| `stroke` | 2px | Anillo de foco y subrayado del link activo |

Las medidas propias de un componente (anchos de imagen, de tarjeta, offsets) se definen en su archivo de sección y siempre usan la escala de 4px.

## Motion

| Token | Valor | Uso |
| --- | --- | --- |
| `duration-fast` | 150ms | Hover de color y borde |
| `duration` | 300ms | Transform, aparición de elementos |
| `duration-slow` | 500ms | Media que se expande, cambios de pestaña |
| `easing` | cubic-bezier(0.22, 1, 0.36, 1) | Todas las transiciones (ease-out) |
| `stagger` | 100ms | Retraso entre elementos que aparecen en secuencia |
| `hover-scale` | 1.02 | Escala de imágenes en hover |
| `reveal` | fade + subida de 16px al entrar en pantalla, una sola vez | Bloques al hacer scroll |
| `lift-sm` | 8px | Subida del panel del menú móvil (fade + subida con `duration` y `easing`) |

Respetar `prefers-reduced-motion`: sin animaciones si el usuario las desactiva (solo cambios de color instantáneos).

## Notas

- Las referencias por sección (references.md) aportan layout e interacción; sus colores, fuentes y medidas no se usan.
- Si una sección necesita un valor que no está aquí, primero se agrega a este archivo y después se usa.
