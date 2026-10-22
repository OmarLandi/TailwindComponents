import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { ThemeToggle, ThemeProvider } from '../src/components/Themes';

describe('Themes', () => {
  it('renders correctly within ThemeProvider', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders with light theme by default', () => {
    render(
      <ThemeProvider colorMode="light">
        <ThemeToggle />
      </ThemeProvider>
    );
    const button = screen.getByRole('switch');
    expect(button).toHaveAttribute('aria-checked', 'false');
  });

  it('renders with dark theme', () => {
    render(
      <ThemeProvider colorMode="dark">
        <ThemeToggle />
      </ThemeProvider>
    );
    const button = screen.getByRole('switch');
    expect(button).toHaveAttribute('aria-checked', 'true');
  });

  it('injects a valid scoped style element', () => {
    render(
      <ThemeProvider colorMode="dark" defaultPalette="violet">
        <span>content</span>
      </ThemeProvider>
    );

    const style = document.getElementById('theme-provider-style');
    expect(style).toBeInTheDocument();
    expect(style?.textContent).toContain('.dark.theme-violet');
    expect(style?.textContent).toContain('--background:');
    expect(style?.textContent).not.toContain('hsl(hsl(');
  });

  it('applies the color mode and palette classes to the wrapper', () => {
    const { container } = render(
      <ThemeProvider colorMode="dark" defaultPalette="emerald">
        <span>content</span>
      </ThemeProvider>
    );

    expect(container.firstChild).toHaveClass('dark', 'theme-emerald');
  });

  it('deep-merges defaultTheme overrides without dropping other tokens', () => {
    render(
      <ThemeProvider
        defaultTheme={{
          colors: { primary: 'hsl(280 80% 50%)' },
          shadows: { md: '0 0 1px red' },
          radius: '1rem',
        }}
      >
        <span>content</span>
      </ThemeProvider>
    );

    const css = document.getElementById('theme-provider-style')?.textContent ?? '';
    expect(css).toContain('--primary: 280 80% 50%');
    expect(css).toContain('--shadow-md: 0 0 1px red');
    expect(css).toContain('--radius: 1rem');
    expect(css).toContain('--background:');
    expect(css).toContain('--shadow-sm:');
  });

  it('applies the theme to documentElement when applyToRoot is enabled', () => {
    const { unmount } = render(
      <ThemeProvider applyToRoot colorMode="dark" defaultPalette="violet">
        <span>content</span>
      </ThemeProvider>
    );

    const root = document.documentElement;
    expect(root).toHaveClass('dark', 'theme-violet');
    expect(root.style.getPropertyValue('--primary')).not.toBe('');

    unmount();

    expect(root).not.toHaveClass('dark', 'theme-violet');
    expect(root.style.getPropertyValue('--primary')).toBe('');
  });

  it('renders with variant', () => {
    render(
      <ThemeProvider>
        <ThemeToggle variant="outline" />
      </ThemeProvider>
    );
    const button = screen.getByRole('switch');
    expect(button).toHaveClass('border-2', 'border-primary');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <ThemeToggle size="sm" />
      </ThemeProvider>
    );
    expect(screen.getByRole('switch')).toHaveClass('h-8', 'w-8');

    rerender(
      <ThemeProvider>
        <ThemeToggle size="lg" />
      </ThemeProvider>
    );
    expect(screen.getByRole('switch')).toHaveClass('h-12', 'w-12');

    rerender(
      <ThemeProvider>
        <ThemeToggle size="xs" />
      </ThemeProvider>
    );
    expect(screen.getByRole('switch')).toHaveClass('h-6', 'w-6');
  });

  it('handles click to toggle theme', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ThemeProvider colorMode="light">
        <ThemeToggle onChange={handleChange} />
      </ThemeProvider>
    );

    await user.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith('dark');
  });

  it('toggles from dark to light', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ThemeProvider colorMode="dark">
        <ThemeToggle onChange={handleChange} />
      </ThemeProvider>
    );

    await user.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith('light');
  });

  it('renders disabled', () => {
    render(
      <ThemeProvider>
        <ThemeToggle disabled />
      </ThemeProvider>
    );
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(
      <ThemeProvider>
        <ThemeToggle className="custom-class" />
      </ThemeProvider>
    );
    expect(screen.getByRole('switch')).toHaveClass('custom-class');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('controlled value prop overrides context', () => {
    render(
      <ThemeProvider colorMode="light">
        <ThemeToggle value="dark" />
      </ThemeProvider>
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('controlled value prop: light shows aria-checked false', () => {
    render(
      <ThemeProvider colorMode="dark">
        <ThemeToggle value="light" />
      </ThemeProvider>
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('controlled value reverts on change only via callback', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ThemeProvider colorMode="light">
        <ThemeToggle value="light" onChange={handleChange} />
      </ThemeProvider>
    );

    await user.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith('dark');
    // Value stays 'light' since it's controlled and parent didn't update
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('useContext={false} ignores ThemeProvider', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ThemeProvider colorMode="light">
        <ThemeToggle value="light" useContext={false} onChange={handleChange} />
      </ThemeProvider>
    );

    await user.click(screen.getByRole('switch'));
    // With useContext=false, provider is not updated, only onChange is called
    expect(handleChange).toHaveBeenCalledWith('dark');
  });
});
