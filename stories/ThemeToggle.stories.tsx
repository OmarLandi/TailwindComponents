import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, ThemeToggle } from '../src/components/Themes';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A toggle component for switching between light and dark color modes.

## Basic usage

\`\`\`tsx
import { ThemeProvider, ThemeToggle } from 'libreriacomponentes';

<ThemeProvider defaultPalette="violet">
  <ThemeToggle />
</ThemeProvider>
\`\`\`

## Controlled usage

\`\`\`tsx
const [mode, setMode] = useState<'light' | 'dark'>('light');

<ThemeToggle
  value={mode}
  onChange={setMode}
  useContext={false}
/>
\`\`\`

## Variants

\`\`\`tsx
<ThemeToggle variant="default" />
<ThemeToggle variant="ghost" />
<ThemeToggle variant="outline" />
\`\`\`

## Sizes

\`\`\`tsx
<ThemeToggle size="xs" />
<ThemeToggle size="sm" />
<ThemeToggle size="default" />
<ThemeToggle size="lg" />
\`\`\``,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
  render: args => (
    <ThemeProvider>
      <ThemeToggle {...args} />
    </ThemeProvider>
  ),
};
