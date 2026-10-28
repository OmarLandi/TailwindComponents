import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menubar } from '../src/components/Menubar';

const meta: Meta<typeof Menubar> = {
  title: 'Navigation/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  args: {
    items: [{ label: 'File' }, { label: 'Edit' }, { label: 'View' }],
  },
};

export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {};
