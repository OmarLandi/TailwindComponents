# Modelos de layout y páginas

Guía de composición para construir páginas completas con la librería. Define los
breakpoints, anchos, variantes de distribución y plantillas que deben usar los
agentes al crear vistas o componentes de layout.

> Estado actual (2026-10-22): `Container`, las primitivas de layout y las plantillas
> `Templates/*` ya estan implementadas como stories (Dashboard, Auth, Settings, Marketing,
> Docs, E-commerce, ListDetail, CRUD y States). Quedan `AspectRatio`, `ScrollArea`,
> `Separator`. Playwright cubre overflow y regresion visual de las plantillas a 375/768/1280.

## 1. Principios

1. **Mobile-first.** El layout base es de una columna; los breakpoints añaden
   columnas y regiones, nunca al revés.
2. **Una sola fuente de scroll.** La página scrollea verticalmente; las regiones
   internas (`Sidebar`, `Table`, `DrawerBody`) scrollean solo cuando es necesario.
3. **Sin anchos fijos de página.** Usa `w-full`, `max-w-*`, `min-w-0` y grids.
4. **Contenido primero.** La navegación móvil no duplica en el DOM enlaces ocultos:
   se renderiza en un `Drawer`/modal o se marca `inert`.
5. **Landmarks.** `header`, `nav`, `main`, `aside`, `footer`; un solo `<main>` y un
   solo `<h1>` por página.
6. **Progressive enhancement.** Si una interacción no cabe, se convierte en drawer,
   bottom sheet, cards o acordeón; nunca en scroll horizontal de página.

## 2. Breakpoints y anchos

Breakpoints Tailwind por defecto (no redefinir sin migración global):

| Token | Ancho | Uso típico                                               |
| ----- | ----- | -------------------------------------------------------- |
| base  | 0–639 | Móvil: 1 columna, navegación en drawer, acciones grandes |
| `sm`  | ≥640  | Móvil grande: 2 columnas de cards, formularios simples   |
| `md`  | ≥768  | Tablet: sidebar colapsada, 2–3 columnas                  |
| `lg`  | ≥1024 | Desktop: sidebar completa, split layouts                 |
| `xl`  | ≥1280 | Desktop amplio: TOC, paneles laterales, 4 columnas       |
| `2xl` | ≥1536 | Monitores grandes; no cambia la estructura, solo el aire |

Anchos de contenido recomendados (semánticos, no `max-w-md`):

| Token     | Ancho    | Uso                             |
| --------- | -------- | ------------------------------- |
| `prose`   | 65ch     | Texto largo, docs, artículos    |
| `form`    | 28–32rem | Formularios de auth/settings    |
| `content` | 64rem    | Contenido estándar con sidebar  |
| `wide`    | 80rem    | Dashboards y tablas             |
| `full`    | 100%     | Full-bleed (hero, mapas, media) |

Reglas:

- `Container` debe mapear estos tokens, no los `max-w-*` actuales.
- Padding lateral: `px-4 sm:px-6 lg:px-8`; en full-bleed, el contenido interno usa
  `Container`.
- Altura de viewport: `min-h-dvh`, no `min-h-screen`; en móviles con notch usar
  `pb-[env(safe-area-inset-bottom)]` en barras fijas.
- Tipografía fluida en heroes: `clamp()` o `text-3xl sm:text-5xl lg:text-6xl`.
- Densidad: `comfortable` (default) y `compact` (tablas/toolbars), nunca tamaños
  arbitrarios por componente.

## 3. Variantes de distribución

| Eje            | Valores                                         | Cuándo usar                             |
| -------------- | ----------------------------------------------- | --------------------------------------- |
| **Ancho**      | `form`, `prose`, `content`, `wide`, `full`      | Según tipo de página                    |
| **Navegación** | `topnav`, `sidebar`, `hybrid`, `none`           | Marketing, app, docs, auth              |
| **Columnas**   | `1`, `2`, `3`, `4`, `12` (responsive)           | Cards, stats, formularios, dashboards   |
| **Sidebar**    | `left`, `right`, `collapsible`, `mobile-drawer` | App, docs, settings, filtros            |
| **Superficie** | `base`, `muted`, `card`, `accent`, `inverse`    | Separar secciones sin colores literales |
| **Sticky**     | `header`, `sidebar`, `footer`, `save-bar`       | Acciones persistentes                   |
| **Media**      | `top`, `start`, `end`, `background`, `none`     | Hero, cards, auth split                 |
| **Densidad**   | `comfortable`, `compact`                        | Tablas, listas, toolbars                |

Reglas de composición:

- **1 columna** < 640; **2** desde `sm`; **3** desde `md/lg`; **4** desde `xl`.
- No poner más de 4 cards de métricas por fila; en `xl` usar 4 como máximo.
- Un formulario nunca ocupa más de `form`; en desktop puede vivir en un grid 2/5.
- Un layout de dos paneles (list-detail) cambia a stack + botón “volver” < `lg`.
- Un sidebar de app se oculta < `lg` y se abre en `Drawer`; no se deja off-canvas
  focusable.
- El TOC de docs se oculta < `xl`; el sidebar < `lg`.

## 4. Catálogo de plantillas

### 4.1 App Shell / Dashboard

**Anatomía**

```
SkipLink
├─ Header (sticky, h-16): brand, nav, actions, mobile trigger
├─ Sidebar (lg:block, w-64): nav agrupada, footer de cuenta
└─ Main (min-w-0)
   ├─ PageHeader: título, descripción, breadcrumb, acciones
   ├─ Toolbar (opcional)
   └─ Grid de contenido (12 cols)
```

**Responsive**

| Rango  | Comportamiento                                                    |
| ------ | ----------------------------------------------------------------- |
| < `lg` | Header + botón menú → `Drawer` con la nav; main a ancho completo. |
| `lg`   | Sidebar fija de 256 px; main `min-w-0` con `px-6`.                |
| `xl`   | Sidebar 280 px opcional; contenedor `wide` (80rem).               |

**Variantes**

- `topnav`: sin sidebar; nav principal en header.
- `sidebar`: sidebar fija; header solo con acciones.
- `hybrid`: sidebar + topnav contextual (dashboard, admin).
- `collapsible`: rail de iconos (64 px) con tooltips accesibles.
- `dense`: padding `p-4`, tablas compactas.

**A11y**

- Un `<main id="main">` y `SkipLink` al inicio.
- `<nav aria-label="Principal">` y `<nav aria-label="Secciones">`.
- El drawer móvil es modal: focus trap, Escape, retorno de foco y scroll lock.
- `aria-current="page"` en el enlace activo; no dupliques la nav desktop en móvil.

### 4.2 Dashboard

**Anatomía:** `PageHeader` + fila de 4 `Stat` + grid 8/4 (chart + actividad) +
tabla/listado + paginación.

**Responsive**

| Rango | Stats      | Chart + actividad | Tabla                    |
| ----- | ---------- | ----------------- | ------------------------ |
| base  | 1 columna  | stack             | cards o scroll focusable |
| `sm`  | 2 columnas | stack             | scroll focusable         |
| `md`  | 2 columnas | stack             | scroll                   |
| `xl`  | 4 columnas | 8/4               | tabla completa           |

**Variantes:** `executive` (KPIs + tendencia), `operational` (tabla dominante),
`analytics` (charts + filtros), `compact`.

### 4.3 Auth

**Anatomía:** logo + título + formulario (`TextField`, `Checkbox`, `Button`) +
enlaces legales. Variante split con panel de marca/media.

**Responsive**

- < `lg`: una columna centrada, `max-w-md`, padding `px-4`.
- ≥ `lg`: grid `1fr 1fr`; formulario centrado en `max-w-md`; panel visual a un lado.
- Nunca fijar `h-screen`; usar `min-h-dvh` y permitir scroll.

**Variantes:** `centered`, `split`, `card`, `minimal`; `media: start|end`.

### 4.4 Settings

**Anatomía:** `PageHeader` + nav de secciones + formularios por sección +
barra de guardado sticky.

**Responsive**

- < `lg`: selector de sección (Tabs scrollables o `Select`) + una sección.
- ≥ `lg`: sidebar de 240 px + contenido `max-w-2xl`.
- Barra de guardado: sticky bottom en móvil, inline al final en desktop.
- Estado `dirty`: deshabilitar guardar hasta cambios; anunciar guardado con `aria-live`.

**Variantes:** `sidebar`, `tabs`, `single-page`; `save: inline|sticky`.

### 4.5 Marketing

**Secciones:** header, hero, logos, features, product/media, pricing, testimonios,
FAQ (Accordion), CTA, footer.

**Responsive**

- Hero: stack (texto → media) < `lg`; 2 columnas ≥ `lg`; `background` full-bleed.
- Features: 1 → 2 (`sm`) → 3 (`lg`); nunca 4 en móvil.
- Pricing: 1 → 2 (`md`) → 3 (`lg`); plan destacado con borde/`ring`, no solo color.
- Testimonios: carrusel accesible con pausa y `aria-live`, o grid 1/2/3.
- FAQ: `Accordion` de una columna, `max-w-prose`.

**Variantes:** `bold` (hero grande + media), `minimal` (texto centrado), `product`
(screenshot + features), `saas` (pricing + logos).

### 4.6 Docs

**Anatomía:** header + sidebar de navegación + contenido `prose` + TOC derecha +
prev/next.

**Responsive**

- < `lg`: sidebar en `Drawer`; sin TOC.
- `lg`: sidebar 240 px + contenido `min-w-0`.
- `xl`: + TOC 200 px sticky.
- Código con scroll horizontal propio y botón copiar; nunca romper el layout.

**Variantes:** `docs`, `changelog`, `api-reference`, `guide`.

### 4.7 E-commerce / List-Detail

**Anatomía:** filtros + lista (cards/tabla) + detalle; o master-detail.

**Responsive**

- < `lg`: lista a ancho completo; detalle en página/ruta o panel full-screen con
  “volver”; filtros en `Drawer` inferior.
- ≥ `lg`: lista 320–400 px + detalle fluido; filtros en sidebar.
- Grid de productos: 1 → 2 (`sm`) → 3 (`md`) → 4 (`xl`), `min-w-0`.

**Variantes:** `grid`, `list`, `master-detail`, `checkout` (stepper + resumen sticky).

### 4.8 CRUD / Data

**Anatomía:** `PageHeader` + toolbar (búsqueda, filtros, acciones) + tabla/cards +
paginación + estados.

**Responsive**

- < `md`: cards apiladas con `data-label` o tabla con columnas prioritarias.
- ≥ `md`: tabla con header sticky y scroll horizontal focusable.
- Filtros móviles en `Drawer`; desktop en toolbar.
- Acciones destructivas con `AlertDialog`, no `window.confirm`.

**Variantes:** `table`, `cards`, `compact`, `bulk-actions`.

### 4.9 Estados de vista

| Estado   | Composición                                                     |
| -------- | --------------------------------------------------------------- |
| Loading  | `Skeleton` con la forma del contenido + `aria-busy="true"`      |
| Empty    | `EmptyState` (icono, título, descripción, acción)               |
| Error    | `ErrorState`/`ErrorBoundary` con reintento y mensaje no técnico |
| Success  | `Alert`/`Toast` con `role="status"` y acción si aplica          |
| Disabled | Contenido visible con explicación, no solo `opacity-50`         |

## 5. Reglas responsive por tipo de componente

- **Navegación:** drawer modal en móvil; nav desktop con landmark; no duplicar links
  ocultos; `aria-current`.
- **Formularios:** 1 columna en móvil; `text-base sm:text-sm` para evitar zoom iOS;
  labels arriba; errores debajo con `role="alert"` e IDs; targets ≥44 px.
- **Tablas:** scroll focusable o cards; header sticky; columnas prioritarias.
- **Overlays:** `max-h-[85dvh]` + scroll interno; bottom sheet en móvil para selectores
  largos; `collisionPadding`; close ≥44 px.
- **Carruseles:** 1 slide en móvil, `basis-1/2`/`1/3` desde breakpoints; pausa y
  reduced motion; estado “X de Y”.
- **Cards:** footer con `flex-wrap`; media con `object-cover`; padding `p-4 sm:p-6`.
- **Botones:** permitir wrap o `truncate`; iconos `shrink-0`; `fullWidth` en móvil
  para acciones primarias de formularios.
- **Contenedores:** `min-w-0` en hijos de grid/flex; `overflow-hidden` solo cuando
  se controla el contenido.

## 6. Checklist de una plantilla

- [ ] Funciona a 375, 768 y 1280 px sin scroll horizontal de página.
- [ ] Un solo `<main>`, un solo `<h1>`, landmarks correctos y skip link.
- [ ] Navegación móvil modal (focus trap, Escape, retorno de foco, scroll lock).
- [ ] Sin contenido oculto focusable; sin duplicar nav en el DOM.
- [ ] Targets ≥44 px; foco visible con `ring-offset-background`.
- [ ] Light/dark y al menos 3 paletas sin colores literales.
- [ ] Reduced motion y RTL comprobados.
- [ ] Estados loading/empty/error documentados.
- [ ] Story `Templates/<Name>` con `parameters.layout: 'fullscreen'` y viewport.
- [ ] Capturas o revisión visual en 375/768/1280 (`npm run test:e2e`).

## 7. Primitivas y estado

| Primitiva        | API mínima                                                                |
| ---------------- | ------------------------------------------------------------------------- |
| `Stack`          | `direction`, `gap`, `align`, `justify`, `wrap`, `asChild`                 |
| `Grid`           | `columns={{ base, sm, md, lg, xl }}`, `gap`, `minItemWidth`, `asChild`    |
| `Section`        | `spacing`, `surface`, `bleed`, `container`, `asChild`                     |
| `PageHeader`     | `title`, `description`, `breadcrumb`, `actions`, `tabs`, `sticky`         |
| `AppShell`       | `header`, `sidebar`, `footer`, `variant`, `collapsed`, `mobileBreakpoint` |
| `Prose`          | ancho `65ch`, escala tipográfica, tablas/código/imágenes responsive       |
| `SkipLink`       | destino `#main`, visible al foco                                          |
| `VisuallyHidden` | texto solo para lectores de pantalla                                      |
| `AspectRatio`    | media responsive sin saltos de layout                                     |
| `ScrollArea`     | scroll temático, focusable y con teclado                                  |
| `Separator`      | semántico (`role="separator"`)                                            |
