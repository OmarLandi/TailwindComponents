import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { NavigationMenu } from '../src/components/NavigationMenu';

describe('NavigationMenu', () => {
  it('renders links', () => {
    render(<NavigationMenu items={[{ label: 'Home', href: '#' }]} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<NavigationMenu items={[{ label: 'Home', href: '#' }]} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
