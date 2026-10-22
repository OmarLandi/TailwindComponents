import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import {
  Footer,
  FooterContainer,
  FooterRow,
  FooterColumn,
  FooterTitle,
  FooterLink,
  FooterBottom,
} from '../src/components/Footer';

describe('Footer', () => {
  it('renders footer element', () => {
    render(
      <Footer>
        <FooterContainer>Content</FooterContainer>
      </Footer>
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders column titles', () => {
    render(
      <Footer>
        <FooterContainer>
          <FooterRow cols={2}>
            <FooterColumn>
              <FooterTitle>Product</FooterTitle>
              <FooterLink href="#">Features</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>Company</FooterTitle>
              <FooterLink href="#">About</FooterLink>
            </FooterColumn>
          </FooterRow>
        </FooterContainer>
      </Footer>
    );
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('renders links', () => {
    render(
      <Footer>
        <FooterContainer>
          <FooterRow cols={1}>
            <FooterColumn>
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/about">About</FooterLink>
            </FooterColumn>
          </FooterRow>
        </FooterContainer>
      </Footer>
    );
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders bottom section', () => {
    render(
      <Footer>
        <FooterContainer>
          <FooterBottom>
            <span>&copy; 2024 Company</span>
          </FooterBottom>
        </FooterContainer>
      </Footer>
    );
    expect(screen.getByText('© 2024 Company')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Footer className="custom-footer">
        <FooterContainer>Content</FooterContainer>
      </Footer>
    );
    expect(screen.getByRole('contentinfo')).toHaveClass('custom-footer');
  });

  it('renders with muted variant', () => {
    render(
      <Footer variant="muted">
        <FooterContainer>Content</FooterContainer>
      </Footer>
    );
    expect(screen.getByRole('contentinfo')).toHaveClass('bg-muted');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Footer>
        <FooterContainer>
          <FooterRow cols={2}>
            <FooterColumn>
              <FooterTitle>Links</FooterTitle>
              <FooterLink href="#">Home</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>Info</FooterTitle>
              <FooterLink href="#">About</FooterLink>
            </FooterColumn>
          </FooterRow>
          <FooterBottom>
            <span>&copy; 2024</span>
          </FooterBottom>
        </FooterContainer>
      </Footer>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
