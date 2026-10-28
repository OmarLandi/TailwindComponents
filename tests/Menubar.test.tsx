import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { Menubar } from '../src/components/Menubar';

describe('Menubar', () => {
  it('renders items', () => {
    render(<Menubar items={[{ label: 'File' }, { label: 'Edit' }]} />);
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Menubar items={[{ label: 'File' }]} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
