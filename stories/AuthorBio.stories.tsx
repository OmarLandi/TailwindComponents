import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthorBio } from '../src/components/AuthorBio';

const meta: Meta<typeof AuthorBio> = {
  title: 'Data Display/AuthorBio',
  component: AuthorBio,
  tags: ['autodocs'],
  args: {
    name: 'Ada Lovelace',
    jobTitle: 'Principal Engineer',
    bio: 'Ada builds accessible design systems and writes about frontend architecture.',
    avatarFallback: 'AL',
  },
};

export default meta;
type Story = StoryObj<typeof AuthorBio>;

export const Default: Story = {};
export const WithAvatar: Story = {
  args: {
    avatarSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80',
  },
};
