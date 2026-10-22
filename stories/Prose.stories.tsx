import type { Meta, StoryObj } from '@storybook/react';

import { Prose } from '../src/components/Prose';

const meta: Meta<typeof Prose> = {
  title: 'Layout/Prose',
  component: Prose,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Typography wrapper for long-form Markdown or CMS content.

Constrains the measure to \`65ch\` and styles headings, links, lists, code, tables,
blockquotes and media with semantic theme tokens. Images and code wrap instead of
forcing horizontal page scroll.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Prose>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <h1>Building accessible layouts</h1>
        <p>
          Good layout starts with semantic HTML. Use <code>header</code>, <code>main</code>,{' '}
          <code>aside</code> and <code>footer</code> before reaching for ARIA.
        </p>
        <h2>Rhythm and measure</h2>
        <p>
          Long text is easier to read when the measure stays around 65 characters. Links use the{' '}
          <a href="#tokens">primary token</a> and keep a visible focus ring.
        </p>
        <ul>
          <li>Mobile-first distribution</li>
          <li>One vertical page scroll</li>
          <li>Focusable regions for internal scroll</li>
        </ul>
        <blockquote>Compose pages from primitives, not one-off widths.</blockquote>
        <h2>Code and tables</h2>
        <pre>
          <code>{`<main id="main">\n  <Prose>{content}</Prose>\n</main>`}</code>
        </pre>
        <table>
          <caption>Responsive breakpoints</caption>
          <thead>
            <tr>
              <th scope="col">Range</th>
              <th scope="col">Columns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>320–639</td>
              <td>1</td>
            </tr>
            <tr>
              <td>640–1023</td>
              <td>2</td>
            </tr>
            <tr>
              <td>1024+</td>
              <td>3–4</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
};

export const Article: Story = {
  args: {
    children: (
      <article>
        <h2>Release notes</h2>
        <p>This release adds layout primitives and improves overlay accessibility.</p>
        <h3>Fixes</h3>
        <p>Tooltips now render in the themed portal container.</p>
      </article>
    ),
  },
};
