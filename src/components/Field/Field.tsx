import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

interface FieldContextValue {
  id: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

const useFieldContext = () => React.useContext(FieldContext);

const fieldVariants = cva('group/field flex w-full gap-2', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-col sm:flex-row sm:items-start sm:gap-4',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof fieldVariants> {
  id?: string;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      className,
      orientation,
      id,
      invalid = false,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const fieldId = id ?? generatedId;
    const value = React.useMemo<FieldContextValue>(
      () => ({
        id: fieldId,
        descriptionId: `${fieldId}-description`,
        errorId: `${fieldId}-error`,
        invalid,
        disabled,
        required,
      }),
      [fieldId, invalid, disabled, required]
    );

    return (
      <FieldContext.Provider value={value}>
        <div
          ref={ref}
          data-invalid={invalid || undefined}
          data-disabled={disabled || undefined}
          data-orientation={orientation ?? 'vertical'}
          className={cn(fieldVariants({ orientation }), className)}
          {...props}
        />
      </FieldContext.Provider>
    );
  }
);
Field.displayName = 'Field';

export interface FieldLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean;
}

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FieldLabelProps
>(({ className, children, htmlFor, required, ...props }, ref) => {
  const field = useFieldContext();
  const isRequired = required ?? field?.required ?? false;

  return (
    <LabelPrimitive.Root
      ref={ref}
      htmlFor={htmlFor ?? field?.id}
      data-disabled={field?.disabled || undefined}
      data-invalid={field?.invalid || undefined}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[disabled=true]:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      {isRequired && (
        <span className="ms-1 text-destructive" aria-hidden="true">
          *
        </span>
      )}
    </LabelPrimitive.Root>
  );
});
FieldLabel.displayName = 'FieldLabel';

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, id, ...props }, ref) => {
  const field = useFieldContext();

  return (
    <p
      ref={ref}
      id={id ?? field?.descriptionId}
      className={cn('text-sm leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  );
});
FieldDescription.displayName = 'FieldDescription';

export type FieldErrorItem = string | { message?: React.ReactNode };

export interface FieldErrorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode;
  errors?: FieldErrorItem[];
}

const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, id, children, errors, ...props }, ref) => {
    const field = useFieldContext();
    const messages = errors
      ?.map(error => (typeof error === 'string' ? error : error.message))
      .filter((message): message is React.ReactNode => message !== undefined && message !== null);

    if (!children && (!messages || messages.length === 0)) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={id ?? field?.errorId}
        role="alert"
        className={cn('text-sm font-medium text-destructive', className)}
        {...props}
      >
        {messages && messages.length > 0 ? (
          messages.length === 1 ? (
            messages[0]
          ) : (
            <ul className="list-disc space-y-1 ps-4">
              {messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          )
        ) : (
          children
        )}
      </div>
    );
  }
);
FieldError.displayName = 'FieldError';

const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex w-full flex-col gap-4', className)} {...props} />
  )
);
FieldGroup.displayName = 'FieldGroup';

const FieldSet = React.forwardRef<HTMLFieldSetElement, React.FieldsetHTMLAttributes<HTMLFieldSetElement>>(
  ({ className, ...props }, ref) => (
    <fieldset
      ref={ref}
      className={cn('m-0 flex min-w-0 flex-col gap-4 border-0 p-0', className)}
      {...props}
    />
  )
);
FieldSet.displayName = 'FieldSet';

const fieldLegendVariants = cva('mb-1 font-semibold', {
  variants: {
    variant: {
      legend: 'text-base',
      label: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'legend',
  },
});

export interface FieldLegendProps
  extends React.HTMLAttributes<HTMLLegendElement>, VariantProps<typeof fieldLegendVariants> {}

const FieldLegend = React.forwardRef<HTMLLegendElement, FieldLegendProps>(
  ({ className, variant, ...props }, ref) => (
    <legend ref={ref} className={cn(fieldLegendVariants({ variant }), className)} {...props} />
  )
);
FieldLegend.displayName = 'FieldLegend';

const FieldContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex min-w-0 flex-1 flex-col gap-1.5', className)} {...props} />
  )
);
FieldContent.displayName = 'FieldContent';

type FieldControlChildProps = {
  id?: string;
  disabled?: boolean;
  required?: boolean;
  'aria-describedby'?: string;
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
};

export interface FieldControlProps {
  children: React.ReactElement<FieldControlChildProps>;
}

const FieldControl = ({ children }: FieldControlProps) => {
  const field = useFieldContext();

  if (!field) {
    return children;
  }

  const describedBy = [
    children.props['aria-describedby'],
    field.descriptionId,
    field.invalid ? field.errorId : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return React.cloneElement(children, {
    id: children.props.id ?? field.id,
    disabled: children.props.disabled ?? field.disabled,
    required: children.props.required ?? field.required,
    'aria-describedby': describedBy || undefined,
    'aria-invalid': field.invalid || children.props['aria-invalid'] || undefined,
  });
};
FieldControl.displayName = 'FieldControl';

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldContent,
  FieldControl,
  fieldVariants,
  fieldLegendVariants,
  useFieldContext,
};
