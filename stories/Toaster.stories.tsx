import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster } from '../src/components/Toaster';

const meta: Meta<typeof Toaster> = {
  title: 'Utilities/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  args: {
    children: 'Toast host',
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {};
