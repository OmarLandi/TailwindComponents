---
name: crear-layout
description: Use when composing page layouts, view templates, responsive distribution, app shells, dashboards, auth/settings/marketing/docs/e-commerce pages, or layout primitives (Stack, Grid, Section, PageHeader, AppShell, Prose, SkipLink) in this library. Trigger on "layout", "plantilla", "template", "página", "dashboard", "app shell", "responsive", "grid", "sidebar", "modelo de página".
---

# Crear layouts y plantillas de página

Guía para componer páginas completas (no primitivas sueltas) con distribución responsive,
accesibilidad y theming. El catálogo y las reglas viven en `docs/layouts.md`; este skill es el
flujo de trabajo.

## 1. Elegir el modelo

Antes de escribir código, identifica **qué tipo de página** es y qué ejes necesita:

| Modelo          | Cuándo                                 | Navegación            |
| --------------- | -------------------------------------- | --------------------- |
| **App Shell**   | Producto autenticado, dashboard, admin | sidebar/topnav/hybrid |
| **Auth**        | Login, registro, recuperación          | none                  |
| **Settings**    | Preferencias, perfil, facturación      | sidebar/tabs          |
| **Marketing**   | Landing, pricing, features, blog       | topnav                |
| **Docs**        | Documentación, guías, API              | sidebar + TOC         |
| **E-commerce**  | Catálogo, producto, checkout           | topnav + filtros      |
| **List-Detail** | Inbox, CRM, pedidos                    | master-detail         |
| **CRUD / Data** | Tablas, registros, informes            | app shell             |
| **Estados**     | Loading, empty, error, success         | según página          |

Lee `docs/layouts.md` para la anatomía, breakpoints y variantes de cada modelo. No inventes
una estructura nueva si ya existe una plantilla.

## 2. Definir los ejes de variante

Toda plantilla debe declarar sus ejes (tipados, no clases sueltas):

```typescript
interface PageLayoutProps {
  width?: 'form' | 'prose' | 'content' | 'wide' | 'full';
  nav?: 'topnav' | 'sidebar' | 'hybrid' | 'none';
  sidebar?: 'left' | 'right' | 'collapsible' | 'mobile-drawer';
  surface?: 'base' | 'muted' | 'card' | 'accent';
  density?: 'comfortable' | 'compact';
  media?: 'top' | 'start' | 'end' | 'background' | 'none';
}
```

Reglas:

- Los valores responsive se expresan como objeto (`{ base, sm, md, lg, xl }`) o con clases
  `sm:`/`md:`/`lg:`; nunca con anchos fijos de página.
- Mobile-first: el valor base es 1 columna; los breakpoints añaden.
- Máximo 4 columnas de cards; máximo 4 KPIs por fila.
- `width=full` solo para media/hero; el contenido interno vuelve a `Container`.
- No añadas una variante si no cambia la estructura o la densidad real.

## 3. Primitivas (si no existen, créalas primero)

| Primitiva        | API mínima                                                        |
| ---------------- | ----------------------------------------------------------------- |
| `Stack`          | `direction`, `gap`, `align`, `justify`, `wrap`, `asChild`         |
| `Grid`           | `columns` responsive, `gap`, `minItemWidth`, `asChild`            |
| `Section`        | `spacing`, `surface`, `bleed`, `container`, `asChild`             |
| `PageHeader`     | `title`, `description`, `breadcrumb`, `actions`, `tabs`, `sticky` |
| `AppShell`       | `header`, `sidebar`, `footer`, `variant`, `collapsed`             |
| `Prose`          | ancho `65ch`, escala tipográfica, tablas/código responsive        |
| `SkipLink`       | destino `#main`, visible al foco                                  |
| `VisuallyHidden` | texto solo para lectores de pantalla                              |

Úsalas como base (`flex flex-col gap-4`, `grid grid-cols-1 md:grid-cols-2`) y no dupliques
la misma estructura en cada plantilla. Las plantillas existentes viven en `stories/templates/`.

## 4. Estructura de una plantilla

```
src/components/<Name>/
  <Name>.tsx          # CVA + forwardRef + displayName (si aplica)
  index.ts
stories/templates/<Name>.stories.tsx   # title: 'Templates/<Name>'
tests/<Name>.test.tsx                  # si tiene lógica propia
```

La story de plantilla:

```tsx
const meta: Meta<typeof DashboardTemplate> = {
  title: 'Templates/Dashboard',
  component: DashboardTemplate,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: { description: { component: '...' } },
  },
  tags: ['autodocs'],
};
```

- `layout: 'fullscreen'` es obligatorio para plantillas: el decorador global no debe imponer
  `p-4` ni `min-h-screen`.
- Documenta la matriz responsive en la descripción o en un MDX de plantilla.
- Añade stories `Mobile`, `Tablet` y `Desktop` solo si cambian la estructura; si no, usa el
  viewport toolbar.

## 5. Responsive obligatorio

| Rango    | Regla                                                                       |
| -------- | --------------------------------------------------------------------------- |
| 320–639  | 1 columna; nav en drawer/modal; acciones primarias `w-full`; targets ≥44 px |
| 640–767  | 2 columnas de cards; formularios simples; sin sidebar fija                  |
| 768–1023 | 2–3 columnas; sidebar colapsada o drawer; tablas con scroll focusable       |
| 1024+    | sidebar fija; split layouts; TOC opcional                                   |
| 1280+    | paneles laterales/TOC; máximo 4 columnas                                    |

Comprueba **375 / 768 / 1280 px** como mínimo. Sin scroll horizontal de página; el scroll
horizontal solo dentro de tablas/código con `tabIndex={0}` y label.

## 6. Accesibilidad obligatoria

- [ ] Un `<main id="main">`, un `<h1>`, landmarks (`header`, `nav`, `main`, `aside`, `footer`).
- [ ] `SkipLink` al inicio y foco visible.
- [ ] Navegación móvil modal: focus trap, Escape, retorno de foco, scroll lock, `inert` en el resto.
- [ ] Nada oculto visualmente queda focusable (usa `hidden`, `inert` o render condicional).
- [ ] `aria-current="page"` en el enlace activo; no dupliques la nav en el DOM.
- [ ] Targets ≥44 px; contraste AA; `motion-reduce`; RTL con propiedades lógicas.
- [ ] Estados loading/empty/error anunciados (`aria-busy`, `role="status"`, `role="alert"`).
- [ ] `axe.run(document.body)` cuando la plantilla abra portales.

## 7. Verificación

```bash
npx tsc --noEmit
npm run test:run
npm run lint
npm run build-storybook   # si añades stories de plantilla
```

Además, revisa manualmente:

- [ ] 375/768/1280 sin overflow horizontal.
- [ ] Light/dark + 2–3 paletas.
- [ ] Teclado completo: skip link, nav, drawer, acciones.
- [ ] `prefers-reduced-motion` y `dir="rtl"` (si aplica).
- [ ] Estados loading/empty/error.
- [ ] `docs/layouts.md` y `AGENTS.md` actualizados si añades un modelo o primitiva.
- [ ] `docs/CHANGELOG.md` actualizado.

## No hacer

- ❌ Crear una página con `w-[1200px]` o `h-screen` fijos.
- ❌ Ocultar la nav móvil con `opacity-0`/`max-h-0` dejando links focusables.
- ❌ Duplicar la navegación desktop y móvil en el DOM.
- ❌ Poner 5–6 cards por fila en desktop.
- ❌ Usar `window.confirm` para acciones destructivas (usa `AlertDialog`).
- ❌ Hardcodear colores o breakpoints nuevos sin actualizar `tailwind.config.cjs` y la docs.
