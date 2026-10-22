import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axe from 'axe-core';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSeparator,
} from '../src/components/Sidebar';

describe('Sidebar', () => {
  it('renders aside element', () => {
    render(<Sidebar>Content</Sidebar>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('renders header', () => {
    render(
      <Sidebar>
        <SidebarHeader>Header</SidebarHeader>
      </Sidebar>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders sidebar items', () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarGroup label="Main">
            <SidebarItem href="#" isActive>
              Home
            </SidebarItem>
            <SidebarItem href="#">Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders group labels', () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarGroup label="Navigation">
            <SidebarItem href="#">Item</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <Sidebar>
        <SidebarFooter>Footer</SidebarFooter>
      </Sidebar>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders separator', () => {
    render(
      <Sidebar>
        <SidebarContent>
          <SidebarItem href="#">Item 1</SidebarItem>
          <SidebarSeparator />
          <SidebarItem href="#">Item 2</SidebarItem>
        </SidebarContent>
      </Sidebar>
    );
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Sidebar className="custom-sidebar">Content</Sidebar>);
    expect(screen.getByRole('complementary')).toHaveClass('custom-sidebar');
  });

  it('renders with collapsed state', () => {
    render(
      <Sidebar collapsed collapsible>
        Content
      </Sidebar>
    );
    expect(screen.getByRole('complementary')).toHaveClass('w-16');
  });

  it('renders mobile navigation as a modal dialog when open', () => {
    render(
      <Sidebar mobile mobileOpen onMobileClose={() => {}}>
        <SidebarContent>
          <SidebarItem href="#">Home</SidebarItem>
        </SidebarContent>
      </Sidebar>
    );
    const dialog = screen.getByRole('dialog', { name: 'Navigation' });
    expect(dialog).toHaveAttribute('data-state', 'open');
    expect(dialog).toContainElement(screen.getByRole('link', { name: 'Home' }));
  });

  it('does not render mobile navigation when closed', () => {
    render(
      <Sidebar mobile mobileOpen={false} onMobileClose={() => {}}>
        <SidebarItem href="#">Home</SidebarItem>
      </Sidebar>
    );
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  it('calls onMobileClose when Escape is pressed', async () => {
    const onMobileClose = vi.fn();
    render(
      <Sidebar mobile mobileOpen onMobileClose={onMobileClose}>
        <SidebarItem href="#">Home</SidebarItem>
      </Sidebar>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(onMobileClose).toHaveBeenCalled());
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Sidebar>
        <SidebarHeader>App</SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Main">
            <SidebarItem href="#" isActive>
              Home
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
