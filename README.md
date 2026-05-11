# Librería de Componentes React

Una librería de componentes moderna y configurable construida con TypeScript, Tailwind CSS, Radix UI y Ladle.

## Características Principales

- **React** - Componentes React con toda la funcionalidad
- **TypeScript** - Tipado completo
- **Tailwind CSS** - Estilos utilitarios
- **Radix UI** - Componentes accesibles base
- **Ladle** - Documentación interactiva rápida (alternativa a Storybook)
- **Accesibilidad WCAG 2.1** - Componentes accesibles por defecto

## Instalación

```bash
npm install libreria-componentes
```

## Uso Rápido

### React

```tsx
// 1. Importar estilos
import 'libreria-componentes/style.css';

// 2. Importar componentes
import { Button, TextField, Select } from 'libr';

function App()eria-componentes {
  return (
    <div>
      <Button variant="default" size="lg">
        Click me
      </Button>

      <TextField
        label="Email"
        placeholder="Enter your email"
      />

      <Select
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' }
        ]}
        placeholder="Select..."
      />
    </div>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import { Button, TextField, Select } from 'libreria-componentes';
// o
import { Button, TextField, Select } from 'libreria-componentes/vue';
</script>

<template>
  <div>
    <Button variant="default" size="lg"> Click me </Button>

    <TextField label="Email" placeholder="Enter your email" />

    <Select
      :options="[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
      ]"
      placeholder="Select..."
    />
  </div>
</template>
```

## Documentación

### 📚 Guías Disponibles

| Documento                                      | Descripción                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| [docs/architecture.md](docs/architecture.md)   | Arquitectura, estructura del proyecto y cómo agregar nuevos componentes |
| [docs/ladle.md](docs/ladle.md)                 | Configuración de Ladle y cómo crear stories                             |
| [docs/styling.md](docs/styling.md)             | Sistema de theming, variables CSS y personalización                     |
| [docs/accessibility.md](docs/accessibility.md) | Librerías de accesibilidad y mejores prácticas WCAG                     |
| [docs/CHANGELOG.md](docs/CHANGELOG.md)         | Historial de cambios y versiones                                        |

### 🎨 Documentación Interactiva

La documentación visual de componentes está disponible en Ladle.

```bash
npm run dev
```

Abre [http://localhost:61000](http://localhost:61000) para ver:

- Todos los componentes con ejemplos interactivos
- Controles para probar variantes y props
- Preview en tiempo real

## Scripts

```bash
npm run dev           # Iniciar Ladle
npm run build         # Build de la librería
npm run build:ladle   # Build estático de Ladle
npm run test          # Ejecutar tests
npm run lint          # Linting
npm run format        # Formatear código
npm run release       # Crear release
```

## Componentes Disponibles

| Componente    | Descripción                          |
| ------------- | ------------------------------------ |
| Button        | Botón con variantes y estados        |
| TextField     | Campo de texto con validación        |
| Select        | Selector desplegable                 |
| DropdownMenu  | Menú desplegable                     |
| Container     | Contenedor responsive                |
| ErrorBoundary | Captura errores en componentes hijos |

## Cómo Funciona

Los componentes están en la carpeta `src/components/` y usan:

- **React** - Renderizado de componentes
- **Radix UI** - Componentes base accesibles
- **Tailwind CSS** - Estilos con variables CSS
  └── vue/
  └── components/Button.vue ← Generado para Vue

````

### Beneficios

1. **Código único** - Mantén una sola versión de cada componente
2. **Consistencia** - Comportamiento idéntico en React y Vue
3. **Mantenimiento simple** - Cambios en un solo lugar
4. **TypeScript** - Tipado completo en ambos frameworks

## Librerías de Referencia

| Librería      | Descripción                                                                  | Enlace                                           |
| ------------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| **shadcn/ui** | Componentes accesibles y personalizables construidos con Radix UI y Tailwind | [shadcn.com](https://ui.shadcn.com)              |
| **Radix UI**  | Componentes primitivos accesibles                                            | [radix-ui.com](https://www.radix-ui.com)         |
| **Ladle**     | Alternativa rápida a Storybook                                               | [ladle.dev](https://ladle.dev)                   |

## Requisitos

- React 18+
- Tailwind CSS 3.4+
- Node.js 18+

## Licencia

MIT - ver [LICENSE](LICENSE)

## Contribuir

Usa **Conventional Commits** para las contribuciones:

```bash
git commit -m "feat: add new component"     # Nueva funcionalidad
git commit -m "fix: resolve bug"           # Corregir error
git commit -m "docs: update documentation" # Actualizar docs
````

Ejecuta `npm run release` para generar el changelog automáticamente.

## Primeros Pasos para Nuevos Desarrolladores

1. **npm install** - Instala las dependencias
2. **npm run dev** - Inicia Ladle para ver los componentes
3. Explora los ejemplos en la sección de docs para entender cómo funciona cada cosa
