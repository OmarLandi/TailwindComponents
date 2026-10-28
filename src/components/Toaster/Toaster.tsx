import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as RadixToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/Toast';

interface ToastMessage {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
}

interface ToastContextValue {
  toast: (message: Omit<ToastMessage, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Toaster = React.forwardRef<HTMLDivElement, ToasterProps>(
  ({ className, children, ...props }, ref) => {
    const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

    const toast = React.useCallback((message: Omit<ToastMessage, 'id'>) => {
      setToasts(current => [...current, { ...message, id: crypto.randomUUID() }]);
    }, []);

    const dismiss = React.useCallback((id: string) => {
      setToasts(current => current.filter(toastMessage => toastMessage.id !== id));
    }, []);

    return (
      <div ref={ref} className={cn(className)} {...props}>
        <ToastContext.Provider value={{ toast, dismiss }}>
          {children}
          <RadixToastProvider>
            <ToastViewport />
            {toasts.map(toastMessage => (
              <Toast
                key={toastMessage.id}
                variant={toastMessage.variant}
                onOpenChange={open => !open && dismiss(toastMessage.id)}
              >
                <div className="grid gap-1">
                  {toastMessage.title && <ToastTitle>{toastMessage.title}</ToastTitle>}
                  {toastMessage.description && (
                    <ToastDescription>{toastMessage.description}</ToastDescription>
                  )}
                </div>
                <ToastClose />
              </Toast>
            ))}
          </RadixToastProvider>
        </ToastContext.Provider>
      </div>
    );
  }
);
Toaster.displayName = 'Toaster';

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within Toaster');
  return context;
};

export { Toaster };
