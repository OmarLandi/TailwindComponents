import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from '../src/components/DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'role', header: 'Role' },
    ],
    data: [
      { name: 'Ada', role: 'Engineer' },
      { name: 'Grace', role: 'Scientist' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {};
