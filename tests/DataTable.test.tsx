import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { DataTable } from '../src/components/DataTable';

describe('DataTable', () => {
  it('renders rows', () => {
    render(<DataTable columns={[{ key: 'name', header: 'Name' }]} data={[{ name: 'Ada' }]} />);
    expect(screen.getByText('Ada')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <DataTable columns={[{ key: 'name', header: 'Name' }]} data={[{ name: 'Ada' }]} />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
