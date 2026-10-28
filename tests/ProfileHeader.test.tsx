import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { ProfileHeader } from '../src/components/ProfileHeader';

describe('ProfileHeader', () => {
  it('renders name', () => {
    render(<ProfileHeader name="Ada Lovelace" />);
    expect(screen.getByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ProfileHeader name="Ada Lovelace" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
