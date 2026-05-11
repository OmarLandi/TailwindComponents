import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static displayName = 'ErrorBoundary';

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  reset = (): void => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div role="alert">
          {this.props.fallback ?? (
            <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
              <p className="font-semibold">Something went wrong</p>
              {this.state.error?.message && (
                <p className="text-sm mt-1">{this.state.error.message}</p>
              )}
              {this.props.onReset && (
                <button
                  type="button"
                  onClick={this.reset}
                  className="mt-3 px-3 py-1.5 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Try again
                </button>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
