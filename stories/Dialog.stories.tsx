import type { Meta, StoryObj } from '@storybook/react-vite';
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

const meta: Meta<typeof Dialog> = {
  title: 'Data Display/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `## Basic usage

\`\`\`tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from 'libreriacomponentes';
import { Button } from 'libreriacomponentes';

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

## Variants

\`\`\`tsx
// Large dialog
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Large Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-2xl">
    <DialogHeader>
      <DialogTitle>Terms of Service</DialogTitle>
      <DialogDescription>Please read the following terms carefully.</DialogDescription>
    </DialogHeader>
    <div>Long content here...</div>
    <DialogFooter>
      <Button variant="outline">Decline</Button>
      <Button>Accept</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Controlled dialog with useState
const [open, setOpen] = useState(false);
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="outline">Controlled Dialog</Button>
  </DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>
\`\`\`
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Playground: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm text-muted-foreground">Dialog content goes here.</div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
