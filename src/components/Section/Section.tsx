import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: '',
      sm: 'py-6 sm:py-8',
      md: 'py-10 sm:py-12 lg:py-16',
      lg: 'py-14 sm:py-20 lg:py-24',
      xl: 'py-20 sm:py-28 lg:py-32',
    },
    surface: {
      base: 'bg-background text-foreground',
      muted: 'bg-muted/40 text-foreground',
      card: 'bg-card text-card-foreground',
      accent: 'bg-accent text-accent-foreground',
      inverse: 'bg-foreground text-background',
    },
  },
  defaultVariants: {
    spacing: 'md',
    surface: 'base',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  container?: boolean;
  bleed?: boolean;
  width?: 'prose' | 'form' | 'content' | 'wide' | 'full';
  asChild?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing,
      surface,
      container = true,
      bleed = false,
      width = 'content',
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'section';
    const shouldWrap = container && !bleed && !asChild;

    return (
      <Comp ref={ref} className={cn(sectionVariants({ spacing, surface }), className)} {...props}>
        {shouldWrap ? (
          <Container size={width} padding="md">
            {children}
          </Container>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Section.displayName = 'Section';

export { Section, sectionVariants };
