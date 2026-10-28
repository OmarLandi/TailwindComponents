import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterSignup } from '../src/components/NewsletterSignup';

const meta: Meta<typeof NewsletterSignup> = {
  title: 'Forms/NewsletterSignup',
  component: NewsletterSignup,
  tags: ['autodocs'],
  args: {
    title: 'Stay in the loop',
    description: 'Get product updates and engineering notes once a month.',
    submitLabel: 'Subscribe',
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterSignup>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const WithError: Story = { args: { error: 'Please enter a valid email address.' } };
