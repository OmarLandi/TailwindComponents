import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '../src/components/DropdownMenu';
import { Button } from '../src/components/Button';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Data Display/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A dropdown menu component built on Radix UI for displaying a list of actions or options.

## Basic usage

\`\`\`tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from 'libreriacomponentes';
import { Button } from 'libreriacomponentes';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
\`\`\`

## With checkbox items

\`\`\`tsx
<DropdownMenuCheckboxItem>Show bookmarks</DropdownMenuCheckboxItem>
<DropdownMenuCheckboxItem>Show full URLs</DropdownMenuCheckboxItem>
\`\`\`

## With radio group

\`\`\`tsx
<DropdownMenuRadioGroup defaultValue="option1">
  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
  <DropdownMenuRadioItem value="option1">System</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="option2">Light</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="option3">Dark</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Playground: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>Show bookmarks</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show full URLs</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue="option1">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioItem value="option1">System</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="option2">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="option3">Dark</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
