import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { Avatar, AvatarImage, AvatarFallback } from '../src/components/Avatar';

describe('Avatar', () => {
  it('renders fallback when no image', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders fallback when image cannot load', () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.png" alt="avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Avatar className="custom-avatar">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('A').parentElement).toHaveClass('custom-avatar');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
