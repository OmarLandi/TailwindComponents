import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelect } from '../src/components/MultiSelect';

const meta: Meta<typeof MultiSelect> = {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Beta' },
      { value: 'c', label: 'Gamma' },
    ],
    placeholder: 'Choose options',
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: ['a', 'b'] } };
