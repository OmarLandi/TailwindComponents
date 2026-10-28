import type { Meta, StoryObj } from '@storybook/react-vite';
import { BreakingNewsBanner } from '../src/components/BreakingNewsBanner';

const meta: Meta<typeof BreakingNewsBanner> = {
  title: 'Data Display/BreakingNewsBanner',
  component: BreakingNewsBanner,
  tags: ['autodocs'],
  args: {
    title: 'Major update released for the component library',
    description: 'All templates now pass responsive and accessibility checks.',
    dismissible: true,
  },
};

export default meta;
type Story = StoryObj<typeof BreakingNewsBanner>;

export const Default: Story = {};
export const WithAction: Story = {
  args: { action: <button type="button">Read more</button> },
};
