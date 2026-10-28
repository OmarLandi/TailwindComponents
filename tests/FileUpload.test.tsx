import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { FileUpload } from '../src/components/FileUpload';

describe('FileUpload', () => {
  it('renders button', () => {
    render(<FileUpload />);
    expect(screen.getByRole('button', { name: /choose files/i })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<FileUpload />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
