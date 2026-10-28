import type { Meta, StoryObj } from '@storybook/react-vite';
import { SuggestionList } from '../src/components/SuggestionList';

const meta: Meta<typeof SuggestionList> = {
  title: 'Data Display/SuggestionList',
  component: SuggestionList,
  tags: ['autodocs'],
  args: {
    suggestions: [
      { id: '1', name: 'Grace Hopper', handle: '@grace' },
      { id: '2', name: 'Alan Turing', handle: '@alan' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SuggestionList>;

export const Default: Story = {};
