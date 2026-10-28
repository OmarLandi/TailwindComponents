import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { DirectionProvider, useDirection } from '../src/components/DirectionProvider';

function DirectionReader() {
  const direction = useDirection();
  return <span>{direction}</span>;
}

describe('DirectionProvider', () => {
  it('provides direction', () => {
    render(
      <DirectionProvider dir="rtl">
        <DirectionReader />
      </DirectionProvider>
    );
    expect(screen.getByText('rtl')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <DirectionProvider dir="ltr">
        <span>Content</span>
      </DirectionProvider>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
