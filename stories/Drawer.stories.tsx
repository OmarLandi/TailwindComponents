import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
} from '../src/components/Drawer';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Data Display/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `## Basic usage

\`\`\`tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter } from 'libreriacomponentes';
import { Button } from 'libreriacomponentes';

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent direction="right">
    <DrawerHeader>
      <DrawerTitle>Navigation</DrawerTitle>
      <DrawerDescription>Navigate through the application.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <p>Drawer content here.</p>
    </DrawerBody>
    <DrawerFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
\`\`\`

## Variants

\`\`\`tsx
// Right drawer (default)
<DrawerContent direction="right">...</DrawerContent>

// Left drawer
<DrawerContent direction="left">
  <DrawerHeader>
    <DrawerTitle>Left Panel</DrawerTitle>
  </DrawerHeader>
  <DrawerBody>Content from the left side.</DrawerBody>
</DrawerContent>

// Bottom drawer (sheet)
<DrawerContent direction="bottom">
  <DrawerHeader>
    <DrawerTitle>Bottom Sheet</DrawerTitle>
  </DrawerHeader>
  <DrawerBody>Content from the bottom.</DrawerBody>
</DrawerContent>
\`\`\`
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Playground: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent direction="right">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Navigate through the application.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-muted-foreground">Drawer content goes here.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
