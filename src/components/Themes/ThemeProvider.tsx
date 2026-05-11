import * as React from 'react';
import type { ThemeProviderProps, ColorMode, ThemeContextValue, Theme } from './types';
import { getTheme } from './defaultTheme';
import { getPalette } from './palettes';

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const stripHsl = (value: string): string => {
  return value.replace(/^hsl\(([^)]+)\)$/, '$1').trim();
};

const applyThemeToRoot = (theme: Theme): string => {
  let css = '';

  Object.entries(theme.colors).forEach(([key, value]) => {
    if (key === 'chart') {
      Object.entries(value).forEach(([chartKey, chartValue]) => {
        css += `--chart-${chartKey}: ${stripHsl(String(chartValue))}; `;
      });
    } else {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      css += `--${cssKey}: ${stripHsl(String(value))}; `;
    }
  });

  Object.entries(theme.typography.fonts).forEach(([key, value]) => {
    css += `--font-${key}: ${value}; `;
  });

  Object.entries(theme.typography.fontSizes).forEach(([key, value]) => {
    css += `--text-${key}: ${value}; `;
  });

  Object.entries(theme.typography.fontWeights).forEach(([key, value]) => {
    css += `--font-weight-${key}: ${value}; `;
  });

  Object.entries(theme.radii).forEach(([key, value]) => {
    css += `--radius-${key}: ${value}; `;
  });

  Object.entries(theme.shadows).forEach(([key, value]) => {
    css += `--shadow-${key}: ${value}; `;
  });

  css += `--radius: ${theme.radius}; `;

  return css;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  colorMode: initialColorMode = 'light',
  defaultPalette = 'neutral',
  defaultTheme: customTheme,
  children,
  storageKey = 'theme-color-mode',
  disableTransitionOnChange = false,
}) => {
  const [colorMode, setColorModeState] = React.useState<ColorMode>(initialColorMode);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = window.localStorage?.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') {
      setColorModeState(stored);
    }
  }, [storageKey]);

  const [themeOverride, setThemeOverride] = React.useState<Partial<Theme>>({});

  const theme: Theme = React.useMemo(() => {
    const baseTheme = getTheme(mounted ? colorMode : initialColorMode);
    const paletteColors = getPalette(defaultPalette, mounted ? colorMode : initialColorMode);
    const themeWithPalette = { ...baseTheme, colors: { ...paletteColors } };
    const custom = customTheme ? { ...themeWithPalette, ...customTheme } : themeWithPalette;
    return { ...custom, ...themeOverride };
  }, [mounted, colorMode, defaultPalette, customTheme, themeOverride, initialColorMode]);

  React.useEffect(() => {
    const css = applyThemeToRoot(theme);
    const scopedCss = css.replace(/:root/g, `.${colorMode}`);
    const styleEl = document.createElement('style');
    styleEl.id = 'theme-provider-style';
    styleEl.textContent = scopedCss;
    document.head.appendChild(styleEl);
    return () => {
      styleEl.remove();
    };
  }, [theme, colorMode]);

  const setTheme = React.useCallback((newTheme: Partial<Theme>) => {
    setThemeOverride(prev => ({ ...prev, ...newTheme }));
  }, []);

  const setColorMode = React.useCallback(
    (mode: ColorMode) => {
      setColorModeState(mode);
      try {
        window.localStorage?.setItem(storageKey, mode);
      } catch {
        // localStorage not available
      }

      if (!disableTransitionOnChange) {
        const css = document.createElement('style');
        css.textContent = '*, *::before, *::after { transition: none !important; }';
        document.head.appendChild(css);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            css.remove();
          });
        });
      }
    },
    [storageKey, disableTransitionOnChange]
  );

  const toggleColorMode = React.useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      colorMode,
      setColorMode,
      toggleColorMode,
      setTheme,
    }),
    [theme, colorMode, setColorMode, toggleColorMode, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={`${colorMode} theme-${defaultPalette}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
