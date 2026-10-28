import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorState } from '../src/components/ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'Data Display/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  args: {
    title: 'Failed to load data',
    description: 'Please try again in a moment.',
  },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {};
export const WithAction: Story = { args: { action: <button type="button">Retry</button> } };
