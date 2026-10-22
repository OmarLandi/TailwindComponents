import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../src/components/Container';

const meta: Meta<typeof Container> = {
  title: 'Data Display/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A responsive container component that centers content with a maximum width.

## Basic usage

\`\`\`tsx
import { Container } from 'libreriacomponentes';

<Container size="xl" padding="md">
  <div>Your content here</div>
</Container>
\`\`\`

## Sizes

\`\`\`tsx
<Container size="sm">Small container (640px)</Container>
<Container size="md">Medium container (768px)</Container>
<Container size="lg">Large container (1024px)</Container>
<Container size="xl">XL container (1280px)</Container>
<Container size="2xl">2XL container (1536px)</Container>
<Container size="form">Form container (32rem)</Container>
<Container size="prose">Prose container (65ch)</Container>
<Container size="content">Content container (64rem)</Container>
<Container size="wide">Wide container (80rem)</Container>
<Container size="full">Full width (no max-width)</Container>
\`\`\`

## Fluid mode

When \`fluid\` is true, the container always fills the available width:

\`\`\`tsx
<Container fluid padding="lg">
  Content that spans the full width with padding
</Container>
\`\`\``,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'form', 'prose', 'content', 'wide', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'default', 'md', 'lg'],
    },
    fluid: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Playground: Story = {
  args: {
    children: 'Container Content',
    size: 'xl',
    padding: 'md',
  },
  render: args => (
    <Container {...args}>
      <div className="border border-dashed border-border p-4">{args.children}</div>
    </Container>
  ),
};
