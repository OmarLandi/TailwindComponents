import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A versatile button component with support for variants, sizes, icons, loading states, and responsive sizing.

## Basic usage

\`\`\`tsx
import { Button } from 'libreriacomponentes';

<Button variant="default" size="default">
  Click me
</Button>
\`\`\`

## Variants

\`\`\`tsx
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
\`\`\`

## Sizes

\`\`\`tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">XL</Button>
<Button size="icon">+</Button>
\`\`\`

## Loading state

\`\`\`tsx
<Button isLoading>Loading</Button>
\`\`\`

## Full width

\`\`\`tsx
<Button fullWidth>Full Width Button</Button>
\`\`\`

## Icons

\`\`\`tsx
<Button leftIcon={<SearchIcon />}>Search</Button>
<Button rightIcon={<ArrowRight />}>Next</Button>
\`\`\`

## As child (composition with Radix)

\`\`\`tsx
<Button asChild>
  <a href="/page">Link as Button</a>
</Button>
\`\`\``,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'secondary', 'accent', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'icon'],
    },
    fullWidth: { control: 'boolean' },
    asChild: { control: 'boolean' },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    leftIcon: { control: 'object' },
    rightIcon: { control: 'object' },
    onClick: { action: 'clicked' },
    'aria-label': { control: 'text' },
    responsiveSize: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};
