import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { PasswordInput } from '../src/components/PasswordInput';

describe('PasswordInput', () => {
  it('renders input', () => {
    render(<PasswordInput placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<PasswordInput placeholder="Password" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
