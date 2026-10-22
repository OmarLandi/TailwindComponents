import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';

import { Prose } from '../src/components/Prose';

describe('Prose', () => {
  it('applies readable measure and vertical rhythm', () => {
    const { container } = render(
      <Prose>
        <h2>Heading</h2>
        <p>Paragraph with a link.</p>
      </Prose>
    );
    const root = container.firstChild;

    expect(root).toHaveClass('max-w-[65ch]', 'leading-7', '[&_h2]:text-2xl');
  });

  it('renders semantic content and responsive media styles', () => {
    const { container } = render(
      <Prose>
        <h2>Results</h2>
        <table>
          <caption>Monthly results</caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>January</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="" />
      </Prose>
    );

    expect(screen.getByRole('table', { name: 'Monthly results' })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('[&_table]:w-full', '[&_img]:max-w-full');
  });

  it('renders as child using Slot', () => {
    render(
      <Prose asChild>
        <article data-testid="prose-target">
          <p>Article body</p>
        </article>
      </Prose>
    );

    expect(screen.getByTestId('prose-target')).toHaveClass('max-w-[65ch]');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Prose>
        <h2>Getting started</h2>
        <p>
          Read the <a href="#docs">documentation</a> for more details.
        </p>
        <ul>
          <li>First step</li>
          <li>Second step</li>
        </ul>
      </Prose>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
