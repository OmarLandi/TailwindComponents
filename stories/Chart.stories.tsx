import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chart } from '../src/components/Chart';

const meta: Meta<typeof Chart> = {
  title: 'Data Display/Chart',
  component: Chart,
  tags: ['autodocs'],
  args: {
    title: 'Monthly revenue',
    data: [
      { label: 'Jan', value: 12 },
      { label: 'Feb', value: 18 },
      { label: 'Mar', value: 9 },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const Default: Story = {};
