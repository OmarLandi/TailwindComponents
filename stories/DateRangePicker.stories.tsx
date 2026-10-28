import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangePicker } from '../src/components/DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Forms/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {};
