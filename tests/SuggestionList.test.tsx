import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { SuggestionList } from '../src/components/SuggestionList';

describe('SuggestionList', () => {
  it('calls follow', async () => {
    const user = userEvent.setup();
    const onFollow = vi.fn();
    render(<SuggestionList suggestions={[{ id: '1', name: 'Ada' }]} onFollow={onFollow} />);
    await user.click(screen.getByRole('button', { name: /follow/i }));
    expect(onFollow).toHaveBeenCalledWith('1');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SuggestionList suggestions={[{ id: '1', name: 'Ada' }]} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
