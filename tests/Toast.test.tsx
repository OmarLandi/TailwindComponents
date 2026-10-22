import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '../src/components/Toast';

describe('Toast', () => {
  it('renders title and description', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>Description text</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(screen.getByText('Notification')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('renders action button', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
          <ToastAction altText="Undo">Undo</ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
          <ToastDescription>Description</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
