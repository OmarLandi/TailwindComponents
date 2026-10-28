import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ThemeScriptProps extends React.ScriptHTMLAttributes<HTMLScriptElement> {
  storageKey?: string;
  defaultColorMode?: 'light' | 'dark';
}

const ThemeScript = React.forwardRef<HTMLScriptElement, ThemeScriptProps>(
  ({ storageKey = 'theme-color-mode', defaultColorMode = 'light', className, ...props }, ref) => {
    const script = `
      (function () {
        try {
          var mode = localStorage.getItem('${storageKey}') || '${defaultColorMode}';
          document.documentElement.classList.toggle('dark', mode === 'dark');
          document.documentElement.style.colorScheme = mode;
        } catch (error) {}
      })();
    `;

    return (
      <script
        ref={ref}
        dangerouslySetInnerHTML={{ __html: script }}
        className={cn(className)}
        {...props}
      />
    );
  }
);
ThemeScript.displayName = 'ThemeScript';

export { ThemeScript };
