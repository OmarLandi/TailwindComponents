---
name: revision-calidad
description: Use when reviewing a component, a diff or a PR, or when running the quality gate before committing in this library. Trigger on "revisar", "review", "PR", "pull request", "calidad", "quality gate", "auditoría", "audit", "antes de commit", "checklist".
---

# Revisión de calidad

Revisión en dos capas: **gate automatizado** y **checklist manual**. Reporta hallazgos por severidad y no inventes problemas: cita `archivo:línea`.

## 1. Gate automatizado

Ejecuta y adjunta el resultado:

```bash
npx tsc --noEmit
npm run test:run
npm run lint
```

Criterio de aceptación: los tres en verde. Si fallan, es bloqueante.

> Nota: `.husky/pre-commit` ya ejecuta Prettier + ESLint + `tsc` + toda la suite, así que el commit completo puede tardar.

## 2. Checklist de componente

### Código

- [ ] `import * as React from 'react'` y `cn` desde `@/lib/utils`.
- [ ] `forwardRef` con el tipo correcto y `displayName` asignado.
- [ ] CVA solo si hay variantes reales; si no, constante de string.
- [ ] No redeclara `variant`/`size` si ya vienen de `VariantProps`.
- [ ] No hay props redundantes ni defaults duplicados (`value = 0` + `|| 0`).
- [ ] Sin `any`, sin `@ts-ignore`, sin `console.log`.
- [ ] Sin colores hardcodeados (`#fff`, `bg-blue-500`, `rgb(...)`).
- [ ] `className` del consumidor al final del `cn(...)`.

### Exports

- [ ] `src/components/<Name>/index.ts` exporta componente, variantes y tipos.
- [ ] `export * from './<Name>';` presente en `src/components/index.ts`.
- [ ] No hay exports duplicados ni colisiones de nombres.

### Accesibilidad

- [ ] Rol semántico correcto; `aria-*` solo cuando hace falta.
- [ ] Nombre accesible (label, `aria-label` o texto).
- [ ] Foco visible (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
- [ ] Operable con teclado (Tab, Enter/Space, Escape, flechas según componente).
- [ ] Errores anunciados (`role="alert"`, `aria-invalid`, `aria-describedby`).
- [ ] Iconos decorativos con `aria-hidden="true"`.
- [ ] Radix `Dialog`/`Drawer`: `DialogTitle` + `DialogDescription` (o `aria-describedby={undefined}`).
- [ ] Test `axe.run(container)` presente y sin violaciones; en portales, `axe.run(document.body)`.
- [ ] Contraste AA en light/dark y en 2–3 paletas (no confiar solo en `axe` en jsdom).
- [ ] `prefers-reduced-motion` en animaciones/transiciones.
- [ ] RTL: utilidades lógicas, sin `left/right`, `pl/pr`, `space-x`, `translate-x`.

### Responsive y layout

- [ ] Mobile-first (base 320 px) y sin scroll horizontal de página en 375/768/1280.
- [ ] Targets ≥44 px; foco visible; sin contenido oculto focusable.
- [ ] Overlays con `max-h`, scroll interno y safe areas; nav móvil modal.
- [ ] Tablas/código con scroll horizontal focusable y label.
- [ ] Si es plantilla: `Templates/<Name>`, `layout: 'fullscreen'` y sigue `docs/layouts.md`.

### Tests

- [ ] Archivo `tests/<Name>.test.tsx` con `describe` del componente.
- [ ] Cubre render, variantes/tamaños, interacción, `disabled`/`loading`/`error`.
- [ ] Cubre navegación por teclado cuando aplica.
- [ ] Usa `userEvent` para interacciones y queries por rol.
- [ ] No usa `toHaveNoViolations`.
- [ ] No introduce warnings nuevos de Radix.
- [ ] Overlays abiertos se auditan con `axe.run(document.body)`.

### Story

- [ ] `title: '<Category>/<Name>'` con la categoría correcta.
- [ ] `Meta<typeof Component>` y `StoryObj<typeof Component>`.
- [ ] `tags: ['autodocs']` y `args` en `Playground`.
- [ ] Sin `<ThemeProvider>` por story.
- [ ] Sin colores hardcodeados ni anchos fijos (`w-[300px]`).
- [ ] Estados relevantes documentados; `Mobile` si cambia el layout.
- [ ] Revisada en 375/768/1280 y sin overflow horizontal.

### Documentación

- [ ] `docs/CHANGELOG.md` actualizado.
- [ ] `AGENTS.md` actualizado si cambia el inventario o una categoría.
- [ ] README/docs no contradicen el código.

## 3. Deuda técnica a vigilar

Señálala si el diff la toca o la empeora (detalle completo en `docs/component-audit.md`):

1. Componentes, stories y tests sin trackear en git.
2. Warnings de Radix en tests de `Dialog`/`Drawer` si falta `DialogTitle` o `DialogDescription`.
3. Cualquier regla nueva de `@eslint-react` debe declararse explícitamente en `eslint.config.js`;
   no se activa `recommended-typescript` porque incluye reglas del React Compiler.
4. Tailwind 4 + `tailwind-merge` 3 pendientes (migración grande, recalcula todas las capturas).
5. React 19 pendiente: ampliar peers a `^18.3.0 || ^19.0.0` y validar.

Invariantes ya corregidos (no los reintroduzcas): selector `.colorMode.theme-palette` en el `<style>`, merge profundo de `DeepPartial<Theme>`, paletas en HSL crudo, `stone` con `.theme-stone`, portales vía `usePortalContainer()` y build con `dist/index.mjs` / `dist/index.cjs` / `dist/index.css`.

## 4. Formato del reporte

```
## Revisión: <componente/PR>

### Bloqueantes
- [archivo:línea] <problema> → <acción>

### Mejoras
- [archivo:línea] <problema> → <acción>

### Aprobado
- tsc ✅ | tests ✅ (N/N) | lint ✅
```

Usa `archivo:línea` para cada hallazgo. Si no hay bloqueantes, dilo explícitamente.

## 5. Commits

Conventional Commits (validado por commitlint):

```
feat: add <Name> component
fix: resolve <Component> focus issue
refactor: simplify <Component> variants
test: add tests for <Name>
docs: update theming guide
chore: upgrade dependencies
```
