import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../src/components/Card';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A flexible container for grouping related content.

## Basic usage (with header, content, and footer)

\`\`\`tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'libreriacomponentes';
import { Button } from 'libreriacomponentes';

<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This is the card content area where you put the main information.</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
\`\`\`

## Simple card (header only)

\`\`\`tsx
<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Simple Card</CardTitle>
    <CardDescription>A card with just header and content.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Some quick example text to illustrate the card content.</p>
  </CardContent>
</Card>
\`\`\`

## With image

\`\`\`tsx
<Card className="w-full max-w-sm overflow-hidden">
  <div className="h-48 bg-muted flex items-center justify-center">
    <p className="text-muted-foreground">Image placeholder</p>
  </div>
  <CardHeader>
    <CardTitle>Beautiful Landscape</CardTitle>
    <CardDescription>Explore the great outdoors</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Discover amazing places and experiences.</p>
  </CardContent>
</Card>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you put the main information.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};
