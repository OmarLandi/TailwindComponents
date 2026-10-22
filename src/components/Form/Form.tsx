import * as React from 'react';

import { cn } from '@/lib/utils';

export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn('flex w-full flex-col gap-6', className)} {...props} />
));
Form.displayName = 'Form';

const FormSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props} />
  )
);
FormSection.displayName = 'FormSection';

const FormActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end',
        className
      )}
      {...props}
    />
  )
);
FormActions.displayName = 'FormActions';

export { Form, FormSection, FormActions };
