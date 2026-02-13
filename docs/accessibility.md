# Documentación de Accesibilidad

## ¿Qué es la Accesibilidad?

La accesibilidad (a11y) significa que todas las personas pueden usar los componentes, incluyendo:

- Personas con discapacidad visual (usuarios de lectores de pantalla)
- Personas con discapacidad motora (usan teclado en lugar de mouse)
- Personas mayores que pueden tener visión reducida

**WCAG 2.1** son las pautas internacionales de accesibilidad web. "Nivel AA" significa que cumplimos la mayoría de los requisitos esenciales.

## Librerías de Accesibilidad

### @storybook/addon-a11y

**Propósito:** Panel de verificación de accesibilidad integrado en Storybook.

**Instalación:** Incluida por defecto en el proyecto.

**Uso en Storybook:**

- Al ejecutar `npm run dev`, cada story muestra un panel de "Accessibility"
- Muestra automáticamente violaciones de WCAG
- Proporciona sugerencias detalladas para corregir problemas

**Configuración en `.storybook/main.ts`:**

```ts
addons: ['@storybook/addon-a11y', ...]
```

### @axe-core/react

**Propósito:** Testing automatizado de accesibilidad en pruebas unitarias.

**Instalación:**

```bash
npm install -D @axe-core/react
```

**Uso en tests:**

```tsx
import { axe, toHaveNoViolations } from '@axe-core/react';
import { render } from '@testing-library/react';
import { Button } from '../src/components/Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### @testing-library/user-event

**Propósito:** Simula interacciones reales de usuario para testing.

**Instalación:**

```bash
npm install -D @testing-library/user-event
```

**Uso:**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../src/components/Button';

it('handles user interaction correctly', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Principios de Accesibilidad Implementados

### 1. Semántica HTML

- Uso de elementos HTML semánticos (`<button>`, `<a>`, `<input>`)
- Roles ARIA cuando es necesario
- Labels asociados correctamente

### 2. Navegación por Teclado

- Todos los componentes son navegables con Tab
- Soporte para teclas de dirección donde corresponde
- Indicadores visuales de foco visibles

### 3. Contraste de Colores

- Cumplimiento de ratio 4.5:1 para texto normal
- Variables CSS diseñadas para cumplir WCAG
- Soporte para modo oscuro

### 4. Screen Readers

- Attributes ARIA apropiados
- Labels visibles y descriptivos
- Mensajes de estado anunciados

## Patrones de Accesibilidad en Componentes

### Button

- ✅ Rol `button` implícito
- ✅ Soporte para `disabled`
- ✅ Estados de foco visibles
- ✅ Contraste suficiente en todas las variantes

### ErrorBoundary

- ✅ Mensajes de error claros
- ✅ Rol `alert` para errores críticos

## Mejores Prácticas

### Al Crear Nuevos Componentes

1. **Usa elementos semánticos:**

   ```tsx
   // ✅ Correcto
   <button>Click me</button>

   // ❌ Incorrecto
   <div onClick={...}>Click me</div>
   ```

2. **Agrega labels:**

   ```tsx
   // ✅ Correcto
   <Button aria-label="Cerrar diálogo">
     <XIcon />
   </Button>
   ```

3. **Maneja estados de foco:**

   ```tsx
   // ✅ Correcto - usa Tailwind
   className = 'focus-visible:ring-2 focus-visible:ring-offset-2';
   ```

4. **Testea con axe-core:**
   ```tsx
   it('should have no a11y violations', async () => {
     const { container } = render(<MyComponent />);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```

## Recursos Adicionales

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
