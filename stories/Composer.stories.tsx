import type { Meta, StoryObj } from '@storybook/react-vite';
import { Composer } from '../src/components/Composer';

const meta: Meta<typeof Composer> = {
  title: 'Forms/Composer',
  component: Composer,
  tags: ['autodocs'],
  args: {
    placeholder: "What's on your mind?",
  },
};

export default meta;
type Story = StoryObj<typeof Composer>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
