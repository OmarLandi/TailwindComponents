import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axe from 'axe-core';
import {
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarNav,
  NavbarItem,
  NavbarLink,
  NavbarActions,
  NavbarToggle,
  NavbarMenu,
} from '../src/components/Navbar';
import { Button } from '../src/components/Button';

describe('Navbar', () => {
  it('renders header element', () => {
    render(
      <Navbar>
        <NavbarContainer>Content</NavbarContainer>
      </Navbar>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders brand text', () => {
    render(
      <Navbar>
        <NavbarContainer>
          <NavbarBrand>MyApp</NavbarBrand>
        </NavbarContainer>
      </Navbar>
    );
    expect(screen.getByText('MyApp')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(
      <Navbar>
        <NavbarContainer>
          <NavbarNav>
            <NavbarItem>
              <NavbarLink href="#" isActive>
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">About</NavbarLink>
            </NavbarItem>
          </NavbarNav>
        </NavbarContainer>
      </Navbar>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Home')).toHaveAttribute('aria-current', 'page');
  });

  it('renders actions area', () => {
    render(
      <Navbar>
        <NavbarContainer>
          <NavbarActions>
            <Button>Action</Button>
          </NavbarActions>
        </NavbarContainer>
      </Navbar>
    );
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders toggle button with aria attributes', () => {
    render(
      <Navbar>
        <NavbarContainer>
          <NavbarToggle isOpen={false} onClick={() => {}} />
        </NavbarContainer>
      </Navbar>
    );
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('renders toggle with open state', () => {
    render(
      <Navbar>
        <NavbarContainer>
          <NavbarToggle isOpen={true} onClick={() => {}} />
        </NavbarContainer>
      </Navbar>
    );
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Close menu')).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders mobile menu', () => {
    render(
      <Navbar>
        <NavbarContainer>Content</NavbarContainer>
        <NavbarMenu isOpen={true}>
          <span>Mobile content</span>
        </NavbarMenu>
      </Navbar>
    );
    expect(screen.getByText('Mobile content')).toBeInTheDocument();
  });

  it('renders with floating variant', () => {
    render(
      <Navbar variant="floating">
        <NavbarContainer>Content</NavbarContainer>
      </Navbar>
    );
    expect(screen.getByRole('banner')).toHaveClass('shadow-xs');
  });

  it('renders with custom className', () => {
    render(
      <Navbar className="custom">
        <NavbarContainer>Content</NavbarContainer>
      </Navbar>
    );
    expect(screen.getByRole('banner')).toHaveClass('custom');
  });

  it('renders the mobile menu as a modal dialog when open', () => {
    render(
      <Navbar>
        <NavbarContainer>Content</NavbarContainer>
        <NavbarMenu isOpen onClose={() => {}}>
          <span>Mobile content</span>
        </NavbarMenu>
      </Navbar>
    );
    const dialog = screen.getByRole('dialog', { name: 'Navigation menu' });
    expect(dialog).toHaveAttribute('data-state', 'open');
    expect(dialog).toContainElement(screen.getByText('Mobile content'));
  });

  it('does not render mobile menu content when closed', () => {
    render(
      <Navbar>
        <NavbarContainer>Content</NavbarContainer>
        <NavbarMenu isOpen={false} onClose={() => {}}>
          <span>Mobile content</span>
        </NavbarMenu>
      </Navbar>
    );
    expect(screen.queryByText('Mobile content')).not.toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn();
    render(
      <Navbar>
        <NavbarContainer>Content</NavbarContainer>
        <NavbarMenu isOpen onClose={onClose}>
          <span>Mobile content</span>
        </NavbarMenu>
      </Navbar>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Navbar>
        <NavbarContainer>
          <NavbarBrand>App</NavbarBrand>
          <NavbarNav>
            <NavbarItem>
              <NavbarLink href="#">Home</NavbarLink>
            </NavbarItem>
          </NavbarNav>
        </NavbarContainer>
      </Navbar>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
