import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from '../src/components/ContextMenu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Data Display/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  args: {
    trigger: <div className="rounded border border-dashed p-8">Right click here</div>,
    items: [{ label: 'Copy' }, { label: 'Delete' }],
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {};
