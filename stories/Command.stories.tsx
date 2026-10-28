import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDays, CreditCard, FileText, Folder, Settings, User } from 'lucide-react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '../src/components/Command';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Command> = {
  title: 'Navigation/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `An accessible command menu and searchable action palette.

Use \`Command\` inline or \`CommandDialog\` for a modal palette. The component uses
\`cmdk\` for filtering, keyboard navigation and ARIA semantics. Connect a global
shortcut (for example \`Ctrl/Cmd + K\`) in your application.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

const items = [
  { icon: CalendarDays, label: 'Calendar', shortcut: 'G C' },
  { icon: FileText, label: 'Documents', shortcut: 'G D' },
  { icon: Folder, label: 'Projects', shortcut: 'G P' },
  { icon: User, label: 'Profile', shortcut: 'G U' },
  { icon: CreditCard, label: 'Billing', shortcut: 'G B' },
  { icon: Settings, label: 'Settings', shortcut: 'G S' },
];

const CommandContent = () => (
  <>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Navigation">
        {items.slice(0, 4).map(item => {
          const Icon = item.icon;
          return (
            <CommandItem key={item.label} value={item.label}>
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
              <CommandShortcut>{item.shortcut}</CommandShortcut>
            </CommandItem>
          );
        })}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Account">
        {items.slice(4).map(item => {
          const Icon = item.icon;
          return (
            <CommandItem key={item.label} value={item.label}>
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
              <CommandShortcut>{item.shortcut}</CommandShortcut>
            </CommandItem>
          );
        })}
      </CommandGroup>
    </CommandList>
  </>
);

export const Playground: Story = {
  render: () => (
    <Command label="Command menu" className="max-w-md rounded-lg border border-border shadow-md">
      <CommandContent />
    </Command>
  ),
};

const CommandPaletteExample = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(current => !current);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandContent />
      </CommandDialog>
    </>
  );
};

export const CommandDialogStory: Story = {
  name: 'Command Dialog',
  render: () => <CommandPaletteExample />,
};

export const Mobile: Story = {
  render: () => (
    <Command label="Command menu" className="w-full rounded-lg border border-border shadow-md">
      <CommandContent />
    </Command>
  ),
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
};
