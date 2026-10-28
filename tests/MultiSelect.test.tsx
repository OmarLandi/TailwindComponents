import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { MultiSelect } from '../src/components/MultiSelect';

describe('MultiSelect', () => {
  it('renders placeholder', () => {
    render(<MultiSelect options={[{ value: 'a', label: 'Alpha' }]} />);
    expect(screen.getByText('Select options')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<MultiSelect options={[{ value: 'a', label: 'Alpha' }]} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
