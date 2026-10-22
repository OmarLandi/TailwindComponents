import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../src/components/AlertDialog';
import { Button } from '../src/components/Button';
import { ThemeProvider } from '../src/components/Themes';

const Confirmation = ({
  onAction,
  onCancel,
}: {
  onAction?: () => void;
  onCancel?: () => void;
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button>Delete</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete project?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive" onClick={onAction}>
          Delete project
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

describe('AlertDialog', () => {
  it('opens with alertdialog semantics and a description', async () => {
    const user = userEvent.setup();
    render(<Confirmation />);

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Delete project?' })).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
    expect(dialog).toHaveAccessibleDescription('This action cannot be undone.');
  });

  it('runs the action and closes', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<Confirmation onAction={onAction} />);

    await user.click(screen.getByRole('button', { name: 'Delete' }));
    await user.click(screen.getByRole('button', { name: 'Delete project' }));

    expect(onAction).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  });

  it('cancels and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<Confirmation onCancel={onCancel} />);

    const trigger = screen.getByRole('button', { name: 'Delete' });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });

  it('uses the themed portal and has no accessibility violations', async () => {
    render(
      <ThemeProvider colorMode="dark" defaultPalette="violet">
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publish changes?</AlertDialogTitle>
              <AlertDialogDescription>
                The new version will be visible to everyone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Publish</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ThemeProvider>
    );

    const dialog = screen.getByRole('alertdialog');
    const portal = dialog.closest('[data-theme-portal]');
    expect(portal).toHaveClass('dark', 'theme-violet');

    const results = await axe.run(document.body);
    expect(results.violations).toHaveLength(0);
  });
});
