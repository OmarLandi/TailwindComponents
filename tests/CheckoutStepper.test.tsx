import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import { CheckoutStepper } from '../src/components/CheckoutStepper';

describe('CheckoutStepper', () => {
  it('renders steps', () => {
    render(
      <CheckoutStepper
        steps={[
          { id: 'a', label: 'Cart' },
          { id: 'b', label: 'Payment' },
        ]}
        currentStep={0}
      />
    );
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <CheckoutStepper steps={[{ id: 'a', label: 'Cart' }]} currentStep={0} />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
