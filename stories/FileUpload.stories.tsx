import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from '../src/components/FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  args: {
    description: 'PNG, JPG or PDF up to 10MB.',
    multiple: true,
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {};
