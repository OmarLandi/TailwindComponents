import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { TreeView } from '../src/components/TreeView';

describe('TreeView', () => {
  it('renders node', () => {
    render(<TreeView nodes={[{ id: '1', label: 'Root' }]} />);
    expect(screen.getByText('Root')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TreeView nodes={[{ id: '1', label: 'Root' }]} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
