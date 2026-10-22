import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { Section } from '../src/components/Section';

describe('Section', () => {
  it('wraps content in a semantic Container by default', () => {
    const { container } = render(
      <Section>
        <p>Section content</p>
      </Section>
    );
    const section = container.firstChild;
    const wrapper = screen.getByText('Section content').parentElement;

    expect(section).toHaveClass('py-10', 'bg-background');
    expect(wrapper).toHaveClass('mx-auto', 'max-w-[64rem]', 'px-4');
  });

  it('supports spacing, surface and width', () => {
    const { container } = render(
      <Section spacing="lg" surface="muted" width="form">
        <p>Content</p>
      </Section>
    );
    const section = container.firstChild;
    const wrapper = screen.getByText('Content').parentElement;

    expect(section).toHaveClass('py-14', 'bg-muted/40');
    expect(wrapper).toHaveClass('max-w-[32rem]');
  });

  it('supports bleeding content without the container wrapper', () => {
    const { container } = render(
      <Section bleed>
        <p>Bleed content</p>
      </Section>
    );

    expect(screen.getByText('Bleed content').parentElement).toBe(container.firstChild);
  });

  it('renders as child using Slot', () => {
    render(
      <Section asChild>
        <section data-testid="section-target">Content</section>
      </Section>
    );

    expect(screen.getByTestId('section-target')).toHaveClass('w-full', 'py-10');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Section>
        <h2>Section title</h2>
        <p>Section content</p>
      </Section>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
