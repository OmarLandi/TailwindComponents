import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

const proseClasses = cn(
  'max-w-[65ch] text-base leading-7 text-foreground',
  '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
  '[&_h1]:mb-4 [&_h1]:mt-10 [&_h1]:scroll-m-20 [&_h1]:text-balance [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight',
  '[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:scroll-m-20 [&_h2]:text-balance [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight',
  '[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:scroll-m-20 [&_h3]:text-xl [&_h3]:font-semibold',
  '[&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:scroll-m-20 [&_h4]:text-lg [&_h4]:font-semibold',
  '[&_p]:my-4 [&_p]:leading-7',
  '[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-primary/80',
  '[&_strong]:font-semibold [&_strong]:text-foreground',
  '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:ps-6',
  '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:ps-6',
  '[&_li]:my-1.5 [&_li]:ps-1',
  '[&_blockquote]:my-6 [&_blockquote]:border-s-2 [&_blockquote]:border-border [&_blockquote]:ps-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground',
  '[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm',
  '[&_pre]:my-6 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-4',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
  '[&_hr]:my-8 [&_hr]:border-border',
  '[&_table]:my-6 [&_table]:w-full [&_table]:table-auto [&_table]:border-collapse [&_table]:text-sm',
  '[&_th]:border-b [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-start [&_th]:font-semibold [&_th]:break-words',
  '[&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:break-words',
  '[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-md',
  '[&_figure]:my-6 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground'
);

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return <Comp ref={ref} className={cn(proseClasses, className)} {...props} />;
  }
);
Prose.displayName = 'Prose';

export { Prose, proseClasses };
