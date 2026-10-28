import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavigationMenu } from '../src/components/NavigationMenu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Home', href: '#', active: true },
      { label: 'Docs', href: '#' },
      { label: 'Components', href: '#' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {};
