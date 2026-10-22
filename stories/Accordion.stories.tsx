import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../src/components/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['single', 'multiple'] },
  },
  parameters: {
    docs: {
      description: {
        component: `A vertically stacked set of interactive headings that reveal or hide associated content sections.

## Basic usage

\`\`\`tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'libreriacomponentes';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. It comes with default styles that match your theme.</AccordionContent>
  </AccordionItem>
</Accordion>
\`\`\`

## Multiple mode

\`\`\`tsx
<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>First section</AccordionTrigger>
    <AccordionContent>Content for the first section.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second section</AccordionTrigger>
    <AccordionContent>Content for the second section.</AccordionContent>
  </AccordionItem>
</Accordion>
\`\`\`

## With disabled item

\`\`\`tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Available Section</AccordionTrigger>
    <AccordionContent>This section can be expanded.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" disabled>
    <AccordionTrigger>Disabled Section</AccordionTrigger>
    <AccordionContent>You cannot see this content.</AccordionContent>
  </AccordionItem>
</Accordion>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: args => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your theme.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It has smooth animation for expanding and collapsing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
