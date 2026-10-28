import * as React from 'react';

import { cn } from '@/lib/utils';

export interface NewsletterSignupProps extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'title'
> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  emailLabel?: string;
  placeholder?: string;
  submitLabel?: string;
  loading?: boolean;
  error?: React.ReactNode;
  success?: React.ReactNode;
  onSubmit?: (email: string) => void | Promise<void>;
}

const NewsletterSignup = React.forwardRef<HTMLFormElement, NewsletterSignupProps>(
  (
    {
      className,
      title = 'Subscribe to our newsletter',
      description,
      emailLabel = 'Email address',
      placeholder = 'you@example.com',
      submitLabel = 'Subscribe',
      loading = false,
      error,
      success,
      onSubmit,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!email) return;
      await onSubmit?.(email);
      setSubmitted(true);
    };

    return (
      <form
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-border bg-card p-5 text-card-foreground',
          className
        )}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            {emailLabel}
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder={placeholder}
            className="min-h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
            disabled={loading}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'newsletter-error' : undefined}
          />
          <button
            type="submit"
            onClick={event => {
              event.preventDefault();
              void handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
            }}
            disabled={loading || !email}
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? 'Subscribing…' : submitLabel}
          </button>
        </div>
        {error && (
          <p id="newsletter-error" role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {success && submitted && <p className="text-sm text-muted-foreground">{success}</p>}
      </form>
    );
  }
);
NewsletterSignup.displayName = 'NewsletterSignup';

export { NewsletterSignup };
