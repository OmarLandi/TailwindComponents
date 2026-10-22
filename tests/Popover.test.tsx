import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Popover, PopoverTrigger, PopoverContent } from '../src/components/Popover';
import { Button } from '../src/components/Button';

describe('Popover', () => {
  it('renders trigger', () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('should have no accessibility violations in the portal', async () => {
    render(
      <Popover open>
        <PopoverContent aria-label="Popover content">Accessible content</PopoverContent>
      </Popover>
    );

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const results = await axe.run(document.body);
    expect(results.violations).toHaveLength(0);
  });
});
