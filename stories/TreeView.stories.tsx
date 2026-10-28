import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeView } from '../src/components/TreeView';

const meta: Meta<typeof TreeView> = {
  title: 'Data Display/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  args: {
    nodes: [
      {
        id: '1',
        label: 'Documents',
        children: [
          { id: '1.1', label: 'Report.pdf' },
          { id: '1.2', label: 'Notes.txt' },
        ],
      },
      { id: '2', label: 'Images' },
    ],
    defaultExpanded: ['1'],
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {};
