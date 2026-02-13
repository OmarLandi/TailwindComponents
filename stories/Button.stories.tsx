import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `El componente **Button** es un elemento interactivo fundamental que permite a los usuarios ejecutar acciones dentro de la aplicación. Proporciona una experiencia de usuario consistente y accesible, con múltiples variantes visuales, tamaños y estados para adaptarse a diferentes contextos de la interfaz.

**Propósito:**
- Acciones principales: enviar formularios, confirmar decisiones o ejecutar operaciones
- Navegación: dirigir al usuario a otras páginas o secciones (usando \`asChild\`)
- Acciones destructivas: eliminar, cancelar o revertir operaciones
- Estados de carga: indicar que una operación está en progreso

**Características:**
- Más de 40 variantes visuales (sólidas, outline, ghost, soft, 3D, gradient, glass, etc.)
- Múltiples tamaños (xs, sm, default, lg, xl, icon)
- Estados: disabled, loading, fullWidth
- Soporte para iconos a izquierda/derecha
- Composición con otros componentes (asChild)
- Accesibilidad WCAG 2.1 completa`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Variante de estilo del botón',
    },
    size: {
      control: 'select',
      description: 'Tamaño del botón',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ocupa todo el ancho disponible',
    },
    asChild: {
      control: 'boolean',
      description: 'Usa Slot de Radix UI',
    },
    disabled: {
      control: 'boolean',
      description: 'Botón deshabilitado',
    },
    isLoading: {
      control: 'boolean',
      description: 'Muestra estado de carga',
    },
    leftIcon: {
      control: 'object',
      description: 'Icono a la izquierda',
    },
    rightIcon: {
      control: 'object',
      description: 'Icono a la derecha',
    },
    onClick: {
      action: 'clicked',
      description: 'Función callback al hacer click',
    },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta accesible para lectores de pantalla (para botones con solo icono)',
    },
    sizeResponsive: {
      control: 'object',
      description: 'Tamaños responsive para diferentes breakpoints (base, sm, md, lg, xl)',
    },
    children: {
      control: 'text',
      description: 'Contenido del botón',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};
