import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeScript } from '../src/components/ThemeScript';

const meta: Meta<typeof ThemeScript> = {
  title: 'Utilities/ThemeScript',
  component: ThemeScript,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ThemeScript>;

export const Default: Story = {};
