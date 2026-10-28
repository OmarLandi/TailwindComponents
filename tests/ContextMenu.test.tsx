import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { ContextMenu } from '../src/components/ContextMenu';

describe('ContextMenu', () => {
  it('renders trigger', () => {
    render(<ContextMenu trigger={<span>Trigger</span>} items={[{ label: 'Copy' }]} />);
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ContextMenu trigger={<span>Trigger</span>} items={[{ label: 'Copy' }]} />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
