import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../src/components/Dialog';
import { Button } from '../src/components/Button';
import { ThemeProvider } from '../src/components/Themes';

describe('Dialog', () => {
  it('renders trigger button', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          Content
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Description text</DialogDescription>
          </DialogHeader>
          Dialog body content
        </DialogContent>
      </Dialog>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
    expect(screen.getByText('Dialog body content')).toBeInTheDocument();
  });

  it('renders footer', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
          Content
          <DialogFooter>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('portals content into the themed portal container', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ThemeProvider colorMode="dark" defaultPalette="violet">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Portaled Dialog</DialogTitle>
              <DialogDescription>Dialog description</DialogDescription>
            </DialogHeader>
            Content
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    );

    await user.click(screen.getByText('Open'));

    const dialog = screen.getByRole('dialog');
    const portal = dialog.closest('[data-theme-portal]');

    expect(portal).toBeInTheDocument();
    expect(portal).toHaveClass('dark', 'theme-violet');
    expect(container).not.toContainElement(dialog);
  });

  it('should have no accessibility violations in the portal', async () => {
    render(
      <ThemeProvider colorMode="dark" defaultPalette="violet">
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accessible Dialog</DialogTitle>
              <DialogDescription>Dialog description</DialogDescription>
            </DialogHeader>
            Content
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    );

    expect(screen.getByRole('dialog').closest('[data-theme-portal]')).toBeInTheDocument();

    const results = await axe.run(document.body);
    expect(results.violations).toHaveLength(0);
  });
});
