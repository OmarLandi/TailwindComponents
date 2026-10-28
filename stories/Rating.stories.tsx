import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from '../src/components/Rating';

const meta: Meta<typeof Rating> = {
  title: 'Data Display/Rating',
  component: Rating,
  tags: ['autodocs'],
  args: {
    value: 4,
    max: 5,
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {};
export const ReadOnly: Story = { args: { readOnly: true, value: 3 } };
export const Small: Story = { args: { size: 'sm', value: 5 } };
