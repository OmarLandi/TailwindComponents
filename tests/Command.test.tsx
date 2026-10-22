import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../src/components/Command';
import { ThemeProvider } from '../src/components/Themes';

const CommandExample = ({ onSelect }: { onSelect?: (value: string) => void }) => (
  <Command label="Command menu">
    <CommandInput placeholder="Search commands" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Navigation">
        <CommandItem value="calendar" onSelect={onSelect}>
          Calendar
        </CommandItem>
        <CommandItem value="documents" onSelect={onSelect}>
          Documents
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Account">
        <CommandItem value="profile" onSelect={onSelect}>
          Profile
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

describe('Command', () => {
  it('renders a searchable command list', () => {
    render(<CommandExample />);

    expect(screen.getByRole('combobox', { name: 'Command menu' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Calendar' })).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('filters items and shows the empty state', async () => {
    const user = userEvent.setup();
    render(<CommandExample />);

    const input = screen.getByRole('combobox', { name: 'Command menu' });
    await user.type(input, 'cal');

    expect(screen.getByRole('option', { name: 'Calendar' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Documents' })).not.toBeInTheDocument();

    await user.clear(input);
    await user.type(input, 'zzzz');

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('selects an item with the keyboard', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<CommandExample onSelect={onSelect} />);

    const input = screen.getByRole('combobox', { name: 'Command menu' });
    await user.type(input, 'cal');
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledWith('calendar');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<CommandExample />);

    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders inside a themed dialog with accessible name and no violations', async () => {
    render(
      <ThemeProvider colorMode="dark" defaultPalette="violet">
        <CommandDialog open>
          <CommandInput aria-label="Search commands" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem value="calendar">Calendar</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </ThemeProvider>
    );

    const dialog = screen.getByRole('dialog', { name: 'Command palette' });
    expect(dialog).toBeInTheDocument();
    expect(dialog.closest('[data-theme-portal]')).toHaveClass('dark', 'theme-violet');

    const results = await axe.run(document.body);
    expect(results.violations).toHaveLength(0);
  });
});
