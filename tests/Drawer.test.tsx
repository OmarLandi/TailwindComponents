import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
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

describe('Drawer', () => {
  it('renders trigger button', () => {
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>Content</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens drawer on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent aria-describedby={undefined}>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>Drawer content</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('renders footer', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent aria-describedby={undefined}>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Drawer footer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>Content</DrawerBody>
          <DrawerFooter>
            <Button>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders description', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description text</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('renders close button', async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent showClose aria-describedby={undefined}>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>Content</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should have no accessibility violations in the portal', async () => {
    render(
      <Drawer open>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Accessible Drawer</DrawerTitle>
            <DrawerDescription>Description for accessibility</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Content</DrawerBody>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const results = await axe.run(document.body);
    expect(results.violations).toHaveLength(0);
  });
});
