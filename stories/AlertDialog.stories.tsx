import type { Meta, StoryObj } from '@storybook/react-vite';
import { Trash2 } from 'lucide-react';

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

const meta: Meta<typeof AlertDialog> = {
  title: 'Data Display/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A modal confirmation dialog for destructive or irreversible actions.

Unlike \`Dialog\`, an alert dialog requires the user to choose Cancel or Action and does not
close when clicking outside. Always provide a \`AlertDialogTitle\`; include a
\`AlertDialogDescription\` for context.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Playground: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
          Delete project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently deletes the project and all of its files. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete project</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const DestructiveConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Remove member</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Ada from the team?</AlertDialogTitle>
          <AlertDialogDescription>
            Ada will immediately lose access to all workspaces and shared files.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep member</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Remove member</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Mobile: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" fullWidth>
          Open confirmation
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish changes?</AlertDialogTitle>
          <AlertDialogDescription>
            The new version will be visible to everyone using the application.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
};
