import type { Meta, StoryObj } from '@storybook/react-vite';
import { Article } from '../src/components/Article';

const meta: Meta<typeof Article> = {
  title: 'Data Display/Article',
  component: Article,
  tags: ['autodocs'],
  args: {
    title: 'Designing resilient component libraries',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Laptop on a desk',
    category: 'Engineering',
    excerpt: 'A practical guide to building accessible, responsive and themeable React components.',
    author: 'Ada Lovelace',
    date: 'Oct 28, 2026',
    readingTime: '6 min read',
  },
};

export default meta;
type Story = StoryObj<typeof Article>;

export const Default: Story = {};
export const WithoutImage: Story = { args: { imageSrc: undefined } };
