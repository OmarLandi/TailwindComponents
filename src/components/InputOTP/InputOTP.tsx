import * as React from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface InputOTPProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  value?: string;
  onChange?: (value: string) => void;
  length?: number;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorMessage?: React.ReactNode;
  isLoading?: boolean;
  onComplete?: (value: string) => void;
  isInputNum?: boolean;
}

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      className,
      value = '',
      onChange,
      length = 6,
      label,
      helperText,
      errorMessage,
      isLoading,
      disabled,
      required,
      id,
      name,
      onComplete,
      isInputNum = true,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const otpId = id || generatedId;
    const labelId = `${otpId}-label`;
    const errorId = `${otpId}-error`;
    const helperId = `${otpId}-helper`;
    const hasError = !!errorMessage;
    const describedBy =
      [hasError ? errorId : helperText ? helperId : undefined, ariaDescribedBy]
        .filter(Boolean)
        .join(' ') || undefined;
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const forwardedRef = React.useCallback(
      (el: HTMLInputElement | null) => {
        inputRefs.current[0] = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref && 'current' in ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }
      },
      [ref]
    );
    const [otp, setOtp] = React.useState<string[]>(
      Array.from({ length }, (_, i) => value[i] || '')
    );

    React.useEffect(() => {
      const newOtp = Array.from({ length }, (_, i) => value[i] || '');
      setOtp(newOtp);
    }, [value, length]);

    const focusInput = (index: number) => {
      const input = inputRefs.current[index];
      if (input) {
        input.focus();
      }
    };

    const handleChange = (index: number, char: string) => {
      if (isInputNum && !/^\d*$/.test(char)) return;

      const newOtp = [...otp];
      newOtp[index] = char.slice(-1);
      setOtp(newOtp);

      const newValue = newOtp.join('');
      onChange?.(newValue);

      if (char && index < length - 1) {
        focusInput(index + 1);
      }

      if (newOtp.every(Boolean) && onComplete) {
        onComplete(newValue);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        focusInput(index - 1);
      }
      if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      }
      if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        focusInput(index + 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text');
      const chars = pasted.replace(/\s/g, '').slice(0, length);
      const newOtp = [...otp];
      for (let i = 0; i < length; i++) {
        newOtp[i] = chars[i] || '';
      }
      setOtp(newOtp);
      onChange?.(newOtp.join(''));
      focusInput(Math.min(chars.length, length - 1));

      if (newOtp.every(Boolean) && onComplete) {
        onComplete(newOtp.join(''));
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            id={labelId}
            htmlFor={otpId}
            className={cn('text-sm font-medium leading-none', disabled && 'opacity-50')}
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div
          role="group"
          aria-labelledby={label ? labelId : undefined}
          className="flex items-center gap-2"
        >
          {Array.from({ length }, (_, index) => (
            <input
              key={index}
              id={index === 0 ? otpId : undefined}
              {...props}
              ref={
                index === 0
                  ? forwardedRef
                  : el => {
                      inputRefs.current[index] = el;
                    }
              }
              type={isInputNum ? 'tel' : 'text'}
              inputMode={isInputNum ? 'numeric' : 'text'}
              autoComplete="one-time-code"
              maxLength={1}
              value={otp[index]}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={disabled || isLoading}
              required={required}
              aria-label={`Digit ${index + 1}`}
              aria-invalid={hasError ? true : ariaInvalid}
              aria-describedby={describedBy}
              className={cn(
                'flex h-12 w-10 items-center justify-center rounded-md border border-input bg-background text-center text-lg font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                otp[index] && 'border-primary',
                hasError && 'border-destructive focus-visible:ring-destructive',
                className
              )}
            />
          ))}
          {isLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        </div>
        <input type="hidden" name={name} value={otp.join('')} readOnly />
        {hasError && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
InputOTP.displayName = 'InputOTP';

export { InputOTP };
