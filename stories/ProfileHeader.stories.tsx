import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileHeader } from '../src/components/ProfileHeader';

const meta: Meta<typeof ProfileHeader> = {
  title: 'Data Display/ProfileHeader',
  component: ProfileHeader,
  tags: ['autodocs'],
  args: {
    name: 'Ada Lovelace',
    handle: '@ada',
    bio: 'Building accessible design systems.',
    stats: [
      { label: 'Posts', value: 12 },
      { label: 'Followers', value: '1.2k' },
      { label: 'Following', value: 180 },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ProfileHeader>;

export const Default: Story = {};
