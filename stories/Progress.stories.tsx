import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '../src/components/Progress';

const meta: Meta<typeof Progress> = {
  title: 'Data Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A progress bar component with label and percentage display.

## Basic usage

\`\`\`tsx
import { Progress } from 'libreriacomponentes';

<Progress value={65} label="Loading" showValue />
\`\`\``,
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  args: {
    value: 65,
    label: 'Progress',
    showValue: true,
  },
};
