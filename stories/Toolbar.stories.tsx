import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar } from '../src/components/Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Data Display/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  args: {
    children: <button type="button">Action</button>,
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {};
