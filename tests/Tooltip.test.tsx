import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import {
  Tooltip,
  TooltipArrow,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '../src/components/Tooltip';

const renderTooltip = (content = 'Tooltip text') =>
  render(
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

describe('Tooltip', () => {
  it('renders trigger element', () => {
    renderTooltip();
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows content on hover in a body portal', async () => {
    const user = userEvent.setup();
    const { container } = renderTooltip();

    await user.hover(screen.getByText('Hover me'));

    const tooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(tooltip).toHaveTextContent('Tooltip text');
    expect(container.contains(tooltip)).toBe(false);
    expect(document.body.contains(tooltip)).toBe(true);
  });

  it('shows content on keyboard focus and closes on blur', async () => {
    const user = userEvent.setup();
    renderTooltip();

    await user.tab();
    expect(screen.getByText('Hover me')).toHaveFocus();
    expect(await screen.findByRole('tooltip', { hidden: true })).toBeInTheDocument();

    await user.tab();
    await waitFor(() => {
      expect(screen.queryByRole('tooltip', { hidden: true })).not.toBeInTheDocument();
    });
  });

  it('should have no accessibility violations while open', async () => {
    const user = userEvent.setup();
    renderTooltip();

    await user.hover(screen.getByText('Hover me'));
    await screen.findByRole('tooltip', { hidden: true });

    const results = await axe.run(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});
