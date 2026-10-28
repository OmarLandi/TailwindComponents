import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible } from '../src/components/Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Data Display/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  args: {
    title: 'Advanced settings',
    children: 'Hidden content',
    defaultOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
