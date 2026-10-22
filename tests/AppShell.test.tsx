import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { AppShell, type AppShellProps } from '../src/components/AppShell';

const renderShell = (props: Partial<AppShellProps> = {}) =>
  render(
    <AppShell
      header={<header>Application</header>}
      sidebar={<aside aria-label="Sidebar">Navigation</aside>}
      footer={<footer>Footer</footer>}
      {...props}
    >
      <p>Page content</p>
    </AppShell>
  );

describe('AppShell', () => {
  it('renders landmarks and a skip link to main', () => {
    renderShell();

    expect(screen.getByRole('banner')).toHaveTextContent('Application');
    expect(screen.getByRole('complementary', { name: 'Sidebar' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Page content');
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Footer');
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
  });

  it('hides the sidebar below the configured breakpoint', () => {
    renderShell({ mobileBreakpoint: 'md' });
    const sidebar = screen.getByRole('complementary', { name: 'Sidebar' });

    expect(sidebar.parentElement).toHaveClass('hidden', 'md:block');
  });

  it('supports top navigation without a sidebar', () => {
    renderShell({ variant: 'topnav' });

    expect(screen.queryByRole('complementary', { name: 'Sidebar' })).not.toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Page content');
  });

  it('supports right sidebars, collapsed width and custom main id', () => {
    const { container } = renderShell({
      sidebarSide: 'right',
      collapsed: true,
      sidebarWidth: 'lg',
      mainId: 'content',
      skipLabel: 'Skip to content',
    });
    const content = screen.getByRole('main');
    const sidebar = screen.getByRole('complementary', { name: 'Sidebar' });
    const contentColumn = content.parentElement;

    expect(content).toHaveAttribute('id', 'content');
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#content'
    );
    expect(sidebar.parentElement).toHaveClass('w-16');
    expect(contentColumn?.nextElementSibling).toBe(sidebar.parentElement);
    expect(container.firstChild).toHaveClass('min-h-dvh');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderShell();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
