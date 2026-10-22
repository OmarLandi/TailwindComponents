import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../src/components/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
  parameters: {
    docs: {
      description: {
        component: `A tabbed navigation component for switching between different content views.

## Basic usage

\`\`\`tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'libreriacomponentes';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Password</TabsTrigger>
    <TabsTrigger value="tab3" disabled>Disabled</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Account settings content.</TabsContent>
  <TabsContent value="tab2">Password settings content.</TabsContent>
</Tabs>
\`\`\`

## Variants

\`\`\`tsx
{/* Horizontal (default) */}
<Tabs orientation="horizontal">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
</Tabs>

{/* Vertical */}
<Tabs orientation="vertical">
  <TabsList className="flex-col h-auto">
    <TabsTrigger value="tab1" className="w-full justify-start">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2" className="w-full justify-start">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
</Tabs>

{/* With disabled tab */}
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Active</TabsTrigger>
    <TabsTrigger value="tab2" disabled>Locked</TabsTrigger>
  </TabsList>
</Tabs>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  args: {
    defaultValue: 'tab1',
  },
  render: args => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 border border-border rounded-md mt-2">
        Account settings content.
      </TabsContent>
      <TabsContent value="tab2" className="p-4 border border-border rounded-md mt-2">
        Password settings content.
      </TabsContent>
      <TabsContent value="tab3" className="p-4 border border-border rounded-md mt-2">
        Disabled tab content.
      </TabsContent>
    </Tabs>
  ),
};
