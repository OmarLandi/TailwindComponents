import type { Meta, StoryObj } from '@storybook/react-vite';
import { DirectionProvider } from '../src/components/DirectionProvider';

const meta: Meta<typeof DirectionProvider> = {
  title: 'Utilities/DirectionProvider',
  component: DirectionProvider,
  tags: ['autodocs'],
  args: {
    dir: 'rtl',
    children: 'محتوى',
  },
};

export default meta;
type Story = StoryObj<typeof DirectionProvider>;

export const Default: Story = {};
