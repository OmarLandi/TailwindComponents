import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimePicker } from '../src/components/TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Forms/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {};
